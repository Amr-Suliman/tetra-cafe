'use client'

import Link from 'next/link'
import { useEffect } from 'react'

const CATEGORIES = [
  { name: 'Hot Drinks', icon: '☕', href: '/menu/Hot Drinks' },
  { name: 'Cold Drinks', icon: '🧊', href: '/menu/Cold Drinks' },
  { name: 'Desserts', icon: '🍰', href: '/menu/Desserts' },
]

const LINKS = [
  { name: 'Menu', href: '/menu' },
  { name: 'Fan Favorites', href: '/menu#favorites' },
  { name: 'Trending', href: '/menu#trending' },
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
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: isOpen ? 'blur(4px)' : 'none',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
        }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className="fixed top-0 right-0 h-full z-50 w-72 flex flex-col transition-transform duration-500"
        style={{
          background: 'linear-gradient(180deg, #0f0800 0%, #0a0600 100%)',
          borderLeft: '1px solid rgba(200,169,126,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6"
          style={{ borderBottom: '1px solid rgba(200,169,126,0.1)' }}>
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="37" stroke="url(#sg1)" strokeWidth="1.5" opacity="0.6" />
              <rect x="38.5" y="53" width="3" height="9" rx="1.5" fill="url(#sg1)" />
              <polygon points="40,16 53,36 27,36" fill="url(#sg1)" />
              <polygon points="40,24 55,42 25,42" fill="url(#sg1)" opacity="0.7" />
              <polygon points="40,32 57,52 23,52" fill="url(#sg1)" opacity="0.45" />
              <defs>
                <linearGradient id="sg1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fff8ee" />
                  <stop offset="40%" stopColor="#c8a97e" />
                  <stop offset="100%" stopColor="#8a6030" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <p className="text-sm font-bold tracking-widest"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #fff8ee, #c8a97e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Georgia, serif',
                }}>
                TETRA
              </p>
              <p className="text-[9px] tracking-widest" style={{ color: 'rgba(200,169,126,0.4)' }}>
                COFFEE HOUSE
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#c8a97e] hover:opacity-70 transition-opacity text-xl">
            ✕
          </button>
        </div>

        {/* Links */}
        <div className="px-6 py-6 flex-1">
          <p className="text-[10px] tracking-[0.3em] mb-4" style={{ color: 'rgba(200,169,126,0.3)' }}>
            NAVIGATE
          </p>
          <div className="space-y-2 mb-8">
            {LINKS.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="block py-3 px-4 rounded-xl transition-all duration-200 hover:bg-[#1a1008]"
                style={{ color: 'rgba(200,169,126,0.7)' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <p className="text-[10px] tracking-[0.3em] mb-4" style={{ color: 'rgba(200,169,126,0.3)' }}>
            CATEGORIES
          </p>
          <div className="space-y-2">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                href={`/menu/${encodeURIComponent(cat.name)}`}
                onClick={onClose}
                className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-[#1a1008]"
                style={{ color: 'rgba(200,169,126,0.7)' }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6" style={{ borderTop: '1px solid rgba(200,169,126,0.08)' }}>
          <p className="text-[10px] tracking-widest text-center" style={{ color: 'rgba(200,169,126,0.2)' }}>
            TETRA COFFEE HOUSE © 2026
          </p>
        </div>
      </div>
    </>
  )
}