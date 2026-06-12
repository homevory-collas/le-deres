export interface NavItem {
  label:    string
  href:     string
  children?: NavItem[]
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  {
    label: 'Adult Ecosystem',
    href:  '/adult-ecosystem',
    children: [
      { label: 'European Collection', href: '/adult-ecosystem/european' },
      {
        label: 'Asian Collection',
        href:  '/adult-ecosystem/asian',
        children: [
          { label: 'JAV',     href: '/adult-ecosystem/asian/jav' },
          { label: 'Chinese', href: '/adult-ecosystem/asian/chinese' },
          { label: 'Korean',  href: '/adult-ecosystem/asian/korean' },
          { label: 'Asian',   href: '/adult-ecosystem/asian/general' },
        ],
      },
      {
        label: 'American Collection',
        href:  '/adult-ecosystem/american',
        children: [
          { label: 'USA',          href: '/adult-ecosystem/american/usa' },
          { label: 'Canada',       href: '/adult-ecosystem/american/canada' },
          { label: 'Latin America',href: '/adult-ecosystem/american/latin' },
        ],
      },
      { label: 'AI Girlfriend',        href: '/adult-ecosystem/ai-girlfriend' },
      { label: 'AI Video',             href: '/adult-ecosystem/ai-video' },
      { label: 'Trending Videos',      href: '/adult-ecosystem/trending' },
      { label: 'New Releases',         href: '/adult-ecosystem/new-releases' },
      { label: 'Influencer Collections',href: '/adult-ecosystem/influencer' },
      { label: 'Live Shows',           href: '/adult-ecosystem/live-shows' },
    ],
  },
  {
    label: 'RB Media Ecosystem',
    href:  '/rb-media',
    children: [
      { label: 'Overview',         href: '/rb-media' },
      { label: 'Projects',         href: '/rb-media/projects' },
      { label: 'Communities',      href: '/rb-media/communities' },
      { label: 'Technology',       href: '/rb-media/technology' },
      { label: 'Future Expansion', href: '/rb-media/expansion' },
    ],
  },
  {
    label: 'Marketplace',
    href:  '/marketplace',
    children: [
      { label: 'Luxury Lingerie',     href: '/marketplace/lingerie' },
      { label: 'Premium Fragrances',  href: '/marketplace/fragrances' },
      { label: 'Adult Wellness',      href: '/marketplace/wellness' },
      { label: 'Couples Products',    href: '/marketplace/couples' },
      { label: 'Lifestyle Accessories',href: '/marketplace/lifestyle' },
      { label: 'Gift Collections',    href: '/marketplace/gifts' },
      { label: 'Premium Dolls',       href: '/marketplace/dolls' },
    ],
  },
  {
    label: 'LE DÉSIR Society',
    href:  '/community',
    children: [
      { label: 'Feed',         href: '/community/feed' },
      { label: 'Groups',       href: '/community/groups' },
      { label: 'Discussions',  href: '/community/discussions' },
      { label: 'Events',       href: '/community/events' },
      { label: 'Messages',     href: '/community/messages' },
    ],
  },
  { label: 'Partner Brands', href: '/partner-brands' },
  { label: 'FAQ',            href: '/faq' },
  { label: 'Contact',        href: '/contact' },
]

export const FOOTER_NAV = {
  company: [
    { label: 'About',          href: '/about' },
    { label: 'RB Media Ecosystem', href: '/rb-media' },
    { label: 'Partner Brands', href: '/partner-brands' },
    { label: 'Contact',        href: '/contact' },
  ],
  marketplace: [
    { label: 'All Products',   href: '/marketplace' },
    { label: 'Lingerie',       href: '/marketplace/lingerie' },
    { label: 'Fragrances',     href: '/marketplace/fragrances' },
    { label: 'Wellness',       href: '/marketplace/wellness' },
  ],
  community: [
    { label: 'LE DÉSIR Society', href: '/community' },
    { label: 'Membership',       href: '/membership' },
    { label: 'FAQ',              href: '/faq' },
  ],
  policies: [
    { label: 'Privacy Policy',        href: '/privacy' },
    { label: 'Terms of Service',      href: '/terms' },
    { label: 'Shipping Policy',       href: '/shipping' },
    { label: 'Return & Exchange',     href: '/returns' },
    { label: 'Refund Policy',         href: '/refunds' },
    { label: 'Community Guidelines',  href: '/community-guidelines' },
    { label: 'Age Verification',      href: '/age-verification' },
    { label: 'Marketplace Policy',    href: '/marketplace-policy' },
  ],
  social: [
    { label: 'Telegram',  href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'X',         href: '#' },
    { label: 'Discord',   href: '#' },
    { label: 'Reddit',    href: '#' },
  ],
}
