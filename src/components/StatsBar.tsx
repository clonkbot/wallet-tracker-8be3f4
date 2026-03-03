import { useEffect, useState } from 'react';
import type { Wallet } from '../App';

interface StatsBarProps {
  wallets: Wallet[];
}

export function StatsBar({ wallets }: StatsBarProps) {
  const [displayStats, setDisplayStats] = useState({
    totalPnl: 0,
    avgWinRate: 0,
    totalTrades: 0,
    activeWallets: 0,
  });

  useEffect(() => {
    if (wallets.length === 0) return;

    const totalPnl = wallets.reduce((sum, w) => sum + w.pnl, 0);
    const avgWinRate = wallets.reduce((sum, w) => sum + w.winRate, 0) / wallets.length;
    const totalTrades = wallets.reduce((sum, w) => sum + w.trades, 0);
    const activeWallets = wallets.filter((w) => w.signalStrength > 50).length;

    // Animate the numbers
    const duration = 1000;
    const steps = 30;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setDisplayStats({
        totalPnl: Math.round(totalPnl * eased),
        avgWinRate: Math.round(avgWinRate * eased),
        totalTrades: Math.round(totalTrades * eased),
        activeWallets: Math.round(activeWallets * eased),
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [wallets]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const stats = [
    { label: 'TOTAL_PNL', value: formatNumber(displayStats.totalPnl), color: displayStats.totalPnl >= 0 ? 'text-[#00ff88]' : 'text-[#ff0040]' },
    { label: 'AVG_WIN_RATE', value: `${displayStats.avgWinRate}%`, color: 'text-[#ffb000]' },
    { label: 'TOTAL_TRADES', value: displayStats.totalTrades.toLocaleString(), color: 'text-[#00ff41]' },
    { label: 'ACTIVE_WALLETS', value: `${displayStats.activeWallets}/${wallets.length}`, color: 'text-[#00ffff]' },
  ];

  return (
    <div className="border-b border-[#00ff41]/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-[8px] md:text-[10px] text-[#00ff41]/40 tracking-widest mb-1">{stat.label}</span>
              <span className={`text-base md:text-xl font-bold ${stat.color} tabular-nums`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated data stream */}
      <div className="h-[2px] bg-[#00ff41]/5 overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#00ff41]/50 to-transparent animate-[dataStream_3s_linear_infinite]" />
      </div>

      <style>{`
        @keyframes dataStream {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
