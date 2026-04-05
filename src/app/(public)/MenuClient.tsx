'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const CATEGORIES = [
    { name: 'Hot Drinks', icon: '☕' },
    { name: 'Cold Drinks', icon: '🧊' },
    { name: 'Food', icon: '🥪' },
]

const DUMMY_PRODUCTS: Product[] = [
    { id: '1', name: 'Cappuccino', description: 'Rich espresso with velvety steamed milk', price: 95, image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', category: 'Hot Drinks', subcategory: null, is_available: true, is_trending: true, is_favorite: true, created_at: '' },
    { id: '2', name: 'Cortado', description: 'Espresso cut with warm milk to reduce acidity', price: 90, image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400', category: 'Hot Drinks', subcategory: null, is_available: true, is_trending: false, is_favorite: false, created_at: '' },
    { id: '3', name: 'Latte', description: 'Smooth espresso with lots of steamed milk', price: 100, image_url: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400', category: 'Hot Drinks', subcategory: null, is_available: true, is_trending: true, is_favorite: false, created_at: '' },
    { id: '4', name: 'Ice Coffee', description: 'Cold brewed coffee over ice', price: 100, image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400', category: 'Cold Drinks', subcategory: null, is_available: true, is_trending: false, is_favorite: true, created_at: '' },
    { id: '5', name: 'Frappe', description: 'Blended iced coffee with whipped cream', price: 110, image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', category: 'Cold Drinks', subcategory: null, is_available: true, is_trending: true, is_favorite: true, created_at: '' },
    { id: '6', name: 'Milkshake', description: 'Creamy thick shake in various flavors', price: 115, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', category: 'Cold Drinks', subcategory: null, is_available: true, is_trending: false, is_favorite: false, created_at: '' },
    { id: '7', name: 'Sandwich', description: 'Freshly made with premium ingredients', price: 120, image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', category: 'Food', subcategory: null, is_available: true, is_trending: false, is_favorite: true, created_at: '' },
]

export default function MenuClient({ products }: { products: Product[] }) {
    const allProducts = products.length > 0 ? products : DUMMY_PRODUCTS
    const [visible, setVisible] = useState(false)

    const favorites = allProducts.filter(p => p.is_favorite === true)
    const trending = allProducts.filter(p => p.is_trending === true)
    
    useEffect(() => {
        setTimeout(() => setVisible(true), 100)
    }, [])

    return (
        <main className="min-h-screen text-white" style={{ background: '#0a0600' }}>

            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(200,169,126,0.06) 0%, transparent 70%)' }}
            />

            {/* Hero */}
            <div className={`relative flex flex-col items-center justify-center pt-14 pb-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="mb-5 relative">
                    <div className="absolute inset-0 blur-2xl opacity-20"
                        style={{ background: 'radial-gradient(circle, #c8a97e, transparent)' }} />
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="relative z-10">
                        <circle cx="40" cy="40" r="37" stroke="url(#g1)" strokeWidth="1" opacity="0.6" />
                        <rect x="38.5" y="53" width="3" height="9" rx="1.5" fill="url(#g1)" />
                        <polygon points="40,16 53,36 27,36" fill="url(#g1)" />
                        <polygon points="40,24 55,42 25,42" fill="url(#g1)" opacity="0.7" />
                        <polygon points="40,32 57,52 23,52" fill="url(#g1)" opacity="0.45" />
                        <defs>
                            <linearGradient id="g1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#fff8ee" />
                                <stop offset="40%" stopColor="#c8a97e" />
                                <stop offset="100%" stopColor="#8a6030" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1 className="text-5xl font-bold tracking-[0.3em]"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, #fff8ee 0%, #c8a97e 40%, #a07850 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontFamily: 'Georgia, serif',
                    }}>
                    Tetra
                </h1>
                <p className="mt-2 text-xs tracking-[0.5em] uppercase" style={{ color: 'rgba(200,169,126,0.45)' }}>
                    Coffee House
                </p>
                <div className="mt-5 w-20 h-px" style={{ background: 'linear-gradient(90deg, transparent, #c8a97e, transparent)' }} />
            </div>

            {/* Fan Favorites */}
            {favorites.length > 0 && (
                <section className="px-4 py-6 max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">⭐</span>
                        <h2 className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c8a97e' }}>
                            Fan Favorites
                        </h2>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                        {favorites.map(p => (
                            <Link
                                key={p.id}
                                href={`/menu/${encodeURIComponent(p.category)}/${encodeURIComponent(p.name)}`}
                                className="flex-shrink-0 w-36 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
                                style={{ border: '1px solid rgba(200,169,126,0.15)', background: 'rgba(30,18,4,0.9)' }}
                            >
                                <div className="relative w-full h-24">
                                    <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                                </div>
                                <div className="p-2">
                                    <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                                    <p className="text-xs mt-0.5" style={{ color: '#c8a97e' }}>{p.price} EGP</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Trending */}
            {trending.length > 0 && (
                <section className="px-4 py-4 max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">🔥</span>
                        <h2 className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c8a97e' }}>
                            Trending Now
                        </h2>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                        {trending.map(p => (
                            <Link
                                key={p.id}
                                href={`/menu/${encodeURIComponent(p.category)}/${encodeURIComponent(p.name)}`}
                                className="flex-shrink-0 w-36 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
                                style={{ border: '1px solid rgba(200,169,126,0.15)', background: 'rgba(30,18,4,0.9)' }}
                            >
                                <div className="relative w-full h-24">
                                    <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                                </div>
                                <div className="p-2">
                                    <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                                    <p className="text-xs mt-0.5" style={{ color: '#c8a97e' }}>{p.price} EGP</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Divider */}
            <div className="max-w-2xl mx-auto px-4 my-4">
                <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,126,0.2), transparent)' }} />
            </div>

            {/* Categories */}
            <section className="px-4 py-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c8a97e' }}>
                        Our Menu
                    </h2>
                </div>
                <div className="space-y-3">
                    {CATEGORIES.map(cat => {
                        const catProducts = allProducts.filter(p => p.category === cat.name)
                        const preview = catProducts.slice(0, 3)
                        return (
                            <Link
                                key={cat.name}
                                href={`/menu/${encodeURIComponent(cat.name)}`}
                                className="flex items-center justify-between rounded-2xl p-4 transition-all duration-300 hover:scale-[1.01]"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(30,18,4,0.9), rgba(20,12,2,0.9))',
                                    border: '1px solid rgba(200,169,126,0.1)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{cat.icon}</span>
                                    <div>
                                        <p className="font-semibold text-white">{cat.name}</p>
                                        <p className="text-xs mt-0.5" style={{ color: 'rgba(200,169,126,0.4)' }}>
                                            {catProducts.length} items
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {preview.map(p => (
                                            <div key={p.id} className="relative w-8 h-8 rounded-full overflow-hidden border"
                                                style={{ borderColor: 'rgba(200,169,126,0.3)' }}>
                                                <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <span style={{ color: 'rgba(200,169,126,0.4)' }}>›</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>

            {/* Footer */}
            <div className="text-center py-10">
                <div className="w-16 h-px mx-auto mb-4"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,126,0.3), transparent)' }} />
                <p className="text-xs tracking-[0.4em]" style={{ color: 'rgba(200,169,126,0.2)' }}>
                    TETRA COFFEE HOUSE © 2026
                </p>
            </div>

        </main>
    )
}