import { useState } from 'react';
import CircuitField from './CircuitField';
import Logo from './Logo';
import { CheckIcon } from './Icons';

const GENERIC_DOMAINS = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
  'icloud.com', 'aol.com', 'live.com', 'protonmail.com',
];

const isGenericDomain = (email) => {
  const domain = email?.split('@')[1]?.toLowerCase().trim();
  return GENERIC_DOMAINS.includes(domain);
};

const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="brand-sans block text-[10px] tracking-[0.2em] md:tracking-[0.24em] text-[#5a6b85] font-medium mb-2">
      {label}
    </span>
    {children}
    {error && (
      <span className="brand-sans block mt-1.5 text-[11px] text-[#c8302a]">{error}</span>
    )}
  </label>
);

const inputClass =
  'brand-sans w-full px-3.5 py-3 text-[13px] text-[#0a1e3f] bg-[#fbfcfe] border border-[#dde3ee] rounded-sm ' +
  'placeholder:text-[#aab4c5] focus:outline-none focus:border-[#1e4ed8] focus:ring-2 focus:ring-[#1e4ed8]/15 focus:bg-white ' +
  'transition-all duration-300';

const selectClass = inputClass + ' appearance-none cursor-pointer pr-10 ' +
  'bg-[url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%235a6b85\' stroke-width=\'2\'><polyline points=\'6 9 12 15 18 9\'/></svg>")] ' +
  'bg-no-repeat bg-[right_14px_center]';

