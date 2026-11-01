import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ShieldCheck, Lock, CreditCard, Download, ExternalLink } from 'lucide-react';
import { CustomerOrder } from '../types';

export const CustomerCheckoutModal: React.FC = () => {
  const {
    selectedProductForCheckout,
    setSelectedProductForCheckout,
    placeCustomerOrder,
    t,
    language
  } = useApp();

  const [customerName, setCustomerName] = useState('Zebene Commercial Co.');
  const [customerEmail, setCustomerEmail] = useState('zebeneasfye5@gmail.com');
  const [paymentRail, setPaymentRail] = useState('payCbeTelebirr');
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  if (!selectedProductForCheckout) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;

    const paymentLabel = t[paymentRail] || paymentRail;
    const order = placeCustomerOrder(
      selectedProductForCheckout.id,
      customerName,
      customerEmail,
      paymentLabel
    );

    if (order) {
      setCompletedOrder(order);
    }
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setSelectedProductForCheckout(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit TLS Encrypted Order Checkout</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {t.checkoutTitle}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Success Invoice View */}
        {completedOrder ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">
                {t.orderSuccessTitle}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {t.affiliateCreditedNotice}
              </p>
            </div>

            {/* Official Electronic Voucher */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-left text-xs font-mono space-y-2.5">
              <div className="flex justify-between text-slate-400">
                <span>Order Reference:</span>
                <span className="text-white font-bold">{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Product Item:</span>
                <span className="text-white font-semibold truncate max-w-[200px]">{completedOrder.productTitle}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Amount Paid:</span>
                <span className="text-emerald-400 font-bold text-sm">${completedOrder.amount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Settlement Channel:</span>
                <span className="text-slate-300 truncate max-w-[200px]">{completedOrder.paymentMethod}</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">{t.orderLicenseLabel}</span>
                <div className="p-2 bg-slate-900 border border-emerald-800/80 rounded text-emerald-400 font-bold text-center select-all">
                  {completedOrder.licenseKeyOrTracking}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleClose}
                className="px-5 py-2 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg transition-colors"
              >
                {language === 'am' ? 'እሺ፣ ተጠናቋል' : 'Done & Return'}
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
            
            {/* Selected Product Summary Box */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block text-sm">
                  {selectedProductForCheckout.title}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  SKU: {selectedProductForCheckout.sku} · {selectedProductForCheckout.vendor}
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono text-white">
                  ${selectedProductForCheckout.price.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 block font-mono">Verified Purchase</span>
              </div>
            </div>

            {/* Customer Name */}
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                {t.customerName}
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Samuel Abera / Global Enterprise Ltd"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Customer Email */}
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                {t.customerEmail}
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="customer@domain.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-slate-300 font-medium block mb-1.5">
                {t.paymentMethod}
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'payCbeTelebirr', label: t.payCbeTelebirr, badge: 'Direct Ethiopia' },
                  { id: 'payCard', label: t.payCard, badge: 'Global Card' },
                  { id: 'payUsdt', label: t.payUsdt, badge: 'Instant Crypto' },
                  { id: 'payWise', label: t.payWise, badge: 'Wire' },
                  { id: 'payPayPal', label: t.payPayPal, badge: 'PayPal' }
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      paymentRail === item.id
                        ? 'bg-slate-800/80 border-amber-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="checkout_rail"
                        checked={paymentRail === item.id}
                        onChange={() => setPaymentRail(item.id)}
                        className="accent-amber-400"
                      />
                      <span className="font-medium text-xs text-slate-200">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{item.badge}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buyer Protection Guarantee */}
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full institutional buyer protection with 30-day money-back escrow backing.</span>
            </div>

            {/* Action Buttons */}
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
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <CreditCard className="w-4 h-4" />
                <span>{t.btnConfirmOrder} (${selectedProductForCheckout.price.toLocaleString()})</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
