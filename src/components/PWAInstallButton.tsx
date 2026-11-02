import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import { Download, Smartphone, X, Check, Share, PlusSquare } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'navbar' | 'hero' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'navbar'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language } = useApp();
  const [showGuideModal, setShowGuideModal] = useState(false);

  // If already running in standalone mode (already installed), hide
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuideModal(true);
    }
  };

  const getLabel = () => {
    switch (language) {
      case 'am':
        return 'አፑን ጫን (Install App)';
      case 'om':
        return 'Appii Fe’aa (Install)';
      case 'fr':
        return 'Installer l’App';
      case 'de':
        return 'App Installieren';
      case 'zh':
        return '安装应用程序';
      case 'ar':
        return 'تثبيت التطبيق';
      default:
        return 'Install App';
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={
          className ||
          `flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-sm ${
            variant === 'hero'
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-3 text-sm'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
          }`
        }
        title="Install as Android / iOS / Desktop App"
      >
        <Download className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
        <span className="whitespace-nowrap">{getLabel()}</span>
      </button>

      {/* Guide Modal for iOS or manual install */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-left relative animate-in fade-in duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'am' ? 'አፕሊኬሽኑን በስልክዎ ላይ መጫን' : 'Install App on Your Device'}
                </h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-300">
              {isIOS ? (
                // iOS Safari Steps
                <>
                  <p className="text-slate-400">
                    {language === 'am'
                      ? 'በ iPhone ወይም iPad ላይ ለመጫን የሚከተሉትን ቀላል ደረጃዎች ይከተሉ፡'
                      : 'To install on iPhone or iPad Safari:'}
                  </p>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-[11px]">1</span>
                      <span>{language === 'am' ? 'በSafari ታች ያለውን የማጋሪያ (Share) ምልክት ይጫኑ' : 'Tap the Share icon in Safari'}</span>
                      <Share className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-[11px]">2</span>
                      <span>{language === 'am' ? 'ወደ ታች ዝቅ ብለው "Add to Home Screen" የሚለውን ይምረጡ' : 'Scroll and select "Add to Home Screen"'}</span>
                      <PlusSquare className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                </>
              ) : (
                // Android Chrome / Desktop Steps
                <>
                  <p className="text-slate-400">
                    {language === 'am'
                      ? 'በስልክዎ Chrome ላይ በቀላሉ አፕሊኬሽን አድርገው ለመጫን፡'
                      : 'To add to your phone or computer home screen:'}
                  </p>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-[11px]">1</span>
                      <span>{language === 'am' ? 'ከላይ በቀኝ በኩል ያለውን የChrome ባለ 3-ነጥብ ሜኑ ይጫኑ' : 'Tap the 3-dots Chrome browser menu (⋮)'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-[11px]">2</span>
                      <span>{language === 'am' ? '«Install App» ወይም «Add to Home screen» የሚለውን ይምረጡ' : 'Select "Install App" or "Add to Home screen"'}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              {language === 'am' ? 'ተረድቻለሁ (ገባኝ)' : 'Got it!'}
            </button>

          </div>
        </div>
      )}
    </>
  );
};
