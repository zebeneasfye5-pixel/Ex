import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Building2, UploadCloud, CheckCircle } from 'lucide-react';

export const MerchantModal: React.FC = () => {
  const { merchantModalOpen, setMerchantModalOpen, submitMerchantProduct, t, language } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Enterprise SaaS');
  const [price, setPrice] = useState('299');
  const [commissionRate, setCommissionRate] = useState('35');
  const [vendorName, setVendorName] = useState('Addis Cloud Soft');
  const [vendorEmail, setVendorEmail] = useState('vendor@addiscloud.com');
  const [fulfillmentUrl, setFulfillmentUrl] = useState('https://app.addiscloud.com/portal');
  const [submitted, setSubmitted] = useState(false);

  if (!merchantModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    submitMerchantProduct(
      title,
      category,
      parseFloat(price),
      parseFloat(commissionRate),
      vendorName,
      vendorEmail,
      fulfillmentUrl
    );
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setMerchantModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>Institutional Merchant Protocol</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {t.merchantTitle}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-cyan-950/80 border border-cyan-500 flex items-center justify-center text-cyan-400 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">
              {language === 'am' ? 'ምርትዎ ለግምገማ ቀርቧል!' : 'Product Submitted for Compliance Audit!'}
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              {t.merchantSuccess}
            </p>
            <button
              onClick={handleClose}
              className="px-5 py-2 text-xs font-semibold bg-cyan-400 text-slate-950 rounded-lg hover:bg-cyan-300 transition-colors"
            >
              {language === 'am' ? 'ዝጋ' : 'Close'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.merchantSubtitle}
            </p>

            <div>
              <label className="text-slate-300 font-medium block mb-1">
                {t.merchantProductName}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. NextGen B2B Billing API"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  {t.merchantPrice}
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  {t.merchantCommission}
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  max={60}
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  {t.merchantVendor}
                </label>
                <input
                  type="text"
                  required
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Vendor Work Email
                </label>
                <input
                  type="email"
                  required
                  value={vendorEmail}
                  onChange={(e) => setVendorEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">
                {t.merchantFulfillmentUrl}
              </label>
              <input
                type="url"
                required
                value={fulfillmentUrl}
                onChange={(e) => setFulfillmentUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-slate-400 hover:text-white"
              >
                {language === 'am' ? 'ሰርዝ' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{t.btnSubmitProduct}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
