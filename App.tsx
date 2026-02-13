
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, Music, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Sub-component: FloatingHearts ---
const FloatingHearts: React.FC = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 15 + Math.random() * 25,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, 90, -90, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          className="absolute text-rose-300/30 fill-current"
          style={{ width: heart.size, height: heart.size }}
        >
          <Heart fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

// --- Sub-component: RomanticMessage ---
const RomanticMessage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const fullText = "Hola mi corazoncito de melón, quería decirte primeramente que te amo mucho y que eres la niña de mi corazón, lo que siento por ti no lo cambio por nada en el mundo.\n\nSé que han pasado muchas cosas y sé que tal vez ahora te sientes un poco diferente, pero no quiero que dudes nunca de cuánto te amo mi dormilona.\n\nTal vez no podamos pasar juntos como quisiéramos, pero el hecho de saber que en un día tan especial como el 14 de febrero te tendré conmigo me hace el hombre más feliz del mundo, así no te tenga de frente.\n\nY si tú me lo permites quiero invitarte a que seas mi san Valentín, así estemos a la distancia quiero pasar el día hablando contigo o hacer una llamadita en la noche, así sean 5 minutos permíteme pasarlo contigo.";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-lg md:text-xl text-rose-900 font-medium leading-relaxed mb-8 whitespace-pre-wrap italic text-center px-4 md:px-8"
      >
        {fullText}
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(225 29 72 / 0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all w-full md:w-auto"
      >
        Continuar con amor...
      </motion.button>
    </motion.div>
  );
};

// --- Sub-component: StoryScreen ---
const StoryScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.95 }}
      variants={{ show: { transition: { staggerChildren: 0.3 } } }}
      className="z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white/40 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] p-6 md:p-12 border border-white/60 custom-scrollbar flex flex-col items-center"
    >
      <motion.div variants={itemVariants} className="mb-12 w-full">
        <div className="relative group overflow-hidden rounded-3xl shadow-2xl mb-6">
          <img src="https://i.imgur.com/6tWN8C8.jpeg" alt="Recuerdo 1" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent" />
        </div>
        <p className="text-xl text-rose-900 font-serif italic text-center leading-relaxed">
          "Siempre tuve presente que te amaría mi niña... porque desde ese momento sabía que tu <span className="text-rose-600 font-bold not-italic underline decoration-rose-300 underline-offset-4">valías la pena</span>."
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-12 w-full">
        <div className="relative group overflow-hidden rounded-3xl shadow-2xl mb-6">
          <img src="https://i.imgur.com/ZC3Atuy.jpeg" alt="Recuerdo 2" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent" />
        </div>
        <p className="text-xl text-rose-900 font-serif italic text-center leading-relaxed">
          "A día de hoy sigo aquí esforzándome por ti... porque nunca mentí con quererte en mi vida."
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="w-full bg-white/60 p-8 rounded-[2.5rem] border border-rose-100/50 mb-10 shadow-inner text-center">
        <p className="text-lg text-rose-950 italic font-serif leading-relaxed mb-6">
          "No hay absolutamente nada más fuerte y grande que nuestro amor. ¿Estás lista para lo que viene?"
        </p>
        <div className="h-px w-24 bg-rose-200 mx-auto mb-6" />
        <p className="text-2xl font-romantic text-rose-600 font-bold">Te amo infinitamente.</p>
      </motion.div>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="bg-rose-600 text-white px-10 py-5 rounded-full font-bold shadow-2xl shadow-rose-200 transition-all flex items-center gap-3 mb-4 w-full justify-center"
      >
        <span>Hay algo que quiero preguntarte ❤️</span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.button>
    </motion.div>
  );
};

