'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GeneralFeedbackPage() {
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!feedbackForm.name || !feedbackForm.message) {
      alert('Please fill in your name and message')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/general-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackForm)
      })

      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setFeedbackForm({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
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
          <p className="text-gray-400 mb-6">We appreciate your time and input!</p>
          <p className="text-sm text-beige">Redirecting to homepage...</p>
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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <Link href="/feedback" className="hover:text-white transition-colors text-white">Feedback</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl uppercase font-bold tracking-tighter mb-4">
            Share Your Feedback
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            We value your opinion. Let us know how we can serve you better.
          </p>
        </div>

        <form onSubmit={handleFeedbackSubmit} className="bg-offblack p-8 md:p-12 border border-white/10">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={feedbackForm.name}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                className="w-full custom-input py-3 text-white placeholder-gray-600 bg-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                value={feedbackForm.email}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                className="w-full custom-input py-3 text-white placeholder-gray-600 bg-transparent"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={feedbackForm.phone}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, phone: e.target.value })}
                className="w-full custom-input py-3 text-white placeholder-gray-600 bg-transparent"
                placeholder="+254 XXX XXX XXX"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">
                Your Message *
              </label>
              <textarea
                value={feedbackForm.message}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                className="w-full custom-input py-3 text-white placeholder-gray-600 bg-transparent resize-none"
                rows={6}
                placeholder="Share your thoughts, suggestions, or experience with us..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || !feedbackForm.name || !feedbackForm.message}
              className="w-full bg-beige text-black px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
