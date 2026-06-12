import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { FOOTER_NAV } from '@/constants/navigation'
import { LanguageFlagsRow } from '@/components/i18n/LanguageSwitcher'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-wide section-padding">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo className="mb-4" />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Private. Elegant. Personal.<br />
              A premium platform for the discerning.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Powered by RB Media Ecosystem
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-4">Company</h4>
            <ul className="space-y-2">
              {FOOTER_NAV.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-4">Marketplace</h4>
            <ul className="space-y-2">
              {FOOTER_NAV.marketplace.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-4">Policies</h4>
            <ul className="space-y-2">
              {FOOTER_NAV.policies.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-4">Follow</h4>
            <ul className="space-y-2">
              {FOOTER_NAV.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Language Flags ── */}
        <div className="border-t border-border pt-6 pb-2">
          <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3">Available In</p>
          <LanguageFlagsRow />
        </div>

        {/* ── Payment badges ── */}
        <div className="border-t border-border pt-8 mb-8">
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Accepted Payments</p>
          <div className="flex gap-3 flex-wrap">
            {['PayPal', 'Visa', 'Mastercard', 'USDT'].map((method) => (
              <span
                key={method}
                className="text-xs px-3 py-1.5 border border-border rounded-sm text-muted-foreground"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} LE DÉSIR. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Adults 18+ only. Must be of legal age in your jurisdiction.
          </p>
        </div>
      </div>
    </footer>
  )
}