const PrimaryButton = ({ children, ...props }) => (
  <button
    {...props}
    className="group relative overflow-hidden w-full mt-7 md:mt-8 px-7 py-3.5 md:py-4 rounded-sm
               bg-linear-to-b from-[#1e4ed8] to-[#1739b8]
               hover:from-[#3b6fe5] hover:to-[#1e4ed8]
               transition-all duration-500
               shadow-[0_8px_24px_-8px_rgba(30,78,216,0.40)]
               hover:shadow-[0_12px_28px_-8px_rgba(30,78,216,0.50)]"
  >
    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    <span className="brand-sans relative text-white text-[11px] md:text-[12px] tracking-[0.2em] md:tracking-[0.22em] font-semibold">
      {children}
    </span>
  </button>
);

const CorporateGate = ({ onSubmit }) => {
  const [form, setForm] = useState({ entity: '', rep: '', email: '', volume: '' });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm({ ...form, [k]: v });

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.entity) next.entity = 'Legal entity name is required.';
    if (!form.rep) next.rep = 'Representative name & title required.';
    if (!form.email) next.email = 'Corporate email is required.';
    else if (!form.email.includes('@')) next.email = 'Enter a valid email.';
    else if (isGenericDomain(form.email))
      next.email = 'Generic domains are not permitted. Use your corporate email.';
    if (!form.volume) next.volume = 'Select a projected volume bracket.';

    if (Object.keys(next).length) return setErrors(next);
    onSubmit({ type: 'corporate', email: form.email });
  };

  return (
    <form onSubmit={submit} className="panel p-6 md:p-8">
      <div className="flex items-center justify-between gap-3 mb-2">
        <h2 className="brand-serif text-[20px] md:text-[22px] text-[#0a1e3f] tracking-tight">
          Corporate <span className="italic font-light text-[#1e4ed8]">Intake</span>
        </h2>
        <span className="brand-sans shrink-0 text-[9px] tracking-[0.24em] md:tracking-[0.28em] text-[#1e4ed8]
                         border border-[#1e4ed8]/30 bg-[#1e4ed8]/5 px-2 md:px-2.5 py-1 rounded-sm font-semibold">
          ENTERPRISE
        </span>
      </div>
      <p className="brand-sans text-[12px] text-[#5a6b85] mb-6 md:mb-7 leading-relaxed">
        For institutional treasuries and regulated entities.
      </p>

      <div className="space-y-4 md:space-y-5">
        <Field label="CORPORATE LEGAL ENTITY NAME" error={errors.entity}>
          <input type="text" className={inputClass}
                 placeholder="e.g. Zenith Capital Partners Ltd"
                 value={form.entity} onChange={(e) => set('entity', e.target.value)} />
        </Field>

        <Field label="AUTHORIZED REPRESENTATIVE / TITLE" error={errors.rep}>
          <input type="text" className={inputClass}
                 placeholder="e.g. Kofi Appiah, Chief Treasury Officer"
                 value={form.rep} onChange={(e) => set('rep', e.target.value)} />
        </Field>

        <Field label="OFFICIAL CORPORATE EMAIL" error={errors.email}>
          <input type="email" className={inputClass}
                 placeholder="treasury@yourcompany.com.gh"
                 value={form.email} onChange={(e) => set('email', e.target.value)} />
          <span className="brand-sans block mt-1.5 text-[10px] text-[#8a98b0] tracking-wide">
            Generic domains (Gmail, Yahoo, Outlook) are automatically rejected.
          </span>
        </Field>

        <Field label="PROJECTED MONTHLY LIQUIDATION VOLUME" error={errors.volume}>
          <select className={selectClass} value={form.volume}
                  onChange={(e) => set('volume', e.target.value)}>
            <option value="">Select a bracket…</option>
            <option value="lt_100k">Below $100,000 USD</option>
            <option value="100k_500k">$100,000 – $500,000 USD</option>
            <option value="500k_1m">$500,000 – $1,000,000 USD</option>
            <option value="1m_5m">$1,000,000 – $5,000,000 USD</option>
            <option value="gt_5m">Above $5,000,000 USD</option>
          </select>
        </Field>
      </div>

      <PrimaryButton type="submit">SUBMIT CORPORATE DOSSIER</PrimaryButton>
    </form>
  );
};

const HnwiGate = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', country: '', email: '', size: '', attested: false });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm({ ...form, [k]: v });

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name) next.name = 'Full legal name is required.';
    if (!form.country) next.country = 'Country of residence required.';
    if (!form.email) next.email = 'Primary email is required.';
    else if (!form.email.includes('@')) next.email = 'Enter a valid email.';
    if (!form.size) next.size = 'Provide an intended transaction size.';
    if (!form.attested) next.attested = 'You must affirm the attestation.';

    if (Object.keys(next).length) return setErrors(next);
    onSubmit({ type: 'hnwi', email: form.email });
  };

  return (
    <form onSubmit={submit} className="panel p-6 md:p-8">
      <div className="flex items-center justify-between gap-3 mb-2">
        <h2 className="brand-serif text-[20px] md:text-[22px] text-[#0a1e3f] tracking-tight">
          Private <span className="italic font-light text-[#1e4ed8]">Wealth</span>
        </h2>
        <span className="brand-sans shrink-0 text-[9px] tracking-[0.24em] md:tracking-[0.28em] text-[#1e4ed8]
                         border border-[#1e4ed8]/30 bg-[#1e4ed8]/5 px-2 md:px-2.5 py-1 rounded-sm font-semibold">
          HNWI
        </span>
      </div>
      <p className="brand-sans text-[12px] text-[#5a6b85] mb-6 md:mb-7 leading-relaxed">
        For private wealth clients and high-net-worth individuals.
      </p>

      <div className="space-y-4 md:space-y-5">
        <Field label="FULL LEGAL NAME" error={errors.name}>
          <input type="text" className={inputClass}
                 placeholder="As shown on government-issued ID"
                 value={form.name} onChange={(e) => set('name', e.target.value)} />
        </Field>

        <Field label="PRIMARY RESIDENCE COUNTRY" error={errors.country}>
          <select className={selectClass} value={form.country}
                  onChange={(e) => set('country', e.target.value)}>
            <option value="">Select country…</option>
            <option value="GH">Ghana</option>
            <option value="NG">Nigeria</option>
            <option value="KE">Kenya</option>
            <option value="ZA">South Africa</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="CH">Switzerland</option>
            <option value="AE">United Arab Emirates</option>
            <option value="SG">Singapore</option>
            <option value="OTHER">Other</option>
          </select>
        </Field>

        <Field label="PRIMARY PERSONAL EMAIL" error={errors.email}>
          <input type="email" className={inputClass}
                 placeholder="your.name@private-domain.com"
                 value={form.email} onChange={(e) => set('email', e.target.value)} />
        </Field>

        <Field label="INTENDED AVERAGE TRANSACTION SIZE (USD)" error={errors.size}>
          <input type="text" className={inputClass}
                 placeholder="e.g. $75,000"
                 value={form.size} onChange={(e) => set('size', e.target.value)} />
        </Field>

        <label className="flex items-start gap-3 cursor-pointer mt-3 group">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[#dde3ee] bg-white accent-[#1e4ed8]"
            checked={form.attested}
            onChange={(e) => set('attested', e.target.checked)}
          />
          <span className="brand-sans text-[12px] text-[#2c3e5c] leading-relaxed group-hover:text-[#0a1e3f] transition-colors">
            I attest that I qualify as a high-net-worth individual under the relevant
            jurisdictional definition and accept the sandbox terms of access.
          </span>
        </label>
        {errors.attested && (
          <span className="brand-sans block text-[11px] text-[#c8302a]">{errors.attested}</span>
        )}
      </div>

      <PrimaryButton type="submit">SUBMIT PRIVATE WEALTH INQUIRY</PrimaryButton>
    </form>
  );
};

const FormContent = ({ logo, onBack, onSubmit }) => (
  <>
    <div className="relative z-10 flex items-center justify-between gap-3 px-5 md:px-14 pt-6 md:pt-8">
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        <Logo src={logo} size={24} glow={false} />
        <span className="brand-sans text-[#0a1e3f] text-[11px] md:text-[12px] tracking-[0.22em] md:tracking-[0.3em] font-semibold truncate">
          EQOWA FINTECH
        </span>
        <span className="hidden md:inline text-[#cbd5e1]">│</span>
        <span className="hidden md:inline brand-serif italic text-[#5a6b85] text-[13px]">
          Sandbox Application Portal
        </span>
      </div>
      <button
        onClick={onBack}
        className="brand-sans shrink-0 text-[10px] tracking-[0.22em] md:tracking-[0.28em] text-[#5a6b85]
                   hover:text-[#1e4ed8] transition-colors duration-300"
      >
        ← BACK
      </button>
    </div>

    <div className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-6 pt-12 md:pt-20 pb-8 md:pb-12 text-center">
      <div className="reveal [animation-delay:80ms] brand-sans text-[10px] tracking-[0.28em] md:tracking-[0.4em] text-[#1e4ed8] font-semibold">
        PHASE 0 · INSTITUTIONAL INTAKE
      </div>

      <h1 className="reveal [animation-delay:220ms] brand-serif mt-4 md:mt-5
                     text-[#0a1e3f] text-4xl sm:text-5xl md:text-6xl tracking-tight">
        Apply for <span className="italic font-light text-[#1e4ed8]">Network Access</span>
      </h1>

      <div className="reveal [animation-delay:340ms] mt-4 md:mt-5 mx-auto h-px w-20 md:w-24
                      bg-linear-to-r from-transparent via-[#1e4ed8]/60 to-transparent" />

      <p className="reveal [animation-delay:440ms] brand-sans mt-5 md:mt-7
                    text-[#2c3e5c] max-w-xl mx-auto leading-relaxed
                    text-[14px] md:text-[15px]">
        Submit your access dossier. Applications are reviewed for SEC Ghana
        Regulatory Sandbox eligibility.
        <br />
        <span className="text-[#5a6b85] text-[12px] md:text-[13px] tracking-wide">
          A Phase 1 access token will follow via secure email upon initial vetting.
        </span>
      </p>
    </div>

    <div className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-6 pb-12 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div className="reveal [animation-delay:580ms]"><CorporateGate onSubmit={onSubmit} /></div>
        <div className="reveal [animation-delay:720ms]"><HnwiGate onSubmit={onSubmit} /></div>
      </div>
    </div>

    <div className="reveal [animation-delay:880ms] relative z-10 border-t border-[#dde3ee]
                    mx-5 md:mx-14 mb-6 pt-5 pb-3 mt-auto">
      <div className="brand-sans flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4
                      text-[9px] md:text-[10px] tracking-[0.18em] md:tracking-[0.22em] text-[#5a6b85] text-center">
        <span>EQOWA FINTECH LTD · ACCRA · REPUBLIC OF GHANA</span>
        <span className="text-[#2c3e5c]">SEC/SB/047 · ACT 756 COMPLIANT</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a] animate-pulse" />
          SECURE INTAKE CHANNEL
        </span>
      </div>
    </div>
  </>
);

const TokenSentContent = ({ submission, onBack }) => (
  <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-5 md:px-6 py-10 md:py-16">
    <div className="max-w-lg w-full panel p-6 md:p-10 text-center">
      <div className="reveal mx-auto h-14 w-14 md:h-16 md:w-16 rounded-full bg-[#16a34a]/12 flex items-center justify-center
                      ring-4 ring-[#16a34a]/15 text-[#16a34a]">
        <CheckIcon className="w-5 h-5 md:w-6 md:h-6" />
      </div>

      <h2 className="reveal [animation-delay:120ms] brand-serif mt-6 md:mt-7 text-[26px] md:text-3xl text-[#0a1e3f] tracking-tight">
        Application <span className="italic font-light text-[#1e4ed8]">Received</span>
      </h2>

      <div className="reveal [animation-delay:200ms] mt-3 mx-auto h-px w-16
                      bg-linear-to-r from-transparent via-[#1e4ed8]/60 to-transparent" />

      <p className="reveal [animation-delay:280ms] brand-sans mt-4 md:mt-5 text-[12px] md:text-[13px] text-[#2c3e5c]
                    leading-relaxed">
        Your {submission.type === 'corporate' ? 'corporate dossier' : 'private wealth inquiry'} has
        been provisioned for Phase 1 digital profiling.
      </p>

      <div className="reveal [animation-delay:400ms] mt-6 md:mt-8 rounded-sm border border-[#1e4ed8]/20
                      bg-linear-to-b from-[#1e4ed8]/4 to-transparent p-4 md:p-5 text-left">
        <div className="brand-sans text-[10px] tracking-[0.24em] md:tracking-[0.3em] text-[#5a6b85] font-semibold">
          PHASE 1 ACCESS TOKEN
        </div>
        <div className="brand-mono mt-2 text-[13px] md:text-[15px] text-[#1e4ed8] tracking-widest break-all font-medium">
          EQ-ONBD-2026-9482-X
        </div>
        <div className="mt-4 h-px bg-[#e2e8f0]" />
        <div className="brand-sans mt-3 text-[11px] text-[#5a6b85] flex items-center justify-between gap-3">
          <span className="shrink-0">SENT TO</span>
          <span className="text-[#2c3e5c] brand-mono text-right truncate">{submission.email}</span>
        </div>
        <div className="brand-sans mt-1.5 text-[11px] text-[#5a6b85] flex items-center justify-between">
          <span>VALID FOR</span>
          <span className="text-[#2c3e5c]">72 hours</span>
        </div>
      </div>

      <p className="reveal [animation-delay:520ms] brand-sans mt-6 md:mt-7 text-[11px] text-[#5a6b85]
                    leading-relaxed">
        Your request has been written to the middleware queue with status
        <span className="brand-mono text-[#1e4ed8] font-medium"> UNVETTED</span>. Once administrative
        vetting clears, a profiling gateway link will follow via secure email.
      </p>

      <button
        onClick={onBack}
        className="reveal [animation-delay:640ms] brand-sans mt-7 md:mt-8 w-full py-3 md:py-3.5 rounded-sm
                   border border-[#dde3ee] bg-white hover:border-[#1e4ed8]/40 hover:bg-[#f4f7fc]
                   text-[#0a1e3f] text-[11px] md:text-[12px] tracking-[0.2em] md:tracking-[0.22em] font-medium
                   transition-all duration-500"
      >
        ← BACK TO LANDING
      </button>
    </div>
  </div>
);

const InquiryView = ({ logo, onBack, mounted }) => {
  const [submission, setSubmission] = useState(null);

  return (
    <div className={`relative w-full min-h-screen flex flex-col overflow-x-hidden transition-all duration-700
                     ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>

      {/* Soft white backdrop with subtle blue glow pools */}
      <div className="absolute inset-0 -z-10
                      bg-[radial-gradient(ellipse_at_top,#ffffff_0%,#f4f7fc_55%,#e8eef7_100%)]" />
      <div className="absolute inset-x-0 top-[55%] h-175 -z-10 pointer-events-none
                      bg-[radial-gradient(ellipse_at_center,rgba(30,78,216,0.04)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 max-w-full h-75 -z-10 pointer-events-none
                      bg-[radial-gradient(ellipse_at_top,rgba(30,78,216,0.06)_0%,transparent_70%)]" />

      <CircuitField />

      {submission
        ? <TokenSentContent submission={submission} onBack={onBack} />
        : <FormContent logo={logo} onBack={onBack} onSubmit={setSubmission} />}
    </div>
  );
};

export default InquiryView;