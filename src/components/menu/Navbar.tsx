'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Sidebar from './Sidebar'

export default function Navbar({ showBack, backHref }: { showBack?: boolean; backHref?: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // تأثير بسيط لما المستحدم ينزل لتحت الخلفية تتقل شوية
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'
        }`}
      >
        {/* Left Section: Back Button or Logo */}
        <div className="flex items-center gap-4">
          {showBack && backHref && (
            <Link 
              href={backHref} 
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500 group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          
          <Link href="/menu" className="flex flex-col items-start group">
            <span
              className="text-xl font-serif tracking-[0.2em] italic"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fff 0%, #d4a853 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Tetra<span className="text-amber-500 not-italic">.</span>
            </span>
            <span className="text-[7px] tracking-[0.5em] text-white/30 uppercase -mt-1 group-hover:text-amber-500/50 transition-colors">
              Coffee House
            </span>
          </Link>
        </div>

        {/* Right Section: Modern Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="group relative w-12 h-12 flex flex-col items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300"
        >
          <div className="flex flex-col items-end gap-1.5">
            <span className="block w-6 h-[1.5px] bg-amber-500 transition-all group-hover:w-4" />
            <span className="block w-4 h-[1.5px] bg-white transition-all group-hover:w-6" />
          </div>
          
          <span className="absolute inset-0 rounded-full bg-amber-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="h-20" />
    </>
  )
}