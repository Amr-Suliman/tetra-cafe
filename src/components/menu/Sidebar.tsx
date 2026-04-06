'use client'

import Link from 'next/link'
import { useEffect } from 'react'

const CATEGORIES = [
    {
        name: 'Hot Drinks',
        slug: 'hot-drinks',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
        )
    },
    {
        name: 'Cold Drinks',
        slug: 'cold-drinks',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 22h2a2 2 0 0 0 2-2V5H9v15a2 2 0 0 0 2 2Z" />
                <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z" />
                <path d="M11 10h2" />
                <path d="M11 14h2" />
            </svg>
        )
    },
    {
        name: 'Desserts',
        slug: 'desserts',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="2" />
                <path d="M5 15.9a10 10 0 0 1 14 0" />
                <path d="M4.3 21h15.4a1 1 0 0 0 .8-1.5l-2.2-3.6a1 1 0 0 0-.8-.4H6.5a1 1 0 0 0-.8.4l-2.2 3.6a1 1 0 0 0 .8 1.5Z" />
            </svg>
        )
    },
]

const LINKS = [
    { name: 'Explore Menu', href: '/menu' },
    { name: 'Fan Favorites', href: '/menu#favorites' },
    { name: 'Trending Now', href: '/menu#trending' },
]

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    return (
        <>
            <div
                className={`fixed inset-0 z-[60] transition-all duration-700 ${isOpen ? 'opacity-100 backdrop-blur-md' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ background: 'rgba(0,0,0,0.8)' }}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <div
                className={`fixed top-0 right-0 h-full z-[70] w-[75%] max-w-[340px] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out border-l border-white/5`}
                style={{
                    background: '#090909',
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                }}
            >
                {/* Decorative Background Glow */}
                <div className="absolute top-0 right-0 w-full h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />

                {/* Content Wrapper */}
                <div className="relative flex flex-col h-full z-10">

                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-8 border-b border-white/5">
                        <div className="flex flex-col">
                            <span className="text-2xl font-serif italic tracking-tighter text-white">
                                Tetra<span className="text-amber-500 not-italic">.</span>
                            </span>
                            <span className="text-[8px] tracking-[0.4em] text-white/20 uppercase">House of Roasters</span>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                        >
                            <span className="text-sm">✕</span>
                        </button>
                    </div>

                    {/* Links Section */}
                    <div className="flex-1 overflow-y-auto px-6 py-10 hide-scrollbar">

                        {/* Main Navigation */}
                        <div className="mb-12">
                            <p className="text-[10px] tracking-[0.5em] text-white/20 mb-6 px-4 uppercase font-bold">Main Store</p>
                            <nav className="space-y-1">
                                {LINKS.map(link => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={onClose}
                                        className="group flex items-center justify-between py-4 px-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]"
                                    >
                                        <span className="text-lg font-light text-white/70 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                                            {link.name}
                                        </span>
                                        <span className="text-amber-500/0 group-hover:text-amber-500/100 transition-all text-xs">→</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Categories */}
                        <div>
                            <p className="text-[10px] tracking-[0.5em] text-white/20 mb-6 px-4 uppercase font-bold">Categories</p>
                            <div className="grid grid-cols-1 gap-2">
                                {CATEGORIES.map(cat => (
                                    <Link
                                        key={cat.name}
                                        href={`/menu/${cat.slug}`}
                                        onClick={onClose}
                                        className="flex items-center gap-4 py-4 px-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-amber-500/[0.05] hover:border-amber-500/20 transition-all group"
                                    >
                                        <span className="text-amber-500 group-hover:scale-110 transition-transform duration-300">
                                            {cat.icon}
                                        </span>

                                        <span className="font-medium text-white/60 group-hover:text-white transition-colors">
                                            {cat.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Branding */}
                    <div className="p-8 border-t border-white/5">
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/10">
                            <p className="text-[10px] text-amber-500/80 leading-relaxed tracking-wide italic">
                                "Every cup tells a story of craftsmanship and passion."
                            </p>
                        </div>
                        <p className="mt-8 text-[8px] tracking-[0.8em] text-center text-white/10 uppercase">
                            Est. 2026 &bull; Tetra
                        </p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </>
    )
}