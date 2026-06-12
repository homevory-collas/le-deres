// app/(auth)/login/page.tsx
import Link from 'next/link'
import { Logo } from '@/components/common/Logo'

export const metadata = { title: 'Login' }

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/">
            <Logo size="lg" className="inline-block" />
          </Link>
          <p className="text-sm text-muted-foreground mt-3">Welcome back</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-muted-foreground">Password</label>
              <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90 transition-opacity mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          No account?{' '}
          <Link href="/register" className="text-foreground hover:underline">
            Create one
          </Link>
        </p>
        <p className="text-[10px] text-center text-muted-foreground mt-8">
          By signing in you confirm you are 18+ and agree to our{' '}
          <Link href="/terms" className="underline">Terms</Link> and{' '}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
