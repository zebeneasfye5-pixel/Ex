import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, FileText, CheckCircle2, Scale } from 'lucide-react';

export const TrustAndComplianceSection: React.FC = () => {
  const { t, language } = useApp();

  return (
    <section id="compliance" className="py-16 bg-slate-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
            <Scale className="w-4 h-4" />
            <span>{language === 'am' ? 'ዓለም አቀፍ ህጋዊነት እና የታማኝነት ማረጋገጫ' : 'Institutional Compliance & Escrow Protection'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.complianceTitle}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            {t.complianceSubtitle}
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {t.pillar1Title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.pillar1Desc}
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Commercial Product Flow</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {t.pillar2Title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.pillar2Desc}
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tier-1 Segregated Escrow</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {t.pillar3Title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.pillar3Desc}
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>FTC & EU E-Commerce Compliant</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
