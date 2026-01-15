import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, rating } = body
    
    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: 'Name and message are required' },
        { status: 400 }
      )
    }
    
    // Insert general feedback
    const { data, error } = await supabase
      .from('general_feedback')
      .insert({
        name,
        email: email || null,
        phone: phone || null,
        message,
        rating: rating || null
      })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error: any) {
    console.error('Error submitting general feedback:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit feedback' },
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
      .from('general_feedback')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (rating) {
      query = query.gte('rating', parseInt(rating))
    }
    
    if (startDate) {
      query = query.gte('created_at', startDate)
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    // Calculate average rating
    const avgRating = data && data.length > 0 
      ? data.filter((f: any) => f.rating).reduce((sum: number, f: any) => sum + (f.rating || 0), 0) / data.filter((f: any) => f.rating).length 
      : 0
    
    return NextResponse.json({
      success: true,
      data,
      averageRating: avgRating > 0 ? avgRating.toFixed(2) : 'N/A',
      total: data.length
    })
  } catch (error: any) {
    console.error('Error fetching general feedback:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}
