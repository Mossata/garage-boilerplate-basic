'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { signupSchema, type SignupInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignUpPage() {
  const router = useRouter()
  const { user, loading, signUpWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (!loading && !isSubmitting && user) {
      router.replace('/dashboard')
    }
  }, [loading, isSubmitting, user, router])

  if (loading) return <FullPageSpinner />

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  const onSubmit = async (data: SignupInput) => {
    try {
      await signUpWithEmail(data.email, data.password, data.displayName)
      router.push('/auth/signin?verification=sent')
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        toast.error('An account with this email already exists')
      } else {
        toast.error('Failed to create account. Please try again.')
      }
    }
  }
return (
  <div className="min-h-screen flex bg-[#020817] text-white">

    {/* LEFT SIDE */}
    <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative overflow-hidden bg-[#020817]">

      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="ChainGuard Logo"
            width={150}
            height={150}
          />

          <div>
            <h1 className="text-5xl font-bold">
              Chain
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Guard
              </span>
            </h1>

            <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-blue-400 mt-2 rounded-full" />

            <p className="text-xs tracking-[0.4em] text-zinc-500 uppercase mt-4">
              Blockchain Security Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Hero Text */}
      <div className="max-w-xl relative z-10">
        <h2 className="text-6xl font-bold leading-tight">
          Secure your
          <br />
          blockchain
          <br />
          <span className="bg-gradient-to-r from-[#5E61E4] to-blue-400 bg-clip-text text-transparent">
            journey.
          </span>
        </h2>

        <p className="mt-8 text-lg text-zinc-400 leading-relaxed">
          Create your ChainGuard account and start analysing wallets,
          tokens and blockchain transactions with evidence-based
          security insights.
        </p>
      </div>

      {/* Background Glow */}
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
    <div className="hidden lg:block w-px bg-gradient-to-b from-[#162033] to-[#080C17]" />


    {/* RIGHT SIDE */}
    <div className="flex w-full lg:flex-1 items-center justify-center p-8 bg-[#0B1220]">

      {/* SIGN UP CARD */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-[#172133] via-[#0F1726] to-[#080C17] p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Create your account
          </h1>

          <p className="mt-2 text-zinc-400">
            Get started with ChainGuard
          </p>
        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label
              htmlFor="displayName"
              className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase"
            >
              Name
            </label>

            <input
              id="displayName"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={!!errors.displayName}
              aria-describedby={
                errors.displayName
                  ? "display-name-error"
                  : undefined
              }
              {...register("displayName")}
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

            {errors.displayName && (
              <p
                id="display-name-error"
                className="mt-2 text-sm text-red-400"
                role="alert"
              >
                {errors.displayName.message}
              </p>
            )}
          </div>


          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email
                  ? "email-error"
                  : undefined
              }
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
              <p
                id="email-error"
                className="mt-2 text-sm text-red-400"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>


          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••••••"
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password
                  ? "password-error"
                  : undefined
              }
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
              <p
                id="password-error"
                className="mt-2 text-sm text-red-400"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>


          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••••••"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword
                  ? "confirm-password-error"
                  : undefined
              }
              {...register("confirmPassword")}
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

            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="mt-2 text-sm text-red-400"
                role="alert"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>


          {/* Create Account Button */}
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
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isSubmitting
              ? "Creating account..."
              : "Create Account"}
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
          type="button"
          onClick={handleGoogleSignIn}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
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
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>

          Continue with Google
        </button>


        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Sign in
          </Link>
        </p>

        <div className="mt-8 text-center text-xs text-zinc-500">
          Protected access • RMIT Project
        </div>

      </div>
    </div>

  </div>
)}