import { useState, useEffect } from 'react';
import HomeView from './components/homeview';
import DashboardView from './components/dashboardview';
import CommandCenterView from './components/commandcenterview';

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
    background: linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.012));
    border: 1px solid rgba(212,175,111,0.10);
    border-radius: 4px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .panel::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 4px; padding: 1px;
    background: linear-gradient(180deg, rgba(212,175,111,0.18), transparent 60%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
  }

  /* Cyan-tinted panel variant for the Command Center */
  .panel-cyan { border-color: rgba(77, 212, 212, 0.12); }
  .panel-cyan::before {
    background: linear-gradient(180deg, rgba(77,212,212,0.20), transparent 60%);
  }

  .grain {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
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

      <div className="relative min-h-screen w-full overflow-hidden text-[#f5f1e8]
                      bg-[radial-gradient(ellipse_at_top,#131210_0%,#0a0908_55%,#060504_100%)]">
        <div className="grain pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay" />

        {view === 'home' && (
          <HomeView
            logo={logo}
            mounted={mounted}
            onLogin={() => switchView('dashboard')}
            onInquire={() => switchView('command')}
          />
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