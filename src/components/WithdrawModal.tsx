import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ShieldCheck, ArrowDownCircle, Printer } from 'lucide-react';
import { WithdrawalRequest } from '../types';

export const WithdrawModal: React.FC = () => {
  const {
    t,
    language,
    walletBalance,
    withdrawModalOpen,
    setWithdrawModalOpen,
    requestWithdrawal
  } = useApp();

  const [amount, setAmount] = useState<string>('500');
  const [method, setMethod] = useState<string>('cbe_telebirr');
  const [accountInfo, setAccountInfo] = useState<string>('CBE Account 100028472910 / Telebirr +251 91 123 4567');
  const [completedTx, setCompletedTx] = useState<WithdrawalRequest | null>(null);

  if (!withdrawModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const methodLabels: Record<string, string> = {
      cbe_telebirr: t.payCbeTelebirr || 'Commercial Bank of Ethiopia (CBE) / Telebirr',
      wise: t.payWise || 'Wise Multi-Currency International Wire',
      usdt: t.payUsdt || 'Tether USDT (TRC-20)',
      paypal: t.payPayPal || 'PayPal Business',
      bank_swift: 'SWIFT International Wire'
    };

    const tx = requestWithdrawal(numAmount, methodLabels[method] || method, accountInfo);
    if (tx) {
      setCompletedTx(tx);
    }
  };

  const handleClose = () => {
    setCompletedTx(null);
    setWithdrawModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
              Direct Treasury Disbursement
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {t.withdrawTitle}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voucher View on Completion */}
        {completedTx ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-600 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">
                {language === 'am' ? 'ክፍያው በተሳካ ሁኔታ ተፈጽሟል!' : 'Disbursement Approved & Transferred!'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {t.withdrawSuccess}
              </p>
            </div>

            {/* Official Electronic Voucher */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Voucher ID:</span>
                <span className="text-white font-bold">{completedTx.id}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Disbursed Amount:</span>
                <span className="text-emerald-400 font-bold text-sm">${completedTx.amount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Settlement Rail:</span>
                <span className="text-white truncate max-w-[200px]">{completedTx.method}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Destination:</span>
                <span className="text-slate-300 truncate max-w-[200px]">{completedTx.destinationAccount}</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800/80">
                <span>Treasury Hash:</span>
                <span className="text-amber-400 text-[11px] truncate max-w-[200px]">{completedTx.txHash}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleClose}
                className="px-5 py-2 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg transition-colors"
              >
                {language === 'am' ? 'ወደ ዳሽቦርድ ተመለስ' : 'Return to Workspace'}
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
            
            {/* Balance Banner */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <span className="text-slate-400">{t.walletAvailable}:</span>
              <span className="font-mono text-base font-bold text-emerald-400">
                ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Amount */}
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                {t.withdrawAmount}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-mono text-sm">$</span>
                <input
                  type="number"
                  min={10}
                  max={walletBalance}
                  step={10}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="flex justify-end gap-2 mt-1">
                {[100, 500, 1000, walletBalance].map((presetVal, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAmount(presetVal.toString())}
                    className="text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 bg-slate-800 rounded"
                  >
                    {i === 3 ? (language === 'am' ? 'ሙሉውን' : 'Max') : `$${presetVal}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div>
              <label className="text-slate-300 font-medium block mb-1.5">
                {t.paymentMethod}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'cbe_telebirr', label: t.payCbeTelebirr || 'CBE / Telebirr (Ethiopia)', speed: '15m Express' },
                  { id: 'wise', label: t.payWise || 'Wise Multi-Currency Wire', speed: '1-2h Direct' },
                  { id: 'usdt', label: t.payUsdt || 'Tether USDT (TRC-20)', speed: '5m Instant' },
                  { id: 'paypal', label: t.payPayPal || 'PayPal Business', speed: 'Instant' },
                  { id: 'bank_swift', label: 'SWIFT Institutional Wire', speed: '24h Bank Rail' }
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      method === item.id
                        ? 'bg-slate-800/80 border-emerald-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="withdraw_rail"
                        checked={method === item.id}
                        onChange={() => setMethod(item.id)}
                        className="accent-emerald-400"
                      />
                      <span className="font-medium text-xs text-slate-200">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">{item.speed}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Recipient Account Details */}
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                {t.accountInfo}
              </label>
              <input
                type="text"
                required
                value={accountInfo}
                onChange={(e) => setAccountInfo(e.target.value)}
                placeholder="Account / Phone / IBAN / Wallet Address"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Protection Notice */}
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct custodial release through verified banking partners with zero deduction fees.</span>
            </div>

            {/* Actions */}
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
                className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowDownCircle className="w-4 h-4" />
                <span>{t.btnSubmitWithdraw}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
