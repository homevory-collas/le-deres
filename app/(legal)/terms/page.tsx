import { LegalPageTemplate } from '@/components/common/LegalPageTemplate'
export const metadata = { title: 'Terms of Service' }
export default function TermsPage() {
  return <LegalPageTemplate title="Terms of Service" subtitle="Legal" sections={[
    { heading: 'Age Requirement', body: 'You must be 18 years of age or older, and of legal age to access adult content in your jurisdiction, to use LE DÉSIR. By creating an account you confirm this.' },
    { heading: 'Account Responsibility', body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.' },
    { heading: 'Content Policy', body: 'All content on LE DÉSIR is provided for personal, private use only. Redistribution, sharing or commercial use of any content is strictly prohibited.' },
    { heading: 'Marketplace', body: 'All marketplace purchases are subject to our Marketplace Policy, Shipping Policy and Return Policy.' },
    { heading: 'Termination', body: 'We reserve the right to suspend or terminate accounts that violate these terms, with or without notice.' },
    { heading: 'Governing Law', body: 'These terms are governed by the laws of the European Union. Disputes shall be resolved in the jurisdiction of the platform operator.' },
  ]} />
}
