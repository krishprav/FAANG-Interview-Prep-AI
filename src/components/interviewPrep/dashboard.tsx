import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  Code,
  Users,
  Brain,
  LineChart,
  Settings,
} from 'lucide-react';
import LearningPathView from './LearningPathView';
import PracticeView from './practiceview';
import MockInterviewView from './mockInterviewView';
import ProgressView from './progressView';
import SettingsView from './SettingsView';

const Dashboard = ({ userData }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">FAANG Interview Prep AI</h1>

      {/* Navigation Tabs */}
      <Tabs defaultValue="learning-path" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="learning-path">
            <BookOpen size={16} className="mr-2" /> Learning Path
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Code size={16} className="mr-2" /> Practice
          </TabsTrigger>
          <TabsTrigger value="mock-interview">
            <Users size={16} className="mr-2" /> Mock Interviews
          </TabsTrigger>
          <TabsTrigger value="progress">
            <LineChart size={16} className="mr-2" /> Progress
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings size={16} className="mr-2" /> Settings
          </TabsTrigger>
        </TabsList>

        {/* Learning Path Tab */}
        <TabsContent value="learning-path">
          <LearningPathView userData={userData} />
        </TabsContent>

        {/* Practice Tab */}
        <TabsContent value="practice">
          <PracticeView userData={userData} />
        </TabsContent>

        {/* Mock Interview Tab */}
        <TabsContent value="mock-interview">
          <MockInterviewView userData={userData} />
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress">
          <ProgressView userData={userData} />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <SettingsView userData={userData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;