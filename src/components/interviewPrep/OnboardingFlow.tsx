import React, { useState } from 'react';

const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    level: '',
    preferredLanguage: '',
    goals: [],
    schedule: '',
  });

  const handleNext = () => {
    if (step === 4) {
      onComplete(userData);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Let's Personalize Your Learning Journey</h1>

      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">What's your experience level?</h2>
          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <button
              key={level}
              onClick={() => {
                setUserData({ ...userData, level: level.toLowerCase() });
                handleNext();
              }}
              className={`block w-full p-4 border rounded-lg hover:border-blue-500 mb-2 ${
                userData.level === level.toLowerCase() ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Preferred Programming Language</h2>
          {['Python', 'Java', 'JavaScript', 'C++', 'Go', 'Other'].map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setUserData({ ...userData, preferredLanguage: lang });
                handleNext();
              }}
              className={`block w-full p-4 border rounded-lg hover:border-blue-500 mb-2 ${
                userData.preferredLanguage === lang ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Interview Goals</h2>
          {[
            'FAANG Companies',
            'Startups',
            'System Design',
            'Algorithms',
            'Full Stack',
            'Backend',
            'Frontend',
            'Machine Learning',
          ].map((goal) => (
            <button
              key={goal}
              onClick={() => {
                const newGoals = userData.goals.includes(goal)
                  ? userData.goals.filter((g) => g !== goal)
                  : [...userData.goals, goal];
                setUserData({ ...userData, goals: newGoals });
              }}
              className={`block w-full p-4 border rounded-lg hover:border-blue-500 mb-2 ${
                userData.goals.includes(goal) ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              {goal}
            </button>
          ))}
          <button onClick={handleNext} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Continue
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Study Schedule</h2>
          {['1-2 hours/day', '2-4 hours/day', '4-6 hours/day', '6+ hours/day'].map((schedule) => (
            <button
              key={schedule}
              onClick={() => {
                setUserData({ ...userData, schedule });
                handleNext();
              }}
              className={`block w-full p-4 border rounded-lg hover:border-blue-500 mb-2 ${
                userData.schedule === schedule ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              {schedule}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;