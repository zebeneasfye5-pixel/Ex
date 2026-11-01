import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS_CATALOG } from '../data/catalog';
import { Product } from '../types';
import { ShoppingBag, Star, Link as LinkIcon, ShoppingCart, ShieldCheck } from 'lucide-react';

export const MarketplaceSection: React.FC = () => {
  const {
    t,
    language,
    currentTierInfo,
    setSelectedProductForCheckout,
    setSelectedProductForAffiliate
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS_CATALOG
    : PRODUCTS_CATALOG.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-16 bg-slate-900/50 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span>{language === 'am' ? 'የተረጋገጡ አለም አቀፍ ምርቶች' : 'Vetted Commercial Inventory'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.marketTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
              {t.marketSubtitle}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'saas', label: t.filterSaas },
              { id: 'ecommerce', label: t.filterEcommerce },
              { id: 'digital', label: t.filterDigital },
              { id: 'b2b', label: t.filterB2B }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => {
            const partnerCommission = Number(((product.price * currentTierInfo.directCommission) / 100).toFixed(2));

            return (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col hover:border-slate-700 transition-all duration-200"
              >
                {/* Product Media */}
                <div className="relative h-56 bg-slate-950 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Category unboxed tag */}
                  <div className="absolute top-3 left-3 text-xs font-medium text-slate-300 bg-slate-900/85 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-800">
                    {t[product.categoryLabelKey] || product.category}
                  </div>

                  {/* Vendor / Rating */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="truncate max-w-[200px]">{product.vendor}</span>
                    <div className="flex items-center gap-1 font-mono text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed metadata with separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span className="font-mono text-slate-500">SKU: {product.sku}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.vendorCountry}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{product.salesCount.toLocaleString()} orders</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                      {product.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {product.descriptionKey}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-1 mb-5 text-xs text-slate-400 border-l border-slate-800 pl-3">
                      {product.featuresKeys.map((feat, idx) => (
                        <li key={idx} className="truncate">
                          · {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & Commercial Actions */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[11px] text-slate-400 block">{t.priceLabel}</span>
                        <span className="text-xl font-bold font-mono text-white">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-amber-400 font-medium block">
                          {t.marginLabel} ({currentTierInfo.directCommission}%)
                        </span>
                        <span className="text-xl font-bold font-mono text-emerald-400">
                          +${partnerCommission.toFixed(2)}
                          {product.isRecurring && <span className="text-xs font-normal text-slate-400">/mo</span>}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons: Direct Buy vs Partner Link */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedProductForCheckout(product)}
                        className="px-3.5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{t.btnBuyDirect}</span>
                      </button>

                      <button
                        onClick={() => setSelectedProductForAffiliate(product)}
                        className="px-3.5 py-2.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.btnGetPartnerLink}</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
