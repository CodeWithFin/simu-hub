import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'
import { sendSMS } from '@/app/lib/sms'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { status } = body
    
    if (!['pending', 'dispatched', 'ready', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      )
    }
    
    // Get order with customer and product details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        customers:customer_id (*),
        products:product_id (*)
      `)
      .eq('id', id)
      .single()
    
    if (orderError || !order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }
    
    const updateData: any = { status }
    
    if (status === 'dispatched') {
      updateData.dispatched_at = new Date().toISOString()
    }
    
    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString()
    }
    
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (updateError) throw updateError
    
    // Send SMS notifications
    const customer = (order as any).customers
    const product = (order as any).products
    
    if (status === 'dispatched' && order.delivery_method === 'doorstep') {
      const message = `Your order #${order.order_reference} has been dispatched!
${product.brand} ${product.model}
Expected delivery: Within 24 hours
Contact: ${process.env.SHOP_PHONE || 'N/A'}`
      
      await sendSMS(customer.phone, message, order.id)
    }
    
    if (status === 'ready' && order.delivery_method === 'pickup') {
      const message = `Your order #${order.order_reference} is ready for pickup!
${product.brand} ${product.model}
Pickup at: ${process.env.SHOP_ADDRESS || 'Store'}
Hours: ${process.env.SHOP_HOURS || 'Mon-Sat: 9AM-6PM'}
Bring: Order ID and valid ID
Contact: ${process.env.SHOP_PHONE || 'N/A'}`
      
      await sendSMS(customer.phone, message, order.id)
    }
    
    // Automatically send feedback request when order is completed
    if (status === 'completed') {
      const feedbackLink = 'https://simu-hub.vercel.app/feedback'
      const message = `Thank you for your purchase from ${process.env.SHOP_NAME || 'Simu Hub'}!
How was your experience with ${product.brand} ${product.model}?
Share your feedback: ${feedbackLink}
Your opinion helps us improve!`
      
      console.log('Sending feedback request SMS to customer:', customer.phone)
      const smsResult = await sendSMS(customer.phone, message, order.id)
      console.log('Feedback request SMS result:', smsResult)
      
      if (!smsResult.success) {
        console.error('Failed to send feedback request SMS:', smsResult.error)
      }
    }
    
    return NextResponse.json({ success: true, data: updatedOrder })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
