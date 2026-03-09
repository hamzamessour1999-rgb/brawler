import React from 'react';
import { motion } from 'motion/react';
import { Sparkle } from './Effects';

interface RewardCardProps {
  title: string;
  subtitle?: string;
  image: string;
  onClaim: () => void;
  index: number;
  rare?: boolean;
}

export const RewardCard: React.FC<RewardCardProps> = ({ title, subtitle, image, onClaim, index, rare }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.03, 
        rotate: index % 2 === 0 ? 0.5 : -0.5,
        transition: { duration: 0.2 }
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-[3px] border-black/30 bg-gradient-to-b from-[#5d12b3] to-[#2a0754] p-0.5 shadow-xl transition-all ${rare ? 'ring-2 ring-purple-400/30' : ''}`}
    >
      {/* Inner Border/Glow */}
      <div className="absolute inset-0 rounded-[0.9rem] border border-white/10 pointer-events-none z-20"></div>
      
      {/* Sunburst Background Effect */}
      <div className={`sunburst absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity`}></div>
      
      {/* Enhanced Sparkles for All Items */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        <Sparkle style={{ top: '15%', left: '10%', animationDelay: '0s', transform: 'scale(0.6)' }} />
        <Sparkle style={{ top: '25%', right: '12%', animationDelay: '0.5s', transform: 'scale(0.4)' }} />
        <Sparkle style={{ bottom: '35%', left: '15%', animationDelay: '1.2s', transform: 'scale(0.5)' }} />
        <Sparkle style={{ bottom: '20%', right: '18%', animationDelay: '0.8s', transform: 'scale(0.3)' }} />
        
        {rare && (
          <>
            <Sparkle style={{ top: '40%', left: '5%', animationDelay: '0.3s', transform: 'scale(0.8)' }} />
            <Sparkle style={{ top: '10%', right: '30%', animationDelay: '1.5s', transform: 'scale(0.7)' }} />
            <Sparkle style={{ bottom: '10%', left: '40%', animationDelay: '2s', transform: 'scale(0.6)' }} />
          </>
        )}
      </div>

      {/* Animated Shine Effect */}
      <motion.div 
        animate={{ 
          x: ['-100%', '200%'],
          opacity: [0, 0.2, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatDelay: 3,
          ease: "linear"
        }}
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center p-2 text-center">
        <h3 className="brawl-text-shadow mb-0.5 font-display text-sm md:text-base tracking-tighter uppercase italic text-white line-clamp-1">
          {title}
        </h3>
        {subtitle && (
          <p className="mb-2 text-[7px] md:text-[8px] font-black tracking-[0.2em] uppercase text-white/40 drop-shadow-sm line-clamp-1">
            {subtitle}
          </p>
        )}
        
        <div className="relative my-3 flex h-24 w-full items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          <motion.img 
            animate={{ 
              y: [0, -3, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            src={image} 
            alt={title} 
            className="h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <button 
          onClick={onClaim}
          className="group/btn relative w-full overflow-hidden rounded-lg bg-gradient-to-b from-[#ffcc00] to-[#ff9900] py-2 font-display text-sm tracking-wider uppercase italic text-white transition-all hover:scale-[1.02] active:scale-95 active:translate-y-0.5 shadow-[0_4px_0_rgba(0,0,0,0.3)] active:shadow-none"
        >
          <span className="relative z-10 brawl-text-shadow">CLAIM</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
        </button>
      </div>
    </motion.div>
  );
};
