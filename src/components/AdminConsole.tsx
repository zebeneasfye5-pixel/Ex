import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Shield,
  DollarSign,
  TrendingUp,
  Package,
  Plus,
  CheckCircle,
  Clock,
  Sliders,
  Settings,
  ArrowUpRight,
  Edit,
  Eye,
  EyeOff,
  Building2
} from 'lucide-react';
import { Product } from '../types';

export const AdminConsole: React.FC = () => {
  const {
    adminConsoleOpen,
    setAdminConsoleOpen,
    ownerStats,
    updateOwnerSettings,
    products,
    addProduct,
    toggleProductStatus,
    merchantSubmissions,
    approveMerchantSubmission,
    customerOrders,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'merchants' | 'settings'>('overview');
  const [feeRateInput, setFeeRateInput] = useState<string>(ownerStats.platformFeeRate.toString());
  const [ownerAccountInput, setOwnerAccountInput] = useState<string>(ownerStats.ownerPayoutAccount);
  
  // New Product Form State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'saas' | 'ecommerce' | 'digital' | 'b2b'>('saas');
  const [newPrice, setNewPrice] = useState('199');
  const [newCommissionRate, setNewCommissionRate] = useState('35');
  const [newVendor, setNewVendor] = useState('NexusGlobal Direct Publishing');
  const [newSku, setNewSku] = useState('PROD-NX-' + Math.floor(1000 + Math.random() * 9000));

  if (!adminConsoleOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = parseFloat(feeRateInput);
    if (isNaN(rate) || rate < 1 || rate > 30) return;
    updateOwnerSettings(rate, ownerAccountInput);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const priceNum = parseFloat(newPrice);
    const commRateNum = parseFloat(newCommissionRate);

    const created: Product = {
      id: `prod-admin-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      categoryLabelKey: newCategory === 'saas' ? 'filterSaas' : newCategory === 'ecommerce' ? 'filterEcommerce' : newCategory === 'digital' ? 'filterDigital' : 'filterB2B',
      price: priceNum,
      commissionRate: commRateNum,
      commissionAmount: Number(((priceNum * commRateNum) / 100).toFixed(2)),
      image: newCategory === 'ecommerce'
        ? '/src/assets/images/product_ecommerce_gear_1793571721945.jpg'
        : '/src/assets/images/product_saas_platform_1793571721607.jpg',
      salesCount: 0,
      rating: 5.0,
      reviewsCount: 1,
      vendor: newVendor,
      vendorCountry: 'Ethiopia / Global',
      sku: newSku,
      descriptionKey: `Official product published by NexusGlobal platform administration. Instant customer access and affiliate distribution enabled.`,
      featuresKeys: [
        'Direct automated license key generation',
        'High-converting checkout funnel integration',
        'Guaranteed escrow disbursement'
      ],
      isActive: true
    };

    addProduct(created);
    setShowAddProductModal(false);
    setNewTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {language === 'am' ? 'የመድረኩ ባለቤት እና የአስተዳዳሪ ማዕከል' : 'Platform Owner & Administrator Console'}
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                  Root Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'am'
                  ? 'የመድረኩን አጠቃላይ ሽያጭ፣ የባለቤቱን የተጣራ ትርፍ፣ ምርቶችን እና የነጋዴዎችን ጥያቄዎች ማስተዳደሪያ'
                  : 'Manage platform turnover, founder revenue collection, product catalog, and merchant admissions.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAdminConsoleOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'am' ? 'አጠቃላይ ገቢ እና ስታትስቲክስ' : 'Owner Revenue & Overview'}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{language === 'am' ? 'ምርቶችን ማስተዳደር' : 'Manage Products'}</span>
            <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded">
              {products.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('merchants')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'merchants'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{language === 'am' ? 'የነጋዴዎች ማመልከቻ' : 'Merchant Submissions'}</span>
            <span className="font-mono text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.2 rounded">
              {merchantSubmissions.filter((s) => s.status === 'under_review').length} New
            </span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'am' ? 'የመድረኩ መቶኛ ክፍያ ቅንብር' : 'Platform Fee & Payout Settings'}
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW & FOUNDER PROFIT */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Founder Monetization Breakdown Explanation */}
              <div className="p-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-800/60 rounded-xl">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>{language === 'am' ? 'የድህረገፁ ባለቤት የገቢ ምንጮች እንዴት እንደሚሰሩ' : 'How the Website Owner Earns Revenue'}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-xs text-slate-300 leading-relaxed">
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                    <span className="font-bold text-amber-400 block mb-1">
                      1. {language === 'am' ? 'የመድረክ ኮሚሽን ቅሪት (Platform Take-Rate)' : 'Platform Clearing Fee'}
                    </span>
                    <span>
                      {language === 'am'
                        ? `ከእያንዳንዱ ሽያጭ ${ownerStats.platformFeeRate}% በቀጥታ ለድህረገፁ ባለቤት ገቢ ይሆናል። ደንበኛው $349 ሲገዛ ባለቤቱ $34.90 የተጣራ ትርፍ ያገኛል።`
                        : `A fixed ${ownerStats.platformFeeRate}% fee is automatically retained from every transaction GMV.`}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                    <span className="font-bold text-cyan-400 block mb-1">
                      2. {language === 'am' ? 'የአምራቾች ማስመዝገቢያ ክፍያ' : 'Merchant Listing Fees'}
                    </span>
                    <span>
                      {language === 'am'
                        ? 'ውጭ አገር ያሉ አምራቾችና ነጋዴዎች ምርታቸውን በሺዎች ለሚቆጠሩ አፊሊየቶች ለማቅረብ በአንድ ምርት $199 - $299 የመመዝገቢያ ክፍያ ይከፍላሉ።'
                        : 'Merchants and software vendors pay onboarding listing fees ($199) to be featured to global affiliates.'}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                    <span className="font-bold text-emerald-400 block mb-1">
                      3. {language === 'am' ? 'የራስዎን ምርቶች በቀጥታ መሸጥ' : 'Direct Proprietary Sales'}
                    </span>
                    <span>
                      {language === 'am'
                        ? 'የራስዎን ዲጂታል ምርቶች፣ ኮርሶች ወይም አገልግሎቶች በመድረኩ ላይ ሲለጥፉ አፊሊየቱ የራሱን ኮሚሽን ወስዶ ቀሪውን ሙሉ ገንዘብ እርስዎ ይወስዳሉ።'
                        : 'List your own software or services to capture 100% of product margin minus affiliate pay.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Financial Metrics for the Owner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">
                    {language === 'am' ? 'የመድረኩ ባለቤት የተጣራ ትርፍ' : 'Founder Net Retained Profit'}
                  </span>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    ${ownerStats.totalOwnerNetProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-2 block">
                    {ownerStats.platformFeeRate}% Take-Rate + Listing Fees
                  </span>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">
                    {language === 'am' ? 'አጠቃላይ የመድረኩ ሽያጭ (GMV)' : 'Total Gross Merchandise Value (GMV)'}
                  </span>
                  <div className="text-2xl font-bold font-mono text-white">
                    ${ownerStats.totalGMV.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-2 block">
                    All processed customer transactions
                  </span>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">
                    {language === 'am' ? 'ለአፊሊየቶች የተከፈለ ኮሚሽን' : 'Total Paid Out to Affiliates'}
                  </span>
                  <div className="text-2xl font-bold font-mono text-amber-400">
                    ${ownerStats.totalAffiliatesPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-2 block">
                    Disbursed through escrow
                  </span>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">
                    {language === 'am' ? 'የገንዘብ መቀበያ አካውንት' : 'Owner Settlement Account'}
                  </span>
                  <div className="text-xs font-mono text-slate-200 truncate mt-1">
                    {ownerStats.ownerPayoutAccount}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono mt-2 block">
                    CBE / Telebirr / USDT Configured
                  </span>
                </div>

              </div>

              {/* Transactions Ledger Breakdown */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {language === 'am' ? 'የቅርብ ጊዜ ግብይቶች እና የባለቤቱ የተቆረጠ ትርፍ' : 'Recent Transaction Revenue Waterfall'}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {customerOrders.length} Completed Orders
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 font-sans">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="py-2.5 px-4">Order Ref / Customer</th>
                        <th className="py-2.5 px-4">Product Item</th>
                        <th className="py-2.5 px-4 font-mono">Total Paid</th>
                        <th className="py-2.5 px-4 font-mono">Affiliate Cut</th>
                        <th className="py-2.5 px-4 font-mono text-emerald-400">Owner Net Fee ({ownerStats.platformFeeRate}%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {customerOrders.map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-slate-900/50">
                          <td className="py-2.5 px-4 whitespace-nowrap">
                            <span className="font-semibold text-white block">{ord.orderId}</span>
                            <span className="text-[10px] text-slate-500 font-sans">{ord.customerName}</span>
                          </td>
                          <td className="py-2.5 px-4 font-sans max-w-xs truncate text-slate-200">
                            {ord.productTitle}
                          </td>
                          <td className="py-2.5 px-4 text-white font-bold whitespace-nowrap">
                            ${ord.amount.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-4 text-amber-400 whitespace-nowrap">
                            -${ord.commissionEarned.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-4 text-emerald-400 font-bold whitespace-nowrap">
                            +${ord.platformFeeEarned.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGER */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {language === 'am' ? 'የገበያ ምርቶች ዝርዝር' : 'Live Marketplace Product Inventory'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === 'am' ? 'አዳዲስ ምርቶችን ይጨምሩ፣ ዋጋ ወይም ኮሚሽን ያሻሽሉ።' : 'Add new products, adjust pricing, or change affiliate commissions.'}
                  </p>
                </div>

                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'am' ? 'አዲስ ምርት ጨምር' : 'Add New Product'}</span>
                </button>
              </div>

              {/* Product List Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300 font-sans">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="py-3 px-4">Title / SKU</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4 font-mono">Retail Price</th>
                      <th className="py-3 px-4 font-mono">Affiliate Commission</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-sans">
                          <span className="font-semibold text-white block">{p.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">SKU: {p.sku} · {p.vendor}</span>
                        </td>
                        <td className="py-3 px-4 font-sans text-slate-400">
                          {p.category.toUpperCase()}
                        </td>
                        <td className="py-3 px-4 text-white font-bold">
                          ${p.price.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">
                          {p.commissionRate}% (${p.commissionAmount})
                        </td>
                        <td className="py-3 px-4 font-sans">
                          {p.isActive === false ? (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-500 border border-slate-700">
                              Inactive
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                              Live
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right font-sans">
                          <button
                            onClick={() => toggleProductStatus(p.id)}
                            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 inline-flex items-center gap-1"
                          >
                            {p.isActive === false ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                            <span>{p.isActive === false ? 'Activate' : 'Pause'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: MERCHANT SUBMISSIONS */}
          {activeTab === 'merchants' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'am' ? 'የአምራቾች እና የነጋዴዎች ማመልከቻ' : 'Vendor Onboarding Review Queue'}
                </h4>
                <p className="text-xs text-slate-400">
                  {language === 'am'
                    ? 'አምራቾች ያቀረቡትን ምርት ሲያጸድቁ ወደ ገበያ ይገባል፤ ለእርስዎም የ$199 የምዝገባ ክፍያ ወደ ትርፍዎ ይጨመራል!'
                    : 'Approve vendor solutions to publish to the Marketplace and collect the $199 listing fee.'}
                </p>
              </div>

              <div className="space-y-3">
                {merchantSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm">{sub.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {sub.category}
                        </span>
                        {sub.status === 'approved' && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            Approved & Published
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 space-x-3">
                        <span>Vendor: {sub.vendorName} ({sub.vendorEmail})</span>
                        <span>·</span>
                        <span className="font-mono text-slate-300">Retail: ${sub.price}</span>
                        <span>·</span>
                        <span className="font-mono text-emerald-400">Offered Commission: {sub.commissionRate}%</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-1">
                        Fulfillment: <a href={sub.fulfillmentUrl} target="_blank" rel="noreferrer" className="text-amber-400 underline">{sub.fulfillmentUrl}</a>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {sub.status === 'under_review' ? (
                        <button
                          onClick={() => approveMerchantSubmission(sub.id)}
                          className="px-4 py-2 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{language === 'am' ? 'አጽድቅ & $199 ክፍያ ሰብስብ' : 'Approve & Collect $199'}</span>
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-400 font-medium">
                          Active in Marketplace
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: SETTINGS & OWNER PAYOUT */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-lg text-xs">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {language === 'am' ? 'የመድረኩ ኮሚሽን እና የባለቤቱ የገንዘብ መቀበያ' : 'Platform Revenue & Owner Settlement Configuration'}
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  {language === 'am'
                    ? 'ከእያንዳንዱ ግብይት ላይ ድህረገፁ የሚቆርጠውን የትርፍ መቶኛ እና ገንዘብ የሚቀበሉበትን የባንክ ወይም የክሪፕቶ አድራሻ ያዘጋጁ።'
                    : 'Configure your platform take-rate percentage and specify where your founder distributions are deposited.'}
                </p>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  {language === 'am' ? 'የመድረክ ትርፍ መቶኛ (Platform Take-Rate %)' : 'Platform Commission Fee (% of Gross GMV)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={feeRateInput}
                    onChange={(e) => setFeeRateInput(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-mono">%</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Recommended: 8% to 15% (Currently: {ownerStats.platformFeeRate}%)
                </span>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  {language === 'am' ? 'የባለቤቱ የገንዘብ መቀበያ (CBE / Telebirr / Wise / USDT)' : 'Owner Settlement Destination Account'}
                </label>
                <input
                  type="text"
                  required
                  value={ownerAccountInput}
                  onChange={(e) => setOwnerAccountInput(e.target.value)}
                  placeholder="CBE Account, Telebirr Number, Wise IBAN or USDT Address"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors"
                >
                  {language === 'am' ? 'ቅንብሩን አስቀምጥ' : 'Save Owner Settings'}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Modal footer */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>NexusGlobal Alliance v2.4 · Multi-Jurisdiction Core</span>
          <button
            onClick={() => setAdminConsoleOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            {language === 'am' ? 'ዝጋ' : 'Close Console'}
          </button>
        </div>

      </div>

      {/* Add Product Modal Sub-view */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h4 className="text-base font-bold text-white mb-1">
              {language === 'am' ? 'አዲስ ምርት ወደ ገበያ ጨምር' : 'Publish Product to Live Marketplace'}
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              This product will instantly appear in the live catalog for customers to buy and affiliates to promote.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. NextGen Cloud AI Analytics"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans focus:outline-none focus:border-amber-400"
                  >
                    <option value="saas">Enterprise SaaS</option>
                    <option value="ecommerce">Smart Hardware</option>
                    <option value="digital">Digital Asset</option>
                    <option value="b2b">B2B Contract</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Affiliate Rate (%)</label>
                  <input
                    type="number"
                    required
                    min={5}
                    max={60}
                    value={newCommissionRate}
                    onChange={(e) => setNewCommissionRate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Publisher Brand</label>
                  <input
                    type="text"
                    required
                    value={newVendor}
                    onChange={(e) => setNewVendor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
