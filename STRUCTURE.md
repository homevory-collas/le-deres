# LE DÉSIR — Project Structure

```
ledesir/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (main)/                   # Main layout group
│   │   ├── about/
│   │   ├── adult-ecosystem/
│   │   │   ├── european/
│   │   │   ├── asian/
│   │   │   │   ├── jav/
│   │   │   │   ├── chinese/
│   │   │   │   ├── korean/
│   │   │   │   └── asian/
│   │   │   ├── american/
│   │   │   │   ├── usa/
│   │   │   │   ├── canada/
│   │   │   │   └── latin/
│   │   │   ├── ai-girlfriend/
│   │   │   ├── ai-video/
│   │   │   ├── trending/
│   │   │   ├── new-releases/
│   │   │   ├── influencer/
│   │   │   └── live-shows/
│   │   ├── marketplace/
│   │   │   ├── lingerie/
│   │   │   ├── fragrances/
│   │   │   ├── wellness/
│   │   │   ├── couples/
│   │   │   ├── lifestyle/
│   │   │   ├── gifts/
│   │   │   ├── dolls/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   └── orders/
│   │   ├── community/
│   │   │   ├── feed/
│   │   │   ├── groups/
│   │   │   ├── discussions/
│   │   │   ├── events/
│   │   │   └── messages/
│   │   ├── membership/
│   │   ├── rb-media/
│   │   ├── partner-brands/
│   │   ├── faq/
│   │   └── contact/
│   ├── (dashboard)/              # User dashboard group
│   │   └── dashboard/
│   ├── (legal)/                  # Legal pages group
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── community-guidelines/
│   │   ├── age-verification/
│   │   ├── content-policy/
│   │   └── cookies/
│   ├── (policies)/               # Marketplace policies
│   │   ├── shipping/
│   │   ├── returns/
│   │   ├── refunds/
│   │   └── marketplace-policy/
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── users/
│   │   ├── content/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── community/
│   │   ├── membership/
│   │   └── payments/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   ├── ui/                       # Shadcn components
│   ├── common/                   # Shared components
│   │   ├── Logo.tsx
│   │   ├── PageHero.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ContentCard.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CategoryCard.tsx
│   │   └── PlaceholderImage.tsx
│   ├── homepage/
│   ├── adult-ecosystem/
│   ├── marketplace/
│   ├── community/
│   ├── membership/
│   └── dashboard/
├── lib/
│   ├── db.ts                     # Prisma client
│   ├── auth.ts                   # Auth placeholder
│   ├── storage.ts                # Storage placeholder
│   ├── payments.ts               # Payment placeholder
│   └── utils.ts
├── types/
│   ├── index.ts
│   ├── content.ts
│   ├── product.ts
│   ├── user.ts
│   └── community.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── useMembership.ts
├── constants/
│   ├── navigation.ts
│   ├── categories.ts
│   └── config.ts
├── prisma/
│   └── schema.prisma
├── public/
│   └── placeholder/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```
