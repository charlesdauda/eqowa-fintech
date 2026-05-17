import { CheckIcon } from './Icons';

const STATE_STYLES = {
  done:    { dot: 'bg-[#6fa572]', ring: 'ring-[#6fa572]/30', title: 'text-[#6fa572]', sub: 'text-[#bfb59c]' },
  active:  { dot: 'bg-[#e8b341]', ring: 'ring-[#e8b341]/40', title: 'text-[#e8b341]', sub: 'text-[#bfb59c]' },
  pending: { dot: 'bg-[#3a3833]', ring: 'ring-[#3a3833]',     title: 'text-[#8a8775]', sub: 'text-[#5c5850]' },
};

const TimelineStep = ({ state, title, subtitle, detail }) => {
  const c = STATE_STYLES[state];

  return (
    <div className="relative flex flex-col items-start">
      <div className={`relative h-6 w-6 rounded-full ring-4 flex items-center justify-center text-[#0a0b0d] ${c.dot} ${c.ring}`}>
        {state === 'active' && (
          <span className="absolute inset-0 rounded-full bg-[#e8b341] animate-ping opacity-40" />
        )}
        {state !== 'pending' && <CheckIcon />}
      </div>

      <div className="mt-3 pl-0.5">
        <div className={`brand-sans text-[13px] font-semibold ${c.title}`}>{title}</div>
        <div className={`brand-sans text-[12px] ${c.sub}`}>{subtitle}</div>
        {detail}
      </div>
    </div>
  );
};

export default TimelineStep;