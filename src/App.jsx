import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import CampaignDeck from './components/CampaignDeck';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [answers, setAnswers] = useState(null);

  const handleStart = () => {
    setShowLanding(false);
  };

  const handleQuizComplete = (quizAnswers) => {
    setAnswers(quizAnswers);
    setShowInterstitial(true);
    // Auto-advance after 3 seconds, or user can click to skip
    setTimeout(() => {
      setShowInterstitial(false);
      setQuizComplete(true);
    }, 3000);
  };

  const handleSkipInterstitial = () => {
    setShowInterstitial(false);
    setQuizComplete(true);
  };

  const handleRestart = () => {
    setShowLanding(true);
    setQuizComplete(false);
    setShowInterstitial(false);
    setAnswers(null);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Nytro Logo - Top Left */}
      <a
        href="https://www.nytromarketing.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 left-4 z-20 hover:opacity-80 transition-opacity"
      >
        <img
          src="/logo_Nytro_color.png"
          alt="Nytro Marketing"
          className="w-12 h-12"
        />
      </a>
      
      <AnimatePresence mode="wait">
        {showLanding ? (
          <Landing key="landing" onStart={handleStart} />
        ) : showInterstitial ? (
          <motion.div
            key="interstitial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black flex flex-col items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center max-w-md"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4 text-white serif">
                Great! Generating your campaign ideas...
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                While we prepare your cards, check out how your lead generation stacks up
              </p>
              
              <a
                href="https://lead-gen-assessment.nytromarketing.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl font-semibold text-lg transition-all shadow-xl hover:shadow-2xl mb-4"
              >
                📊 Show Me How My Lead Gen Stacks Up
              </a>
              
              <button
                onClick={handleSkipInterstitial}
                className="block mx-auto text-white/60 hover:text-white/80 text-sm transition-colors"
              >
                Skip → Continue to cards
              </button>
            </motion.div>
          </motion.div>
        ) : !quizComplete ? (
          <Quiz key="quiz" onComplete={handleQuizComplete} />
        ) : (
          <div key="deck">
            <button
              onClick={handleRestart}
              className="absolute top-4 right-4 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors z-10"
            >
              Restart
            </button>
            <CampaignDeck answers={answers} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

