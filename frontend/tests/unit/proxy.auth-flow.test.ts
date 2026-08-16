import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from '@/proxy'

describe('auth flow proxy redirects', () => {
  it('redirects authenticated user from /auth/signin to /team', () => {
    const request = new NextRequest('http://localhost:3000/auth/signin', {
      headers: { cookie: '__session=fake-session-cookie' },
    })

    const response = proxy(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost:3000/team')
  })

  it('redirects unauthenticated user from /team to /auth/signin with redirect param', () => {
    const request = new NextRequest('http://localhost:3000/team')

    const response = proxy(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/auth/signin?redirect=%2Fteam'
    )
  })

  it('allows authenticated user to access /team', () => {
    const request = new NextRequest('http://localhost:3000/team', {
      headers: { cookie: '__session=fake-session-cookie' },
    })

    const response = proxy(request)

    expect(response.status).toBe(200)
    expect(response.headers.get('location')).toBeNull()
  })
})