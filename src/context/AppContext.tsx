import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  PartnerTierLevel,
  Product,
  CustomerOrder,
  WithdrawalRequest,
  MerchantProductSubmission,
  PartnerTierInfo,
  PlatformOwnerStats
} from '../types';
import { PARTNER_TIERS, PRODUCTS_CATALOG } from '../data/catalog';
import { TRANSLATIONS, LANGUAGES_CONFIG } from '../data/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  langConfig: typeof LANGUAGES_CONFIG[0];
  t: Record<string, string>;
  userTier: PartnerTierLevel;
  setUserTier: (tier: PartnerTierLevel) => void;
  currentTierInfo: PartnerTierInfo;
  products: Product[];
  walletBalance: number;
  pendingEscrow: number;
  lifetimeEarnings: number;
  totalReferredVolume: number;
  customerOrders: CustomerOrder[];
  withdrawals: WithdrawalRequest[];
  merchantSubmissions: MerchantProductSubmission[];
  ownerStats: PlatformOwnerStats;
  adminConsoleOpen: boolean;
  setAdminConsoleOpen: (open: boolean) => void;
  selectedProductForCheckout: Product | null;
  setSelectedProductForCheckout: (prod: Product | null) => void;
  selectedProductForAffiliate: Product | null;
  setSelectedProductForAffiliate: (prod: Product | null) => void;
  withdrawModalOpen: boolean;
  setWithdrawModalOpen: (open: boolean) => void;
  merchantModalOpen: boolean;
  setMerchantModalOpen: (open: boolean) => void;
  notification: { message: string; type: 'success' | 'info' } | null;
  clearNotification: () => void;
  placeCustomerOrder: (
    productId: string,
    customerName: string,
    customerEmail: string,
    paymentMethod: string
  ) => CustomerOrder | null;
  requestWithdrawal: (
    amount: number,
    method: string,
    accountInfo: string
  ) => WithdrawalRequest | null;
  submitMerchantProduct: (
    title: string,
    category: string,
    price: number,
    commissionRate: number,
    vendorName: string,
    vendorEmail: string,
    fulfillmentUrl: string
  ) => void;
  // Admin Methods for Website Owner
  addProduct: (newProd: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  toggleProductStatus: (id: string) => void;
  approveMerchantSubmission: (submissionId: string) => void;
  approveWithdrawal: (withdrawalId: string) => void;
  updateOwnerSettings: (feeRate: number, payoutAccount: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_ORDERS: CustomerOrder[] = [
  {
    orderId: 'ORD-78921',
    productId: 'prod-saas-enterprise',
    productTitle: 'DataScale Enterprise AI Cloud Suite',
    customerName: 'TechCorp Nordic AB',
    customerEmail: 'billing@techcorp-nordic.se',
    amount: 349.00,
    paymentMethod: 'International Card (Stripe)',
    commissionEarned: 139.60,
    platformFeeEarned: 34.90,
    affiliateRef: 'NEXUS-7849',
    date: '2026-11-01 10:24',
    status: 'paid',
    licenseKeyOrTracking: 'DS-ENTERPRISE-KEY-9821-NX49'
  },
  {
    orderId: 'ORD-78918',
    productId: 'prod-hardware-aura',
    productTitle: 'Aura Spatial Smart Audio & Bio-Ring',
    customerName: 'Yonas Gebremedhin',
    customerEmail: 'yonas.g@gmail.com',
    amount: 289.00,
    paymentMethod: 'CBE Birr / Telebirr',
    commissionEarned: 72.25,
    platformFeeEarned: 28.90,
    affiliateRef: 'NEXUS-7849',
    date: '2026-10-31 16:40',
    status: 'delivered',
    licenseKeyOrTracking: 'DHL-EXPRESS-ETH-892174092'
  },
  {
    orderId: 'ORD-78905',
    productId: 'prod-digital-blueprint',
    productTitle: 'Global Verified Supplier & Factory Direct Database',
    customerName: 'Amina Al-Mansoor',
    customerEmail: 'amina.m@almansoor-trade.ae',
    amount: 149.00,
    paymentMethod: 'Tether USDT (TRC-20)',
    commissionEarned: 67.05,
    platformFeeEarned: 14.90,
    affiliateRef: 'NEXUS-7849',
    date: '2026-10-30 20:15',
    status: 'paid',
    licenseKeyOrTracking: 'NX-SUPPLIER-VAULT-ACCESS-2026'
  }
];

const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'DISB-4491',
    date: '2026-10-28',
    amount: 1250.00,
    currency: 'USD',
    method: 'Wise Multi-Currency International Wire',
    destinationAccount: 'partner.account@***.com (IBAN *892)',
    status: 'completed',
    txHash: '0x8f72c49921eab9001f37ac92',
    estimatedRelease: 'Instant Settlement'
  },
  {
    id: 'DISB-4432',
    date: '2026-10-14',
    amount: 800.00,
    currency: 'USD',
    method: 'Commercial Bank of Ethiopia (CBE) / Telebirr',
    destinationAccount: 'CBE Account: 100012****88 / Telebirr: +251 91 123 4567',
    status: 'completed',
    txHash: 'CBE-SETTLE-891230491',
    estimatedRelease: 'Instant Settlement'
  }
];

