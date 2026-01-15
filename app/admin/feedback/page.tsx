'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Feedback {
  id: string
  overall_rating: number
  product_rating: number
  delivery_rating: number
  comments: string | null
  would_recommend: boolean | null
  created_at: string
  orders: {
    id: string
    order_reference: string
    created_at: string
    products: {
      brand: string
      model: string
    }
  }
}

interface FeedbackData {
  data: Feedback[]
  averages: {
    overall: string
    product: string
    delivery: string
  }
}

export default function FeedbackDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null)
  const [filters, setFilters] = useState({
    rating: '',
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin/login')
      return
    }
    loadFeedback()
  }, [router])

  useEffect(() => {
    loadFeedback()
  }, [filters])

  const loadFeedback = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams()
      if (filters.rating) params.append('rating', filters.rating)
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)

      const res = await fetch(`/api/feedback?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setFeedbackData(data)
      }
    } catch (error) {
      console.error('Failed to load feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (!feedbackData || !feedbackData.data || feedbackData.data.length === 0) {
      alert('No feedback data to export')
      return
    }

    const headers = ['Order ID', 'Product', 'Date', 'Overall Rating', 'Product Rating', 'Delivery Rating', 'Would Recommend', 'Comments']
    const rows = feedbackData.data.map((fb) => [
      fb.orders?.order_reference || 'N/A',
      `${fb.orders?.products?.brand || ''} ${fb.orders?.products?.model || ''}`.trim(),
      new Date(fb.created_at).toLocaleDateString(),
      fb.overall_rating,
      fb.product_rating,
      fb.delivery_rating,
      fb.would_recommend === null ? 'N/A' : fb.would_recommend ? 'Yes' : 'No',
      fb.comments ? `"${fb.comments.replace(/"/g, '""')}"` : ''
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `feedback-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= rating ? 'text-beige' : 'text-white/20'}>
            ⭐
          </span>
        ))}
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
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
            <Link href="/admin" className="text-sm text-gray-400 hover:text-beige transition-colors">
              Orders
            </Link>
            <span className="text-sm text-beige">Order Feedback</span>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h1 className="font-display text-4xl md:text-5xl uppercase font-bold tracking-tighter mb-4 md:mb-0">
              Customer Feedback
            </h1>
            <button
              onClick={exportToCSV}
              disabled={!feedbackData?.data || feedbackData.data.length === 0}
              className="bg-beige text-black px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export to CSV
            </button>
          </div>

          {/* Average Ratings Section */}
          {feedbackData && feedbackData.data.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-xl uppercase font-bold tracking-tight mb-6">Average Ratings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-offblack p-6 border border-white/10">
                  <div className="text-xs font-mono text-beige uppercase tracking-wide mb-4">Overall Experience</div>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-display font-bold text-beige">{feedbackData.averages.overall}</div>
                    {renderStars(Math.round(parseFloat(feedbackData.averages.overall)))}
                  </div>
                </div>
                <div className="bg-offblack p-6 border border-white/10">
                  <div className="text-xs font-mono text-beige uppercase tracking-wide mb-4">Product Satisfaction</div>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-display font-bold text-beige">{feedbackData.averages.product}</div>
                    {renderStars(Math.round(parseFloat(feedbackData.averages.product)))}
                  </div>
                </div>
                <div className="bg-offblack p-6 border border-white/10">
                  <div className="text-xs font-mono text-beige uppercase tracking-wide mb-4">Delivery Experience</div>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-display font-bold text-beige">{feedbackData.averages.delivery}</div>
                    {renderStars(Math.round(parseFloat(feedbackData.averages.delivery)))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Filters */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="bg-offblack border border-white/10 px-4 py-3 text-white custom-input"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Stars</option>
              </select>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="bg-offblack border border-white/10 px-4 py-3 text-white custom-input"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="bg-offblack border border-white/10 px-4 py-3 text-white custom-input"
                placeholder="End Date"
              />
              <button
                onClick={() => setFilters({ rating: '', startDate: '', endDate: '' })}
                className="border border-white/20 px-6 py-3 text-sm uppercase tracking-wide hover:border-beige hover:text-beige transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </section>

          {/* Feedback List */}
          <section className="bg-offblack border border-white/10">
            <div className="p-6 border-b border-white/10">
              <h2 className="font-display text-xl uppercase font-bold tracking-tight">
                Recent Feedback ({feedbackData?.data.length || 0})
              </h2>
            </div>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-beige"></div>
              </div>
            ) : !feedbackData || feedbackData.data.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="text-lg mb-2">No feedback received yet</p>
                <p className="text-sm">Feedback will appear here once customers submit their reviews</p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {feedbackData.data.map((fb) => (
                  <div key={fb.id} className="p-6 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">
                            {fb.orders?.products?.brand} {fb.orders?.products?.model}
                          </h3>
                          <span className="text-xs text-gray-500 font-mono">
                            Order #{fb.orders?.order_reference}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{formatDate(fb.created_at)}</p>
                      </div>
                      {fb.would_recommend !== null && (
                        <div className={`px-3 py-1 text-xs uppercase tracking-wide ${
                          fb.would_recommend 
                            ? 'bg-beige/20 text-beige border border-beige/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {fb.would_recommend ? 'Would Recommend' : 'Would Not Recommend'}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Overall</div>
                        {renderStars(fb.overall_rating)}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Product</div>
                        {renderStars(fb.product_rating)}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Delivery</div>
                        {renderStars(fb.delivery_rating)}
                      </div>
                    </div>

                    {fb.comments && (
                      <div className="bg-black/30 p-4 border border-white/5 mt-4">
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Comments</div>
                        <p className="text-gray-300 leading-relaxed">{fb.comments}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
