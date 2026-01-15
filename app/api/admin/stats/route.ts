import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'
import { authenticateAdmin } from '@/app/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const admin = authenticateAdmin(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const now = new Date()
    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)
    const weekStart = new Date(now)
    weekStart.setDate(weekStart.getDate() - 7)
    const monthStart = new Date(now)
    monthStart.setMonth(monthStart.getMonth() - 1)
    
    // Get order counts
    const { data: allOrders } = await supabase
      .from('orders')
      .select('status, created_at')
    
    const todayOrders = allOrders?.filter((o: any) => new Date(o.created_at) >= todayStart) || []
    const weekOrders = allOrders?.filter((o: any) => new Date(o.created_at) >= weekStart) || []
    const monthOrders = allOrders?.filter((o: any) => new Date(o.created_at) >= monthStart) || []
    
    const stats = {
      today: {
        total: todayOrders.length,
        pending: todayOrders.filter((o: any) => o.status === 'pending').length,
        dispatched: todayOrders.filter((o: any) => o.status === 'dispatched').length,
        ready: todayOrders.filter((o: any) => o.status === 'ready').length,
        completed: todayOrders.filter((o: any) => o.status === 'completed').length
      },
      week: {
        total: weekOrders.length,
        pending: weekOrders.filter((o: any) => o.status === 'pending').length,
        dispatched: weekOrders.filter((o: any) => o.status === 'dispatched').length,
        ready: weekOrders.filter((o: any) => o.status === 'ready').length,
        completed: weekOrders.filter((o: any) => o.status === 'completed').length
      },
      month: {
        total: monthOrders.length,
        pending: monthOrders.filter((o: any) => o.status === 'pending').length,
        dispatched: monthOrders.filter((o: any) => o.status === 'dispatched').length,
        ready: monthOrders.filter((o: any) => o.status === 'ready').length,
        completed: monthOrders.filter((o: any) => o.status === 'completed').length
      }
    }
    
    return NextResponse.json({ success: true, data: stats })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
