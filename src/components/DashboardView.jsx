import { useEffect, useState } from 'react';
import CircuitField from './CircuitField';
import Logo from './Logo';
import TimelineStep from './TimelineStep';
import { HardwareIcon, SealIcon, LogoutIcon } from './Icons';

const SectionLabel = ({ children }) => (
  <div className="brand-sans text-[10px] tracking-[0.3em] text-[#8a8775]">{children}</div>
);

const DashboardView = ({ logo, onLogout, mounted }) => {
  const [orderProgress, setOrderProgress] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setOrderProgress(1), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center px-4 md:px-10 py-10 transition-all duration-700
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <CircuitField />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="reveal [animation-delay:80ms] flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Logo src={logo} size={28} glow={false} />
            <span className="brand-sans text-[#f5f1e8] text-[13px] tracking-[0.28em] font-semibold">
              EQOWA FINTECH
            </span>
            <span className="text-[#3a3833]">│</span>
            <span className="brand-serif italic text-[#bfb59c] text-[13px]">Secure Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="brand-sans text-[10px] tracking-[0.25em] text-[#8a8775]">CLIENT</div>
              <div className="brand-serif text-[#f5f1e8] text-sm font-medium">K. Appiah</div>
            </div>
            <button
              onClick={onLogout}
              title="End session"
              className="ml-2 h-9 w-9 rounded-full border border-[#3a3833] hover:border-[#d4af6f]/50
                         flex items-center justify-center text-[#8a8775] hover:text-[#d4af6f] transition-all"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>

        {/* Portfolio */}
        <div className="reveal [animation-delay:200ms] panel mb-4">
          <SectionLabel>PORTFOLIO OVERVIEW</SectionLabel>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-6 items-center">
            <div>
              <div className="brand-sans text-[11px] tracking-[0.18em] text-[#bfb59c] mb-1">
                WHITELISTED · TREZOR BALANCE
              </div>
              <div className="flex items-baseline gap-2">
                <span className="brand-serif text-[#f5f1e8] text-4xl md:text-5xl tracking-[-0.02em]">
                  $210,000
                </span>
                <span className="text-[#d4af6f] text-sm tracking-[0.2em]">USDT</span>
              </div>
            </div>

            <div className="hidden md:block text-[#5c5850]"><HardwareIcon /></div>

            <div>
              <div className="brand-sans text-[11px] tracking-[0.18em] text-[#bfb59c] mb-1">
                GHS SETTLEMENT BUFFER
              </div>
              <div className="flex items-baseline gap-2">
                <span className="brand-serif text-[#f5f1e8] text-4xl md:text-5xl tracking-[-0.02em]">
                  15,000
                </span>
                <span className="text-[#a89b7a] text-sm tracking-[0.2em]">GHS</span>
              </div>
            </div>

            <button className="group relative overflow-hidden px-6 py-3 rounded-sm
                               bg-linear-to-b from-[#3b8fe8] to-[#1f6cc4]
                               hover:from-[#4ea0f5] hover:to-[#2378d4]
                               transition-all duration-300 shadow-[0_8px_24px_-8px_rgba(59,143,232,0.5)]">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent
                              -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="brand-sans relative text-white text-[12px] tracking-[0.25em] font-semibold">
                BUY USDT
              </span>
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="reveal [animation-delay:320ms] panel mb-4">
          <div className="flex items-center justify-between mb-1">
            <SectionLabel>TRANSACTION TIMELINE</SectionLabel>
            <div className="brand-sans text-[10px] tracking-[0.25em] text-[#8a8775]">
              ACTIVE SETTLEMENT · <span className="text-[#d4af6f]">ORDER #501</span>
            </div>
          </div>

          <div className="mt-6 relative">
            <div className="absolute top-3 left-[5%] right-[5%] h-px bg-[#2a2825]" />
            <div
              className="absolute top-3 left-[5%] h-px bg-linear-to-r from-[#6fa572] via-[#6fa572] to-[#d4af6f]
                         transition-all duration-1800 ease-out"
              style={{ width: orderProgress ? '52%' : '0%' }}
            />

            <div className="grid grid-cols-4 gap-2">
              <TimelineStep
                state="done"
                title="GHS Payment"
                subtitle="Confirmed"
                detail={
                  <button className="brand-sans mt-2 text-[10px] tracking-[0.25em] px-3 py-1.5 rounded-sm
                                     bg-[#3b8fe8]/15 border border-[#3b8fe8]/30 text-[#5ea3f0]
                                     hover:bg-[#3b8fe8]/25 transition font-semibold">
                    BUY USDT
                  </button>
                }
              />
              <TimelineStep
                state="done"
                title="Green Check"
                subtitle="KYC Verified"
                detail={<div className="brand-sans mt-1 text-[10px] tracking-[0.2em] text-[#8a8775]">via SUMSUB</div>}
              />
              <TimelineStep
                state="active"
                title="Institutional"
                subtitle="Approval"
                detail={
                  <svg className="mt-2" width="80" height="28" viewBox="0 0 80 28" fill="none">
                    <path
                      d="M4 18 Q 10 6, 16 14 T 28 16 Q 36 8, 44 18 T 60 14 Q 68 22, 76 12"
                      stroke="#e8b341"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray="200"
                      strokeDashoffset={orderProgress ? '0' : '200'}
                      style={{ transition: 'stroke-dashoffset 1.6s ease-out 0.6s' }}
                    />
                  </svg>
                }
              />
              <TimelineStep
                state="pending"
                title="Pending"
                subtitle="USDT Delivery"
                detail={<div className="brand-sans mt-1 text-[10px] tracking-[0.2em] text-[#5c5850]">to TREZOR</div>}
              />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="reveal [animation-delay:440ms] panel">
          <SectionLabel>SECURE PAYMENT INSTRUCTIONS</SectionLabel>
          <div className="mt-4 flex items-center gap-5">
            <SealIcon />
            <div className="flex-1">
              <div className="brand-serif text-[#f5f1e8] text-[15px] font-medium">
                Official Ghanaian Bank
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="brand-sans text-[11px] tracking-[0.2em] text-[#8a8775]">ACCOUNT</span>
                <span className="brand-mono text-[#bfb59c] text-[14px] tracking-widest">
                  1023 · 123 456 789
                </span>
                <button className="brand-sans ml-2 text-[10px] tracking-[0.2em] text-[#8a8775] hover:text-[#d4af6f] transition">
                  COPY
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="brand-sans text-[10px] tracking-[0.25em] text-[#8a8775]">REFERENCE</div>
              <div className="brand-mono text-[#d4af6f] text-[13px] tracking-widest">EQW-501-APH</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="reveal [animation-delay:560ms] brand-sans mt-5 flex flex-col md:flex-row
                        items-center justify-between gap-3 text-[10px] tracking-[0.22em] text-[#8a8775]">
          <div className="flex items-center gap-4">
            <span>KYC STATUS · <span className="text-[#6fa572]">GREEN</span></span>
            <span className="text-[#3a3833]">·</span>
            <span>CUSTODY PARTNER · <span className="text-[#3b8fe8]">COBO MPC</span></span>
          </div>
          <div className="flex items-center gap-2 opacity-70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6fa572] animate-pulse" />
            <span>SESSION SECURE · TLS 1.3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;