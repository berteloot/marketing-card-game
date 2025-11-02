import { useState } from 'react';
import Quiz from './components/Quiz';
import CampaignDeck from './components/CampaignDeck';

function App() {
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState(null);

  const handleQuizComplete = (quizAnswers) => {
    setAnswers(quizAnswers);
    setQuizComplete(true);
  };

  const handleRestart = () => {
    setQuizComplete(false);
    setAnswers(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {!quizComplete ? (
        <Quiz onComplete={handleQuizComplete} />
      ) : (
        <div>
          <button
            onClick={handleRestart}
            className="absolute top-4 right-4 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors z-10"
          >
            Restart
          </button>
          <CampaignDeck answers={answers} />
        </div>
      )}
    </div>
  );
}

export default App;

