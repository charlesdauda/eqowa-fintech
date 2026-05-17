import CircuitField from './CircuitField';
import Logo from './Logo';
import { LinkIcon, KeyIcon } from './Icons';

const StatusDot = ({ pulse = false }) => (
  <span className={`h-1.5 w-1.5 rounded-full bg-[#6fa572] ${pulse ? 'animate-pulse' : ''}`} />
);

const HomeView = ({ logo, onLogin, mounted }) => (
  <div
    className={`relative w-full min-h-screen flex flex-col transition-all duration-700
      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
  >
    <CircuitField />

    {/* Top bar */}
    <div className="relative z-10 flex items-center justify-between px-8 md:px-14 pt-8">
      <div className="flex items-center gap-3 opacity-70">
        <div className="h-px w-8 bg-[#d4af6f]/40" />
        <span className="brand-sans text-[10px] tracking-[0.3em] text-[#a89b7a] font-light">
          EST · ACCRA · MMXXVI
        </span>
      </div>
      <div className="brand-sans text-[10px] tracking-[0.3em] text-[#a89b7a] font-light opacity-70">
        SEC/SB/047
      </div>
    </div>

    {/* Hero */}
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
      <div className="reveal [animation-delay:120ms]">
        <Logo src={logo} size={96} />
      </div>

      <h1 className="reveal [animation-delay:260ms] brand-serif mt-10 text-[#f5f1e8] text-5xl md:text-6xl font-normal tracking-[-0.02em]">
        Eqowa <span className="italic font-light text-[#d4af6f]">Fintech</span>
      </h1>

      <div className="reveal [animation-delay:380ms] mt-2 h-px w-24 bg-linear-to-r from-transparent via-[#d4af6f]/60 to-transparent" />

      <p className="reveal [animation-delay:460ms] brand-sans mt-7 text-center text-[#bfb59c] max-w-md leading-relaxed font-light text-[15px]">
        Institutional digital asset settlement.
        <br />
        <span className="text-[#8a8775] text-[13px] tracking-wide">
          SEC Ghana · Regulatory Sandbox Participant
        </span>
      </p>

      <div className="reveal [animation-delay:600ms] mt-12 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onLogin}
          className="group relative overflow-hidden px-7 py-3.5 rounded-sm border border-[#d4af6f]/40
                     bg-linear-to-b from-[#d4af6f]/15 to-[#d4af6f]/5
                     hover:from-[#d4af6f]/25 hover:to-[#d4af6f]/10 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#e8d9b8]/10 to-transparent
                          -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="brand-sans relative flex items-center gap-2.5 text-[#f5f1e8] font-medium text-[14px] tracking-[0.08em]">
            <KeyIcon className="text-[#d4af6f]" />
            <span>SECURE LOGIN</span>
          </div>
        </button>

        <button className="group px-7 py-3.5 rounded-sm border border-[#3a3833] hover:border-[#5c5850]
                           hover:bg-[#1a1815]/40 transition-all duration-500">
          <div className="brand-sans flex items-center gap-2.5 text-[#bfb59c] group-hover:text-[#f5f1e8]
                          transition-colors font-medium text-[14px] tracking-[0.08em]">
            <LinkIcon />
            <span>INQUIRE FOR ACCESS</span>
          </div>
        </button>
      </div>
    </div>

    {/* Footer */}
    <div className="reveal [animation-delay:780ms] relative z-10 border-t border-[#252320] mx-6 md:mx-14 mb-6 pt-5 pb-3">
      <div className="brand-sans flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.22em] text-[#8a8775]">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2"><StatusDot pulse /> BANK API · ACTIVE</span>
          <span className="text-[#3a3833]">·</span>
          <span className="flex items-center gap-2"><StatusDot /> SUMSUB · CONNECTED</span>
          <span className="text-[#3a3833]">·</span>
          <span className="flex items-center gap-2"><StatusDot /> COBO WAAS · SECURE</span>
        </div>
        <div className="text-[#a89b7a]">
          SANDBOX LIMIT · <span className="text-[#d4af6f]">5K USDT</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="brand-serif text-[#bfb59c] text-[13px]">
            cobo <span className="brand-sans text-[#8a8775] text-[10px] tracking-[0.22em] ml-1">INSTITUTIONAL CUSTODY</span>
          </span>
          <span className="text-[#3a3833]">·</span>
          <span>REGULATED SANDBOX PARTNER</span>
        </div>
      </div>
    </div>
  </div>
);

export default HomeView;