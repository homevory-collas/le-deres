// app/(legal)/privacy/page.tsx
import { LegalPageTemplate } from '@/components/common/LegalPageTemplate'
export const metadata = { title: 'Privacy Policy' }
export default function PrivacyPage() {
  return <LegalPageTemplate title="Privacy Policy" subtitle="Legal" sections={[
    { heading: 'Data We Collect', body: 'We collect email, username and usage data necessary to operate the platform. Payment data is processed by our payment providers and never stored on our servers.' },
    { heading: 'How We Use Data', body: 'Your data is used to deliver our services, personalise your experience and communicate important updates. We never sell personal data to third parties.' },
    { heading: 'Data Retention', body: 'Account data is retained for the duration of your membership plus 30 days after deletion request. Transaction records may be kept for legal compliance up to 7 years.' },
    { heading: 'Your Rights', body: 'You have the right to access, correct or delete your data at any time. Requests can be made from your dashboard or by emailing privacy@ledesir.com.' },
    { heading: 'Cookies', body: 'We use essential cookies for authentication and analytics cookies to improve the platform. You can manage cookie preferences in your browser settings.' },
  ]} />
}
