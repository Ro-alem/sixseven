/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Dna, 
  TreeDeciduous, 
  Beaker, 
  Info, 
  ChevronRight, 
  Users, 
  Zap, 
  Heart,
  Droplets,
  ArrowDown
} from 'lucide-react';
import { GENERATIONS, Generation, TRANSLATIONS, Language } from './constants';

// --- Context/State Helpers ---
const useLanguage = () => {
  const [lang, setLang] = useState<Language>('KAZ');
  const t = TRANSLATIONS[lang];
  return { lang, setLang, t };
};

// --- Sub-Components ---

const DnaSpiral = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <svg viewBox="0 0 400 100" className="w-full h-full">
        {/* DNA Strands */}
        {[...Array(20)].map((_, i) => {
          const x = i * 20;
          const y1 = 50 + Math.sin(i * 0.5) * 30;
          const y2 = 50 - Math.sin(i * 0.5) * 30;
          const isRed = (i / 20) * 100 < percentage;
          
          return (
            <g key={i}>
              <motion.line 
                x1={x} y1={y1} x2={x} y2={y2} 
                stroke={isRed ? "#8B0000" : "#e5e7eb"} 
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.circle 
                cx={x} cy={y1} r="4" 
                fill={isRed ? "#8B0000" : "#d1d5db"} 
              />
              <motion.circle 
                cx={x} cy={y2} r="4" 
                fill={isRed ? "#8B0000" : "#d1d5db"} 
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const PaintAnalogy = ({ step, t }: { step: number, t: any }) => {
  return (
    <div className="py-12">
      <h3 className="text-xl font-serif font-bold text-blood mb-6 flex items-center gap-2">
        <Droplets size={20} />
        {t.paintTitle}
      </h3>
      <p className="text-sm text-stone-500 mb-8 italic">{t.paintDesc}</p>
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {GENERATIONS.map((gen, idx) => {
          const isActive = idx <= step;
          // Calculate color dilution: 100% red -> 0% red (white)
          // We use a simple linear interpolation for visual effect
          const opacity = gen.percentage / 100;
          const bgColor = `rgba(139, 0, 0, ${opacity})`;
          
          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="relative w-full aspect-[2/3] bg-stone-100 rounded-xl border-2 border-stone-200 overflow-hidden shadow-inner">
                <motion.div 
                  className="absolute bottom-0 left-0 right-0"
                  initial={{ height: 0 }}
                  animate={{ 
                    height: isActive ? '80%' : '0%',
                    backgroundColor: bgColor
                  }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                />
                {idx === 0 && <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/50 rotate-90">PURE</div>}
              </div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
                {idx === 0 ? 'Start' : `${idx}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BaiterekTree = ({ step, t }: { step: number, t: any }) => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto py-12">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Trunk */}
        <path d="M100,180 Q100,100 100,40" stroke="#D4AF37" strokeWidth="4" fill="none" />
        
        {/* Branches */}
        {GENERATIONS.map((gen, idx) => {
          const angle = (idx / (GENERATIONS.length - 1)) * Math.PI - Math.PI;
          const x = 100 + Math.cos(angle) * (60 + idx * 5);
          const y = 100 + Math.sin(angle) * (60 + idx * 5);
          const isActive = idx <= step;
          const isLast = idx === 8;

          return (
            <g key={idx}>
              <motion.line 
                x1="100" y1="100" x2={x} y2={y} 
                stroke={isActive ? (isLast ? "#8B0000" : "#D4AF37") : "#e5e7eb"} 
                strokeWidth={isActive ? "3" : "1"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
              />
              <motion.circle 
                cx={x} cy={y} r={isActive ? "6" : "3"} 
                fill={isActive ? (isLast ? "#8B0000" : "#D4AF37") : "#d1d5db"}
                whileHover={{ scale: 1.5 }}
              />
              {isActive && (
                <text x={x} y={y - 10} fontSize="6" textAnchor="middle" fontWeight="bold" fill={isLast ? "#8B0000" : "#D4AF37"}>
                  {isLast ? t.kinshipEnded : `${gen.percentage.toFixed(1)}%`}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Root (User) */}
        <circle cx="100" cy="180" r="10" fill="#8B0000" />
        <text x="100" y="195" fontSize="8" textAnchor="middle" fontWeight="bold" fill="#8B0000">100%</text>
      </svg>
    </div>
  );
};

const Header = ({ lang, setLang, t }: { lang: Language, setLang: (l: Language) => void, t: any }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blood rounded-full flex items-center justify-center text-white shadow-lg">
          <Dna size={24} />
        </div>
        <span className="font-serif font-bold text-xl tracking-tight text-blood">{lang === 'KAZ' ? 'Жеті Ата' : 'Seven Ancestors'}</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest text-stone-600">
        <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="hover:text-blood transition-colors">{lang === 'KAZ' ? 'Басты' : 'Home'}</a>
        <a href="#info" onClick={(e) => handleScroll(e, 'info')} className="hover:text-blood transition-colors">{lang === 'KAZ' ? 'Инфографика' : 'Info'}</a>
        <a href="#lab" onClick={(e) => handleScroll(e, 'lab')} className="hover:text-blood transition-colors">{lang === 'KAZ' ? 'Лаборатория' : 'Lab'}</a>
        <a href="#theory" onClick={(e) => handleScroll(e, 'theory')} className="hover:text-blood transition-colors">{lang === 'KAZ' ? 'Ғылым' : 'Theory'}</a>
      </nav>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setLang('KAZ')}
          className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${lang === 'KAZ' ? 'bg-blood text-white' : 'border border-stone-200 hover:bg-stone-100'}`}
        >
          ҚАЗ
        </button>
        <button 
          onClick={() => setLang('ENG')}
          className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${lang === 'ENG' ? 'bg-blood text-white' : 'border border-stone-200 hover:bg-stone-100'}`}
        >
          ENG
        </button>
      </div>
    </header>
  );
};

const Hero = ({ onStart, t }: { onStart: () => void, t: any }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background DNA Animation */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
          <svg viewBox="0 0 800 600" className="w-full h-auto">
            <motion.path
              d="M100,300 Q200,100 300,300 T500,300 T700,300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blood"
              animate={{
                d: [
                  "M100,300 Q200,100 300,300 T500,300 T700,300",
                  "M100,300 Q200,500 300,300 T500,300 T700,300",
                  "M100,300 Q200,100 300,300 T500,300 T700,300"
                ]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl"
      >
        <motion.h1 
          className="font-serif text-5xl md:text-7xl font-bold text-blood mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t.heroTitle.split(':')[0]}: <br />
          <span className="text-gold">{t.heroTitle.split(':')[1]}</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t.heroSub.split('?')[0]}? <br />
          <span className="font-semibold text-blood">{t.heroSub.split('?')[1]}?</span>
        </motion.p>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blood text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-blood/30 flex items-center gap-3 mx-auto"
        >
          {t.startBtn}
          <ChevronRight size={20} />
        </motion.button>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-stone-400"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};

const Infographic = ({ t, lang }: { t: any, lang: Language }) => {
  const [selectedGen, setSelectedGen] = useState<number>(1);
  
  return (
    <section id="info" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="font-serif text-4xl font-bold text-blood mb-8">{t.infoTitle}</h2>
            <p className="text-lg text-stone-600 mb-12">
              {t.infoDesc}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GENERATIONS.slice(1).map((gen, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGen(idx + 1)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedGen === idx + 1 
                    ? 'border-blood bg-blood text-white shadow-lg' 
                    : 'border-stone-100 bg-stone-50 text-stone-600 hover:border-blood/30'
                  }`}
                >
                  <div className="text-xs font-bold uppercase opacity-70 mb-1">{idx + 1}-{lang === 'KAZ' ? 'буын' : 'gen'}</div>
                  <div className="font-bold text-lg">{lang === 'KAZ' ? gen.kazakhName : gen.englishName}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-64 h-96 bg-stone-100 rounded-3xl border-4 border-stone-200 overflow-hidden shadow-inner">
              {/* Liquid Animation */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-blood/80"
                initial={{ height: '50%' }}
                animate={{ height: `${GENERATIONS[selectedGen].percentage}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
              >
                <div className="absolute top-0 left-0 right-0 h-4 bg-blood/30 -translate-y-full blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Droplets className="text-white/20" size={80} />
                </div>
              </motion.div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <motion.div 
                  key={selectedGen}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-6xl font-black mb-2 ${GENERATIONS[selectedGen].percentage > 20 ? 'text-white' : 'text-blood'}`}
                >
                  {GENERATIONS[selectedGen].percentage.toFixed(2)}%
                </motion.div>
                <div className={`text-sm font-bold uppercase tracking-widest ${GENERATIONS[selectedGen].percentage > 20 ? 'text-white/80' : 'text-stone-400'}`}>
                  {lang === 'KAZ' ? 'Генетикалық үлес' : 'Genetic Share'}
                </div>
              </div>
            </div>
            
            <motion.div 
              key={selectedGen + 'desc'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center max-w-xs"
            >
              <p className="text-stone-500 italic">"{lang === 'KAZ' ? GENERATIONS[selectedGen].kazakhDescription : GENERATIONS[selectedGen].englishDescription}"</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VirtualLab = ({ t, lang }: { t: any, lang: Language }) => {
  const [name, setName] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const grow = () => {
    if (currentStep < GENERATIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsFinished(false);
  };

  return (
    <section id="lab" className="py-24 px-6 bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Beaker size={16} />
            {t.labTitle}
          </div>
          <h2 className="font-serif text-4xl font-bold text-blood mb-4">{t.labTitle}</h2>
          <p className="text-stone-600">{t.labDesc}</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12 mb-12">
          {!name && currentStep === 0 ? (
            <div className="flex flex-col items-center gap-6">
              <input 
                type="text" 
                placeholder={lang === 'KAZ' ? "Есіміңізді жазыңыз..." : "Enter your name..."}
                className="w-full max-w-md px-6 py-4 rounded-2xl border-2 border-stone-200 focus:border-blood outline-none text-xl transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setName((e.target as HTMLInputElement).value);
                }}
              />
              <button 
                onClick={(e) => {
                  const input = (e.currentTarget.previousSibling as HTMLInputElement);
                  if (input.value) setName(input.value);
                }}
                className="bg-blood text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blood/90 transition-all"
              >
                {lang === 'KAZ' ? 'Бастау' : 'Start'}
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-stone-100 pb-6">
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-tighter">{lang === 'KAZ' ? 'Бастапқы тұлға' : 'Origin Person'}</div>
                  <div className="text-2xl font-serif font-bold text-blood">{name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-tighter">{lang === 'KAZ' ? 'Ағымдағы ұрпақ' : 'Current Gen'}</div>
                  <div className="text-2xl font-bold text-gold">{currentStep + 1} / 8</div>
                </div>
              </div>

              {/* DNA Spiral Visualization */}
              <div className="py-6 border-b border-stone-100">
                <h4 className="text-sm font-bold text-stone-400 uppercase mb-4">{t.dnaTitle}</h4>
                <DnaSpiral percentage={GENERATIONS[currentStep].percentage} />
              </div>

              {/* Slider for Virtual Experiment */}
              <div className="py-6">
                <label className="block text-sm font-bold text-stone-400 uppercase mb-4">{t.sliderLabel}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="8" 
                  step="1" 
                  value={currentStep} 
                  onChange={(e) => setCurrentStep(parseInt(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blood"
                />
                <div className="flex justify-between text-[10px] font-bold text-stone-400 mt-2">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                </div>
              </div>

              <div className="relative min-h-[400px] flex flex-col items-center justify-start overflow-y-auto max-h-[500px] py-10 scroll-smooth" ref={scrollRef}>
                <AnimatePresence>
                  {GENERATIONS.slice(0, currentStep + 1).map((gen, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="flex flex-col items-center relative"
                    >
                      {idx > 0 && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: 40 }}
                          className="w-1 bg-stone-200"
                        />
                      )}
                      <div className={`px-6 py-4 rounded-2xl flex flex-col items-center gap-1 shadow-sm border ${
                        idx === currentStep ? 'bg-blood text-white border-blood' : 'bg-white text-stone-800 border-stone-100'
                      }`}>
                        <span className="text-xs font-bold uppercase opacity-60">
                          {idx === 0 ? (lang === 'KAZ' ? 'Бастау' : 'Start') : (lang === 'KAZ' ? gen.kazakhName : gen.englishName)}
                        </span>
                        <span className="font-bold text-lg">
                          {idx === 0 ? name : `${name} ${lang === 'KAZ' ? 'ұрпағы' : 'descendant'}`}
                        </span>
                        <span className="text-sm font-mono opacity-80">
                          {gen.percentage.toFixed(2)}% {lang === 'KAZ' ? 'қан' : 'blood'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {currentStep === 8 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-12 p-8 bg-blood text-white rounded-3xl text-center shadow-2xl"
                  >
                    <Zap className="mx-auto mb-4 text-gold" size={40} />
                    <h3 className="text-2xl font-serif font-bold mb-2">{lang === 'KAZ' ? 'Ғылыми факт:' : 'Scientific Fact:'}</h3>
                    <p className="text-lg opacity-90">
                      {lang === 'KAZ' ? 'Туыстық байланыс генетикалық деңгейде үзілді.' : 'Kinship connection genetically ended.'} 
                      {lang === 'KAZ' ? '8-ші ұрпақтағы 0.35% — бұл популяциядағы кез келген бөтен адаммен болатын сәйкестікке тең.' : '0.35% at 8th gen is equal to random match in population.'}
                    </p>
                    <button 
                      onClick={reset}
                      className="mt-6 bg-white text-blood px-6 py-2 rounded-full font-bold text-sm hover:bg-gold hover:text-white transition-all"
                    >
                      {lang === 'KAZ' ? 'Қайта бастау' : 'Restart'}
                    </button>
                  </motion.div>
                )}
              </div>

              {currentStep < 8 && (
                <div className="flex justify-center pt-8">
                  <button 
                    onClick={grow}
                    className="group flex items-center gap-3 bg-gold text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-gold/20 hover:bg-gold-light hover:text-blood transition-all"
                  >
                    {lang === 'KAZ' ? 'Ұрпақты өсіру' : 'Grow Generation'}
                    <TreeDeciduous className="group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* New Interactive Sections: Paint Analogy and Baiterek Tree */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-3xl p-8">
            <PaintAnalogy step={currentStep} t={t} />
          </div>
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-serif font-bold text-gold mb-6 flex items-center gap-2">
              <TreeDeciduous size={20} />
              {t.treeTitle}
            </h3>
            <BaiterekTree step={currentStep} t={t} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Theory = ({ t }: { t: any }) => {
  return (
    <section id="theory" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blood/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
            
            <h2 className="font-serif text-4xl font-bold text-blood mb-8">{t.theoryTitle}</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blood/10 rounded-xl flex items-center justify-center text-blood">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.why7}</h3>
                  <p className="text-stone-600">
                    {t.why7Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.mutation}</h3>
                  <p className="text-stone-600">
                    {t.mutationDesc}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.limit}</h3>
                  <p className="text-stone-600">
                    {t.limitDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-stone-100 rounded-full"
            />
            <div className="relative z-10 p-8 glass-card rounded-[40px] border-blood/10">
              <img 
                src="https://picsum.photos/seed/genetics/800/800" 
                alt="Genetics" 
                className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 max-w-[200px]">
                <Heart className="text-blood mb-2" />
                <p className="text-xs font-bold text-stone-400 uppercase">Денсаулық кепілі</p>
                <p className="text-sm font-serif font-bold">Таза қан — сау ұрпақ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ t, lang }: { t: any, lang: Language }) => (
  <footer className="bg-stone-900 text-white py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blood rounded-full flex items-center justify-center text-white">
              <Dna size={18} />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight">{lang === 'KAZ' ? 'Жеті Ата' : 'Seven Ancestors'}</span>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed">
            {lang === 'KAZ' ? 'Қазақ халқының генетикалық мұрасын сақтау және жас ұрпаққа ғылыми негізде жеткізу жобасы.' : 'Project to preserve Kazakh genetic heritage and educate the youth.'}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gold">{lang === 'KAZ' ? 'Мәзір' : 'Menu'}</h4>
          <ul className="space-y-4 text-sm text-stone-400">
            <li><a href="#hero" className="hover:text-white transition-colors">{lang === 'KAZ' ? 'Басты бет' : 'Home'}</a></li>
            <li><a href="#info" className="hover:text-white transition-colors">{lang === 'KAZ' ? 'Инфографика' : 'Info'}</a></li>
            <li><a href="#lab" className="hover:text-white transition-colors">{lang === 'KAZ' ? 'Лаборатория' : 'Lab'}</a></li>
            <li><a href="#theory" className="hover:text-white transition-colors">{lang === 'KAZ' ? 'Ғылыми негіздеме' : 'Theory'}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gold">{lang === 'KAZ' ? 'Байланыс' : 'Contact'}</h4>
          <p className="text-sm text-stone-400 mb-6">
            {lang === 'KAZ' ? 'Сұрақтарыңыз немесе ұсыныстарыңыз болса, бізге жазыңыз:' : 'If you have questions or suggestions, please write to us:'}
          </p>
          <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
            {lang === 'KAZ' ? 'Бізбен байланысу' : 'Contact Us'}
          </button>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500 font-medium">
        <p>© 2024 {lang === 'KAZ' ? 'Жеті Ата: Генетикалық код' : 'Seven Ancestors: Genetic Code'}. {lang === 'KAZ' ? 'Барлық құқықтар қорғалған.' : 'All rights reserved.'}</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">{lang === 'KAZ' ? 'Құпиялылық саясаты' : 'Privacy Policy'}</a>
          <a href="#" className="hover:text-white">{lang === 'KAZ' ? 'Пайдалану шарттары' : 'Terms of Use'}</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const { lang, setLang, t } = useLanguage();
  
  const scrollToLab = () => {
    document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-blood selection:text-white">
      <Header lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero onStart={scrollToLab} t={t} />
        <Infographic t={t} lang={lang} />
        <VirtualLab t={t} lang={lang} />
        <Theory t={t} />
      </main>
      <Footer t={t} lang={lang} />
    </div>
  );
}
