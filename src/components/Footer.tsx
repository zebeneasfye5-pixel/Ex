import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t, setAdminConsoleOpen, ownerStats } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center text-slate-950 font-black text-xs">
                N
              </span>
              <span className="font-bold text-white text-base">
                NexusGlobal<span className="text-amber-400 font-light ml-1">Alliance</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t.heroSubtitle}
            </p>
            <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FTC 16 CFR § 255 & EU Directive 2005/29/EC Compliant</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-slate-200 font-semibold block text-xs uppercase tracking-wider">
              Navigation
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors">
                  {t.navProducts}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tiers')} className="hover:text-white transition-colors">
                  {t.navPartnership}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-white transition-colors">
                  {t.navCalculator}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  {t.navDashboard}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compliance')} className="hover:text-white transition-colors">
                  {t.navCompliance}
                </button>
              </li>
              <li>
                <button onClick={() => setAdminConsoleOpen(true)} className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  {language === 'am' ? 'የአስተዳዳሪ ማዕከል (Admin)' : 'Admin Console'}
                </button>
              </li>
            </ul>
          </div>

          {/* Settlement Rails & Disclaimers */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-slate-200 font-semibold block text-xs uppercase tracking-wider">
              Settlement Rails
            </span>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Disbursements executed via Commercial Bank of Ethiopia (CBE), Telebirr, Wise International Wire, Tether USDT (TRC-20), PayPal Business, and SWIFT.
            </p>
            <div className="pt-2 text-[11px] text-amber-300/90 font-mono space-y-0.5">
              <div>Direct Desk: <span className="text-white font-bold">{ownerStats.supportPhone}</span></div>
              <div>Telegram: <span className="text-white font-bold">{ownerStats.supportTelegram}</span></div>
            </div>
            <div className="pt-2 text-[10px] text-slate-500 font-mono leading-relaxed">
              {t.footerDisclaimer}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {t.footerRights}
          </div>
          <div className="flex items-center gap-4">
            <a href="#compliance" className="hover:text-slate-400">Institutional Terms</a>
            <a href="#compliance" className="hover:text-slate-400">Affiliate Disclosure</a>
            <a href="#compliance" className="hover:text-slate-400">Escrow Security</a>
            <a href="#compliance" className="hover:text-slate-400">Anti-Money Laundering (AML)</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
