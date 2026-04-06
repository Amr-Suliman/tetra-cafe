export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--tetra-bg)' }}>
      <div className="flex flex-col items-center gap-4">
        <svg width="50" height="50" viewBox="0 0 80 80" fill="none" className="animate-pulse">
          <circle cx="40" cy="40" r="37" stroke="url(#lg1)" strokeWidth="1" opacity="0.6" />
          <rect x="38.5" y="53" width="3" height="9" rx="1.5" fill="url(#lg1)" />
          <polygon points="40,16 53,36 27,36" fill="url(#lg1)" />
          <polygon points="40,24 55,42 25,42" fill="url(#lg1)" opacity="0.7" />
          <polygon points="40,32 57,52 23,52" fill="url(#lg1)" opacity="0.45" />
          <defs>
            <linearGradient id="lg1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef3dc" />
              <stop offset="40%" stopColor="#d4a853" />
              <stop offset="100%" stopColor="#8b6914" />
            </linearGradient>
          </defs>
        </svg>
        <p className="text-xs tracking-[0.4em] uppercase animate-pulse"
          style={{ color: 'var(--tetra-gold-muted)' }}>
          Loading...
        </p>
      </div>
    </main>
  )
}