import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'
import { sendSMS } from '@/app/lib/sms'

const generateOrderReference = () => {
  return 'SH' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 7).toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, phone, email, productId, deliveryMethod, deliveryAddress } = body
    
    // Validation
    if (!customerName || !phone || !productId || !deliveryMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    if (deliveryMethod === 'doorstep' && !deliveryAddress) {
      return NextResponse.json(
        { success: false, error: 'Delivery address required for doorstep delivery' },
        { status: 400 }
      )
    }
    
    // Get or create customer
    let { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('phone', phone)
      .single()
    
    if (!customer) {
      // Create new customer
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert({ name: customerName, phone, email })
        .select()
        .single()
      
      if (customerError) throw customerError
      if (!newCustomer) {
        return NextResponse.json(
          { success: false, error: 'Failed to create customer' },
          { status: 500 }
        )
      }
      customer = newCustomer
    } else {
      // Update existing customer's name and email (they might have changed)
      const { data: updatedCustomer, error: updateError } = await supabase
        .from('customers')
        .update({ 
          name: customerName, 
          email: email || null 
        })
        .eq('id', customer.id)
        .select()
        .single()
      
      if (updateError) {
        console.error('Failed to update customer:', updateError)
      } else {
        customer = updatedCustomer
      }
    }
    
    // Ensure customer exists
    if (!customer || !customer.id) {
      return NextResponse.json(
        { success: false, error: 'Failed to get or create customer' },
        { status: 500 }
      )
    }
    
    // Get product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()
    
    if (productError || !product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Create order
    const orderReference = generateOrderReference()
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customer.id,
        product_id: productId,
        delivery_method: deliveryMethod,
        delivery_address: deliveryMethod === 'doorstep' ? deliveryAddress : null,
        order_reference: orderReference,
        status: 'pending'
      })
      .select()
      .single()
    
    if (orderError) throw orderError
    
    // Send SMS to shop owner
    const shopPhone = process.env.SHOP_PHONE
    if (shopPhone) {
      const ownerMessage = `NEW ORDER #${orderReference}
Customer: ${customerName}
Phone: ${phone}
Product: ${product.brand} ${product.model}
Delivery: ${deliveryMethod === 'doorstep' ? 'Doorstep' : 'Pickup'}
${deliveryMethod === 'doorstep' ? `Location: ${deliveryAddress}` : ''}
View: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/orders/${order.id}`
      
      await sendSMS(shopPhone, ownerMessage, order.id)
    }
    
    return NextResponse.json({
      success: true,
      data: {
        ...order,
        product,
        customer: { name: customerName, phone, email }
      }
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const deliveryMethod = searchParams.get('deliveryMethod')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const search = searchParams.get('search')
    
    let query = supabase
      .from('orders')
      .select(`
        *,
        customers:customer_id (id, name, phone, email),
        products:product_id (id, brand, model, price, image_url)
      `)
      .order('created_at', { ascending: false })
    
    if (status) {
      query = query.eq('status', status)
    }
    
    if (deliveryMethod) {
      query = query.eq('delivery_method', deliveryMethod)
    }
    
    if (startDate) {
      query = query.gte('created_at', startDate)
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    // Filter by search if provided
    let filteredData = data
    if (search) {
      const searchLower = search.toLowerCase()
      filteredData = data?.filter((order: any) => 
        order.order_reference?.toLowerCase().includes(searchLower) ||
        order.customers?.name?.toLowerCase().includes(searchLower) ||
        order.customers?.phone?.includes(search)
      ) || []
    }
    
    return NextResponse.json({ success: true, data: filteredData })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
