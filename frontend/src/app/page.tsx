import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home',
  description: 'ChainGuard Landing Page',
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_45%)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg" />

          <div>
            <h1 className="text-4xl font-bold">
              Chain<span className="text-blue-500">Guard</span>
            </h1>

            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
              Blockchain Security Assistant
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-4xl text-center">
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Secure your
            <br />
            blockchain
            <br />
            <span className="text-blue-500">journey.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400 leading-relaxed">
            Analyse wallets, tokens and blockchain transactions with
            evidence-based security insights powered by ChainGuard.
          </p>
        </div>

        {/* CTA Card */}
        <div className="mt-12 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.15)] p-8">
          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-r
                from-indigo-500
                via-blue-500
                to-cyan-400
                py-3
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
            >
              Sign In
            </Link>

            <Link
              href="/auth/signup"
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                py-3
                font-medium
                transition
                hover:bg-white/10
              "
            >
              Create Account
            </Link>
          </div>

          <div className="mt-8 text-center text-xs text-zinc-500">
            Protected access • RMIT Capstone Project
          </div>
        </div>
      </div>
    </main>
  )
}