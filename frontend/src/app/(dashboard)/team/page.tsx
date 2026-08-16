import type { Metadata } from 'next'
import { UserRound } from 'lucide-react'

const topRowMembers = [
  {
    name: 'Kevin Cai',
    role: 'PM',
    blurb: 'Coordinates the team, tasks, and project delivery.',
  },
  {
    name: 'Nathaniel Shelton',
    role: 'Dev',
    blurb: 'Builds and implements the system.',
  },
  {
    name: 'Valentino Osorio Schwarz',
    role: 'Dev',
    blurb: 'Builds and implements the system.',
  },
] as const

const bottomRowMembers = [
  {
    name: 'Nathaniel Kong',
    role: 'UX',
    blurb: 'Designs clear and intuitive user experiences.',
  },
  {
    name: 'Rajvir Singh',
    role: 'BA',
    blurb: 'Defines requirements and project needs.',
  },
] as const

export const metadata: Metadata = {
  title: 'Team',
}

export default function TeamPage() {
  return (
    <div className="relative min-h-screen w-full text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center pt-2 sm:pt-3 lg:pt-4">
        <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Meet the{' '}
          <span className="bg-gradient-to-r from-[#5E61E4] to-blue-400 bg-clip-text text-transparent">
            ChainGuard
          </span>{' '}
          Team
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-relaxed font-bold text-zinc-300 sm:text-lg">
          ChainGuard is a blockchain scam-detection assistant that analyses wallets, tokens, and
          transactions.
        </p>
      </div>

      <section className="mx-auto mt-10 w-full max-w-6xl px-6 pb-28 sm:mt-14 lg:px-10">
        <div className="grid grid-cols-1 justify-items-center gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {topRowMembers.map((member) => (
            <article key={member.name} className="w-[170px]">
              <div className="flex h-[140px] w-[140px] items-center justify-center bg-zinc-100">
                <UserRound className="h-20 w-20 text-zinc-400" strokeWidth={1.4} />
              </div>
              <h3 className="mt-3 text-[18px] font-semibold leading-tight tracking-[-0.02em] text-white">
                {member.name} - {member.role}
              </h3>
              <p className="mt-2 text-sm leading-tight text-zinc-300">{member.blurb}</p>
            </article>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-1 justify-items-center gap-x-12 gap-y-10 sm:grid-cols-2 sm:justify-center">
          {bottomRowMembers.map((member) => (
            <article key={member.name} className="w-[170px]">
              <div className="flex h-[140px] w-[140px] items-center justify-center bg-zinc-100">
                <UserRound className="h-20 w-20 text-zinc-400" strokeWidth={1.4} />
              </div>
              <h3 className="mt-3 text-[18px] font-semibold leading-tight tracking-[-0.02em] text-white">
                {member.name} - {member.role}
              </h3>
              <p className="mt-2 text-sm leading-tight text-zinc-300">{member.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      

      <div className="fixed bottom-6 left-6 z-20 text-sm text-white">
        <span className="text-[#5E61E4]">RMIT University</span> • Capstone Project
      </div>
    </div>
  )
}
