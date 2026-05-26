import CircuitField from './CircuitField';
import Logo from './Logo';
import { LinkIcon, KeyIcon } from './Icons';

const StatusDot = ({ pulse = false }) => (
  <span className={`h-1.5 w-1.5 rounded-full bg-[#16a34a] ${pulse ? 'animate-pulse' : ''}`} />
);

const HomeView = ({ logo, onLogin, onInquire, mounted }) => (
  <div
    className={`relative w-full min-h-screen flex flex-col transition-all duration-700
      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
  >
    <CircuitField />

    {/* Top bar */}
    <div className="relative z-10 flex items-center justify-between px-8 md:px-14 pt-8">
      <div className="flex items-center gap-3 opacity-80">
        <div className="h-px w-8 bg-[#1e4ed8]/40" />
        <span className="brand-sans text-[10px] tracking-[0.3em] text-[#5a6b85] font-light">
          EST · ACCRA · MMXXVI
        </span>
      </div>
      <div className="brand-sans text-[10px] tracking-[0.3em] text-[#5a6b85] font-light opacity-80">
        SEC/SB/047
      </div>
    </div>

    {/* Hero */}
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
      <div className="reveal [animation-delay:120ms]">
        <Logo src={logo} size={96} />
      </div>

      <h1 className="reveal [animation-delay:260ms] brand-serif mt-10 text-[#0a1e3f] text-5xl md:text-6xl font-normal tracking-[-0.02em]">
        Eqowa <span className="italic font-light text-[#1e4ed8]">Fintech</span>
      </h1>

      <div className="reveal [animation-delay:380ms] mt-2 h-px w-24 bg-linear-to-r from-transparent via-[#1e4ed8]/60 to-transparent" />

      <p className="reveal [animation-delay:460ms] brand-sans mt-7 text-center text-[#2c3e5c] max-w-md leading-relaxed font-light text-[15px]">
        Institutional digital asset settlement.
        <br />
        <span className="text-[#5a6b85] text-[13px] tracking-wide">
          SEC Ghana · Regulatory Sandbox Participant
        </span>
      </p>

      <div className="reveal [animation-delay:600ms] mt-12 flex flex-col sm:flex-row gap-3">
        {/* Primary — solid royal blue */}
        <button
          onClick={onLogin}
          className="group relative overflow-hidden px-7 py-3.5 rounded-sm
                     bg-linear-to-b from-[#1e4ed8] to-[#1739b8]
                     hover:from-[#3b6fe5] hover:to-[#1e4ed8]
                     shadow-[0_8px_24px_-8px_rgba(30,78,216,0.4)]
                     hover:shadow-[0_12px_28px_-8px_rgba(30,78,216,0.5)]
                     transition-all duration-500"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent
                          -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="brand-sans relative flex items-center gap-2.5 text-white font-semibold text-[14px] tracking-[0.08em]">
            <KeyIcon className="text-white/90" />
            <span>SECURE LOGIN</span>
          </div>
        </button>

        {/* Secondary — clean white */}
        <button
          onClick={onInquire}
          className="group px-7 py-3.5 rounded-sm bg-white border border-[#dde3ee]
                     hover:border-[#1e4ed8]/40 hover:bg-[#f4f7fc]
                     shadow-[0_2px_8px_-4px_rgba(10,30,63,0.08)]
                     hover:shadow-[0_6px_16px_-6px_rgba(30,78,216,0.15)]
                     transition-all duration-500"
        >
          <div className="brand-sans flex items-center gap-2.5 text-[#0a1e3f]
                          transition-colors font-medium text-[14px] tracking-[0.08em]">
            <LinkIcon className="text-[#1e4ed8]" />
            <span>INQUIRE FOR ACCESS</span>
          </div>
        </button>
      </div>
    </div>

    {/* Footer */}
    <div className="reveal [animation-delay:780ms] relative z-10 border-t border-[#dde3ee] mx-6 md:mx-14 mb-6 pt-5 pb-3">
      <div className="brand-sans flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.22em] text-[#5a6b85]">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2"><StatusDot pulse /> BANK API · ACTIVE</span>
          <span className="text-[#cbd5e1]">·</span>
          <span className="flex items-center gap-2"><StatusDot /> SUMSUB · CONNECTED</span>
          <span className="text-[#cbd5e1]">·</span>
          <span className="flex items-center gap-2"><StatusDot /> COBO WAAS · SECURE</span>
        </div>
        <div className="text-[#5a6b85]">
          SANDBOX LIMIT · <span className="text-[#1e4ed8]">5K USDT</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="brand-serif text-[#2c3e5c] text-[13px]">
            cobo <span className="brand-sans text-[#5a6b85] text-[10px] tracking-[0.22em] ml-1">INSTITUTIONAL CUSTODY</span>
          </span>
          <span className="text-[#cbd5e1]">·</span>
          <span>REGULATED SANDBOX PARTNER</span>
        </div>
      </div>
    </div>
  </div>
);

export default HomeView;