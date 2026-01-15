'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface GeneralFeedback {
  id: string
  name: string
  email: string | null
  phone: string | null
  message: string
  rating: number | null
  created_at: string
}

interface FeedbackData {
  data: GeneralFeedback[]
  averageRating: string
  total: number
}

export default function GeneralFeedbackDashboard() {
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

      const res = await fetch(`/api/general-feedback?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setFeedbackData(data)
      }
    } catch (error) {
      console.error('Failed to load general feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (!feedbackData || !feedbackData.data || feedbackData.data.length === 0) {
      alert('No feedback data to export')
      return
    }

    const headers = ['Name', 'Email', 'Phone', 'Rating', 'Date', 'Message']
    const rows = feedbackData.data.map((fb) => [
      fb.name,
      fb.email || 'N/A',
      fb.phone || 'N/A',
      fb.rating || 'N/A',
      new Date(fb.created_at).toLocaleDateString(),
      fb.message ? `"${fb.message.replace(/"/g, '""')}"` : ''
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `general-feedback-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-500 text-sm">No rating</span>
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
            <Link href="/admin/feedback" className="text-sm text-gray-400 hover:text-beige transition-colors">
              Order Feedback
            </Link>
            <span className="text-sm text-beige">General Feedback</span>
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
              General Feedback
            </h1>
            <button
              onClick={exportToCSV}
              disabled={!feedbackData?.data || feedbackData.data.length === 0}
              className="bg-beige text-black px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export to CSV
            </button>
          </div>

          {/* Stats Section */}
          {feedbackData && feedbackData.data.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-offblack p-6 border border-white/10">
                  <div className="text-xs font-mono text-beige uppercase tracking-wide mb-4">Total Submissions</div>
                  <div className="text-4xl font-display font-bold text-beige">{feedbackData.total}</div>
                </div>
                <div className="bg-offblack p-6 border border-white/10">
                  <div className="text-xs font-mono text-beige uppercase tracking-wide mb-4">Average Rating</div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-display font-bold text-beige">{feedbackData.averageRating}</div>
                    {feedbackData.averageRating !== 'N/A' && renderStars(Math.round(parseFloat(feedbackData.averageRating)))}
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
                All Submissions ({feedbackData?.total || 0})
              </h2>
            </div>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-beige"></div>
              </div>
            ) : !feedbackData || feedbackData.data.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="text-lg mb-2">No feedback received yet</p>
                <p className="text-sm">Feedback will appear here once visitors submit their reviews</p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {feedbackData.data.map((fb) => (
                  <div key={fb.id} className="p-6 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{fb.name}</h3>
                        <div className="flex flex-col gap-1 text-sm text-gray-400">
                          {fb.email && <span>Email: {fb.email}</span>}
                          {fb.phone && <span>Phone: {fb.phone}</span>}
                          <span className="text-xs text-gray-500">{formatDate(fb.created_at)}</span>
                        </div>
                      </div>
                      <div>
                        {renderStars(fb.rating)}
                      </div>
                    </div>

                    <div className="bg-black/30 p-4 border border-white/5">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Message</div>
                      <p className="text-gray-300 leading-relaxed">{fb.message}</p>
                    </div>
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
