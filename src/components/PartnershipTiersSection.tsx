import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PARTNER_TIERS } from '../data/catalog';
import { PartnerTierLevel } from '../types';
import { ShieldCheck, Award, Check, ChevronRight } from 'lucide-react';

export const PartnershipTiersSection: React.FC = () => {
  const { t, language, userTier, setUserTier } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<PartnerTierLevel>(userTier);

  const activeTier = PARTNER_TIERS.find((tier) => tier.level === selectedLevel) || PARTNER_TIERS[0];

  return (
    <section id="tiers" className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-2">
            <Award className="w-4 h-4" />
            <span>{language === 'am' ? 'የአጋርነት ደረጃዎች እና የሽያጭ ማበረታቻ' : 'Enterprise Partnership Milestones'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            {t.tierTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            {t.tierSubtitle}
          </p>
        </div>

        {/* Legal Regulatory Compliance Assurance */}
        <div className="mb-12 p-5 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                {language === 'am'
                  ? 'የ100% አለም አቀፍ ህጋዊነት ማረጋገጫ (FTC & EU Guidelines)'
                  : 'Audited Product-Backed Compensation Standard'}
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                {t.tierNotice}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column: Progression Milestones on Left, Deep-Dive Spec on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 5 Linear Milestones */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-medium text-slate-400 block mb-2">
              {language === 'am' ? 'ዝርዝሩን ለማየት አንዱን ደረጃ ይጫኑ፡' : 'Select a partnership milestone to inspect tier rights:'}
            </span>

            {PARTNER_TIERS.map((tier) => {
              const isSelected = selectedLevel === tier.level;
              const isCurrent = userTier === tier.level;

              return (
                <div
                  key={tier.level}
                  onClick={() => setSelectedLevel(tier.level)}
                  className={`cursor-pointer transition-all duration-200 rounded-xl p-4 border ${
                    isSelected
                      ? 'bg-slate-900 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md ${tier.badgeColor} bg-slate-950/80 border`}>
                        {tier.badge}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white flex items-center gap-2">
                          <span>{t[tier.nameKey] || tier.nameKey}</span>
                          {isCurrent && (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-1.5 py-0.2 rounded">
                              {language === 'am' ? 'የእርስዎ አሁን ደረጃ' : 'Active'}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {tier.directCommission}% {t.tierDirectMargin} · {tier.teamBonus}% {t.tierTeamOverride}
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-2">
                      {tier.annualProfitShare > 0 && (
                        <span className="text-xs font-mono font-bold text-cyan-400 hidden sm:inline">
                          +{tier.annualProfitShare}% Pool
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : ''}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Milestone Deep-Dive Spec */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                  {activeTier.badge} · Milestone Specification
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {t[activeTier.nameKey] || activeTier.nameKey}
                </h3>
              </div>
              <button
                onClick={() => setUserTier(activeTier.level)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                  userTier === activeTier.level
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80'
                    : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {userTier === activeTier.level
                  ? (language === 'am' ? 'የእርስዎ አሁን ደረጃ ነው' : 'Current Status')
                  : (language === 'am' ? 'በዚህ ደረጃ ይሞክሩ' : 'Switch Status')}
              </button>
            </div>

            {/* Three Primary Compensation Rates */}
            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="text-[11px] text-slate-400 block">{t.tierDirectMargin}</span>
                <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                  {activeTier.directCommission}%
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="text-[11px] text-slate-400 block">{t.tierTeamOverride}</span>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                  {activeTier.teamBonus}%
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="text-[11px] text-slate-400 block">{t.tierPoolDividend}</span>
                <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">
                  {activeTier.annualProfitShare}%
                </div>
              </div>
            </div>

            {/* Threshold Requirements */}
            <div className="space-y-2 py-3 border-y border-slate-800 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{t.tierMinVolume}:</span>
                <span className="font-mono text-white font-semibold">
                  {activeTier.minMonthlyVolume === 0 ? '$0 (Open to All Partners)' : `$${activeTier.minMonthlyVolume.toLocaleString()}/month`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Collaborator Volume Requirements:</span>
                <span className="font-mono text-white font-semibold">
                  {activeTier.minActiveReferrals === 0 ? 'None (Direct Sales Only)' : `${activeTier.minActiveReferrals} Active Collaborators`}
                </span>
              </div>
            </div>

            {/* Exclusive Rights & Perks */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-slate-200 block mb-2">
                {t.tierPerksTitle}:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {activeTier.perksKeys.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
