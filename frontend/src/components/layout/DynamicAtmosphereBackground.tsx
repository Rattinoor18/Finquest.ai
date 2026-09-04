import React, { useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const DynamicAtmosphereBackground: React.FC = () => {
  const { isDark } = useTheme();

  // Procedurally generate deterministic starfield points
  const stars = useMemo(() => {
    const starList = [];
    const count = 75;
    for (let i = 0; i < count; i++) {
      const top = (i * 17.3 + (i % 7) * 11) % 100;
      const left = (i * 23.7 + (i % 5) * 13) % 100;
      const size = (i % 3 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1.2);
      const duration = 2.5 + ((i * 1.3) % 4);
      const delay = (i * 0.7) % 5;
      const isDiamond = i % 8 === 0;
      starList.push({ id: i, top, left, size, duration, delay, isDiamond });
    }
    return starList;
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* Base Canvas: ALWAYS tied to var(--bg) so light theme is crisp white and dark theme is obsidian */}
      <div 
        className="absolute inset-0 transition-colors duration-500" 
        style={{ backgroundColor: 'var(--bg)' }}
      />

      {/* ============================================================== */}
      {/* 🌟 DARK THEME ATMOSPHERE: CELESTIAL STARRY SKY & GOLDEN NEBULA */}
      {/* ============================================================== */}
      <div className="theme-dark-only absolute inset-0">
        {/* Floating Amber & Gold Nebula Orbs */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[110px] animate-float-slow-1 opacity-70 bg-gradient-to-br from-[#D4AF37]/25 via-[#B45309]/15 to-transparent" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[120px] animate-float-slow-2 opacity-65 bg-gradient-to-tl from-[#F5C542]/20 via-[#D4AF37]/10 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[130px] animate-float-slow-3 opacity-50 bg-gradient-to-r from-[#D4AF37]/10 via-[#F59E0B]/12 to-transparent" />

        {/* Golden & White Celestial Twinkling Stars */}
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.isDiamond ? '#F5C542' : '#FFFFFF',
              boxShadow: s.isDiamond ? '0 0 6px 1.5px rgba(245, 197, 66, 0.8)' : '0 0 4px 1px rgba(255, 255, 255, 0.5)',
              animation: `star-twinkle ${s.duration}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
              opacity: 0.85,
            }}
          >
            {s.isDiamond && (
              <span className="absolute -top-1.5 -left-1.5 text-[8px] leading-none select-none pointer-events-none text-[#F5C542]/80 font-serif">
                ✦
              </span>
            )}
          </div>
        ))}

        {/* Shooting Star Streak */}
        <div className="absolute top-16 right-1/4 w-[160px] h-[1.5px] bg-gradient-to-r from-transparent via-[#F5C542] to-white animate-shooting-star" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0B]/20 to-[#0A0A0B]/70" />
      </div>

      {/* ============================================================== */}
      {/* 💜 LIGHT THEME ATMOSPHERE: WHITE & PURPLE GLASS AURA SHIMMER   */}
      {/* ============================================================== */}
      <div className="theme-light-only absolute inset-0">
        {/* Soft Lavender, Violet & Rose Quartz Radiant Ambient Orbs */}
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-[100px] animate-float-slow-1 opacity-60 bg-gradient-to-br from-[#7C3AED]/18 via-[#C084FC]/14 to-transparent" />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full blur-[110px] animate-float-slow-2 opacity-50 bg-gradient-to-tl from-[#9333EA]/16 via-[#F472B6]/12 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] rounded-full blur-[120px] animate-float-slow-3 opacity-40 bg-gradient-to-r from-[#A855F7]/12 via-[#E9D5FF]/20 to-transparent" />

        {/* Delicate Purple & Silver Shimmer Sparkles */}
        {stars.slice(0, 45).map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${Math.max(1.5, s.size * 0.9)}px`,
              height: `${Math.max(1.5, s.size * 0.9)}px`,
              backgroundColor: s.isDiamond ? '#7C3AED' : '#A855F7',
              boxShadow: s.isDiamond ? '0 0 6px 1px rgba(124, 58, 237, 0.45)' : '0 0 3px 0.5px rgba(168, 85, 247, 0.3)',
              animation: `star-twinkle ${s.duration * 1.2}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
              opacity: 0.45,
            }}
          >
            {s.isDiamond && (
              <span className="absolute -top-1.5 -left-1.5 text-[8px] leading-none select-none pointer-events-none text-[#7C3AED]/60 font-serif">
                ✦
              </span>
            )}
          </div>
        ))}

        {/* Crisp Frosted Vignette for Light Theme */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#F8F9FE]/30 to-[#F8F9FE]/80" />
      </div>
    </div>
  );
};
