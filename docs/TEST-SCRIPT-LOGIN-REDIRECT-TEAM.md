# Test Script: Login Redirect to Team

## Objective
Verify that the sign-in flow routes users to `/team` after authentication and blocks unauthenticated access to protected routes.

## Scope
- Auth route behavior (`/auth/signin`)
- Protected route behavior (`/team`)
- Default authenticated destination (`/team`)

## Pre-conditions
- App is running (`pnpm run dev`)
- Valid user account exists
- Browser cache/session can be cleared

## Automated test command
Run from repository root:

```bash
pnpm run test:auth-flow
```

Expected outcome:
- Test file passes with 3/3 tests
- Redirect from `/auth/signin` to `/team` when `__session` cookie exists
- Redirect from `/team` to `/auth/signin?redirect=%2Fteam` when cookie is missing
- Access to `/team` is allowed when cookie exists

## Manual end-to-end steps
1. Open `/auth/signin` while signed out.
2. Enter valid credentials and submit.
3. Confirm browser navigates to `/team`.
4. Sign out.
5. Open `/team` directly in address bar.
6. Confirm redirect to `/auth/signin?redirect=%2Fteam`.
7. Sign in again.
8. Confirm redirect target resolves to `/team`.

## Manual expected results
- After successful login, active page is Team.
- Team nav item is visible in top navigation.
- Unauthenticated direct access to Team is blocked and redirected to sign-in.
