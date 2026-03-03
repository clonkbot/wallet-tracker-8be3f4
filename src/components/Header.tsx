import { useEffect, useState } from 'react';

export function Header() {
  const [glitchText, setGlitchText] = useState('WALLET_TRACKER');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const originalText = 'WALLET_TRACKER';

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        const glitched = originalText
          .split('')
          .map((char) => (Math.random() > 0.85 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char))
          .join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 200);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <header className="border-b border-[#00ff41]/20 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Logo */}
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-[#00ff41] flex items-center justify-center relative overflow-hidden">
                <span className="text-lg md:text-xl font-bold tracking-tighter">W</span>
                <div className="absolute inset-0 bg-gradient-to-t from-[#00ff41]/20 to-transparent" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-[#00ff41] animate-pulse" />
            </div>

            <div>
              <h1 className="text-lg md:text-2xl font-bold tracking-wider relative">
                <span className="relative">
                  {glitchText}
                  <span className="absolute inset-0 text-[#ff0040] opacity-50 animate-[glitch1_0.3s_infinite]" style={{ clipPath: 'inset(40% 0 61% 0)' }}>
                    {glitchText}
                  </span>
                  <span className="absolute inset-0 text-[#00ffff] opacity-50 animate-[glitch2_0.3s_infinite]" style={{ clipPath: 'inset(10% 0 85% 0)' }}>
                    {glitchText}
                  </span>
                </span>
              </h1>
              <p className="text-[10px] md:text-xs text-[#00ff41]/50 tracking-[0.2em] md:tracking-[0.3em]">TRENDING WALLETS // PNL MONITOR</p>
            </div>
          </div>

          {/* System Info */}
          <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-xs">
            <div className="flex flex-col items-end">
              <span className="text-[#ffb000]">SYS_TIME</span>
              <span className="text-[#00ff41]/70 tabular-nums">
                {time.toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </div>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[#ffb000]">NETWORK</span>
              <span className="text-[#00ff41]/70">MULTI-CHAIN</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[#ffb000]">STATUS</span>
              <span className="text-[#00ff88] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glitch1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes glitch2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
      `}</style>
    </header>
  );
}
