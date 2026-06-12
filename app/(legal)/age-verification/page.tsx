// app/(legal)/age-verification/page.tsx
import { LegalPageTemplate } from '@/components/common/LegalPageTemplate'
export const metadata = { title: 'Age Verification Policy' }
export default function AgeVerificationPage() {
  return <LegalPageTemplate title="Age Verification" subtitle="Legal" sections={[
    { heading: 'Requirement', body: 'LE DÉSIR is an adults-only platform. All users must be 18 years of age or older. By registering you confirm your age.' },
    { heading: 'Verification Process', body: 'We may require additional age verification at any time. Failure to verify age will result in account suspension.' },
    { heading: 'Parental Controls', body: 'We strongly encourage parents to use parental control software to prevent minors from accessing adult content online.' },
  ]} />
}