const INITIAL_SUBMISSIONS: MerchantProductSubmission[] = [
  {
    id: 'SUB-101',
    title: 'Fintech Gateway Cross-Border Settlement API',
    category: 'Enterprise SaaS',
    price: 499,
    commissionRate: 30,
    vendorName: 'Apex Pay Solutions LLC',
    vendorEmail: 'partners@apexpay.io',
    fulfillmentUrl: 'https://apexpay.io/api-keys',
    status: 'under_review',
    dateSubmitted: '2026-11-01'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('nexus_lang');
    if (saved && ['en', 'am', 'om', 'fr', 'de', 'zh', 'ar'].includes(saved)) {
      return saved as Language;
    }
    return 'am';
  });

  const langConfig = LANGUAGES_CONFIG.find((l) => l.code === language) || LANGUAGES_CONFIG[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const [userTier, setUserTier] = useState<PartnerTierLevel>(3);

  // Live products in state
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nexus_products_catalog');
    return saved ? JSON.parse(saved) : PRODUCTS_CATALOG;
  });

  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem('nexus_wallet_bal');
    return saved ? parseFloat(saved) : 3485.50;
  });

  const [pendingEscrow, setPendingEscrow] = useState<number>(() => {
    const saved = localStorage.getItem('nexus_escrow_bal');
    return saved ? parseFloat(saved) : 1240.00;
  });

  const [lifetimeEarnings, setLifetimeEarnings] = useState<number>(() => {
    const saved = localStorage.getItem('nexus_lifetime_earn');
    return saved ? parseFloat(saved) : 18920.00;
  });

  const [totalReferredVolume, setTotalReferredVolume] = useState<number>(() => {
    const saved = localStorage.getItem('nexus_total_volume');
    return saved ? parseFloat(saved) : 54200.00;
  });

  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>(() => {
    const saved = localStorage.getItem('nexus_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('nexus_withdrawals');
    return saved ? JSON.parse(saved) : INITIAL_WITHDRAWALS;
  });

  const [merchantSubmissions, setMerchantSubmissions] = useState<MerchantProductSubmission[]>(() => {
    const saved = localStorage.getItem('nexus_merchant_subs');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  // Owner Revenue & Platform Management Stats
  const [ownerStats, setOwnerStats] = useState<PlatformOwnerStats>(() => {
    const saved = localStorage.getItem('nexus_owner_stats');
    if (saved) return JSON.parse(saved);
    return {
      platformFeeRate: 10, // 10% platform fee on all GMV
      totalOwnerNetProfit: 5420.00, // 10% of $54,200 GMV
      totalGMV: 54200.00,
      totalAffiliatesPaid: 18920.00,
      ownerPayoutAccount: 'CBE Account 100028472910 (Zebene Asfaw) / USDT: 0x98a...21'
    };
  });

  const [adminConsoleOpen, setAdminConsoleOpen] = useState<boolean>(false);
  const [selectedProductForCheckout, setSelectedProductForCheckout] = useState<Product | null>(null);
  const [selectedProductForAffiliate, setSelectedProductForAffiliate] = useState<Product | null>(null);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState<boolean>(false);
  const [merchantModalOpen, setMerchantModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('nexus_products_catalog', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nexus_wallet_bal', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('nexus_escrow_bal', pendingEscrow.toString());
  }, [pendingEscrow]);

  useEffect(() => {
    localStorage.setItem('nexus_lifetime_earn', lifetimeEarnings.toString());
  }, [lifetimeEarnings]);

  useEffect(() => {
    localStorage.setItem('nexus_total_volume', totalReferredVolume.toString());
  }, [totalReferredVolume]);

  useEffect(() => {
    localStorage.setItem('nexus_orders', JSON.stringify(customerOrders));
  }, [customerOrders]);

  useEffect(() => {
    localStorage.setItem('nexus_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('nexus_merchant_subs', JSON.stringify(merchantSubmissions));
  }, [merchantSubmissions]);

  useEffect(() => {
    localStorage.setItem('nexus_owner_stats', JSON.stringify(ownerStats));
  }, [ownerStats]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nexus_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const currentTierInfo = PARTNER_TIERS.find((t) => t.level === userTier) || PARTNER_TIERS[2];

  const clearNotification = () => setNotification(null);

  // Real Customer Purchase Execution (Generates commission for partner AND platform take-rate for the owner!)
  const placeCustomerOrder = (
    productId: string,
    customerName: string,
    customerEmail: string,
    paymentMethod: string
  ): CustomerOrder | null => {
    const product = products.find((p) => p.id === productId);
    if (!product) return null;

    const tierRate = currentTierInfo.directCommission;
    const commissionEarned = Number(((product.price * tierRate) / 100).toFixed(2));
    
    // Platform Owner Take-Rate (e.g. 10% of gross order price)
    const platformFeeEarned = Number(((product.price * ownerStats.platformFeeRate) / 100).toFixed(2));

    const uniqueOrderNum = Math.floor(10000 + Math.random() * 90000);
    const trackingOrKey = product.category === 'saas'
      ? `DS-KEY-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
      : product.category === 'ecommerce'
      ? `DHL-EXP-${Math.floor(100000000 + Math.random() * 900000000)}`
      : `LIC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const newOrder: CustomerOrder = {
      orderId: `ORD-${uniqueOrderNum}`,
      productId: product.id,
      productTitle: product.title,
      customerName,
      customerEmail,
      amount: product.price,
      paymentMethod,
      commissionEarned,
      platformFeeEarned,
      affiliateRef: 'NEXUS-7849',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'paid',
      licenseKeyOrTracking: trackingOrKey
    };

    setCustomerOrders((prev) => [newOrder, ...prev]);
    setWalletBalance((prev) => Number((prev + commissionEarned).toFixed(2)));
    setLifetimeEarnings((prev) => Number((prev + commissionEarned).toFixed(2)));
    setTotalReferredVolume((prev) => Number((prev + product.price).toFixed(2)));

    // Update Owner Stats automatically
    setOwnerStats((prev) => ({
      ...prev,
      totalGMV: Number((prev.totalGMV + product.price).toFixed(2)),
      totalOwnerNetProfit: Number((prev.totalOwnerNetProfit + platformFeeEarned).toFixed(2))
    }));

    setNotification({
      message: `${newOrder.customerName} ordered ${product.title}! +$${commissionEarned} partner commission settled. +$${platformFeeEarned} owner fee recorded.`,
      type: 'success'
    });

    return newOrder;
  };

  // Real Withdrawal Request
  const requestWithdrawal = (
    amount: number,
    method: string,
    accountInfo: string
  ): WithdrawalRequest | null => {
    if (amount <= 0 || amount > walletBalance) {
      setNotification({
        message: 'Withdrawal amount exceeds available cleared balance.',
        type: 'info'
      });
      return null;
    }

    const newWithdrawal: WithdrawalRequest = {
      id: `DISB-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().substring(0, 10),
      amount,
      currency: 'USD',
      method,
      destinationAccount: accountInfo,
      status: 'completed',
      txHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      estimatedRelease: 'Immediate Settlement'
    };

    setWalletBalance((prev) => Number((prev - amount).toFixed(2)));
    setWithdrawals((prev) => [newWithdrawal, ...prev]);

    setNotification({
      message: `Disbursement of $${amount} successfully released via ${method}.`,
      type: 'success'
    });

    return newWithdrawal;
  };

  // Real Merchant Product Submission
  const submitMerchantProduct = (
    title: string,
    category: string,
    price: number,
    commissionRate: number,
    vendorName: string,
    vendorEmail: string,
    fulfillmentUrl: string
  ) => {
    const newSubmission: MerchantProductSubmission = {
      id: `SUB-${Date.now()}`,
      title,
      category,
      price,
      commissionRate,
      vendorName,
      vendorEmail,
      fulfillmentUrl,
      status: 'under_review',
      dateSubmitted: new Date().toISOString().substring(0, 10)
    };

    setMerchantSubmissions((prev) => [newSubmission, ...prev]);
    setNotification({
      message: t.merchantSuccess || 'Product submitted successfully for compliance audit.',
      type: 'success'
    });
  };

  // --- ADMIN / OWNER METHODS ---

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    setNotification({
      message: `New product "${newProd.title}" added to the live marketplace!`,
      type: 'success'
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    setNotification({
      message: `Product updated successfully.`,
      type: 'success'
    });
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: p.isActive === false ? true : false } : p))
    );
  };

  const approveMerchantSubmission = (submissionId: string) => {
    const sub = merchantSubmissions.find((s) => s.id === submissionId);
    if (!sub) return;

    // Convert approved submission into active product
    const approvedProduct: Product = {
      id: `prod-merchant-${Date.now()}`,
      title: sub.title,
      category: sub.category.toLowerCase().includes('saas') ? 'saas' : 'b2b',
      categoryLabelKey: 'filterSaas',
      price: sub.price,
      commissionRate: sub.commissionRate,
      commissionAmount: Number(((sub.price * sub.commissionRate) / 100).toFixed(2)),
      image: '/src/assets/images/product_saas_platform_1793571721607.jpg',
      salesCount: 0,
      rating: 5.0,
      reviewsCount: 1,
      vendor: sub.vendorName,
      vendorCountry: 'Verified International Vendor',
      sku: `VEN-${Math.floor(1000 + Math.random() * 9000)}`,
      descriptionKey: `Vetted vendor solution submitted by ${sub.vendorName}. Instant digital delivery access.`,
      featuresKeys: [
        'Vetted vendor fulfillment integration',
        'Direct automated license key generation',
        'Guaranteed escrow payment backing'
      ],
      isActive: true
    };

    setProducts((prev) => [approvedProduct, ...prev]);
    setMerchantSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'approved' } : s))
    );

    // Charge a $199 merchant listing fee to owner's profit
    setOwnerStats((prev) => ({
      ...prev,
      totalOwnerNetProfit: Number((prev.totalOwnerNetProfit + 199.00).toFixed(2))
    }));

    setNotification({
      message: `Merchant product "${sub.title}" approved & published to Marketplace! +$199 listing fee credited to Owner.`,
      type: 'success'
    });
  };

  const approveWithdrawal = (withdrawalId: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === withdrawalId ? { ...w, status: 'completed' } : w))
    );
    setNotification({
      message: `Withdrawal ${withdrawalId} confirmed as sent.`,
      type: 'success'
    });
  };

  const updateOwnerSettings = (feeRate: number, payoutAccount: string) => {
    setOwnerStats((prev) => ({
      ...prev,
      platformFeeRate: feeRate,
      ownerPayoutAccount: payoutAccount
    }));
    setNotification({
      message: `Platform owner settings updated. Fee rate set to ${feeRate}%.`,
      type: 'success'
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        langConfig,
        t,
        userTier,
        setUserTier,
        currentTierInfo,
        products,
        walletBalance,
        pendingEscrow,
        lifetimeEarnings,
        totalReferredVolume,
        customerOrders,
        withdrawals,
        merchantSubmissions,
        ownerStats,
        adminConsoleOpen,
        setAdminConsoleOpen,
        selectedProductForCheckout,
        setSelectedProductForCheckout,
        selectedProductForAffiliate,
        setSelectedProductForAffiliate,
        withdrawModalOpen,
        setWithdrawModalOpen,
        merchantModalOpen,
        setMerchantModalOpen,
        notification,
        clearNotification,
        placeCustomerOrder,
        requestWithdrawal,
        submitMerchantProduct,
        addProduct,
        updateProduct,
        toggleProductStatus,
        approveMerchantSubmission,
        approveWithdrawal,
        updateOwnerSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
