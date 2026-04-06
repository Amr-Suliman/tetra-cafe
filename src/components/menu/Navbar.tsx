'use client'

import { useState } from 'react'
import Link from 'next/link'
import Sidebar from './Sidebar'

export default function Navbar({ showBack, backHref }: { showBack?: boolean; backHref?: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <nav
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-5"
        style={{
          background: 'rgba(10,6,0,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(200,169,126,0.1)',
        }}>
        {/* Left - Back + Logo */}
        <div className="flex items-center gap-3">
          {showBack && backHref && (
            <Link href={backHref} className="text-[#c8a97e] hover:opacity-70 transition-opacity text-lg">
              ←
            </Link>
          )}
          <Link href="/menu" className="flex flex-col items-start">
            <span
              className="text-lg font-bold tracking-[0.3em]"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fff8ee 0%, #c8a97e 40%, #a07850 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'Georgia, serif',
              }}
            >
              TETRA
            </span>
            <span className="text-[8px] tracking-[0.4em]" style={{ color: 'rgba(200,169,126,0.4)' }}>
              COFFEE HOUSE
            </span>
          </Link>
        </div>

        {/* Right - Hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 flex flex-col items-center justify-center"
          style={{ gap: '5px' }}
        >
          <span className="block rounded-full" style={{ width: '20px', height: '1.5px', background: '#c8a97e' }} />
          <span className="block rounded-full" style={{ width: '20px', height: '1.5px', background: '#c8a97e' }} />
          <span className="block rounded-full" style={{ width: '20px', height: '1.5px', background: '#c8a97e' }} />
        </button>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}