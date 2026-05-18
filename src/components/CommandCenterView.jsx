import { useEffect, useState, useId } from 'react';
import CircuitField from './CircuitField';
import Logo from './Logo';
import { LogoutIcon, LockIcon } from './Icons';

const CYAN = '#4dd4d4';
const SOFT = '#8a9da0';
const BODY = '#a8c0c5';

const Label = ({ children, className = '' }) => (
  <div className={`brand-sans text-[10px] tracking-[0.28em] text-[#8a9da0] ${className}`}>
    {children}
  </div>
);

const Sparkline = ({ seed = 1 }) => {
  const build = (phase, amp, base) => {
    const pts = [];
    for (let x = 0; x <= 200; x += 4) {
      const t = (x / 200) * Math.PI * 4 + phase + seed;
      const y = base + Math.sin(t) * amp + Math.sin(t * 2.3) * (amp * 0.5);
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  };

  return (
    <svg viewBox="0 0 200 80" className="w-full h-20" preserveAspectRatio="none">
      {[0, 20, 40, 60].map((y) => (
        <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#1f2a2c" strokeWidth="0.3" />
      ))}
      <polyline points={build(0, 8, 28)}    fill="none" stroke="#e8b341" strokeWidth="0.8" opacity="0.7" />
      <polyline points={build(1.2, 12, 45)} fill="none" stroke={CYAN}    strokeWidth="1.1" />
      <polyline points={build(2.4, 6, 60)}  fill="none" stroke="#6fa572" strokeWidth="0.8" opacity="0.7" />

      {['100', '60', '20'].map((v, i) => (
        <text key={v} x="2" y={i * 28 + 6} fontSize="5" fill={SOFT} fontFamily="Manrope">
          {v}
        </text>
      ))}
    </svg>
  );
};

const SumsubFlow = () => {
  const id = useId();
  const g = (n) => `${id}-${n}`;
  return (
    <svg viewBox="0 0 320 140" className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={g('green')} x1="0" x2="1">
          <stop offset="0%" stopColor="#6fa572" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6fa572" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={g('red')} x1="0" x2="1">
          <stop offset="0%" stopColor="#e57373" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e57373" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={g('gray')} x1="0" x2="1">
          <stop offset="0%" stopColor="#5c6a6c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5c6a6c" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <g transform="translate(20, 70)">
        <rect x="-12" y="-16" width="24" height="32" rx="2" fill="none" stroke={SOFT} strokeWidth="1" />
        <line x1="-6" y1="-8" x2="6" y2="-8" stroke={SOFT} strokeWidth="0.8" />
        <line x1="-6" y1="-4" x2="6" y2="-4" stroke={SOFT} strokeWidth="0.8" />
        <line x1="-6" y1="0"  x2="2" y2="0"  stroke={SOFT} strokeWidth="0.8" />
        <text x="0" y="32" textAnchor="middle" fontSize="7" fill={BODY} fontFamily="Manrope">
          Applications
        </text>
        <text x="0" y="42" textAnchor="middle" fontSize="7" fill={BODY} fontFamily="Manrope">
          received
        </text>
      </g>

      <path d="M 40 62 C 120 60, 180 30, 270 35"  stroke={`url(#${g('green')})`} strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M 40 70 C 120 70, 180 80, 270 78"  stroke={`url(#${g('red')})`}   strokeWidth="9"  fill="none" strokeLinecap="round" />
      <path d="M 40 78 C 120 90, 180 110, 270 115" stroke={`url(#${g('gray')})`}  strokeWidth="6"  fill="none" strokeLinecap="round" />

      <circle cx="272" cy="35"  r="3" fill="#6fa572" />
      <circle cx="272" cy="78"  r="3" fill="#e57373" />
      <circle cx="272" cy="115" r="3" fill="#8a9da0" />
      <text x="282" y="38"  fontSize="8" fill="#6fa572" fontFamily="Manrope">Green</text>
      <text x="282" y="81"  fontSize="8" fill="#e57373" fontFamily="Manrope">Pending</text>
      <text x="282" y="113" fontSize="8" fill={BODY}    fontFamily="Manrope">Liveness</text>
      <text x="282" y="122" fontSize="8" fill={BODY}    fontFamily="Manrope">checks</text>
    </svg>
  );
};

// ── Transaction row ─────────────────────────────────────────────────────────
const TxRow = ({ time, client, ghs, usdt, dest, status }) => (
  <tr className="border-t border-[#1a2425]">
    <td className="py-3 pr-4 brand-mono text-[12px] text-[#bfb59c]">{time}</td>
    <td className="py-3 pr-4 brand-mono text-[12px] text-[#bfb59c]">{client}</td>
    <td className="py-3 pr-4 brand-sans text-[12px] text-[#bfb59c]">{ghs}</td>
    <td className="py-3 pr-4 brand-sans text-[12px] text-[#4dd4d4]">{usdt}</td>
    <td className="py-3 pr-4 brand-mono text-[12px] text-[#a8c0c5]">{dest}</td>
    <td className="py-3">{status}</td>
  </tr>
);

const SigDone = ({ text }) => (
  <div className="flex items-center gap-2">
    <span className="h-4 w-4 rounded-full bg-[#6fa572] flex items-center justify-center text-[#0a0b0d]">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
    <span className="brand-sans text-[12px] text-[#bfb59c]">{text}</span>
  </div>
);

const SigPending = ({ progress, awaiting }) => (
  <div className="flex items-center gap-3">
    <div className="relative w-24 h-1.5 rounded-full bg-[#1a2425] overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#4dd4d4]/40 to-[#4dd4d4]"
        style={{ width: `${progress}%` }}
      />
    </div>
    <span className="brand-sans text-[11px] text-[#8a9da0]">→ Awaiting:</span>
    <span className="brand-sans text-[12px] text-[#bfb59c]">{awaiting}</span>
  </div>
);

// ── Floating hardware-auth card ─────────────────────────────────────────────
const HardwareAuthCard = () => (
  <div className="absolute -right-6 top-67.5 w-65 rounded-md overflow-hidden hidden xl:block
                  bg-linear-to-b from-[#1c2428] to-[#0e1416]
                  border border-[#4dd4d4]/25 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]">
    <div className="relative h-32.5 bg-linear-to-br from-[#1a2426] to-[#0a1012] overflow-hidden">
      <svg viewBox="0 0 260 130" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="laptopGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a3438" />
            <stop offset="100%" stopColor="#0e1416" />
          </linearGradient>
        </defs>
        <rect x="30" y="20" width="160" height="80" rx="4" fill="url(#laptopGrad)" stroke="#3a4a4e" strokeWidth="0.8" />
        <rect x="38" y="28" width="144" height="64" rx="1" fill="#080d0f" />
        <path d="M110 50 L120 53 V62 C120 68 115 73 110 75 C105 73 100 68 100 62 V53 Z"
              fill="none" stroke="#4dd4d4" strokeWidth="0.5" opacity="0.6" />
        <line x1="30" y1="100" x2="190" y2="100" stroke="#3a4a4e" strokeWidth="1" />
        <rect x="20" y="100" width="180" height="3" rx="1.5" fill="#1a2426" />

        <rect x="170" y="55" width="50" height="80" rx="6" fill="#0a1012" stroke="#3a4a4e" strokeWidth="0.8" />
        <rect x="174" y="62" width="42" height="62" rx="2" fill="#000" />
        <rect x="208" y="90" width="32" height="10" rx="1" fill="#e8b341" opacity="0.85" />
        <circle cx="234" cy="95" r="1.6" fill="#0a0908" />
      </svg>
    </div>

    <div className="px-4 py-3 border-t border-[#4dd4d4]/15">
      <div className="brand-sans text-[10px] tracking-[0.18em] text-[#4dd4d4]">AUTHORIZE</div>
      <div className="brand-sans text-[12px] text-[#bfb59c] mt-1 leading-snug">
        hardware verification required
        <br />
        <span className="text-[#8a9da0]">(YubiKey + NFC)</span>
      </div>
    </div>
  </div>
);

// ── Main view ────────────────────────────────────────────────────────────────
const CommandCenterView = ({ logo, onLogout, mounted }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setPulse(true), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center px-4 md:px-10 py-10 transition-all duration-700
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <CircuitField />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="reveal [animation-delay:80ms] flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Logo src={logo} size={28} glow={false} />
            <span className="brand-sans text-[#f5f1e8] text-[13px] tracking-[0.28em] font-semibold">
              EQOWA FINTECH
            </span>
            <span className="text-[#3a4a4e]">│</span>
            <span className="brand-serif italic text-[#bfb59c] text-[13px]">
              Institutional Command Center
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="brand-sans flex items-center gap-2 text-[11px] tracking-[0.22em]">
              <span className="text-[#8a9da0]">STATUS</span>
              <span className="text-[#4dd4d4] flex items-center gap-1.5">
                SECURE <LockIcon className="text-[#4dd4d4]" />
              </span>
            </div>
            <div className="text-right">
              <div className="brand-sans text-[10px] tracking-[0.25em] text-[#8a9da0]">USER</div>
              <div className="brand-serif text-[#f5f1e8] text-sm font-medium">P. Mensah</div>
            </div>
            <button
              onClick={onLogout}
              title="End session"
              className="h-9 w-9 rounded-full border border-[#3a4a4e] hover:border-[#4dd4d4]/50
                         flex items-center justify-center text-[#8a9da0] hover:text-[#4dd4d4] transition-all"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>

        {/* Three metric cards */}
        <div className="reveal [animation-delay:200ms] grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="panel panel-cyan">
            <Label>GLOBAL USDT VAULT (MPC COLD)</Label>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="brand-serif text-[44px] text-[#4dd4d4] tracking-[-0.02em] leading-none">
                $8.45M
              </span>
              <span className="text-[#a8c0c5] text-xs tracking-[0.2em]">USDT</span>
            </div>
            <div className="mt-3 flex items-center justify-between brand-sans text-[11px]">
              <span className="text-[#8a9da0]">85.2% of Portfolio</span>
              <span className="brand-serif italic text-[#4dd4d4]">cobo</span>
            </div>
          </div>

          <div className="panel panel-cyan">
            <Label>DAILY SETTLEMENT LIQUIDITY</Label>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="brand-serif text-[44px] text-[#4dd4d4] tracking-[-0.02em] leading-none">
                $1.46M
              </span>
              <span className="text-[#a8c0c5] text-xs tracking-[0.2em]">Hot</span>
            </div>
            <div className="mt-3 brand-sans text-[11px] text-[#8a9da0]">
              Available: <span className="text-[#bfb59c]">$1.2M</span>
            </div>
          </div>

          <div className="panel panel-cyan">
            <Label>SEC GHANA SANDBOX THERMOMETER</Label>
            <div className="mt-3 flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="brand-sans text-[10px] tracking-[0.18em] text-[#8a9da0]">USED:</span>
                <span className="brand-serif text-2xl text-[#4dd4d4]">$185,250</span>
              </div>
              <span className="brand-sans text-[11px] text-[#8a9da0]">€200k</span>
            </div>
            <div className="mt-3 relative h-1.5 bg-[#1a2425] rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#4dd4d4]/30 to-[#4dd4d4]
                           transition-all duration-1800 ease-out"
                style={{ width: pulse ? '92%' : '0%' }}
              />
            </div>
            <div className="mt-1 brand-sans text-[10px] text-[#8a9da0] text-right">- €200k</div>
          </div>
        </div>

        {/* Multi-sig queue */}
        <div className="reveal [animation-delay:320ms] panel panel-cyan mb-4">
          <Label className="mb-4">MULTI-SIGNATURE TRANSACTION QUEUE</Label>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="brand-sans text-left text-[10px] tracking-[0.2em] text-[#8a9da0] font-normal pb-3 pr-4">Transaction Hash</th>
                  <th className="brand-sans text-left text-[10px] tracking-[0.2em] text-[#8a9da0] font-normal pb-3 pr-4">Client ID</th>
                  <th className="brand-sans text-left text-[10px] tracking-[0.2em] text-[#8a9da0] font-normal pb-3 pr-4">GHS Received</th>
                  <th className="brand-sans text-left text-[10px] tracking-[0.2em] text-[#8a9da0] font-normal pb-3 pr-4">USDT Amount</th>
                  <th className="brand-sans text-left text-[10px] tracking-[0.2em] text-[#8a9da0] font-normal pb-3 pr-4">Destination</th>
                  <th className="brand-sans text-left text-[10px] tracking-[0.2em] text-[#8a9da0] font-normal pb-3">Signature Status</th>
                </tr>
              </thead>
              <tbody>
                <TxRow
                  time="02/11/22, 17:00" client="C-384A" ghs="2.1M GHS" usdt="$75k USDT" dest="Trezor: ..ehK..)Od..."
                  status={<SigDone text="1 of 3 Signatures: Peter Mensah + YubiKey" />}
                />
                <TxRow
                  time="02/11/22, 10:30" client="C-384C" ghs="2.1M GHS" usdt="$75k USDT" dest="Trezor: ..ehK..)Od..."
                  status={<SigPending progress={40} awaiting="MiddleWare" />}
                />
                <TxRow
                  time="02/11/22, 19:50" client="C-384D" ghs="2.1M GHS" usdt="$75k USDT" dest="Trezor: ..ehK..)Od..."
                  status={<SigPending progress={40} awaiting="Cobo" />}
                />
                <TxRow
                  time="02/11/22, 18:40" client="C-384A" ghs="2.1M GHS" usdt="$75k USDT" dest="Trezor: ..ehK..)Od..."
                  status={<SigPending progress={8} awaiting="Cobo" />}
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom row: compliance + sumsub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div className="reveal [animation-delay:440ms] panel panel-cyan">
            <Label className="mb-4">REGULATORY COMPLIANCE LOGS</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="brand-sans text-[10px] tracking-[0.18em] text-[#8a9da0] mb-2">
                  Real-time API Health
                </div>
                <Sparkline seed={1} />
                <div className="brand-sans flex justify-between text-[8px] text-[#5c6a6c] mt-1">
                  <span>18:00</span><span>19:00</span><span>20:00</span><span>21:00</span><span>22:00</span>
                </div>
              </div>
              <div>
                <div className="brand-sans text-[10px] tracking-[0.18em] text-[#8a9da0] mb-2">
                  Real-time API Health
                </div>
                <Sparkline seed={3} />
                <div className="brand-sans flex justify-between text-[8px] text-[#5c6a6c] mt-1">
                  <span>19:00</span><span>20:30</span><span>21:00</span><span>21:30</span><span>22:30</span>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal [animation-delay:560ms] panel panel-cyan">
            <Label className="mb-3">SUMSUB APPLICANT FLOW</Label>

            <div className="flex flex-wrap gap-3 mb-3 brand-sans text-[10px] text-[#8a9da0]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6fa572]" /> Green
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e57373]" /> Red
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e8b341]" /> Pending
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8a9da0]" /> Liveness checks
              </span>
            </div>

            <SumsubFlow />
          </div>

          <HardwareAuthCard />
        </div>

        {/* Footer */}
        <div className="reveal [animation-delay:680ms] brand-sans mt-5 flex flex-col md:flex-row
                        items-center justify-between gap-3 text-[10px] tracking-[0.22em] text-[#8a9da0]">
          <div className="flex items-center gap-4">
            <span>NODES · <span className="text-[#6fa572]">12 / 12 ACTIVE</span></span>
            <span className="text-[#3a4a4e]">·</span>
            <span>MPC THRESHOLD · <span className="text-[#4dd4d4]">3-OF-5</span></span>
            <span className="text-[#3a4a4e]">·</span>
            <span>LAST AUDIT · <span className="text-[#bfb59c]">02 NOV 22:14</span></span>
          </div>
          <div className="flex items-center gap-2 opacity-70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4dd4d4] animate-pulse" />
            <span>OPERATOR CHANNEL · ENCRYPTED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenterView;
