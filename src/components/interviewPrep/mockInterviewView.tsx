import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const MockInterviewView = ({ userData }) => {
  const [activeInterview, setActiveInterview] = useState(null);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(0);

  const interviewTypes = [
    {
      id: 'technical',
      title: 'Technical Interview',
      description: 'Coding and problem-solving focused interview',
      duration: 45,
      sections: ['Problem Solving', 'System Design', 'Technical Discussion'],
    },
    {
      id: 'behavioral',
      title: 'Behavioral Interview',
      description: 'Leadership and experience focused interview',
      duration: 30,
      sections: ['Past Experience', 'Leadership', 'Conflict Resolution'],
    },
    {
      id: 'system-design',
      title: 'System Design Interview',
      description: 'Architecture and scaling focused interview',
      duration: 60,
      sections: ['Requirements', 'High-Level Design', 'Deep Dive'],
    },
  ];

  const generateFeedback = async (response) => {
    const mockFeedback = {
      strengths: ['Good understanding of the problem', 'Clear explanation of approach'],
      improvements: ['Consider edge cases', 'Could optimize space complexity'],
    };
    setFeedback(mockFeedback);
  };

  const startInterview = (type) => {
    setActiveInterview(type);
    setTimer(type.duration * 60);
    setUserResponse(type.id === 'technical' ? 'function longestPalindrome(s) {\n  // Your solution here\n}' : '');
  };

  useEffect(() => {
    let interval;
    if (activeInterview && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [activeInterview, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-8">
      {!activeInterview ? (
        <div>
          <h1 className="text-2xl font-bold mb-6">Choose an Interview Type</h1>
          {interviewTypes.map((type) => (
            <Card key={type.id} className="mb-4">
              <CardHeader>
                <CardTitle>{type.title}</CardTitle>
                <p>{type.description}</p>
              </CardHeader>
              <CardContent>
                <p>
                  Duration: {type.duration} minutes | Sections: {type.sections.length}
                </p>
                <button
                  onClick={() => startInterview(type)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Interview
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-6">{activeInterview.title}</h1>
          <p>Time Remaining: {formatTime(timer)}</p>
          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            className="w-full h-32 p-2 mt-2 border rounded-lg"
          />
          <button
            onClick={() => generateFeedback(userResponse)}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit Solution
          </button>
          {feedback && (
            <div className="mt-4">
              <h3 className="font-semibold">Strengths:</h3>
              <ul>
                {feedback.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <h3 className="font-semibold">Areas for Improvement:</h3>
              <ul>
                {feedback.improvements.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MockInterviewView;