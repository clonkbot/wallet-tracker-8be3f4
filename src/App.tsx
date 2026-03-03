import { useState, useEffect } from 'react';
import { WalletCard } from './components/WalletCard';
import { Header } from './components/Header';
import { ScanLines } from './components/ScanLines';
import { StatsBar } from './components/StatsBar';

export interface Wallet {
  address: string;
  label: string;
  pnl: number;
  pnlPercent: number;
  trades: number;
  winRate: number;
  volume: string;
  lastActive: string;
  signalStrength: number;
  topToken: string;
}

const mockWallets: Wallet[] = [
  { address: '0x7a16...f3d2', label: 'WhaleAlpha', pnl: 892450, pnlPercent: 342.5, trades: 156, winRate: 78, volume: '$4.2M', lastActive: '2m ago', signalStrength: 95, topToken: '$PEPE' },
  { address: '0x3f89...a1c7', label: 'DegenKing', pnl: 654230, pnlPercent: 187.3, trades: 423, winRate: 65, volume: '$8.1M', lastActive: '5m ago', signalStrength: 88, topToken: '$WIF' },
  { address: '0x9e2b...d4f8', label: 'SniperBot_01', pnl: 445670, pnlPercent: 156.8, trades: 892, winRate: 71, volume: '$12.3M', lastActive: '1m ago', signalStrength: 92, topToken: '$BONK' },
  { address: '0x1d5c...b9e3', label: 'SmartMoney', pnl: 328900, pnlPercent: 98.4, trades: 67, winRate: 82, volume: '$2.1M', lastActive: '12m ago', signalStrength: 75, topToken: '$SHIB' },
  { address: '0x8a4f...c2d1', label: 'CryptoNinja', pnl: -125400, pnlPercent: -34.2, trades: 234, winRate: 42, volume: '$1.8M', lastActive: '8m ago', signalStrength: 45, topToken: '$FLOKI' },
  { address: '0x5c7e...f8a9', label: 'MevHunter', pnl: 267800, pnlPercent: 89.5, trades: 1205, winRate: 58, volume: '$45.7M', lastActive: '30s ago', signalStrength: 98, topToken: '$ARB' },
  { address: '0x2b9d...e6c4', label: 'DiamondHands', pnl: 198450, pnlPercent: 67.3, trades: 23, winRate: 91, volume: '$890K', lastActive: '1h ago', signalStrength: 62, topToken: '$SOL' },
  { address: '0x6f3a...d7b2', label: 'ApeInOnly', pnl: -78900, pnlPercent: -45.6, trades: 567, winRate: 38, volume: '$3.4M', lastActive: '15m ago', signalStrength: 35, topToken: '$DOGE' },
  { address: '0x4e8c...a5f1', label: 'AlphaLeaker', pnl: 534200, pnlPercent: 234.7, trades: 89, winRate: 76, volume: '$5.6M', lastActive: '3m ago', signalStrength: 85, topToken: '$BLUR' },
  { address: '0xb2d7...c9e6', label: 'TokenSage', pnl: 145670, pnlPercent: 52.1, trades: 312, winRate: 63, volume: '$2.9M', lastActive: '22m ago', signalStrength: 68, topToken: '$OP' },
];

function App() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [sortBy, setSortBy] = useState<'pnl' | 'winRate' | 'trades'>('pnl');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const sorted = [...mockWallets].sort((a, b) => {
        if (sortBy === 'pnl') return b.pnl - a.pnl;
        if (sortBy === 'winRate') return b.winRate - a.winRate;
        return b.trades - a.trades;
      });
      setWallets(sorted);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [sortBy]);

  useEffect(() => {
    const sorted = [...mockWallets].sort((a, b) => {
      if (sortBy === 'pnl') return b.pnl - a.pnl;
      if (sortBy === 'winRate') return b.winRate - a.winRate;
      return b.trades - a.trades;
    });
    setWallets(sorted);
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff41] font-mono relative overflow-x-hidden">
      <ScanLines />

      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#00ff41] opacity-5 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#ffb000] opacity-5 blur-[150px] pointer-events-none" />

      <div className="relative z-10">
        <Header />
        <StatsBar wallets={wallets} />

        {/* Sort Controls */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[#00ff41]/60 text-xs md:text-sm uppercase tracking-widest">Sort by:</span>
              <div className="flex gap-1 md:gap-2">
                {(['pnl', 'winRate', 'trades'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`px-3 md:px-4 py-2 text-xs uppercase tracking-wider border transition-all duration-300 min-h-[44px] ${
                      sortBy === option
                        ? 'border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                        : 'border-[#00ff41]/30 text-[#00ff41]/50 hover:border-[#00ff41]/60 hover:text-[#00ff41]/80'
                    }`}
                  >
                    {option === 'pnl' ? 'PNL' : option === 'winRate' ? 'Win Rate' : 'Trades'}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-[#00ff41]/40 text-xs flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
              <span className="hidden sm:inline">LIVE DATA STREAM</span>
              <span className="sm:hidden">LIVE</span>
            </div>
          </div>

          {/* Wallet Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-[#00ff41] text-lg md:text-xl animate-pulse mb-4">INITIALIZING...</div>
              <div className="w-48 md:w-64 h-1 bg-[#00ff41]/20 overflow-hidden">
                <div className="h-full bg-[#00ff41] animate-[loading_1.5s_ease-in-out_infinite]" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {wallets.map((wallet, index) => (
                <WalletCard key={wallet.address} wallet={wallet} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 mt-8 md:mt-12 border-t border-[#00ff41]/10">
          <div className="text-center">
            <p className="text-[#00ff41]/30 text-[10px] md:text-xs tracking-wider">
              Requested by @vladyy__01 · Built by @clonkbot
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 100%; margin-left: 0%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

export default App;
