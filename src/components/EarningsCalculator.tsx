import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, ArrowRight } from 'lucide-react';
import { PARTNER_TIERS } from '../data/catalog';

export const EarningsCalculator: React.FC = () => {
  const { t, language } = useApp();

  const [personalSales, setPersonalSales] = useState<number>(6000);
  const [teamPartners, setTeamPartners] = useState<number>(5);
  const [avgPartnerSales, setAvgPartnerSales] = useState<number>(2000);

  // Milestone tier achieved
  let qualifiedTier = PARTNER_TIERS[0];
  for (let i = PARTNER_TIERS.length - 1; i >= 0; i--) {
    if (personalSales >= PARTNER_TIERS[i].minMonthlyVolume && teamPartners >= PARTNER_TIERS[i].minActiveReferrals) {
      qualifiedTier = PARTNER_TIERS[i];
      break;
    }
  }

  const directCommission = (personalSales * qualifiedTier.directCommission) / 100;
  const teamVolume = teamPartners * avgPartnerSales;
  const teamOverride = (teamVolume * qualifiedTier.teamBonus) / 100;
  const poolDividend = qualifiedTier.annualProfitShare > 0
    ? (2500000 * (qualifiedTier.annualProfitShare / 100)) / (qualifiedTier.level === 3 ? 120 : qualifiedTier.level === 4 ? 40 : 15)
    : 0;

  const totalMonthly = directCommission + teamOverride + poolDividend;
  const totalAnnual = totalMonthly * 12;

  return (
    <section id="calculator" className="py-16 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-2">
            <Calculator className="w-4 h-4" />
            <span>{language === 'am' ? 'የገቢ ማሽን ማስያ' : 'Commercial Revenue Forecaster'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {language === 'am' ? 'የእርስዎን ወርሃዊ እና አመታዊ ገቢ ያስሉ' : 'Interactive Revenue & Margin Calculator'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            {language === 'am'
              ? 'የግል ሽያጭዎን እና የአጋሮችዎን መጠን በማስተካከል ሊያገኙት የሚችሉትን ትክክለኛ ገቢ ይመልከቱ።'
              : 'Calculate your monthly and annual return based on direct client sales volume and syndicate overrides.'}
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sliders */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            
            {/* Slider 1 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-200">
                  {language === 'am' ? 'የእርስዎ ወርሃዊ የቀጥታ ሽያጭ መጠን ($)' : 'Your Monthly Direct Client Sales ($)'}
                </label>
                <span className="font-mono text-sm font-bold text-amber-400">
                  ${personalSales.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={30000}
                step={500}
                value={personalSales}
                onChange={(e) => setPersonalSales(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>$0</span>
                <span>$15,000</span>
                <span>$30,000</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-200">
                  {language === 'am' ? 'ንቁ የተገናኙ አጋሮች ብዛት' : 'Active Performance Collaborators'}
                </label>
                <span className="font-mono text-sm font-bold text-emerald-400">
                  {teamPartners} partners
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={teamPartners}
                onChange={(e) => setTeamPartners(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0</span>
                <span>15</span>
                <span>30</span>
              </div>
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-200">
                  {language === 'am' ? 'በአንድ አጋር አማካይ ወርሃዊ ሽያጭ ($)' : 'Average Monthly Sales per Collaborator ($)'}
                </label>
                <span className="font-mono text-sm font-bold text-cyan-400">
                  ${avgPartnerSales.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10000}
                step={250}
                value={avgPartnerSales}
                onChange={(e) => setAvgPartnerSales(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>$0</span>
                <span>$5,000</span>
                <span>$10,000</span>
              </div>
            </div>

            {/* Qualified Tier Badge */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {language === 'am' ? 'የሚደርሱበት የአጋርነት ደረጃ፡' : 'Qualified Performance Tier:'}
              </span>
              <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${qualifiedTier.badgeColor} bg-slate-950 border`}>
                {t[qualifiedTier.nameKey] || qualifiedTier.badge} ({qualifiedTier.directCommission}% + {qualifiedTier.teamBonus}% Override)
              </span>
            </div>

          </div>

          {/* Right Column: Calculations */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-1">
                {language === 'am' ? 'የሚገመት ወርሃዊ አጠቃላይ ገቢ' : 'Estimated Monthly Payout'}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                ${totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="text-xs text-slate-400 font-normal ml-1">/mo</span>
              </div>

              <div className="mt-2 text-xs text-slate-400">
                <span>Annualized Total: </span>
                <span className="font-mono font-bold text-slate-200">
                  ${totalAnnual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} /year
                </span>
              </div>

              <div className="mt-6 space-y-3 pt-4 border-t border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Direct Sales Margin ({qualifiedTier.directCommission}%):</span>
                  <span className="font-mono font-bold text-amber-400">
                    ${directCommission.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Syndicate Overrides ({qualifiedTier.teamBonus}%):</span>
                  <span className="font-mono font-bold text-emerald-400">
                    ${teamOverride.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Platform Profit Pool ({qualifiedTier.annualProfitShare}%):</span>
                  <span className="font-mono font-bold text-cyan-400">
                    ${poolDividend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href="#products"
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{language === 'am' ? 'ምርቶችን መርጠው ሽያጭ ይጀምሩ' : 'Start Distributing Products'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
