import { useState, useEffect } from 'react';
import HomeView from './components/HomeView';
import DashboardView from './components/DashboardView';
import CommandCenterView from './components/CommandCenterView';
import InquiryView from './components/InquiryView';

import logo from './logo.svg';

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?' +
  'family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&' +
  'family=Manrope:wght@300;400;500;600;700&' +
  'family=JetBrains+Mono:wght@400;500&display=swap';

const GLOBAL_CSS = `
  .brand-serif { font-family: 'Fraunces', serif; }
  .brand-sans  { font-family: 'Manrope', sans-serif; }
  .brand-mono  { font-family: 'JetBrains Mono', monospace; }

  @keyframes reveal-in {
    from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
  }
  .reveal { opacity: 0; animation: reveal-in 900ms cubic-bezier(0.2,0.7,0.1,1) forwards; }

  .panel {
    position: relative;
    padding: 22px 26px;
    background: #ffffff;
    border: 1px solid #dde3ee;
    border-radius: 6px;
    box-shadow:
      0 1px 2px rgba(10,30,63,0.04),
      0 8px 30px -16px rgba(10,30,63,0.10);
  }
  .panel::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 6px; padding: 1px;
    background: linear-gradient(180deg, rgba(30,78,216,0.16), transparent 60%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
  }
  .panel-teal { border-color: rgba(8,145,178,0.20); }
  .panel-teal::before {
    background: linear-gradient(180deg, rgba(8,145,178,0.22), transparent 60%);
  }
`;

const App = () => {
  const [view, setView] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const switchView = (next) => {
    setMounted(false);
    setTimeout(() => {
      setView(next);
      requestAnimationFrame(() => setMounted(true));
    }, 500);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTS_HREF} precedence="default" />
      <style precedence="default">{GLOBAL_CSS}</style>

      <div className="relative min-h-screen w-full overflow-hidden text-[#0a1e3f]
                      bg-[radial-gradient(ellipse_at_top,#ffffff_0%,#f4f7fc_55%,#e8eef7_100%)]">
        {view === 'home' && (
          <HomeView logo={logo} mounted={mounted}
                    onLogin={() => switchView('dashboard')}
                    onInquire={() => switchView('inquiry')} />
        )}
        {view === 'inquiry' && (
          <InquiryView logo={logo} mounted={mounted} onBack={() => switchView('home')} />
        )}
        {view === 'dashboard' && (
          <DashboardView logo={logo} mounted={mounted} onLogout={() => switchView('home')} />
        )}
        {view === 'command' && (
          <CommandCenterView logo={logo} mounted={mounted} onLogout={() => switchView('home')} />
        )}
      </div>
    </>
  );
};

export default App;