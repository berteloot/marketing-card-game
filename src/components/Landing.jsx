import { motion } from 'framer-motion';

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* NYT-style logo or branding */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <h1 className="text-white text-xl font-serif tracking-wide">Campaign Spark</h1>
      </div>

      {/* Central Graphic - Circular Target Design */}
      <div className="relative mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-72 h-72 md:w-96 md:h-96 mx-auto"
        >
          {/* Outermost ring - dark red matching background */}
          <div className="absolute inset-0 rounded-full"></div>
          
          {/* Cream/beige ring */}
          <div className="absolute inset-2 rounded-full border-[20px] border-[#E8D5B7] bg-[#E8D5B7]/40"></div>
          
          {/* Orange-red ring */}
          <div className="absolute inset-14 rounded-full border-[16px] border-[#D4542C] bg-[#D4542C]/30"></div>
          
          {/* Black ring */}
          <div className="absolute inset-24 rounded-full border-[12px] border-black bg-black/60"></div>
          
          {/* Blue-green ring */}
          <div className="absolute inset-28 rounded-full border-[8px] border-[#8FBCBB] bg-[#8FBCBB]/30">
            {/* Mini graphics */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xl">📊</div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl">🚀</div>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">💡</div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">🎯</div>
          </div>
          
          {/* Inner black circle with eye/icon */}
          <div className="absolute inset-32 rounded-full bg-black flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center shadow-2xl">
              <span className="text-4xl">✨</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mb-4"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white serif font-semibold leading-tight mb-2">
          Answer 5 Questions.
        </h2>
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white serif font-semibold leading-tight">
          Leave With Your Next Campaign Idea.
        </h2>
      </motion.div>

      {/* Author/Credit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-white/80 serif text-base md:text-lg italic mb-3">
          A fun creative card game for B2B marketers
        </p>
        <p className="text-white/90 text-base font-medium">
          No email required
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-12 py-4 bg-white text-black rounded-lg font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all"
      >
        Play the Marketing Game
      </motion.button>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
}

