import type { Metadata } from 'next'
import { getServerSession } from '@/actions/auth.actions'

export const metadata: Metadata = {
  title: 'Profile',
}

export default async function ProfilePage() {
  const session = await getServerSession()

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-zinc-300">Manage your account details.</p>
      </div>

      <div className="space-y-4 rounded-lg border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
        <div>
          <p className="text-xs font-medium tracking-wide text-zinc-300 uppercase">Email</p>
          <p className="mt-1 text-sm">{session?.email ?? '—'}</p>
        </div>
      </div>
    </div>
  )
}
