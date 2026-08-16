'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/team')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/team')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

return (
  <div className="min-h-screen flex bg-[#020817] text-white">
    <div className="hidden lg:flex flex-col justify-center px-20 relative overflow-hidden bg-[#020817]">

      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="ChainGuard Logo"
            width={150}
            height={150}
          />
        </div>
      </div>

      {/* Hero Text */}
      <div className="max-w-xl relative z-10">
        <h2 className="text-6xl font-bold leading-tight">
          Detect blockchain
          <br />
          threats with
          <br />
          <span className="bg-gradient-to-r from-[#5E61E4] to-blue-400 bg-clip-text text-transparent">
            confidence.
          </span>
        </h2>

        <p className="mt-8 text-lg text-zinc-400 leading-relaxed">
          ChainGuard is a configurable AI assistant that analyses wallets,
          tokens, and blockchain transactions to provide evidence-based scam
          detection through a unified interface.
        </p>

        {/* Background graphic */}
        <Image
          src="/stars.png"
          alt=""
          width={700}
          height={400}
          className="mt-8 opacity-60"
        />
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_45%)]" />

      {/* Footer */}
      <div className="absolute bottom-10 left-20 text-sm text-white">
        <span className="text-[#5E61E4]">
          RMIT University
        </span>{" "}
        • Capstone Project
      </div>
    </div>


    {/* VERTICAL DIVIDER */}
    <div className="hidden lg:block w-px bg-white/5" />


    {/* RIGHT SIDE */}
    <div className="flex w-full lg:flex-1 items-center justify-center p-8 bg-[#0B1220]">

      {/* LOGIN CARD */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-[#172133] via-[#0F1726] to-[#080C17] p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back
          </h1>

          <p className="mt-2 text-zinc-400">
            Sign in to access ChainGuard
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Email
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0F172A]
                px-4
                py-3
                text-white
                placeholder:text-zinc-500
                outline-none
                transition
                focus:border-cyan-400
              "
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>


          {/* Password */}
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••••••"
              {...register("password")}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0F172A]
                px-4
                py-3
                text-white
                placeholder:text-zinc-500
                outline-none
                transition
                focus:border-cyan-400
              "
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>


          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
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
              disabled:opacity-50
            "
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>


        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-white/10" />

          <span className="px-4 text-xs uppercase text-zinc-500">
            Or
          </span>

          <div className="flex-1 border-t border-white/10" />
        </div>


        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="
            w-full
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
          Continue with Google
        </button>


        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Create one
          </Link>
        </p>

        <div className="mt-8 text-center text-xs text-zinc-500">
          Protected access • RMIT Project
        </div>

      </div>
    </div>

  </div>
)}