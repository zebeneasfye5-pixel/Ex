export type Language = 'en' | 'fr' | 'zh' | 'de' | 'am' | 'om' | 'ar';

export type PartnerTierLevel = 1 | 2 | 3 | 4 | 5;

export interface PartnerTierInfo {
  level: PartnerTierLevel;
  nameKey: string;
  badge: string;
  directCommission: number; // percentage (e.g. 15% to 45%)
  teamBonus: number;        // percentage override (e.g. 0% to 15%)
  annualProfitShare: number;// percentage pool (e.g. 0% to 5%)
  minMonthlyVolume: number; // in USD
  minActiveReferrals: number;
  badgeColor: string;
  perksKeys: string[];
}

export interface Product {
  id: string;
  title: string;
  category: 'saas' | 'ecommerce' | 'digital' | 'b2b';
  categoryLabelKey: string;
  price: number;
  commissionRate: number; // percentage
  commissionAmount: number;
  isRecurring?: boolean;
  image: string;
  salesCount: number;
  rating: number;
  reviewsCount: number;
  vendor: string;
  vendorCountry: string;
  sku: string;
  descriptionKey: string;
  featuresKeys: string[];
  isActive?: boolean;
}

export interface CustomerOrder {
  orderId: string;
  productId: string;
  productTitle: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  paymentMethod: string;
  commissionEarned: number;
  platformFeeEarned: number; // Owner's cut
  affiliateRef: string;
  date: string;
  status: 'paid' | 'delivered';
  licenseKeyOrTracking: string;
}

export interface PartnerProfile {
  partnerId: string;
  fullName: string;
  email: string;
  country: string;
  joinedDate: string;
  tier: PartnerTierLevel;
  referralLink: string;
  payoutMethod: 'telebirr_cbe' | 'wise' | 'usdt' | 'paypal' | 'bank_swift';
  payoutAccount: string;
}

export interface WithdrawalRequest {
  id: string;
  date: string;
  amount: number;
  currency: string;
  method: string;
  destinationAccount: string;
  status: 'pending' | 'clearing' | 'completed';
  txHash: string;
  estimatedRelease: string;
}

export interface MerchantProductSubmission {
  id: string;
  title: string;
  category: string;
  price: number;
  commissionRate: number;
  vendorName: string;
  vendorEmail: string;
  fulfillmentUrl: string;
  status: 'under_review' | 'approved' | 'rejected';
  dateSubmitted: string;
}

export interface PlatformOwnerStats {
  platformFeeRate: number; // percentage (e.g. 10%)
  totalOwnerNetProfit: number; // in USD
  totalGMV: number;
  totalAffiliatesPaid: number;
  ownerPayoutAccount: string;
}
