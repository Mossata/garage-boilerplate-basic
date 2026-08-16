# Test Report: Login Redirect to Team

## Report metadata
- Date: 2026-08-16
- Project: garage-boilerplate-basic
- Tester: GitHub Copilot (automated run)
- Test target: login -> redirect -> team flow

## Artifacts under test
- Test file: `frontend/tests/unit/proxy.auth-flow.test.ts`
- Script (frontend): `frontend/package.json` -> `test:auth-flow`
- Script (root): `package.json` -> `test:auth-flow`
- Redirect logic: `frontend/src/proxy.ts`

## Execution command
```bash
pnpm run test:auth-flow
```

## Execution summary
- Status: PASS
- Test files: 1 passed
- Tests: 3 passed, 0 failed
- Duration: 25.88s

## Detailed results
1. `redirects authenticated user from /auth/signin to /team`
- Result: PASS
- Verified behavior: authenticated auth-route access redirects to Team

2. `redirects unauthenticated user from /team to /auth/signin with redirect param`
- Result: PASS
- Verified behavior: protected Team route enforces sign-in with redirect hint

3. `allows authenticated user to access /team`
- Result: PASS
- Verified behavior: authenticated Team access is not redirected

## Conclusion
The implemented redirect path for `login -> team` is working according to expected route-guard behavior.

## Notes
This report validates redirect mechanics at the proxy layer. For full browser verification (form submit and post-login rendering), run the manual steps in:
- `docs/TEST-SCRIPT-LOGIN-REDIRECT-TEAM.md`
