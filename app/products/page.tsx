'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency } from '@/app/lib/currency'

interface Product {
  id: string
  brand: string
  model: string
  price: number
  storage_capacity?: string
  ram?: string
  has_5g?: boolean
  image_url?: string
}

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    storage: '',
    ram: '',
    has5g: false
  })

  const loadBrands = async () => {
    try {
      const res = await fetch('/api/products/brands')
      const data = await res.json()
      if (data.success) setBrands(data.data)
    } catch (error) {
      console.error('Failed to load brands:', error)
    }
  }

  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.brand) params.append('brand', filters.brand)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.storage) params.append('storage', filters.storage)
      if (filters.ram) params.append('ram', filters.ram)
      if (filters.has5g) params.append('has5g', 'true')

      const res = await fetch(`/api/products?${params}`)
      const data = await res.json()
      if (data.success) setProducts(data.data)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadBrands()
    loadProducts()
  }, [loadProducts])

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      storage: '',
      ram: '',
      has5g: false
    })
  }

  const selectProduct = (product: Product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product))
    router.push('/checkout')
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
            <Link href="/products" className="hover:text-white transition-colors text-white">Products</Link>
            <Link href="/feedback" className="hover:text-white transition-colors">Feedback</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl uppercase font-bold tracking-tighter mb-4">Browse Products</h1>
          <p className="text-gray-400 font-light">Filter by brand and specifications to find your perfect phone</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-offblack p-6 border border-white/10 sticky top-24">
              <h2 className="font-display text-xl uppercase font-bold tracking-tight mb-6">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white custom-input"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand} className="bg-offblack">{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-full custom-input py-2 text-white placeholder-gray-600"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-full custom-input py-2 text-white placeholder-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">Storage</label>
                  <select
                    value={filters.storage}
                    onChange={(e) => setFilters({ ...filters, storage: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white custom-input"
                  >
                    <option value="">All</option>
                    <option value="64GB" className="bg-offblack">64GB</option>
                    <option value="128GB" className="bg-offblack">128GB</option>
                    <option value="256GB" className="bg-offblack">256GB</option>
                    <option value="512GB" className="bg-offblack">512GB</option>
                    <option value="1TB" className="bg-offblack">1TB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-beige uppercase tracking-wide mb-2">RAM</label>
                  <select
                    value={filters.ram}
                    onChange={(e) => setFilters({ ...filters, ram: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white custom-input"
                  >
                    <option value="">All</option>
                    <option value="4GB" className="bg-offblack">4GB</option>
                    <option value="6GB" className="bg-offblack">6GB</option>
                    <option value="8GB" className="bg-offblack">8GB</option>
                    <option value="12GB" className="bg-offblack">12GB</option>
                    <option value="16GB" className="bg-offblack">16GB+</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.has5g}
                      onChange={(e) => setFilters({ ...filters, has5g: e.target.checked })}
                      className="w-4 h-4 bg-transparent border-white/20 text-beige focus:ring-beige"
                    />
                    <span>5G Capable</span>
                  </label>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full border border-white/20 py-3 text-sm uppercase tracking-wide hover:border-beige hover:text-beige transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beige"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-offblack p-12 border border-white/10 text-center text-gray-400">
                No products found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-offblack border border-white/10 overflow-hidden hover:border-beige/50 transition-all duration-300 group cursor-pointer" onClick={() => selectProduct(product)}>
                    <div className="aspect-square bg-neutral-900 overflow-hidden relative">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.model} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">📱</div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-semibold uppercase tracking-tight mb-2">{product.brand} {product.model}</h3>
                      <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-400">
                        {product.storage_capacity && <span className="bg-white/5 px-2 py-1 border border-white/10">{product.storage_capacity}</span>}
                        {product.ram && <span className="bg-white/5 px-2 py-1 border border-white/10">{product.ram} RAM</span>}
                        {product.has_5g && <span className="bg-white/5 px-2 py-1 border border-white/10">5G</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-display font-bold text-beige">{formatCurrency(product.price)}</div>
                        <button className="bg-beige text-black px-6 py-2 text-xs font-bold uppercase tracking-wide hover:bg-white transition-colors">
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
