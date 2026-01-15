import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, overallRating, productRating, deliveryRating, comments, wouldRecommend } = body
    
    // Verify order exists
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', orderId)
      .single()
    
    if (orderError || !order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }
    
    // Check if feedback already exists
    const { data: existingFeedback } = await supabase
      .from('feedback')
      .select('id')
      .eq('order_id', orderId)
      .single()
    
    if (existingFeedback) {
      return NextResponse.json(
        { success: false, error: 'Feedback already submitted for this order' },
        { status: 400 }
      )
    }
    
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        order_id: orderId,
        overall_rating: overallRating,
        product_rating: productRating,
        delivery_rating: deliveryRating,
        comments,
        would_recommend: wouldRecommend
      })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ success: true, data }, { status: 201 })
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
    const rating = searchParams.get('rating')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    let query = supabase
      .from('feedback')
      .select(`
        *,
        orders:order_id (
          id,
          order_reference,
          created_at,
          products:product_id (brand, model)
        )
      `)
      .order('created_at', { ascending: false })
    
    if (rating) {
      query = query.gte('overall_rating', parseInt(rating))
    }
    
    if (startDate) {
      query = query.gte('created_at', startDate)
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    // Calculate average ratings
    const avgOverall = data && data.length > 0 
      ? data.reduce((sum: number, f: any) => sum + (f.overall_rating || 0), 0) / data.length 
      : 0
    const avgProduct = data && data.length > 0
      ? data.reduce((sum: number, f: any) => sum + (f.product_rating || 0), 0) / data.length
      : 0
    const avgDelivery = data && data.length > 0
      ? data.reduce((sum: number, f: any) => sum + (f.delivery_rating || 0), 0) / data.length
      : 0
    
    return NextResponse.json({
      success: true,
      data,
      averages: {
        overall: avgOverall.toFixed(2),
        product: avgProduct.toFixed(2),
        delivery: avgDelivery.toFixed(2)
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
