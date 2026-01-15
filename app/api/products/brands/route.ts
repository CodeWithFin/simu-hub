import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('brand')
      .order('brand')
    
    if (error) throw error
    
    const uniqueBrands = [...new Set(data.map((p: any) => p.brand))]
    
    return NextResponse.json({ success: true, data: uniqueBrands })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
