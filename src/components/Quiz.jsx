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
      {/* Progress indicator - pill shaped */}
      <div className="pt-6 pb-4 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-5 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
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
        className="flex-1 flex flex-col justify-center px-4"
      >
        <h2 className="text-3xl md:text-4xl font-light mb-16 text-center text-white px-4 leading-tight tracking-tight">
          {question.question}
        </h2>

        <div className="space-y-3 max-w-md mx-auto w-full pb-8">
          {question.options.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => handleAnswer(question.id, option.id)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-7 bg-white rounded-2xl text-left transition-all shadow-2xl hover:shadow-white/20 group"
            >
              <span className="text-black serif text-xl md:text-2xl font-medium leading-relaxed block group-hover:text-gray-800 transition-colors">
                {option.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

