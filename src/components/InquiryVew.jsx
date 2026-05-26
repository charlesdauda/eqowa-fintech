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
    <span className="brand-sans block text-[10px] tracking-[0.24em] text-[#a89b7a] mb-2">
      {label}
    </span>
    {children}
    {error && (
      <span className="brand-sans block mt-1.5 text-[11px] text-[#e57373]">{error}</span>
    )}
  </label>
);

const inputClass =
  'brand-sans w-full px-3.5 py-3 text-[13px] text-[#f5f1e8] bg-[#0c0b09]/80 border border-[#2a2620] rounded-sm ' +
  'placeholder:text-[#5c5850] focus:outline-none focus:border-[#d4af6f]/60 focus:ring-2 focus:ring-[#d4af6f]/15 ' +
  'transition-all duration-300';

const selectClass = inputClass + ' appearance-none cursor-pointer pr-10 ' +
  'bg-[url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23a89b7a\' stroke-width=\'2\'><polyline points=\'6 9 12 15 18 9\'/></svg>")] ' +
  'bg-no-repeat bg-[right_14px_center]';

const PrimaryButton = ({ children, ...props }) => (
  <button
    {...props}
    className="group relative overflow-hidden w-full mt-8 px-7 py-4 rounded-sm
               border border-[#d4af6f]/40
               bg-linear-to-b from-[#d4af6f]/18 to-[#d4af6f]/4
               hover:from-[#d4af6f]/30 hover:to-[#d4af6f]/8
               transition-all duration-500
               shadow-[inset_0_1px_0_rgba(232,217,184,0.08),0_8px_24px_-12px_rgba(212,175,111,0.25)]"
  >
    <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#e8d9b8]/15 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    <span className="brand-sans relative text-[#f5f1e8] text-[12px] tracking-[0.22em] font-medium">
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
    <form onSubmit={submit} className="panel p-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="brand-serif text-[22px] text-[#f5f1e8] tracking-tight">
          Corporate <span className="italic font-light text-[#d4af6f]">Intake</span>
        </h2>
        <span className="brand-sans text-[9px] tracking-[0.28em] text-[#d4af6f]/80
                         border border-[#d4af6f]/30 px-2.5 py-1 rounded-sm">
          ENTERPRISE
        </span>
      </div>
      <p className="brand-sans text-[12px] text-[#8a8775] mb-7 leading-relaxed font-light">
        For institutional treasuries and regulated entities.
      </p>

      <div className="space-y-5">
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
          <span className="brand-sans block mt-1.5 text-[10px] text-[#5c5850] tracking-wide">
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
    <form onSubmit={submit} className="panel p-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="brand-serif text-[22px] text-[#f5f1e8] tracking-tight">
          Private <span className="italic font-light text-[#d4af6f]">Wealth</span>
        </h2>
        <span className="brand-sans text-[9px] tracking-[0.28em] text-[#d4af6f]/80
                         border border-[#d4af6f]/30 px-2.5 py-1 rounded-sm">
          HNWI
        </span>
      </div>
      <p className="brand-sans text-[12px] text-[#8a8775] mb-7 leading-relaxed font-light">
        For private wealth clients and high-net-worth individuals.
      </p>

      <div className="space-y-5">
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
            className="mt-0.5 h-4 w-4 rounded-sm border-[#3a3833] bg-[#0c0b09] accent-[#d4af6f]"
            checked={form.attested}
            onChange={(e) => set('attested', e.target.checked)}
          />
          <span className="brand-sans text-[12px] text-[#bfb59c] leading-relaxed group-hover:text-[#f5f1e8] transition-colors">
            I attest that I qualify as a high-net-worth individual under the relevant
            jurisdictional definition and accept the sandbox terms of access.
          </span>
        </label>
        {errors.attested && (
          <span className="brand-sans block text-[11px] text-[#e57373]">{errors.attested}</span>
        )}
      </div>

      <PrimaryButton type="submit">SUBMIT PRIVATE WEALTH INQUIRY</PrimaryButton>
    </form>
  );
};

const FormContent = ({ logo, onBack, onSubmit }) => (
  <>
    {/* Top bar */}
    <div className="relative z-10 flex items-center justify-between px-6 md:px-14 pt-8">
      <div className="flex items-center gap-3">
        <Logo src={logo} size={28} glow={false} />
        <span className="brand-sans text-[#f5f1e8] text-[12px] tracking-[0.3em] font-semibold">
          EQOWA FINTECH
        </span>
        <span className="text-[#3a3833]">│</span>
        <span className="brand-serif italic text-[#bfb59c] text-[13px]">
          Sandbox Application Portal
        </span>
      </div>
      <button
        onClick={onBack}
        className="brand-sans text-[10px] tracking-[0.28em] text-[#8a8775]
                   hover:text-[#d4af6f] transition-colors duration-300"
      >
        ← BACK
      </button>
    </div>

    {/* Hero */}
    <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-20 pb-12 text-center">
      <div className="reveal [animation-delay:80ms] brand-sans text-[10px] tracking-[0.4em] text-[#d4af6f]">
        PHASE 0 · INSTITUTIONAL INTAKE
      </div>

      <h1 className="reveal [animation-delay:220ms] brand-serif mt-5
                     text-[#f5f1e8] text-5xl md:text-6xl tracking-tight">
        Apply for <span className="italic font-light text-[#d4af6f]">Network Access</span>
      </h1>

      <div className="reveal [animation-delay:340ms] mt-5 mx-auto h-px w-24
                      bg-linear-to-r from-transparent via-[#d4af6f]/60 to-transparent" />

      <p className="reveal [animation-delay:440ms] brand-sans mt-7
                    text-[#bfb59c] max-w-xl mx-auto leading-relaxed
                    text-[15px] font-light">
        Submit your access dossier. Applications are reviewed for SEC Ghana
        Regulatory Sandbox eligibility.
        <br />
        <span className="text-[#8a8775] text-[13px] tracking-wide">
          A Phase 1 access token will follow via secure email upon initial vetting.
        </span>
      </p>
    </div>

    <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="reveal [animation-delay:580ms]"><CorporateGate onSubmit={onSubmit} /></div>
        <div className="reveal [animation-delay:720ms]"><HnwiGate onSubmit={onSubmit} /></div>
      </div>
    </div>

    <div className="reveal [animation-delay:880ms] relative z-10 border-t border-[#252320]
                    mx-6 md:mx-14 mb-6 pt-5 pb-3 mt-auto">
      <div className="brand-sans flex flex-col md:flex-row items-center justify-between gap-4
                      text-[10px] tracking-[0.22em] text-[#8a8775]">
        <span>EQOWA FINTECH LTD · ACCRA · REPUBLIC OF GHANA</span>
        <span className="text-[#a89b7a]">SEC/SB/047 · ACT 756 COMPLIANT</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6fa572] animate-pulse" />
          SECURE INTAKE CHANNEL
        </span>
      </div>
    </div>
  </>
);

const TokenSentContent = ({ submission, onBack }) => (
  <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-6 py-16">
    <div className="max-w-lg w-full panel p-10 text-center">
      <div className="reveal mx-auto h-16 w-16 rounded-full bg-[#6fa572]/15 flex items-center justify-center
                      ring-4 ring-[#6fa572]/20 text-[#6fa572]">
        <CheckIcon className="w-6 h-6" />
      </div>

      <h2 className="reveal [animation-delay:120ms] brand-serif mt-7 text-3xl text-[#f5f1e8] tracking-tight">
        Application <span className="italic font-light text-[#d4af6f]">Received</span>
      </h2>

      <div className="reveal [animation-delay:200ms] mt-3 mx-auto h-px w-16
                      bg-linear-to-r from-transparent via-[#d4af6f]/60 to-transparent" />

      <p className="reveal [animation-delay:280ms] brand-sans mt-5 text-[13px] text-[#bfb59c]
                    leading-relaxed font-light">
        Your {submission.type === 'corporate' ? 'corporate dossier' : 'private wealth inquiry'} has
        been provisioned for Phase 1 digital profiling.
      </p>

      <div className="reveal [animation-delay:400ms] mt-8 rounded-sm border border-[#d4af6f]/20
                      bg-linear-to-b from-[#d4af6f]/5 to-transparent p-5 text-left
                      shadow-[inset_0_1px_0_rgba(232,217,184,0.06)]">
        <div className="brand-sans text-[10px] tracking-[0.3em] text-[#8a8775]">
          PHASE 1 ACCESS TOKEN
        </div>
        <div className="brand-mono mt-2 text-[15px] text-[#d4af6f] tracking-widest">
          EQ-ONBD-2026-9482-X
        </div>
        <div className="mt-4 h-px bg-[#252320]" />
        <div className="brand-sans mt-3 text-[11px] text-[#8a8775] flex items-center justify-between">
          <span>SENT TO</span>
          <span className="text-[#bfb59c] brand-mono">{submission.email}</span>
        </div>
        <div className="brand-sans mt-1.5 text-[11px] text-[#8a8775] flex items-center justify-between">
          <span>VALID FOR</span>
          <span className="text-[#bfb59c]">72 hours</span>
        </div>
      </div>

      <p className="reveal [animation-delay:520ms] brand-sans mt-7 text-[11px] text-[#8a8775]
                    leading-relaxed font-light">
        Your request has been written to the middleware queue with status
        <span className="brand-mono text-[#d4af6f]"> UNVETTED</span>. Once administrative
        vetting clears, a profiling gateway link will follow via secure email.
      </p>

      <button
        onClick={onBack}
        className="reveal [animation-delay:640ms] brand-sans mt-8 w-full py-3.5 rounded-sm
                   border border-[#3a3833] hover:border-[#d4af6f]/40
                   hover:bg-[#1a1815]/40
                   text-[#bfb59c] hover:text-[#f5f1e8] text-[12px] tracking-[0.22em] font-medium
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
    <div className={`relative w-full min-h-screen flex flex-col transition-all duration-700
                     ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>

      <div className="absolute inset-0 -z-10
                      bg-[radial-gradient(ellipse_at_top,#131210_0%,#0a0908_55%,#060504_100%)]" />
      <div className="absolute inset-x-0 top-[55%] h-175 -z-10 pointer-events-none
                      bg-[radial-gradient(ellipse_at_center,rgba(212,175,111,0.05)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-75 -z-10 pointer-events-none
                      bg-[radial-gradient(ellipse_at_top,rgba(212,175,111,0.07)_0%,transparent_70%)]" />

      <CircuitField />

      {submission
        ? <TokenSentContent submission={submission} onBack={onBack} />
        : <FormContent logo={logo} onBack={onBack} onSubmit={setSubmission} />}
    </div>
  );
};

export default InquiryView;