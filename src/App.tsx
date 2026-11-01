import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PartnershipTiersSection } from './components/PartnershipTiersSection';
import { MarketplaceSection } from './components/MarketplaceSection';
import { EarningsCalculator } from './components/EarningsCalculator';
import { DashboardSection } from './components/DashboardSection';
import { TrustAndComplianceSection } from './components/TrustAndComplianceSection';
import { Footer } from './components/Footer';
import { CustomerCheckoutModal } from './components/CustomerCheckoutModal';
import { AffiliateDistributionModal } from './components/AffiliateDistributionModal';
import { WithdrawModal } from './components/WithdrawModal';
import { MerchantModal } from './components/MerchantModal';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { notification, clearNotification, language } = useApp();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 max-w-md w-full p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-xs text-slate-200 leading-relaxed font-medium">
            {notification.message}
          </div>
          <button
            onClick={clearNotification}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Flow */}
      <main className="flex-1">
        <HeroSection onNavigate={handleNavigate} />
        <MarketplaceSection />
        <PartnershipTiersSection />
        <EarningsCalculator />
        <DashboardSection />
        <TrustAndComplianceSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Real Interactive Modals */}
      <CustomerCheckoutModal />
      <AffiliateDistributionModal />
      <WithdrawModal />
      <MerchantModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
