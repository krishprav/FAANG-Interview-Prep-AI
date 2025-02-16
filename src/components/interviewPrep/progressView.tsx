import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ProgressView = ({ userData }) => {
  // Ensure progress has default values if userData.progress is undefined
  const progress = userData?.progress || {
    algorithms: 0,
    systemDesign: 0,
    behavioral: 0,
    concepts: 0,
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Progress</h1>

      {/* Algorithms Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Algorithms & Data Structures</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress.algorithms} className="h-4" />
          <p className="mt-2">{progress.algorithms}% Completed</p>
        </CardContent>
      </Card>

      {/* System Design Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>System Design</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress.systemDesign} className="h-4" />
          <p className="mt-2">{progress.systemDesign}% Completed</p>
        </CardContent>
      </Card>

      {/* Behavioral Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Behavioral</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress.behavioral} className="h-4" />
          <p className="mt-2">{progress.behavioral}% Completed</p>
        </CardContent>
      </Card>

      {/* CS Concepts Progress */}
      <Card>
        <CardHeader>
          <CardTitle>CS Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress.concepts} className="h-4" />
          <p className="mt-2">{progress.concepts}% Completed</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressView;