import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES_CONFIG } from '../data/translations';
import { Language } from '../types';
import { Globe, Wallet, ChevronDown, PlusCircle, ArrowUpRight, Shield } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const {
    language,
    setLanguage,
    langConfig,
    t,
    walletBalance,
    currentTierInfo,
    setMerchantModalOpen,
    setWithdrawModalOpen,
    setAdminConsoleOpen
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left font-bold text-lg tracking-tight text-white flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <span className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
            N
          </span>
          <span className="group-hover:text-amber-400 transition-colors">
            NexusGlobal<span className="text-amber-400 font-light ml-1 text-sm">Alliance</span>
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
          <button
            onClick={() => onNavigate('products')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none"
          >
            {t.navProducts}
          </button>
          <button
            onClick={() => onNavigate('tiers')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none"
          >
            {t.navPartnership}
          </button>
          <button
            onClick={() => onNavigate('calculator')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none"
          >
            {t.navCalculator}
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none"
          >
            {t.navDashboard}
          </button>
          <button
            onClick={() => onNavigate('compliance')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus:outline-none"
          >
            {t.navCompliance}
          </button>
        </nav>

        {/* Zone 3: 7-Language selector, Wallet, and Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* 7-Language Dropdown Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors whitespace-nowrap shrink-0"
              title="Select Language / ቋንቋ ይምረጡ"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{langConfig.flag}</span>
              <span className="hidden sm:inline">{langConfig.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-1 z-50 animate-in fade-in duration-150">
                {LANGUAGES_CONFIG.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      language === lang.code ? 'text-amber-400 font-semibold bg-slate-800/50' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* In-App PWA Install Button */}
          <PWAInstallButton />

          {/* Admin / Owner Console Trigger */}
          <button
            onClick={() => setAdminConsoleOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-800/80 rounded-lg hover:bg-amber-900/40 transition-colors"
            title="Owner & Admin Control Console"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{language === 'am' ? 'አስተዳዳሪ' : 'Admin'}</span>
          </button>

          {/* List Product Button */}
          <button
            onClick={() => setMerchantModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
            title="List your product"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.navMerchant}</span>
          </button>

          {/* Active Balance Pill */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-lg hover:bg-emerald-900/40 transition-colors"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => onNavigate('products')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>{t.btnOrderNow}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>
    </header>
  );
};
