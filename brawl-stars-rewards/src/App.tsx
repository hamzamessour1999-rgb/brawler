import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RewardCard } from './components/RewardCard';
import { BackgroundParticles, Confetti } from './components/Effects';
import { 
  ChevronLeft,
  Info,
  Youtube, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Music2,
  Users,
  Trophy,
  Zap,
  Star,
  Gift,
  ShieldCheck
} from 'lucide-react';

const REWARDS = [
  {
    title: "ULTRA CHAOS DROPS",
    image: "https://i.postimg.cc/L5xWrvpV/Rare-Chaos-Drop.png",
    subtitle: "LIMITED TIME",
    rare: true
  },
  {
    title: "2000 GEMS",
    image: "https://i.postimg.cc/y6TWDRjf/Item-7-1.png",
    subtitle: "MEGA PACK",
    rare: true
  },
  {
    title: "SIRIUS BOX",
    image: "https://i.postimg.cc/wxrZcfw7/Item-16.png",
    subtitle: "EXCLUSIVE",
    rare: true
  },
  {
    title: "KENJI",
    subtitle: "NEW LEGENDARY BRAWLER",
    image: "https://i.postimg.cc/h47v0wK2/Item-3-webp.png",
    rare: true
  },
  {
    title: "BRAWL PASS PLUS",
    image: "https://i.postimg.cc/xdmJdTtW/Item-10-1-(1).png",
    subtitle: "SEASON 30"
  },
  {
    title: "SIRIUS BRAWLER",
    image: "https://i.postimg.cc/02wSbjzc/Sirius-Skin-Default.png",
    subtitle: "MYTHIC BRAWLER"
  },
  {
    title: "ULTRA BOX",
    image: "https://i.postimg.cc/02wSbjzc/Sirius-Skin-Default.png",
    subtitle: "ULTRA RARE",
    rare: true
  },
  {
    title: "BUFFIES",
    image: "https://i.postimg.cc/3JTL8sRv/Item-2-webp.png",
    subtitle: "COLLECTIBLE"
  },
  {
    title: "VALENTINE'S BOX",
    image: "https://i.postimg.cc/mkvWk8Pd/Item-15.png",
    subtitle: "SPECIAL EVENT"
  },
  {
    title: "KEYS",
    image: "https://i.postimg.cc/VspJXwMT/Item-4-webp.png",
    subtitle: "100x PACK"
  }
];

const WINNERS = [
  { name: "ProBrawler", reward: "Chaos Drops", time: "2m ago" },
  { name: "StarPlayer", reward: "2000 Gems", time: "5m ago" },
  { name: "BrawlKing", reward: "Sirius Box", time: "8m ago" },
  { name: "GamerX", reward: "Kenji", time: "12m ago" },
  { name: "NoobMaster", reward: "Brawl Pass", time: "15m ago" },
];

const ONLINE_PROFILES = [
  "https://i.postimg.cc/BQ0QsBKg/28000004.png",
  "https://i.postimg.cc/jjLRv8pt/28000005.png",
  "https://i.postimg.cc/wMcz3nmR/28000001.png",
  "https://i.postimg.cc/t4cKR9Md/151478961713913348.png",
  "https://i.postimg.cc/sXdbSwyw/28000614.png"
];