// --- Sub-component: SuccessScreen ---
const SuccessScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 45 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ type: "spring", damping: 12 }}
      className="z-10 w-full max-w-xl bg-white/90 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(244,63,94,0.2)] p-10 md:p-16 text-center relative overflow-hidden border border-white"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400" />
      
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="inline-block bg-rose-500 p-6 rounded-full shadow-2xl mb-10"
      >
        <Heart className="w-12 h-12 text-white fill-white" />
      </motion.div>

      <h2 className="font-serif text-3xl md:text-5xl text-rose-800 mb-8 font-bold leading-tight">
        ¡Gracias por aceptar, mi niña linda! 💕
      </h2>
      
      <p className="text-rose-600 font-romantic text-4xl mb-10 leading-relaxed">
        Desde hoy y para siempre, serás mi San Valentín favorito.
      </p>

      <div className="pt-10 border-t border-rose-100">
        <p className="text-rose-400 font-medium tracking-widest uppercase text-sm">Eres mi todo ❤️</p>
      </div>
    </motion.div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'story' | 'question' | 'success'>('intro');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 100 });
  const [yesScale, setYesScale] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [isNoHidden, setIsNoHidden] = useState(false);

  const handleYes = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fff', '#fda4af'],
    });
    setStep('success');
  };

  const moveNoButton = () => {
    if (isNoHidden) return;
    const newAttempts = noAttempts + 1;
    setNoAttempts(newAttempts);

    if (newAttempts >= 8) {
      setIsNoHidden(true);
      return;
    }

    // Calculamos límites para evitar que salga de la pantalla
    const maxX = window.innerWidth * 0.3;
    const maxY = window.innerHeight * 0.3;
    const randomX = (Math.random() - 0.5) * maxX * 2;
    const randomY = (Math.random() - 0.5) * maxY * 2;
    
    setNoButtonPos({ x: randomX, y: randomY });
    setYesScale(prev => Math.min(prev + 0.2, 3.5));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#fff9f9] flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#ffe4e6_0%,_transparent_50%),radial-gradient(circle_at_bottom_left,_#fce7f3_0%,_transparent_50%)] opacity-60" />
      
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            className="z-10 w-full max-w-3xl bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] p-8 md:p-16 border border-white/60 flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="mb-8"
            >
              <Heart className="w-20 h-20 text-rose-500 fill-rose-500 filter drop-shadow-2xl" />
            </motion.div>
            <RomanticMessage onComplete={() => setStep('story')} />
          </motion.div>
        )}

        {step === 'story' && (
          <StoryScreen key="story" onComplete={() => setStep('question')} />
        )}

        {step === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 w-full max-w-2xl bg-white/50 backdrop-blur-3xl p-10 md:p-20 rounded-[4rem] shadow-2xl border border-white flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mb-10"
            >
              <Heart className="w-24 h-24 text-rose-500 fill-rose-500" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-serif text-rose-950 mb-4 font-bold leading-tight">
              ¿Quieres ser mi
            </h1>
            <span className="font-romantic text-7xl md:text-8xl text-rose-600 block mb-16">San Valentín?</span>

            <div className="flex flex-col items-center justify-center min-h-[250px] w-full relative">
              <AnimatePresence>
                {!isNoHidden && (
                  <motion.button
                    initial={false}
                    animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute bg-white/80 backdrop-blur-md text-rose-400 px-8 py-3 rounded-full font-semibold border border-rose-100 shadow-lg z-10 whitespace-nowrap"
                  >
                    No... 🥺
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button
                style={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.05 }}
                whileTap={{ scale: yesScale * 0.95 }}
                onClick={handleYes}
                className="bg-gradient-to-br from-rose-500 to-rose-700 text-white px-16 py-6 rounded-full font-black text-3xl shadow-[0_20px_50px_rgba(244,63,94,0.4)] z-20 relative ring-4 ring-white"
              >
                ¡SÍ! ❤️
              </motion.button>

              {noAttempts > 0 && !isNoHidden && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-20 text-rose-400 italic font-bold absolute bottom-0"
                >
                  {noAttempts < 4 ? "¡Te tengo! 😉" : "¡Es inútil resistirse! ❤️"}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {step === 'success' && <SuccessScreen key="success" />}
      </AnimatePresence>
    </div>
  );
};

export default App;
