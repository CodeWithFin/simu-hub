import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const brand = searchParams.get('brand')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const storage = searchParams.get('storage')
    const ram = searchParams.get('ram')
    const has5g = searchParams.get('has5g')
    const color = searchParams.get('color')
    
    let query = supabase.from('products').select('*')
    
    if (brand) {
      query = query.ilike('brand', `%${brand}%`)
    }
    
    if (minPrice) {
      query = query.gte('price', minPrice)
    }
    
    if (maxPrice) {
      query = query.lte('price', maxPrice)
    }
    
    if (storage) {
      query = query.eq('storage_capacity', storage)
    }
    
    if (ram) {
      query = query.eq('ram', ram)
    }
    
    if (has5g !== null && has5g !== undefined) {
      query = query.eq('has_5g', has5g === 'true')
    }
    
    if (color) {
      query = query.ilike('color', `%${color}%`)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
