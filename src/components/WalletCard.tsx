import { useState } from 'react';
import type { Wallet } from '../App';

interface WalletCardProps {
  wallet: Wallet;
  index: number;
}

export function WalletCard({ wallet, index }: WalletCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = wallet.pnl >= 0;

  const formatPnl = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    if (absValue >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(0);
  };

  return (
    <div
      className="relative group"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${
          isPositive ? 'from-[#00ff41] to-[#00ff88]' : 'from-[#ff0040] to-[#ffb000]'
        } opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300`}
      />

      <div
        className={`relative bg-[#0a0a0a] border ${
          isPositive ? 'border-[#00ff41]/30' : 'border-[#ff0040]/30'
        } p-4 md:p-5 transition-all duration-300 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0 ${
          isHovered ? 'border-opacity-100' : ''
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#ffb000] text-[10px] md:text-xs">#{index + 1}</span>
              <h3 className="text-sm md:text-base font-bold text-[#00ff41] truncate">{wallet.label}</h3>
            </div>
            <p className="text-[10px] md:text-xs text-[#00ff41]/50 font-mono">{wallet.address}</p>
          </div>

          {/* Signal Strength */}
          <div className="flex flex-col items-end ml-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 transition-all duration-300 ${
                    i < Math.floor(wallet.signalStrength / 20)
                      ? wallet.signalStrength > 70
                        ? 'bg-[#00ff41]'
                        : wallet.signalStrength > 40
                        ? 'bg-[#ffb000]'
                        : 'bg-[#ff0040]'
                      : 'bg-[#00ff41]/20'
                  }`}
                  style={{ height: `${8 + i * 3}px` }}
                />
              ))}
            </div>
            <span className="text-[8px] md:text-[10px] text-[#00ff41]/40 mt-1">SIGNAL</span>
          </div>
        </div>

        {/* PNL Display */}
        <div className="mb-4 p-3 bg-[#0f0f0f] border border-[#00ff41]/10">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] md:text-xs text-[#00ff41]/50">TOTAL PNL</span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-xl md:text-2xl font-bold ${isPositive ? 'text-[#00ff88]' : 'text-[#ff0040]'}`}
              >
                {isPositive ? '+' : ''}${formatPnl(wallet.pnl)}
              </span>
              <span
                className={`text-xs md:text-sm ${isPositive ? 'text-[#00ff88]/70' : 'text-[#ff0040]/70'}`}
              >
                {isPositive ? '+' : ''}{wallet.pnlPercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
          <div className="text-center p-2 bg-[#00ff41]/5 border border-[#00ff41]/10">
            <div className="text-base md:text-lg font-bold text-[#00ff41]">{wallet.winRate}%</div>
            <div className="text-[8px] md:text-[10px] text-[#00ff41]/40">WIN RATE</div>
          </div>
          <div className="text-center p-2 bg-[#00ff41]/5 border border-[#00ff41]/10">
            <div className="text-base md:text-lg font-bold text-[#ffb000]">{wallet.trades}</div>
            <div className="text-[8px] md:text-[10px] text-[#00ff41]/40">TRADES</div>
          </div>
          <div className="text-center p-2 bg-[#00ff41]/5 border border-[#00ff41]/10">
            <div className="text-base md:text-lg font-bold text-[#00ff41]">{wallet.volume}</div>
            <div className="text-[8px] md:text-[10px] text-[#00ff41]/40">VOLUME</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] md:text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#00ff41]/40">TOP:</span>
            <span className="text-[#ffb000] font-bold">{wallet.topToken}</span>
          </div>
          <div className="flex items-center gap-1 text-[#00ff41]/40">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#00ff41] rounded-full animate-pulse" />
            <span className="whitespace-nowrap">{wallet.lastActive}</span>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t border-r border-[#00ff41]/50" />
        <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b border-l border-[#00ff41]/50" />
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
