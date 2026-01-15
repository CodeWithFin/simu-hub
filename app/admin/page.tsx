'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Stats {
  today: { total: number; pending: number; completed: number }
  week: { total: number; pending: number; completed: number }
  month: { total: number; pending: number; completed: number }
}

interface Order {
  id: string
  order_reference: string
  created_at: string
  status: string
  delivery_method: string
  customers?: { name: string; phone: string }
  products?: { brand: string; model: string }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  })

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin/login')
      return
    }
    loadStats()
  }, [router])

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) setStats(data.data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const loadOrders = useCallback(async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.search) params.append('search', filters.search)

      const res = await fetch(`/api/orders?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) setOrders(data.data)
    } catch (error) {
      console.error('Failed to load orders:', error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      const data = await res.json()
      if (data.success) {
        await loadOrders()
        await loadStats()
        if (status === 'completed') {
          alert('Order marked as complete! Feedback request SMS sent to customer.')
        } else {
          alert('Order status updated successfully!')
        }
      } else {
        alert(data.error || 'Failed to update order status')
      }
    } catch (error: any) {
      alert('Failed to update order status')
    }
  }


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beige"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tighter uppercase font-display group">
            Simu<span className="text-beige text-xs align-top ml-1 opacity-80 group-hover:text-white transition-colors">Hub</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-beige">Orders</span>
            <Link href="/admin/feedback" className="text-sm text-gray-400 hover:text-beige transition-colors">
              Order Feedback
            </Link>
            <Link href="/admin/general-feedback" className="text-sm text-gray-400 hover:text-beige transition-colors">
              General Feedback
            </Link>
            <button
              onClick={handleLogout}
              className="border border-white/20 px-4 py-2 text-sm uppercase tracking-wide hover:border-beige hover:text-beige transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-display text-4xl md:text-5xl uppercase font-bold tracking-tighter mb-12">Admin Dashboard</h1>

          {/* Stats Section */}
          <section className="mb-12">
            <h2 className="font-display text-xl uppercase font-bold tracking-tight mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-offblack p-6 border border-white/10">
                <div className="text-xs font-mono text-beige uppercase tracking-wide mb-2">Today&apos;s Orders</div>
                <div className="text-3xl font-display font-bold text-beige mb-2">{stats.today.total}</div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <span>Pending: {stats.today.pending}</span>
                  <span>Completed: {stats.today.completed}</span>
                </div>
              </div>
              <div className="bg-offblack p-6 border border-white/10">
                <div className="text-xs font-mono text-beige uppercase tracking-wide mb-2">This Week</div>
                <div className="text-3xl font-display font-bold text-beige mb-2">{stats.week.total}</div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <span>Pending: {stats.week.pending}</span>
                  <span>Completed: {stats.week.completed}</span>
                </div>
              </div>
              <div className="bg-offblack p-6 border border-white/10">
                <div className="text-xs font-mono text-beige uppercase tracking-wide mb-2">This Month</div>
                <div className="text-3xl font-display font-bold text-beige mb-2">{stats.month.total}</div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <span>Pending: {stats.month.pending}</span>
                  <span>Completed: {stats.month.completed}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="bg-offblack border border-white/10 px-4 py-3 text-white custom-input"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="dispatched">Dispatched</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
              </select>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="flex-1 bg-offblack border border-white/10 px-4 py-3 text-white placeholder-gray-600 custom-input"
                placeholder="Search by order ID, name, or phone..."
              />
            </div>
          </section>

          {/* Orders Table */}
          <section className="bg-offblack border border-white/10">
            <div className="p-6 border-b border-white/10">
              <h2 className="font-display text-xl uppercase font-bold tracking-tight">Orders</h2>
            </div>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-beige"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/50 border-b border-white/10">
                    <tr>
                      <th className="p-4 text-left text-xs font-mono text-beige uppercase tracking-wide">Order ID</th>
                      <th className="p-4 text-left text-xs font-mono text-beige uppercase tracking-wide">Date</th>
                      <th className="p-4 text-left text-xs font-mono text-beige uppercase tracking-wide">Customer</th>
                      <th className="p-4 text-left text-xs font-mono text-beige uppercase tracking-wide">Phone</th>
                      <th className="p-4 text-left text-xs font-mono text-beige uppercase tracking-wide">Product</th>
                      <th className="p-4 text-left text-xs font-mono text-beige uppercase tracking-wide">Delivery</th>
                      <th className="p-4 text-left text-xs font-mono text-beige uppercase tracking-wide">Status</th>
                      <th className="p-4 text-left text-xs font-mono text-beige uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm">{order.order_reference}</td>
                        <td className="p-4 text-sm text-gray-400">{formatDate(order.created_at)}</td>
                        <td className="p-4 text-sm">{order.customers?.name || 'N/A'}</td>
                        <td className="p-4 text-sm text-gray-400">{order.customers?.phone || 'N/A'}</td>
                        <td className="p-4 text-sm">{order.products?.brand} {order.products?.model}</td>
                        <td className="p-4 text-sm text-gray-400">{order.delivery_method === 'doorstep' ? 'Doorstep' : 'Pickup'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs uppercase tracking-wide ${
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            order.status === 'completed' ? 'bg-beige/20 text-beige border border-beige/30' :
                            'bg-white/10 text-white border border-white/20'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {order.status === 'pending' && (
                              <button
                                onClick={() => updateStatus(order.id, order.delivery_method === 'doorstep' ? 'dispatched' : 'ready')}
                                className="bg-beige text-black px-3 py-1 text-xs font-bold uppercase tracking-wide hover:bg-white transition-colors"
                              >
                                {order.delivery_method === 'doorstep' ? 'Dispatch' : 'Ready'}
                              </button>
                            )}
                            {(order.status === 'dispatched' || order.status === 'ready') && (
                              <button
                                onClick={() => updateStatus(order.id, 'completed')}
                                className="bg-beige text-black px-3 py-1 text-xs font-bold uppercase tracking-wide hover:bg-white transition-colors"
                                title="Mark as complete and send feedback request to customer"
                              >
                                Complete
                              </button>
                            )}
                            {order.status === 'completed' && (
                              <span className="text-xs text-gray-500 italic px-3 py-1">
                                Feedback requested
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
