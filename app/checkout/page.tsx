'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency, formatCurrencyWithDecimals } from '@/app/lib/currency'

interface Product {
  id: string
  brand: string
  model: string
  price: number
  storage_capacity?: string
  ram?: string
  image_url?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryMethod: 'doorstep' as 'doorstep' | 'pickup',
    deliveryAddress: '',
    acceptTerms: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderReference, setOrderReference] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('selectedProduct')
    if (!stored) {
      router.push('/products')
      return
    }
    setProduct(JSON.parse(stored))
  }, [router])

  const deliveryFee = 500 // KSH delivery fee
  const totalPrice = product ? (parseFloat(product.price.toString()) + (formData.deliveryMethod === 'doorstep' ? deliveryFee : 0)) : 0

  const submitOrder = async () => {
    if (!product) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          email: formData.email,
          productId: product.id,
          deliveryMethod: formData.deliveryMethod,
          deliveryAddress: formData.deliveryMethod === 'doorstep' ? formData.deliveryAddress : null
        })
      })

      const data = await res.json()
      if (data.success) {
        setOrderReference(data.data.order_reference)
        setOrderSuccess(true)
        localStorage.removeItem('selectedProduct')
      } else {
        alert(data.error || 'Failed to place order')
      }
    } catch (error: any) {
      alert('Failed to place order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!product) return null

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-offblack p-12 border border-white/10 text-center max-w-md">
          <div className="w-20 h-20 bg-beige rounded-full flex items-center justify-center mx-auto mb-6 text-black text-4xl">✓</div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Order Placed Successfully!</h2>
          <p className="mb-2 text-gray-400">Your order reference number is:</p>
          <p className="text-2xl font-display font-bold text-beige mb-4">{orderReference}</p>
          <p className="text-sm text-gray-400 mb-2">All prices are in Kenyan Shillings (KSh)</p>
          <p className="text-gray-400 mb-6">You will receive an SMS confirmation shortly.</p>
          <Link
            href="/"
            className="inline-block bg-beige text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors"
          >
            Return to Home
          </Link>
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
            <Link href="/feedback" className="hover:text-white transition-colors">Feedback</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h1 className="font-display text-4xl md:text-5xl uppercase font-bold tracking-tighter mb-12">Complete Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-offblack p-8 md:p-12 border border-white/10">
              <h2 className="font-display text-xl uppercase font-bold tracking-tight mb-8">Order Information</h2>
              <form onSubmit={(e) => { e.preventDefault(); submitOrder(); }} className="space-y-8">
                <div>
                  <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full custom-input py-3 text-white placeholder-gray-600"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full custom-input py-3 text-white placeholder-gray-600"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full custom-input py-3 text-white placeholder-gray-600"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Delivery Method *</label>
                  <div className="flex gap-6 mt-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="doorstep"
                        checked={formData.deliveryMethod === 'doorstep'}
                        onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as 'doorstep' | 'pickup' })}
                        className="w-4 h-4 bg-transparent border-white/20 text-beige focus:ring-beige"
                      />
                      <span>Doorstep Delivery</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="pickup"
                        checked={formData.deliveryMethod === 'pickup'}
                        onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as 'doorstep' | 'pickup' })}
                        className="w-4 h-4 bg-transparent border-white/20 text-beige focus:ring-beige"
                      />
                      <span>Pickup from Store</span>
                    </label>
                  </div>
                </div>

                {formData.deliveryMethod === 'doorstep' && (
                  <div>
                    <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Delivery Address *</label>
                    <textarea
                      required
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      className="w-full custom-input py-3 text-white placeholder-gray-600 bg-transparent resize-none"
                      rows={4}
                      placeholder="Enter your complete address"
                    />
                  </div>
                )}

                {formData.deliveryMethod === 'pickup' && (
                  <div className="bg-black/50 p-6 border border-white/5">
                    <p className="text-sm mb-2"><strong>Pickup Location:</strong> 123 Main Street, City, Country</p>
                    <p className="text-sm text-gray-400"><strong>Hours:</strong> Mon-Sat: 9AM-6PM</p>
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="w-4 h-4 bg-transparent border-white/20 text-beige focus:ring-beige"
                    />
                    <span className="text-sm">I agree to the terms and conditions *</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-beige text-black px-10 py-4 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Processing...' : 'Complete Order'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-offblack p-8 border border-white/10 sticky top-24">
              <h2 className="font-display text-xl uppercase font-bold tracking-tight mb-6">Order Summary</h2>
              <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-20 h-20 bg-neutral-900 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.model} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">📱</span>
                  )}
                </div>
                <div>
                  <h3 className="font-display font-semibold uppercase text-sm mb-1">{product.brand} {product.model}</h3>
                  <div className="text-xs text-gray-400">
                    {product.storage_capacity && <span>{product.storage_capacity}</span>}
                    {product.ram && <span className="ml-2">{product.ram} RAM</span>}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Product Price:</span>
                  <span>{formatCurrency(product.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery:</span>
                  <span>{formData.deliveryMethod === 'doorstep' ? formatCurrency(deliveryFee) : 'Free'}</span>
                </div>
                <div className="flex justify-between text-xl font-display font-bold pt-4 border-t border-white/10">
                  <span>Total:</span>
                  <span className="text-beige">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
