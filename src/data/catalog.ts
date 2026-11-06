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
    ],
    isActive: true
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
    ],
    isActive: true
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
    ],
    isActive: true
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
    ],
    isActive: true
  },
  {
    id: 'prod-b2b-ai-automation',
    title: 'OmniAI Enterprise Sales & Workflow Automation Suite',
    category: 'b2b',
    categoryLabelKey: 'filterB2B',
    price: 1850,
    commissionRate: 25,
    commissionAmount: 462.50,
    isRecurring: false,
    image: '/src/assets/images/product_saas_platform_1793571721607.jpg',
    salesCount: 312,
    rating: 4.9,
    reviewsCount: 94,
    vendor: 'OmniGen Systems LLC',
    vendorCountry: 'United States / UAE',
    sku: 'OMNI-AI-WORKFLOW',
    descriptionKey: 'Turnkey enterprise AI automation system for customer inquiries, lead qualification, and cross-border settlement processing.',
    featuresKeys: [
      '$462.50 instant commission credited to referring sales partner',
      'Custom ERP/CRM deployment completed in under 7 business days',
      'Guaranteed 3x lead handling efficiency boost'
    ],
    isActive: true
  },
  {
    id: 'prod-b2b-export-brokerage',
    title: 'Global Export & Commodity Sourcing Mandate',
    category: 'b2b',
    categoryLabelKey: 'filterB2B',
    price: 3500,
    commissionRate: 15,
    commissionAmount: 525.00,
    isRecurring: false,
    image: '/src/assets/images/hero_global_syndicate_1793571721496.jpg',
    salesCount: 145,
    rating: 4.95,
    reviewsCount: 42,
    vendor: 'Nexus Trade Consortium',
    vendorCountry: 'Ethiopia / Netherlands / UAE',
    sku: 'EXP-COMM-MANDATE',
    descriptionKey: 'Comprehensive export certification, LC processing, laboratory inspection, and buyer match for agricultural & manufacturing exports.',
    featuresKeys: [
      '$525.00 broker referral fee disbursed upon LC letter of credit opening',
      'Direct connection with institutional international commodity buyers',
      'Complete legal contract and banking clearance advisory'
    ],
    isActive: true
  }
];

export const ENTERPRISE_CONTRACTS = [
  {
    id: 'CONT-101',
    title: 'Enterprise Fintech Mobile App & Web Portal Architecture',
    clientName: 'East Africa Financial Group',
    clientCountry: 'Ethiopia / Kenya',
    budget: 6500,
    duration: '6 Weeks',
    scope: 'React, Node.js, Telebirr & CBE Birr gateway integration with multi-currency settlement.',
    category: 'web_cloud',
    applicationsCount: 8,
    escrowSecured: true,
    status: 'open'
  },
  {
    id: 'CONT-102',
    title: 'Automated AI Customer Service & WhatsApp Order Bot',
    clientName: 'Nile Logistics & Courier Corp',
    clientCountry: 'United Arab Emirates / Ethiopia',
    budget: 3200,
    duration: '3 Weeks',
    scope: 'Multi-lingual chatbot handling Amharic, Oromo, English and Arabic orders with auto-dispatch.',
    category: 'ai_automation',
    applicationsCount: 12,
    escrowSecured: true,
    status: 'open'
  },
  {
    id: 'CONT-103',
    title: 'Coffee & Agricultural Products Global E-Commerce Export Hub',
    clientName: 'Abyssinia Specialty Origin Exports',
    clientCountry: 'Ethiopia / Germany',
    budget: 8500,
    duration: '8 Weeks',
    scope: 'Direct-to-consumer European export web portal with Stripe, Wise, and DHL courier API sync.',
    category: 'ecommerce_export',
    applicationsCount: 5,
    escrowSecured: true,
    status: 'open'
  }
];
