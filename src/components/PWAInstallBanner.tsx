import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const PWAInstallBanner: React.FC = () => {
  const { isInstalled } = usePWAInstall();
  const { language } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-900/95 border border-amber-500/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shrink-0 shadow-md">
            N
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <span>NexusGlobal App</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-tight">
              {language === 'am'
                ? 'አፕሊኬሽኑን በስልክዎ ላይ ጭነው ያለ ኢንተርኔት መዘግየት ይጠቀሙ።'
                : 'Install on your home screen for instant native app access.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
        <button
          onClick={() => setDismissed(true)}
          className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-slate-200"
        >
          {language === 'am' ? 'ቆይተው' : 'Later'}
        </button>
        <PWAInstallButton
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors shadow-sm"
        />
      </div>
    </div>
  );
};
