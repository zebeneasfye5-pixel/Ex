import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, QrCode, Share2, Sparkles, ShieldCheck } from 'lucide-react';

export const AffiliateDistributionModal: React.FC = () => {
  const { selectedProductForAffiliate, setSelectedProductForAffiliate, t, language, currentTierInfo } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [campaignTag, setCampaignTag] = useState('direct_social');

  if (!selectedProductForAffiliate) return null;

  const partnerId = 'NEXUS-7849';
  const trackingUrl = `https://nexusglobal.org/order/${selectedProductForAffiliate.id}?ref=${partnerId}&utm_campaign=${campaignTag}`;
  
  const pitchTexts: Record<string, string> = {
    am: `🚀 በዓለም አቀፍ ደረጃ የታመነውን ${selectedProductForAffiliate.title} ይዘዙ። ፈጣን የፈቃድ ቁልፍ እና የባንክ ኤስክሮው ጥበቃ ያለው፡\n👉 ${trackingUrl}`,
    en: `🚀 Verified enterprise deployment: ${selectedProductForAffiliate.title}. Direct manufacturer guarantee & instant delivery:\n👉 ${trackingUrl}`,
    om: `🚀 Oomisha ammayyaa fi mirkanaa’e ${selectedProductForAffiliate.title} kallattiin ajajaa. Wabiin eegame:\n👉 ${trackingUrl}`,
    fr: `🚀 Solution certifiée pour entreprise : ${selectedProductForAffiliate.title}. Garantie fabricant et livraison immédiate :\n👉 ${trackingUrl}`,
    de: `🚀 Geprüfte Unternehmenslösung: ${selectedProductForAffiliate.title}. Herstellergarantie und sofortige Bereitstellung:\n👉 ${trackingUrl}`,
    zh: `🚀 官方认证企业解决方案：${selectedProductForAffiliate.title}。原厂质保与即时交付：\n👉 ${trackingUrl}`,
    ar: `🚀 حل تقني معتمد للمؤسسات: ${selectedProductForAffiliate.title}. ضمان معتمد وتسليم فوري:\n👉 ${trackingUrl}`
  };

  const currentPitch = pitchTexts[language] || pitchTexts['en'];

  const copyLink = () => {
    navigator.clipboard.writeText(trackingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyPitch = () => {
    navigator.clipboard.writeText(currentPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner Attribution Engine</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {t.affiliateModalTitle}
            </h3>
          </div>
          <button
            onClick={() => setSelectedProductForAffiliate(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Product Banner */}
        <div className="my-4 p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-white block">{selectedProductForAffiliate.title}</span>
            <span className="text-slate-400 font-mono">Retail: ${selectedProductForAffiliate.price}</span>
          </div>
          <div className="text-right">
            <span className="text-emerald-400 font-mono font-bold text-sm">
              +{currentTierInfo.directCommission}% Margin
            </span>
            <span className="text-[11px] text-slate-500 block">
              (${((selectedProductForAffiliate.price * currentTierInfo.directCommission) / 100).toFixed(2)})
            </span>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 text-xs">
          
          {/* Tracking URL */}
          <div>
            <label className="text-slate-300 font-medium block mb-1">
              {t.affiliateUrlLabel}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={trackingUrl}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none"
              />
              <button
                onClick={copyLink}
                className="px-3.5 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? t.copiedLinkBtn : t.copyLinkBtn}</span>
              </button>
            </div>
          </div>

          {/* Campaign UTM Tag */}
          <div>
            <label className="text-slate-400 block mb-1">
              {t.campaignTagLabel}
            </label>
            <input
              type="text"
              value={campaignTag}
              onChange={(e) => setCampaignTag(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
              placeholder="e.g. linkedin_b2b, telegram_channel, direct_client"
              className="w-full px-3 py-1.5 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Pitch Script */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-300 font-medium">
                {t.readyPitchLabel}
              </span>
              <button
                onClick={copyPitch}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                {copiedPitch ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPitch ? t.copiedPitchBtn : t.copyPitchBtn}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={3}
              value={currentPitch}
              className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 resize-none font-sans leading-relaxed"
            />
          </div>

          {/* Compliance note */}
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Attribution cookies valid for 90 days with automated first-touch settlement.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setSelectedProductForAffiliate(null)}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {language === 'am' ? 'ዝጋ' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
