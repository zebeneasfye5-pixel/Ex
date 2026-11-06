import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, ShieldCheck, ArrowRight, CheckCircle2, Building, DollarSign, Send, Globe2 } from 'lucide-react';
import { FreelanceContract } from '../types';

export const B2BContractsSection: React.FC = () => {
  const {
    b2bContracts,
    applyForContract,
    submitLeadInquiry,
    language
  } = useApp();

  // Application Modal state
  const [selectedContract, setSelectedContract] = useState<FreelanceContract | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [proposalBrief, setProposalBrief] = useState('');

  // Enterprise Lead Inquiry State
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('Enterprise AI & Workflow Automation');
  const [clientBudget, setClientBudget] = useState('$5,000 - $10,000');
  const [clientNotes, setClientNotes] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContract || !applicantName || !applicantEmail) return;
    applyForContract(selectedContract.id, applicantName, applicantEmail);
    setSelectedContract(null);
    setApplicantName('');
    setApplicantEmail('');
    setProposalBrief('');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    submitLeadInquiry({
      fullName: clientName,
      organization: clientCompany || 'Independent Enterprise',
      email: clientEmail,
      phone: clientPhone,
      serviceNeeded,
      estimatedBudget: clientBudget,
      notes: clientNotes
    });

    setLeadSuccess(true);
    setClientName('');
    setClientCompany('');
    setClientEmail('');
    setClientPhone('');
    setClientNotes('');
    setTimeout(() => setLeadSuccess(false), 5000);
  };

  return (
    <section id="contracts-section" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-slate-900/60">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Institutional B2B Services & Export Brokerage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'am'
                ? 'የከፍተኛ ዋጋ B2B ውሎች እና የአለም አቀፍ ንግድ ማዕከል'
                : 'High-Ticket Enterprise Mandates & Direct B2B Contracts'}
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              {language === 'am'
                ? 'በአለም አቀፍ ደረጃ የተረጋገጡ ትልልቅ የቴክኖሎጂ፣ የኤክስፖርት እና የኦቶሜሽን ስራዎች። አፊሊየቶች ደንበኛ በማገናኘት ከ$450 እስከ $1,700 ኮሚሽን ያገኛሉ፤ ድርጅቶችም ጥራት ያለው ስራ ያሰራሉ።'
                : 'Verified multi-thousand-dollar contracts funded in institutional escrow. Earn 15% - 20% deal finder margins or execute direct corporate contracts.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Escrow Protected</span>
            </span>
          </div>
        </div>

        {/* 3 Active B2B Mandates Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {b2bContracts.map((contract) => (
            <div
              key={contract.id}
              className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                    {contract.id} · {contract.duration}
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded">
                    ${contract.budget.toLocaleString()} USD
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {contract.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    <span>{contract.clientName}</span>
                    <span>·</span>
                    <span className="font-mono">{contract.clientCountry}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  {contract.scope}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-900">
                  <span>Applicants: {contract.applicationsCount} Vetted</span>
                  <span className="text-emerald-400">Finder Cut: ${(contract.budget * 0.15).toFixed(0)}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setSelectedContract(contract)}
                  className="w-full py-2.5 px-4 text-xs font-bold bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>{language === 'am' ? 'ማመልከቻ አስገባ / ስራውን ውሰድ' : 'Submit Proposal / Bid'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Client Intake Box (Post a Mandate or Custom Project) */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-2">
              <Globe2 className="w-4 h-4" />
              <span>Corporate Client RFP Portal</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {language === 'am'
                ? 'ድርጅትዎን የሚያሳድግ የB2B ስራ ማሰራት ወይም ኤክስፖርት ማገናኘት ይፈልጋሉ?'
                : 'Need a Custom Enterprise Solution, Sourcing Mandate, or Global Export Setup?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-6">
              {language === 'am'
                ? 'የሚፈልጉትን የቴክኖሎጂ ኦቶሜሽን፣ የሶፍትዌር ወይም የውጭ ንግድ ማስተሳሰሪያ ጥያቄ ያስገቡ። የመድረኩ ማኔጅመንት በ4 ሰአት ውስጥ በስልክ አግኝቶ ህጋዊ ውል ያዘጋጅልዎታል።'
                : 'Submit your requirements directly to platform administration. Our corporate desk connects you with certified experts and drafts escrow-protected milestones.'}
            </p>

            {leadSuccess ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-xl flex items-center gap-3 text-xs text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {language === 'am'
                    ? 'ጥያቄዎ በተሳካ ሁኔታ ደርሷል! የመድረኩ ማኔጅመንት በአጭር ጊዜ ውስጥ ይደውልልዎታል።'
                    : 'Your enterprise inquiry has been received! Our senior trade desk will contact you via phone and email.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">
                      {language === 'am' ? 'የእርስዎ ሙሉ ስም' : 'Your Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Yonas Tadesse"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-medium block mb-1">
                      {language === 'am' ? 'የድርጅት ስም' : 'Company / Organization Name'}
                    </label>
                    <input
                      type="text"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      placeholder="e.g. Horn Commodities & Logistics Ltd"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">
                      {language === 'am' ? 'ኢሜይል' : 'Work Email'}
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="contact@enterprise.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-medium block mb-1">
                      {language === 'am' ? 'ስልክ ቁጥር (WhatsApp / Telegram)' : 'Direct Phone / WhatsApp'}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+251 91 123 4567"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">
                      {language === 'am' ? 'የሚፈለገው የአገልግሎት አይነት' : 'Required Capability'}
                    </label>
                    <select
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans focus:outline-none focus:border-amber-400"
                    >
                      <option value="Enterprise AI & Workflow Automation">Enterprise AI & Workflow Automation</option>
                      <option value="Global Export & Commodity Buyer Matching">Global Export & Commodity Buyer Matching</option>
                      <option value="Fintech & Mobile Banking Gateway Integration">Fintech & Mobile Banking Gateway Integration</option>
                      <option value="Custom Cross-Border E-Commerce Infrastructure">Custom Cross-Border E-Commerce Infrastructure</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-medium block mb-1">
                      {language === 'am' ? 'የታሰበ በጀት' : 'Projected Budget Range'}
                    </label>
                    <select
                      value={clientBudget}
                      onChange={(e) => setClientBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans focus:outline-none focus:border-amber-400"
                    >
                      <option value="$3,000 - $5,000">$3,000 - $5,000 USD</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000 USD</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000 USD</option>
                      <option value="$25,000+">$25,000+ USD (Custom SLA)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">
                    {language === 'am' ? 'የስራው ዝርዝር ማብራሪያ' : 'Project Scope & Requirements'}
                  </label>
                  <textarea
                    rows={3}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Briefly describe what your organization needs..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{language === 'am' ? 'የድርጅት ጥያቄውን ላክ' : 'Submit Enterprise RFP'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Contract Proposal Application Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-base font-bold text-white mb-1">
              Apply for Contract: {selectedContract.title}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Budget: <span className="text-emerald-400 font-bold font-mono">${selectedContract.budget.toLocaleString()} USD</span> · Escrow Verified
            </p>

            <form onSubmit={handleApply} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Your Full Name or Firm</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Dawit Kebede / Apex Labs"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Email for Escrow Communications</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="dawit@apexlabs.io"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Brief Technical Proposal & Delivery Timeline</label>
                <textarea
                  rows={3}
                  value={proposalBrief}
                  onChange={(e) => setProposalBrief(e.target.value)}
                  placeholder="Summarize your tech stack, past implementations, and expected delivery dates..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedContract(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
