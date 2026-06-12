import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/lib/i18n/context'

export const metadata: Metadata = {
  title: {
    default:  'LE DÉSIR — Private. Elegant. Personal.',
    template: '%s | LE DÉSIR',
  },
  description:
    'LE DÉSIR is a premium AI companion, creator community, video discovery and lifestyle marketplace platform.',
  keywords: ['le desir', 'premium', 'lifestyle', 'luxury', 'marketplace'],
  robots: { index: false, follow: false }, // flip to true after launch
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