export default function App() {
  const [claimedCount, setClaimedCount] = useState(3893);
  const [onlineCount, setOnlineCount] = useState(1038);
  const [rewardIconIndex, setRewardIconIndex] = useState(0);
  const [profileIconIndex, setProfileIconIndex] = useState(0);
  const [showClaimModal, setShowClaimModal] = useState<string | null>(null);
  const [playerUsername, setPlayerUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  useEffect(() => {
    const statsInterval = setInterval(() => {
      setClaimedCount(prev => prev + Math.floor(Math.random() * 2));
      setOnlineCount(prev => prev + (Math.random() > 0.5 ? 2 : -2));
    }, 4000);

    const rewardRotationInterval = setInterval(() => {
      setRewardIconIndex(prev => (prev + 1) % REWARDS.length);
    }, 3000);

    const profileRotationInterval = setInterval(() => {
      setProfileIconIndex(prev => (prev + 1) % ONLINE_PROFILES.length);
    }, 4000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(rewardRotationInterval);
      clearInterval(profileRotationInterval);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitting && generationProgress < 100) {
      interval = setInterval(() => {
        setGenerationProgress(prev => {
          const next = prev + Math.floor(Math.random() * 3) + 1;
          return next > 100 ? 100 : next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSubmitting, generationProgress]);

  const handleClaim = (title: string) => {
    setGenerationProgress(0);
    setIsSubmitting(false);
    setShowClaimModal(title);
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-yellow-400 selection:text-black">
      <div className="bg-pattern" />
      <BackgroundParticles />
      
      {/* Top Ticker */}
      <div className="relative z-50 overflow-hidden bg-[#0d1b3e]/60 py-2 backdrop-blur-md border-b border-white/5">
        <div className="animate-scroll whitespace-nowrap text-sm font-display tracking-tight uppercase italic text-white brawl-text-shadow-sm">
          {WINNERS.map((w, i) => (
            <span key={i} className="mx-10 inline-flex items-center gap-2">
              <span className="text-[#ffcc00]">🔥 {w.name}</span> 
              <span className="text-white">JUST CLAIMED</span> 
              <span className="text-[#ff00ff]">{w.reward}</span> 
              <span className="text-white/50 text-[10px] font-sans not-italic ml-1 font-black">({w.time})</span>
            </span>
          ))}
        </div>
      </div>

      <main className="container mx-auto flex flex-col items-center px-4 pt-12 pb-32">
        {/* Hero Section */}
        <div className="relative mb-12 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="relative z-10"
          >
            <img 
              src="https://i.postimg.cc/Jn6G6Dns/logo-outlined-no-BG-(1).png" 
              alt="Brawl Stars Logo" 
              className="h-28 md:h-36 object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
              referrerPolicy="no-referrer"
            />
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-3 -right-6"
            >
              <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 drop-shadow-glow" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-3 -left-6"
            >
              <Zap className="h-8 w-8 text-blue-400 fill-blue-400 drop-shadow-glow" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="brawl-text-shadow mt-4 text-center font-display text-3xl md:text-5xl tracking-tight uppercase italic text-white"
          >
            FREE REWARDS HUB
          </motion.h1>
        </div>

        {/* Stats Section */}
        <div className="mb-8 w-full max-w-sm md:max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel overflow-hidden rounded-[1rem] md:rounded-[1.25rem] border-2 border-white/10 shadow-xl"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-center gap-2 bg-white/5 py-1.5 border-b border-white/5">
              <div className="flex items-center gap-1 rounded-full bg-red-500/20 px-1.5 py-0.5 ring-1 ring-red-500/30">
                <div className="h-1 w-1 animate-pulse rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]" />
                <span className="text-[7px] font-black tracking-widest text-white uppercase">LIVE</span>
              </div>
              <h3 className="text-[7px] font-black tracking-[0.2em] text-white/60 uppercase">CLAIMS TODAY</h3>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 divide-x divide-white/5">
              {/* Claimed Stat */}
              <div className="flex flex-col items-center p-2.5 md:p-3.5 transition-all hover:bg-white/5 group">
                <div className="relative mb-1">
                  <div className="absolute inset-0 blur-xl bg-yellow-400/10 rounded-full" />
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={rewardIconIndex}
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                      transition={{ duration: 0.4 }}
                      src={REWARDS[rewardIconIndex].image} 
                      alt="Reward" 
                      className="relative h-10 w-10 md:h-14 md:w-14 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>
                <span className="font-display text-xl md:text-3xl italic text-white tracking-tight leading-none brawl-text-shadow-sm">
                  {claimedCount.toLocaleString()}
                </span>
                <span className="mt-1 text-[6px] md:text-[7px] font-black tracking-[0.2em] text-white/40 uppercase">CLAIMED</span>
              </div>

              {/* Online Stat */}
              <div className="flex flex-col items-center p-2.5 md:p-3.5 transition-all hover:bg-white/5 group">
                <div className="relative mb-1">
                  <div className="absolute inset-0 blur-xl bg-blue-400/10 rounded-full" />
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={profileIconIndex}
                      initial={{ opacity: 0, scale: 0.8, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -10 }}
                      transition={{ duration: 0.4 }}
                      src={ONLINE_PROFILES[profileIconIndex]} 
                      alt="Profile" 
                      className="relative h-10 w-10 md:h-14 md:w-14 rounded-full border-2 border-white/10 object-cover shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>
                <span className="font-display text-xl md:text-3xl italic text-white tracking-tight leading-none brawl-text-shadow-sm">
                  {onlineCount.toLocaleString()}
                </span>
                <span className="mt-1 text-[6px] md:text-[7px] font-black tracking-[0.2em] text-white/40 uppercase">ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rewards Grid */}
        <div className="relative w-full max-w-6xl">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 rounded-full bg-yellow-400" />
              <h2 className="font-display text-2xl md:text-3xl tracking-tight uppercase italic text-white">
                AVAILABLE REWARDS
              </h2>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-[8px] md:text-[10px] font-black tracking-widest uppercase text-white/60">
              <Gift className="h-3 w-3" />
              UPDATED 2M AGO
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {REWARDS.map((reward, index) => (
              <RewardCard 
                key={index}
                index={index}
                title={reward.title}
                subtitle={reward.subtitle}
                image={reward.image}
                rare={reward.rare}
                onClaim={() => handleClaim(reward.title)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Claim Modal Overlay */}
      <AnimatePresence>
        {showClaimModal && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className={`relative w-full overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 ${isSubmitting ? 'max-w-xs bg-[#0a0f2c]' : 'max-w-md bg-white p-8 md:p-12'}`}
              >
                {!isSubmitting ? (
                  <>
                    {/* Back Button */}
                    <button 
                      onClick={() => setShowClaimModal(null)}
                      className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-md bg-[#4a4a4a] text-white shadow-md transition-transform active:scale-90"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex flex-col items-center">
                      <h2 className="mb-8 font-display text-3xl md:text-4xl tracking-tight text-black uppercase text-center">
                        ENTER PLAYER USERNAME
                      </h2>

                      {/* Input Field */}
                      <div className="relative w-full mb-6">
                        <input
                          type="text"
                          value={playerUsername}
                          onChange={(e) => setPlayerUsername(e.target.value.toUpperCase())}
                          placeholder="PLAYER USERNAME"
                          className="w-full rounded-2xl border-[3px] border-[#3b82f6] bg-white py-4 px-6 font-display text-2xl tracking-wider text-[#3b82f6] placeholder:text-blue-200 focus:outline-none shadow-[0_4px_0_#dbeafe]"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#3b82f6] text-white shadow-sm">
                          <Info className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Let's Go Button */}
                      <button 
                        onClick={() => setIsSubmitting(true)}
                        className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#ffcc00] to-[#ff9900] py-5 shadow-[0_8px_0_#cc7a00] transition-all active:translate-y-1 active:shadow-none"
                      >
                        <span className="font-display text-4xl tracking-widest text-white brawl-text-shadow">
                          LET'S GO!
                        </span>
                      </button>

                      {/* Footer Text */}
                      <div className="mt-8 text-center text-[8px] font-black leading-relaxed tracking-widest text-gray-400 uppercase">
                        THIS SITE IS PROTECTED BY RECAPTCHA AND THE GOOGLE <a href="#" className="text-blue-500 underline">PRIVACY POLICY</a> AND <a href="#" className="text-blue-500 underline">TERMS OF SERVICE</a> APPLY.
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative flex flex-col items-center overflow-hidden p-5 text-center">
                    {/* Technical Background Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
                    
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />

                    {/* Close Button */}
                    <button 
                      onClick={() => {
                        setIsSubmitting(false);
                        setGenerationProgress(0);
                        setShowClaimModal(null);
                        setPlayerUsername('');
                      }}
                      className="absolute right-4 top-4 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-white/20 hover:text-white"
                    >
                      <span className="text-lg font-bold">×</span>
                    </button>

                    <div className="relative z-10 flex w-full flex-col items-center">
                      <div className="mb-4 flex flex-col items-center">
                        <h2 className="brawl-text-shadow mb-0.5 font-display text-xl md:text-2xl tracking-tight text-white uppercase italic">
                          {generationProgress < 100 ? 'GENERATING...' : 'VERIFICATION'}
                        </h2>
                        <div className="flex items-center gap-2">
                          <div className={`h-1 w-1 rounded-full ${generationProgress < 100 ? 'bg-blue-500 animate-pulse' : 'bg-yellow-400'}`} />
                          <p className={`text-[8px] font-black tracking-[0.2em] uppercase ${generationProgress < 100 ? 'text-blue-400/80' : 'text-yellow-400/80'}`}>
                            {generationProgress < 100 ? `TARGET: ${playerUsername || 'PLAYER'}` : 'ACTION REQUIRED'}
                          </p>
                        </div>
                      </div>

                      {/* Reward Image with Hardware Feel - Smaller for Mobile */}
                      <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
                        <div className={`absolute inset-0 rounded-full blur-2xl animate-pulse ${generationProgress < 100 ? 'bg-blue-500/10' : 'bg-yellow-400/10'}`} />
                        {/* Circular Dashed Track */}
                        <div className={`absolute inset-0 rounded-full border border-dashed animate-[spin_10s_linear_infinite] ${generationProgress < 100 ? 'border-blue-500/20' : 'border-yellow-400/30'}`} />
                        
                        <motion.img 
                          animate={{ 
                            scale: [0.95, 1.05, 0.95],
                            y: [0, -3, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          src={REWARDS.find(r => r.title === showClaimModal)?.image} 
                          alt="Reward" 
                          className="relative z-10 h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Technical Progress Section / Verification */}
                      <div className="w-full space-y-4">
                        {generationProgress < 100 ? (
                          <>
                            <div className="flex items-end justify-between px-1">
                              <div className="flex flex-col items-start gap-0.5">
                                <span className="text-[8px] font-black tracking-widest text-blue-500/60 uppercase">STATUS</span>
                                <span className="text-[10px] font-black tracking-widest text-white uppercase">
                                  {generationProgress < 30 ? 'INITIALIZING' : 
                                   generationProgress < 60 ? 'CRACKING' : 
                                   generationProgress < 90 ? 'INJECTING' : 'FINALIZING'}
                                </span>
                              </div>
                              <div className="flex flex-col items-end gap-0.5">
                                <span className="text-[8px] font-black tracking-widest text-blue-500/60 uppercase">PROGRESS</span>
                                <span className="font-mono text-xs font-bold text-white tracking-tighter">
                                  {generationProgress.toString().padStart(3, '0')}%
                                </span>
                              </div>
                            </div>
                            
                            {/* Hardware Style Progress Bar */}
                            <div className="relative h-3 w-full overflow-hidden rounded-sm bg-black/60 p-0.5 ring-1 ring-white/10">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${generationProgress}%` }}
                                className="h-full rounded-[1px] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                              />
                              {/* Grid Overlay on Progress Bar */}
                              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(0,0,0,0.5) 95%)', backgroundSize: '4% 100%' }} />
                            </div>
                          </>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-4"
                          >
                            <div className="relative flex flex-col items-center gap-2 rounded-xl bg-yellow-400/5 p-4 ring-1 ring-yellow-400/20 backdrop-blur-sm">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.2)]">
                                <ShieldCheck className="h-5 w-5 text-yellow-400" />
                              </div>
                              <p className="text-[9px] font-black leading-relaxed tracking-widest text-yellow-400 uppercase text-center">
                                HUMAN VERIFICATION REQUIRED<br/>
                                <span className="text-white/60 font-bold tracking-normal normal-case text-[8px]">Complete verification to secure your reward.</span>
                              </p>
                            </div>

                            <button 
                              onClick={() => window.location.href = 'https://google.com'}
                              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-yellow-400 to-orange-500 py-4 shadow-[0_6px_0_#9a3412] transition-all hover:scale-[1.05] hover:rotate-1 hover:shadow-[0_10px_0_#9a3412] active:scale-95 active:translate-y-2 active:shadow-none"
                            >
                              <div className="relative z-10 flex flex-col items-center">
                                <span className="font-display text-2xl tracking-widest text-white brawl-text-shadow">
                                  VERIFY NOW
                                </span>
                                <span className="text-[7px] font-black tracking-[0.3em] text-white/60 uppercase">CLICK TO FINALIZE</span>
                              </div>
                              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                              
                              {/* Pulsing Ring */}
                              <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 animate-pulse" />
                            </button>

                            <div className="flex items-center gap-2 text-[7px] font-bold text-white/20 uppercase tracking-widest">
                              <div className="h-px w-6 bg-white/10" />
                              WAITING FOR VERIFICATION
                              <div className="h-px w-6 bg-white/10" />
                            </div>
                          </motion.div>
                        )}

                        {/* Micro Details */}
                        <div className="flex justify-between px-1 text-[7px] font-mono text-blue-500/40 uppercase tracking-widest">
                          <span>{generationProgress < 100 ? '0x7F4A9B2' : 'AUTH_REQUIRED'}</span>
                          <span>{generationProgress < 100 ? 'STABLE CONNECTION' : 'WAITING_FOR_USER'}</span>
                          <span>v2.0.4</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 bg-[#050a1a] py-24 text-white border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-between gap-16 md:flex-row">
            <div className="max-w-xs">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Supercell_logo.svg/1200px-Supercell_logo.svg.png" 
                alt="Supercell" 
                className="h-10 mb-8 opacity-80"
              />
              <p className="text-sm font-bold text-white/40 leading-relaxed mb-8">
                Supercell is a mobile game developer based in Helsinki, Finland, with offices in San Francisco, Seoul and Shanghai.
              </p>
              <div className="flex gap-4">
                <Youtube className="h-5 w-5 cursor-pointer text-white/40 transition-colors hover:text-white" />
                <Facebook className="h-5 w-5 cursor-pointer text-white/40 transition-colors hover:text-white" />
                <Instagram className="h-5 w-5 cursor-pointer text-white/40 transition-colors hover:text-white" />
                <Twitter className="h-5 w-5 cursor-pointer text-white/40 transition-colors hover:text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-16 gap-y-12">
              <div>
                <h4 className="mb-6 text-[10px] font-black tracking-[0.3em] uppercase text-white/20">GAMES</h4>
                <ul className="space-y-3 text-sm font-bold text-white/60">
                  <li className="hover:text-white cursor-pointer transition-colors">Brawl Stars</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Clash of Clans</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Clash Royale</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Hay Day</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-6 text-[10px] font-black tracking-[0.3em] uppercase text-white/20">SUPPORT</h4>
                <ul className="space-y-3 text-sm font-bold text-white/60">
                  <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Parent's Guide</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Safe & Fair Play</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black tracking-widest uppercase text-white/30">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Legal</a>
            </div>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
              © 2026 SUPERCELL OY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
