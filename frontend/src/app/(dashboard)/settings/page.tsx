import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-zinc-300 text-sm mt-1">Manage your application settings.</p>
      </div>

      <div className="rounded-lg border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
        <p className="text-sm text-zinc-300">Settings will appear here.</p>
      </div>
    </div>
  )
}
