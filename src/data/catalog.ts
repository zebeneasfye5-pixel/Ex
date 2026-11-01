import { Product, PartnerTierInfo } from '../types';

export const PARTNER_TIERS: PartnerTierInfo[] = [
  {
    level: 1,
    nameKey: 'tier1Name',
    badge: 'Tier I',
    directCommission: 15,
    teamBonus: 0,
    annualProfitShare: 0,
    minMonthlyVolume: 0,
    minActiveReferrals: 0,
    badgeColor: 'border-slate-500 text-slate-300',
    perksKeys: [
      'Instant partner referral attribution links',
      'Automated customer checkout tracking',
      'Direct multi-rail disbursements'
    ]
  },
  {
    level: 2,
    nameKey: 'tier2Name',
    badge: 'Tier II',
    directCommission: 22,
    teamBonus: 4,
    annualProfitShare: 0,
    minMonthlyVolume: 2000,
    minActiveReferrals: 2,
    badgeColor: 'border-amber-700/80 text-amber-500',
    perksKeys: [
      '22% direct product commission rate',
      '4% syndicate override on referred partner volume',
      'Priority customer checkout tracking node'
    ]
  },
  {
    level: 3,
    nameKey: 'tier3Name',
    badge: 'Tier III',
    directCommission: 30,
    teamBonus: 8,
    annualProfitShare: 1.0,
    minMonthlyVolume: 6000,
    minActiveReferrals: 5,
    badgeColor: 'border-slate-300 text-slate-100',
    perksKeys: [
      '30% direct enterprise commission rate',
      '8% 2nd-generation syndicate volume override',
      '1.0% annual platform profit-sharing pool',
      'Dedicated partner success account manager'
    ]
  },
  {
    level: 4,
    nameKey: 'tier4Name',
    badge: 'Tier IV',
    directCommission: 38,
    teamBonus: 12,
    annualProfitShare: 2.5,
    minMonthlyVolume: 18000,
    minActiveReferrals: 12,
    badgeColor: 'border-amber-400 text-amber-400',
    perksKeys: [
      '38% high-margin direct deal rate',
      '12% deep syndicate override bonus',
      '2.5% annual corporate profit dividend',
      'Zero-delay instant escrow disbursement queue'
    ]
  },
  {
    level: 5,
    nameKey: 'tier5Name',
    badge: 'Tier V',
    directCommission: 45,
    teamBonus: 15,
    annualProfitShare: 5.0,
    minMonthlyVolume: 50000,
    minActiveReferrals: 25,
    badgeColor: 'border-cyan-400 text-cyan-300',
    perksKeys: [
      '45% maximum direct commission across all lines',
      '15% multi-tier syndicate override',
      '5.0% platform equity dividend share',
      'Consortium governance advisory seat & retreat'
    ]
  }
];

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: 'prod-saas-enterprise',
    title: 'DataScale Enterprise AI Cloud Suite',
    category: 'saas',
    categoryLabelKey: 'filterSaas',
    price: 349,
    commissionRate: 40,
    commissionAmount: 139.60,
    isRecurring: true,
    image: '/src/assets/images/product_saas_platform_1793571721607.jpg',
    salesCount: 1420,
    rating: 4.9,
    reviewsCount: 312,
    vendor: 'DataScale Technologies LLC',
    vendorCountry: 'United States',
    sku: 'DS-AI-CLOUD-2026',
    descriptionKey: 'Enterprise AI automated analytics and revenue engine for corporations and online businesses with recurring monthly license.',
    featuresKeys: [
      'Automated revenue forecasting & customer churn detection',
      '30-Day corporate enterprise pilot with 24.8% conversion',
      'Instant digital API license key issued upon purchase'
    ]
  },
  {
    id: 'prod-hardware-aura',
    title: 'Aura Spatial Smart Audio & Bio-Ring',
    category: 'ecommerce',
    categoryLabelKey: 'filterEcommerce',
    price: 289,
    commissionRate: 25,
    commissionAmount: 72.25,
    isRecurring: false,
    image: '/src/assets/images/product_ecommerce_gear_1793571721945.jpg',
    salesCount: 3840,
    rating: 4.8,
    reviewsCount: 890,
    vendor: 'Aura Labs Ltd.',
    vendorCountry: 'Germany / UK',
    sku: 'AURA-TITANIUM-09',
    descriptionKey: 'Precision titanium wearable monitoring HRV, sleep architecture, and lossless spatial audio with express worldwide courier delivery.',
    featuresKeys: [
      'Direct-to-door express DHL courier delivery in 3 days',
      'Full 2-year international warranty & manufacturer guarantee',
      'Instant tracking number issued on checkout'
    ]
  },
  {
    id: 'prod-digital-blueprint',
    title: 'Global Verified Supplier & Factory Direct Database',
    category: 'digital',
    categoryLabelKey: 'filterDigital',
    price: 149,
    commissionRate: 45,
    commissionAmount: 67.05,
    isRecurring: false,
    image: '/src/assets/images/hero_global_syndicate_1793571721496.jpg',
    salesCount: 5210,
    rating: 4.95,
    reviewsCount: 1420,
    vendor: 'NexusGlobal Trade Academy',
    vendorCountry: 'Switzerland',
    sku: 'SUPPLIER-DB-V4',
    descriptionKey: 'Comprehensive vetted directory of 1,200+ direct factory suppliers across Europe, Asia & North America plus ready-to-launch store systems.',
    featuresKeys: [
      'Instant digital download link & lifetime updates',
      'Direct factory contacts with negotiated wholesale pricing',
      'Zero customs friction documentation templates'
    ]
  },
  {
    id: 'prod-b2b-cloud',
    title: 'CloudScale B2B Infrastructure Deployment Contract',
    category: 'b2b',
    categoryLabelKey: 'filterB2B',
    price: 2400,
    commissionRate: 20,
    commissionAmount: 480.00,
    isRecurring: false,
    image: '/src/assets/images/product_saas_platform_1793571721607.jpg',
    salesCount: 230,
    rating: 5.0,
    reviewsCount: 68,
    vendor: 'CloudScale Global Inc.',
    vendorCountry: 'United States / Singapore',
    sku: 'CLD-B2B-DEPLOY',
    descriptionKey: 'High-ticket managed cloud DevOps migration, server hardening, and institutional compliance contract for fast-growing companies.',
    featuresKeys: [
      'Lump-sum $480.00 commission released upon contract closing',
      'Executed by certified Senior Cloud Infrastructure Architects',
      'Institutional SLA and 14-day escrow settlement'
    ]
  }
];
