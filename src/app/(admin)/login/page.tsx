'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/db'

const supabase = createSupabaseBrowserClient()

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    router.refresh()
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-[#1a1008] flex items-center justify-center">
      <div className="bg-[#2a1f0f] p-8 rounded-2xl w-full max-w-sm shadow-xl">
        <h1 className="text-2xl font-bold text-[#c8a97e] mb-6 text-center">
          Admin Login
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1a1008] border border-[#c8a97e33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c8a97e]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1a1008] border border-[#c8a97e33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c8a97e]"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#c8a97e] text-black py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </main>
  )
}