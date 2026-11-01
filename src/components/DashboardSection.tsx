import React from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, CheckCircle2, TrendingUp, ShieldCheck, ArrowDownCircle } from 'lucide-react';

export const DashboardSection: React.FC = () => {
  const {
    t,
    language,
    currentTierInfo,
    walletBalance,
    pendingEscrow,
    lifetimeEarnings,
    totalReferredVolume,
    customerOrders,
    setWithdrawModalOpen
  } = useApp();

  return (
    <section id="dashboard" className="py-16 bg-slate-900/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Title & Credentials */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.partnerIdLabel}: #NEXUS-7849 (Commercial Partner Verified)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.dashTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'am'
                ? 'በእውነተኛ የደንበኞች ግዢዎች የሚመዘገብ የቀጥታ የኪስ ቦርሳ እና የትዕዛዞች ማረጋገጫ'
                : 'Audited ledger of client orders with automated partner commission attribution.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>{t.btnWithdraw}</span>
            </button>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          
          {/* Card 1: Available Balance */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">
                {t.walletAvailable}
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tracking-tight">
                ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{language === 'am' ? 'ወዲያውኑ የሚወጣ' : 'Instant withdrawal'}</span>
              <span className="font-mono text-emerald-400">100% Cleared</span>
            </div>
          </div>

          {/* Card 2: Pending Escrow */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">
                {t.walletPending}
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 tracking-tight">
                ${pendingEscrow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{language === 'am' ? 'በ7 ቀናት ውስጥ የሚለቀቅ' : 'Clearing in 7 days'}</span>
              <span className="font-mono text-amber-400">Escrow Hold</span>
            </div>
          </div>

          {/* Card 3: Lifetime Earnings */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">
                {t.walletLifetime}
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                ${lifetimeEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{language === 'am' ? 'የተረጋገጠ አጠቃላይ' : 'Total Audited'}</span>
              <span className="font-mono text-slate-300">Disbursed</span>
            </div>
          </div>

          {/* Card 4: Total Customer Sales Volume */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-1">
                {t.totalReferredSales}
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 tracking-tight">
                ${totalReferredVolume.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Active Tier:</span>
              <span className={`px-2 py-0.5 rounded font-mono font-bold ${currentTierInfo.badgeColor} bg-slate-950 border text-[11px]`}>
                {t[currentTierInfo.nameKey] || currentTierInfo.badge} ({currentTierInfo.directCommission}%)
              </span>
            </div>
          </div>

        </div>

        {/* Real Customer Orders & Commission Ledger */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                {t.recentOrdersLedger}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'am'
                  ? 'ደንበኞች የእርስዎን ሊንክ ተጠቅመው ሲገዙ በቀጥታ እዚህ ይመዘገባሉ፤ ኮሚሽኑም ወዲያውኑ ገቢ ይሆናል።'
                  : 'Direct customer retail purchases credited to your partner wallet.'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 font-sans">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-medium">
                <tr>
                  <th className="py-3 px-4 whitespace-nowrap">Order Ref / Date</th>
                  <th className="py-3 px-4 whitespace-nowrap">Customer / Organization</th>
                  <th className="py-3 px-4 whitespace-nowrap">Product Purchased</th>
                  <th className="py-3 px-4 whitespace-nowrap">Payment Channel</th>
                  <th className="py-3 px-4 whitespace-nowrap font-mono">License / Tracking</th>
                  <th className="py-3 px-4 whitespace-nowrap text-right font-mono">Commission Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {customerOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-200 block">{order.orderId}</span>
                      <span className="text-[11px] text-slate-500 font-sans">{order.date}</span>
                    </td>
                    <td className="py-3.5 px-4 font-sans whitespace-nowrap">
                      <span className="font-semibold text-white block">{order.customerName}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{order.customerEmail}</span>
                    </td>
                    <td className="py-3.5 px-4 font-sans font-medium text-slate-200 max-w-xs truncate">
                      {order.productTitle}
                    </td>
                    <td className="py-3.5 px-4 font-sans text-slate-400 whitespace-nowrap">
                      {order.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold whitespace-nowrap">
                      {order.licenseKeyOrTracking}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-400 whitespace-nowrap text-sm">
                      +${order.commissionEarned.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
};
