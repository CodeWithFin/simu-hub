'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Feedback {
  id: string
  name: string
  message: string
  created_at: string
}

export default function Home() {
  const heroImage = '/assets/iphone-17pro.jpg'
  const [testimonials, setTestimonials] = useState<Feedback[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const res = await fetch('/api/general-feedback')
      const data = await res.json()
      if (data.success && data.data) {
        // Get the most recent 6 feedback entries
        setTestimonials(data.data.slice(0, 6))
      }
    } catch (error) {
      console.error('Failed to load testimonials:', error)
    } finally {
      setLoadingTestimonials(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tighter uppercase font-display group">
            Simu<span className="text-beige text-xs align-top ml-1 opacity-80 group-hover:text-white transition-colors">Hub</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-400">
            <Link href="/" className="hover:text-white transition-colors text-white">Home</Link>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <Link href="/feedback" className="hover:text-white transition-colors">Feedback</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div 
            className="cinematic-bg w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImage}')` }}
          ></div>
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left w-full mt-20">
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[1.1] mb-6 animate-slide-up">
            Find Your Perfect <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Mobile Phone</span>
          </h1>
          
          <p className="text-beige/90 text-sm md:text-base max-w-xl mb-10 leading-relaxed animate-slide-up">
            Browse our curated selection of premium mobile phones from top brands. 
            Discover the perfect device that matches your needs and lifestyle.
          </p>

          <div className="animate-slide-up">
            <Link href="/products" className="inline-block bg-beige text-black px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors duration-300">
              Explore Products
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-20 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <span className="h-12 w-[1px] bg-beige/50"></span>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 md:py-32 bg-black border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-300">
            <span className="text-white font-medium">Simu Hub</span> is your trusted destination for premium mobile phones. 
            We focus on <span className="text-beige">genuine products</span>, <span className="text-beige">excellent service</span>, 
            and <span className="text-beige">seamless delivery</span> from selection to your doorstep.
          </p>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24 bg-offblack">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-6">
            <h2 className="font-display text-3xl uppercase font-bold tracking-tight">Why Choose Us</h2>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-sm text-beige hover:text-white transition-colors mt-4 md:mt-0">
              View Products <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            <div className="bg-offblack p-8 hover:bg-white/5 transition-colors group">
              <span className="text-beige text-xs mb-4 block">01</span>
              <h3 className="text-lg font-medium mb-2">Wide Selection</h3>
              <p className="text-sm text-gray-400">Top brands like Samsung, Apple, Xiaomi, and more</p>
            </div>
            <div className="bg-offblack p-8 hover:bg-white/5 transition-colors group">
              <span className="text-beige text-xs mb-4 block">02</span>
              <h3 className="text-lg font-medium mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-400">Doorstep delivery or convenient store pickup</p>
            </div>
            <div className="bg-offblack p-8 hover:bg-white/5 transition-colors group">
              <span className="text-beige text-xs mb-4 block">03</span>
              <h3 className="text-lg font-medium mb-2">Genuine Products</h3>
              <p className="text-sm text-gray-400">100% authentic with warranty and support</p>
            </div>
          </div>
          
          <Link href="/products" className="md:hidden mt-8 w-full py-4 border border-white/20 text-sm uppercase tracking-wide text-center block">
            View Products
          </Link>
        </div>
      </section>

      {/* Customer Testimonials */}
      {!loadingTestimonials && testimonials.length > 0 && (
        <section className="py-24 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl uppercase font-bold tracking-tight mb-4">
                What Our Customers Say
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                Real feedback from real customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((feedback) => (
                <div 
                  key={feedback.id} 
                  className="bg-offblack p-6 border border-white/10 hover:border-beige/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-beige/20 flex items-center justify-center text-beige font-bold">
                      {feedback.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-white">{feedback.name}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(feedback.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    &ldquo;{feedback.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action - Feedback */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl uppercase font-bold tracking-tight mb-4">
            Share Your Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-8">
            We value your opinion. Let us know how we can serve you better.
          </p>
          <Link 
            href="/feedback"
            className="inline-block bg-beige text-black px-10 py-4 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors"
          >
            Give Feedback
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/5 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <span className="font-display font-bold uppercase tracking-tighter text-lg">Simu Hub</span>
            <span className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">© 2024 Simu Hub</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
