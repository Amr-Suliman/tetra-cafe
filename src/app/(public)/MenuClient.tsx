'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/menu/Navbar'

const CATEGORIES = [
    {
        name: 'Hot Drinks',
        slug: 'hot-drinks',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
        ),
    },
    {
        name: 'Cold Drinks',
        slug: 'cold-drinks',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 7.9 7 7c-.29.9-1.14 1.68-2.29 2.55S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
            </svg>
        ),
    },
    {
        name: 'Desserts',
        slug: 'desserts',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a5 5 0 0 1 5 5c0 3-5 8-5 8S7 10 7 7a5 5 0 0 1 5-5z" />
                <path d="M3 20h18" />
                <path d="M5 20v-4a7 7 0 0 1 14 0v4" />
            </svg>
        ),
    },
]

const DUMMY_PRODUCTS: Product[] = [
    { id: '1', name: 'Cappuccino', description: 'Rich espresso with velvety steamed milk', price: 95, image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', category: 'Hot Drinks', subcategory: null, is_available: true, is_trending: true, is_favorite: true, created_at: '' },
    { id: '2', name: 'Cortado', description: 'Espresso cut with warm milk to reduce acidity', price: 90, image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400', category: 'Hot Drinks', subcategory: null, is_available: true, is_trending: false, is_favorite: false, created_at: '' },
    { id: '3', name: 'Latte', description: 'Smooth espresso with lots of steamed milk', price: 100, image_url: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400', category: 'Hot Drinks', subcategory: null, is_available: true, is_trending: true, is_favorite: false, created_at: '' },
    { id: '4', name: 'Ice Coffee', description: 'Cold brewed coffee over ice', price: 100, image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400', category: 'Cold Drinks', subcategory: null, is_available: true, is_trending: false, is_favorite: true, created_at: '' },
    { id: '5', name: 'Frappe', description: 'Blended iced coffee with whipped cream', price: 110, image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', category: 'Cold Drinks', subcategory: null, is_available: true, is_trending: true, is_favorite: true, created_at: '' },
    { id: '6', name: 'Milkshake', description: 'Creamy thick shake in various flavors', price: 115, image_url: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400', category: 'Cold Drinks', subcategory: null, is_available: true, is_trending: false, is_favorite: false, created_at: '' },
    { id: '7', name: 'Cheesecake', description: 'Creamy classic NY cheesecake', price: 120, image_url: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400', category: 'Desserts', subcategory: null, is_available: true, is_trending: true, is_favorite: true, created_at: '' },
]

const getProductHref = (p: Product) => {
    const cat = CATEGORIES.find(c => c.name === p.category)
    return `/menu/${cat?.slug ?? p.category.toLowerCase().replace(/ /g, '-')}/${p.name.toLowerCase().replace(/ /g, '-')}`
}

export default function MenuClient({ products }: { products: Product[] }) {
    const allProducts = products.length > 0 ? products : DUMMY_PRODUCTS
    const [visible, setVisible] = useState(false)

    const favorites = allProducts.filter(p => p.is_favorite === true)
    const trending = allProducts.filter(p => p.is_trending === true)

    useEffect(() => {
        setTimeout(() => setVisible(true), 100)
    }, [])

    return (
        <main className="min-h-screen text-white" style={{ background: 'var(--tetra-bg)' }}>

            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 70%)' }}
            />

            {/* Hero */}
            <div className={`relative flex flex-col items-center justify-center pt-14 pb-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="mb-5 relative">
                    <div className="absolute inset-0 blur-2xl opacity-20"
                        style={{ background: 'radial-gradient(circle, var(--tetra-gold), transparent)' }} />
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="relative z-10">
                        <circle cx="40" cy="40" r="37" stroke="url(#g1)" strokeWidth="1" opacity="0.6" />
                        <rect x="38.5" y="53" width="3" height="9" rx="1.5" fill="url(#g1)" />
                        <polygon points="40,16 53,36 27,36" fill="url(#g1)" />
                        <polygon points="40,24 55,42 25,42" fill="url(#g1)" opacity="0.7" />
                        <polygon points="40,32 57,52 23,52" fill="url(#g1)" opacity="0.45" />
                        <defs>
                            <linearGradient id="g1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#fef3dc" />
                                <stop offset="40%" stopColor="#d4a853" />
                                <stop offset="100%" stopColor="#8b6914" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1 className="text-5xl font-bold tracking-[0.3em]"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, var(--tetra-gold-light) 0%, var(--tetra-gold) 40%, var(--tetra-gold-dark) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontFamily: 'Georgia, serif',
                    }}>
                    Tetra
                </h1>
                <p className="mt-2 text-xs tracking-[0.5em] uppercase text-white/50">
                    Coffee House
                </p>
                <div className="mt-5 w-20 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--tetra-gold), transparent)' }} />
            </div>

            {/* Fan Favorites */}
            {favorites.length > 0 && (
                <section className="px-4 py-6 max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--tetra-gold)' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <h2 className="text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--tetra-gold)' }}>
                            Fan Favorites
                        </h2>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                        {favorites.map(p => (
                            <Link
                                key={p.id}
                                href={getProductHref(p)}
                                className="flex-shrink-0 w-36 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
                                style={{ border: '1px solid var(--tetra-border)', background: 'var(--tetra-bg-card)' }}
                            >
                                <div className="relative w-full h-24">
                                    <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                                </div>
                                <div className="p-2">
                                    <p className="text-xs font-semibold text-white/90 truncate">{p.name}</p>
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--tetra-gold)' }}>{p.price} EGP</p>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--tetra-gold)' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                        </svg>
                        <h2 className="text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--tetra-gold)' }}>
                            Trending Now
                        </h2>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                        {trending.map(p => (
                            <Link
                                key={p.id}
                                href={getProductHref(p)}
                                className="flex-shrink-0 w-36 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
                                style={{ border: '1px solid var(--tetra-border)', background: 'var(--tetra-bg-card)' }}
                            >
                                <div className="relative w-full h-24">
                                    <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                                </div>
                                <div className="p-2">
                                    <p className="text-xs font-semibold text-white/90 truncate">{p.name}</p>
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--tetra-gold)' }}>{p.price} EGP</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Divider */}
            <div className="max-w-2xl mx-auto px-4 my-4">
                <div className="h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--tetra-border), transparent)' }} />
            </div>

            {/* Categories */}
            <section className="px-4 py-4 max-w-2xl mx-auto">
                <h2 className="text-sm font-semibold tracking-widest uppercase mb-4"
                    style={{ color: 'var(--tetra-gold)' }}>
                    Our Menu
                </h2>
                <div className="space-y-3">
                    {CATEGORIES.map(cat => {
                        const catProducts = allProducts.filter(p => p.category === cat.name)
                        const preview = catProducts.slice(0, 3)
                        return (
                            <Link
                                key={cat.name}
                                href={`/menu/${cat.slug}`}
                                className="flex items-center justify-between rounded-2xl p-4 transition-all duration-300 hover:scale-[1.01]"
                                style={{
                                    background: 'var(--tetra-bg-card)',
                                    border: '1px solid var(--tetra-border)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{ background: 'var(--tetra-gold-subtle)', color: 'var(--tetra-gold)' }}>
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white/90">{cat.name}</p>
                                        <p className="text-xs mt-0.5 text-white/40">
                                            {catProducts.length} items
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {preview.map(p => (
                                            <div key={p.id} className="relative w-8 h-8 rounded-full overflow-hidden"
                                                style={{ border: '1.5px solid var(--tetra-bg)' }}>
                                                <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-white/30 text-lg">›</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>

            {/* Footer */}
            <div className="text-center py-10">
                <div className="w-16 h-px mx-auto mb-4"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--tetra-border), transparent)' }} />
                <p className="text-xs tracking-[0.4em] text-white/20">
                    TETRA COFFEE HOUSE © 2026
                </p>
            </div>

        </main>
    )
}