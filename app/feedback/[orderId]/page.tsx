'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function FeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string
  const [formData, setFormData] = useState({
    overallRating: 0,
    productRating: 0,
    deliveryRating: 0,
    comments: '',
    wouldRecommend: null as boolean | null
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = formData.overallRating > 0 && formData.productRating > 0 && formData.deliveryRating > 0

  const submitFeedback = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          overallRating: formData.overallRating,
          productRating: formData.productRating,
          deliveryRating: formData.deliveryRating,
          comments: formData.comments || null,
          wouldRecommend: formData.wouldRecommend
        })
      })

      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        alert(data.error || 'Failed to submit feedback')
      }
    } catch (error) {
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-offblack p-12 border border-white/10 text-center max-w-md">
          <div className="w-20 h-20 bg-beige rounded-full flex items-center justify-center mx-auto mb-6 text-black text-4xl">✓</div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Thank You!</h2>
          <p className="text-gray-400 mb-4">Your feedback has been submitted successfully.</p>
          <p className="text-gray-400">We appreciate your time and input!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tighter uppercase font-display group">
            Simu<span className="text-beige text-xs align-top ml-1 opacity-80 group-hover:text-white transition-colors">Hub</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-offblack p-8 md:p-12 border border-white/10">
          <h1 className="font-display text-3xl md:text-4xl uppercase font-bold tracking-tighter text-center mb-2">Share Your Feedback</h1>
          <p className="text-center text-gray-400 mb-12 font-light">Help us improve by sharing your experience</p>

          <form onSubmit={(e) => { e.preventDefault(); submitFeedback(); }} className="space-y-10">
            <div>
              <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-4 text-center">Overall Experience Rating *</label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map(i => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, overallRating: i })}
                    className={`text-4xl transition-colors ${formData.overallRating >= i ? 'text-beige' : 'text-white/20'}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-4 text-center">Product Satisfaction *</label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map(i => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, productRating: i })}
                    className={`text-4xl transition-colors ${formData.productRating >= i ? 'text-beige' : 'text-white/20'}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-4 text-center">Delivery/Pickup Experience *</label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map(i => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryRating: i })}
                    className={`text-4xl transition-colors ${formData.deliveryRating >= i ? 'text-beige' : 'text-white/20'}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Comments (Optional)</label>
              <textarea
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                className="w-full custom-input py-3 text-white placeholder-gray-600 bg-transparent resize-none"
                rows={5}
                placeholder="Share any additional thoughts..."
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-4">Would you recommend us?</label>
              <div className="flex gap-6 justify-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="true"
                    checked={formData.wouldRecommend === true}
                    onChange={() => setFormData({ ...formData, wouldRecommend: true })}
                    className="w-4 h-4 bg-transparent border-white/20 text-beige focus:ring-beige"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="false"
                    checked={formData.wouldRecommend === false}
                    onChange={() => setFormData({ ...formData, wouldRecommend: false })}
                    className="w-4 h-4 bg-transparent border-white/20 text-beige focus:ring-beige"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="w-full bg-beige text-black px-10 py-4 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
