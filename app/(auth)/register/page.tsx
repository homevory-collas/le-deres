import Link from 'next/link'
import { Logo } from '@/components/common/Logo'

export const metadata = { title: 'Create Account' }

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/">
            <Logo size="lg" className="inline-block" />
          </Link>
          <p className="text-sm text-muted-foreground mt-3">Create your account</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Username</label>
            <input
              type="text"
              name="username"
              autoComplete="username"
              className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
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
            <label className="block text-xs text-muted-foreground mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          {/* Age verification */}
          <div className="border border-border rounded-sm p-4 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="ageVerified" className="mt-0.5 accent-foreground" required />
              <span className="text-xs text-muted-foreground">
                I confirm I am <strong className="text-foreground">18 years of age or older</strong> and
                of legal age in my jurisdiction to access adult content.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="terms" className="mt-0.5 accent-foreground" required />
              <span className="text-xs text-muted-foreground">
                I agree to the{' '}
                <Link href="/terms" className="text-foreground underline">Terms of Service</Link> and{' '}
                <Link href="/privacy" className="text-foreground underline">Privacy Policy</Link>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-foreground hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
