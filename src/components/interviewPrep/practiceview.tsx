import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Editor } from '@monaco-editor/react';
import Confetti from 'react-confetti';

const PracticeView = ({ userData }) => {
  const [activeProblem, setActiveProblem] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const problems = {
    algorithms: [
      {
        id: 'two-sum',
        title: 'Two Sum',
        description: 'Find two numbers that add up to a target',
        template: '// Write your solution here\nfunction twoSum(nums, target) {\n\n}',
        testCases: [
          { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
          { input: [[3, 2, 4], 6], expected: [1, 2] },
        ],
      },
    ],
    systemDesign: [],
    behavioral: [],
    concepts: [],
  };

  const handleCodeSubmit = async () => {
    // Simulate code execution logic
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <div className="p-8">
      {showCelebration && <Confetti />}

      <h1 className="text-2xl font-bold mb-6">Practice Problems</h1>

      {/* Problem Selection */}
      <div className="mb-8">
        {Object.entries(problems).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-2">{category}</h2>
            {items.map((problem) => (
              <button
                key={problem.id}
                onClick={() => setActiveProblem(problem)}
                className={`w-full text-left p-3 rounded-lg mb-2 ${
                  activeProblem?.id === problem.id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {problem.title}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Active Problem Content */}
      {activeProblem && (
        <Card>
          <CardHeader>
            <CardTitle>{activeProblem.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{activeProblem.description}</p>
            <Editor
              height="300px"
              defaultLanguage="javascript"
              defaultValue={activeProblem.template}
              onChange={(value) => setUserCode(value || '')}
            />
            <button
              onClick={handleCodeSubmit}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Submit Solution
            </button>
            <div className="mt-4">
              <h3 className="font-semibold">Test Cases</h3>
              {activeProblem.testCases.map((test, idx) => (
                <p key={idx}>
                  Input: {JSON.stringify(test.input)} | Expected: {JSON.stringify(test.expected)}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PracticeView;