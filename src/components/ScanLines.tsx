export function ScanLines() {
  return (
    <>
      {/* CRT Scan Lines */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)',
        }}
      />

      {/* Vignette Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Subtle Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-30 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated Scan Line */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        <div
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff41]/20 to-transparent animate-[scanMove_8s_linear_infinite]"
          style={{ boxShadow: '0 0 10px rgba(0,255,65,0.3)' }}
        />
      </div>

      <style>{`
        @keyframes scanMove {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </>
  );
}
