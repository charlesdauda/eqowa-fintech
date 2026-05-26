import { CheckIcon } from './Icons';

const STATE_STYLES = {
  done:    { dot: 'bg-[#16a34a]', ring: 'ring-[#16a34a]/20', title: 'text-[#16a34a]', sub: 'text-[#5a6b85]' },
  active:  { dot: 'bg-[#ea580c]', ring: 'ring-[#ea580c]/25', title: 'text-[#ea580c]', sub: 'text-[#5a6b85]' },
  pending: { dot: 'bg-[#cbd5e1]', ring: 'ring-[#e2e8f0]',     title: 'text-[#8a98b0]', sub: 'text-[#aab4c5]' },
};

const TimelineStep = ({ state, title, subtitle, detail }) => {
  const c = STATE_STYLES[state];

  return (
    <div className="relative flex flex-col items-start">
      <div className={`relative h-6 w-6 rounded-full ring-4 flex items-center justify-center text-white ${c.dot} ${c.ring}`}>
        {state === 'active' && (
          <span className="absolute inset-0 rounded-full bg-[#ea580c] animate-ping opacity-40" />
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