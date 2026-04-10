'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

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

export default function MenuClient({ products }: { products: Product[] }) {
    const [visible, setVisible] = useState(false)

    const allProducts = products?.length > 0 ? products : []
    const favorites = allProducts.filter(p => p.is_favorite)

    useEffect(() => {
        setVisible(true)
    }, [])

    const getProductHref = (p: Product) => {
        const cat = CATEGORIES.find(c => c.name === p.category)
        const categorySlug = cat?.slug || p.category.toLowerCase().replace(/ /g, '-')
        const productSlug = p.name.toLowerCase().replace(/ /g, '-')
        return `/menu/${categorySlug}/${productSlug}`
    }

    return (
        <main className="min-h-screen pb-20 my text-white selection:bg-amber-500/30" style={{ background: '#090909' }}>

            {/* Ambient Background Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, #d4a853 0%, transparent 70%)' }} />

            {/* Header */}
            <header className={`relative pt-23 pb-15 text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <h1 className="text-6xl font-serif tracking-tighter italic">
                    Tetra<span className="text-amber-500 not-italic">.</span>
                </h1>
                <p className="mt-3 text-[10px] tracking-[0.6em] text-white/30 uppercase font-light">Artisan Coffee House</p>
                <div className="mt-6 w-12 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto" />
            </header>

            <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-20">

                {/* 1. Favorites Slider Section */}
                {favorites.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div>
                                <h2 className="text-xl font-light tracking-widest uppercase">Favorites</h2>
                                <p className="text-[10px] text-amber-500/60 uppercase tracking-[0.2em] mt-1">Our handcrafted picks</p>
                            </div>
                            <span className="text-[10px] text-white/20 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                                Swipe
                            </span>
                        </div>

                        <div
                            className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory hide-scrollbar"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {favorites.map((p) => (
                                <Link
                                    key={p.id}
                                    href={getProductHref(p)}
                                    className="flex-shrink-0 w-[300px] md:w-[380px] snap-center group"
                                >
                                    <div className="relative aspect-[16/10] rounded-[1.7rem] overflow-hidden border border-white/5 transition-all duration-500 group-hover:border-amber-500/30 shadow-2xl">
                                        <Image
                                            src={p.image_url}
                                            alt={p.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80" />

                                        <div className="absolute bottom-0 left-0 p-8 w-full">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <h3 className="text-2xl font-medium text-white mb-1">{p.name}</h3>
                                                    <p className="text-xs text-white/50 font-light line-clamp-1">{p.description}</p>
                                                </div>
                                                <div className="text-right font-serif">
                                                    <p className="text-amber-400 text-xl">{p.price}<span className="text-[10px] ml-1 opacity-50">EGP</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 2. Categories Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8 px-2">
                        <h2 className="text-xl font-light tracking-widest uppercase">The Menu</h2>
                        <div className="h-px flex-grow bg-white/5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {CATEGORIES.map(cat => (
                            <Link
                                key={cat.name}
                                href={`/menu/${cat.slug}`}
                                className="group relative flex items-center p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-amber-500/[0.03] hover:border-amber-500/20 transition-all duration-500 overflow-hidden"
                            >
                                {/* Animated background element on hover */}
                                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />

                                <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                                    {cat.icon}
                                </div>
                                <div className="ml-6 relative z-10">
                                    <h3 className="text-lg font-medium tracking-wide">{cat.name}</h3>
                                    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Explore Items</p>
                                </div>
                                <span className="ml-auto text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-amber-500">→</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Footer Signature */}
                <footer className="pt-20 pb-10 text-center">
                    <p className="text-[10px] tracking-[1em] text-white/10 uppercase italic">
                        Tetra Coffee Roasters &bull; 2026
                    </p>
                </footer>
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    )
}