"use client"
import React, { useState } from 'react';
import OnboardingFlow from '@/components/interviewPrep/OnboardingFlow';
import Dashboard from '@/components/interviewPrep/dashboard';

const InterviewPrepPlatform = () => {
  const [userData, setUserData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {!userData ? (
        <OnboardingFlow onComplete={setUserData} />
      ) : (
        <Dashboard userData={userData} />
      )}
    </div>
  );
};

export default InterviewPrepPlatform;