import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, ArrowRight, ShoppingCart, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { t, language } = useApp();

  return (
    <section id="hero" className="relative pt-6 pb-16 overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Institutional Verification Kicker */}
        <div className="mb-6 py-2 px-3 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.heroBadge}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>FTC 16 CFR § 255 Compliant</span>
            <span>·</span>
            <span>EU Directive 2005/29/EC</span>
            <span>·</span>
            <span className="text-amber-400 font-semibold">Zero Recruitment Fees</span>
          </div>
        </div>

        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              {t.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('products')}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t.btnOrderNow}</span>
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>{t.btnJoinAlliance}</span>
              </button>
            </div>

            {/* Trust Bullet Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero signup or membership charges</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct bank & mobile settlement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Institutional escrow guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Corporate Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src="/src/assets/images/hero_global_syndicate_1793571721496.jpg"
                alt="NexusGlobal Commercial Boardroom"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white">NexusGlobal Commercial Gateway</span>
                  <span className="font-mono text-emerald-400 font-semibold">$54,200 Settled Today</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Real retail commerce and B2B contracts processed across 48 jurisdictions with automated partner revenue attribution.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Real Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800">
          
          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-lg">
            <span className="text-xs text-slate-400 block mb-1">
              {t.statVolumeLabel}
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
              {t.statVolume}
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-lg">
            <span className="text-xs text-slate-400 block mb-1">
              {t.statSettlementLabel}
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tracking-tight">
              {t.statSettlement}
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-lg">
            <span className="text-xs text-slate-400 block mb-1">
              {t.statJurisdictionsLabel}
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tracking-tight">
              {t.statJurisdictions}
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-lg">
            <span className="text-xs text-slate-400 block mb-1">
              {t.statCommissionLabel}
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tracking-tight">
              {t.statCommission}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
