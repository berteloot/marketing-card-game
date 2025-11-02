import { useState } from 'react';
import { motion } from 'framer-motion';
import { quizQuestions } from '../data/quizQuestions';

export default function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, answerId) => {
    const question = quizQuestions[currentQuestion];
    const fieldMap = {
      1: 'goal',
      2: 'audience',
      3: 'content',
      4: 'urgency',
      5: 'crm_need',
    };

    const newAnswers = {
      ...answers,
      [fieldMap[questionId]]: answerId,
    };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 200);
    } else {
      setTimeout(() => {
        onComplete(newAnswers);
      }, 300);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Progress indicator - top left */}
      <div className="pt-6 pb-6 pl-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
        >
          <span className="text-white/90 text-xs font-medium tracking-wider uppercase">
            {currentQuestion + 1} OF {quizQuestions.length}
          </span>
        </motion.div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex-1 flex flex-col justify-center px-6"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center text-white px-4 leading-tight">
          {question.question}
        </h2>

        {/* Options - horizontal layout */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto w-full pb-8">
          {question.options.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => handleAnswer(question.id, option.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 min-w-[120px] px-6 py-4 bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
            >
              <span className="text-black serif text-base md:text-lg font-medium block text-center">
                {option.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

