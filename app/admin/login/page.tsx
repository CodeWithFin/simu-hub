'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success) {
        localStorage.setItem('adminToken', data.data.token)
        router.push('/admin')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err: any) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-offblack p-8 md:p-12 border border-white/10 max-w-md w-full">
        <Link href="/" className="inline-block mb-8">
          <span className="text-lg font-bold tracking-tighter uppercase font-display">
            Simu<span className="text-beige text-xs align-top ml-1">Hub</span>
          </span>
        </Link>
        <h1 className="font-display text-3xl uppercase font-bold tracking-tighter mb-2">Admin Login</h1>
        <p className="text-gray-400 mb-8 font-light">Simu Hub Dashboard</p>

        {error && (
          <div className="bg-black/50 border border-red-500/50 text-red-400 p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full custom-input py-3 text-white placeholder-gray-600"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full custom-input py-3 text-white placeholder-gray-600"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-beige text-black px-10 py-4 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
