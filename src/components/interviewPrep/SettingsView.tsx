import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SettingsView = ({ userData }) => {
  const [preferredLanguage, setPreferredLanguage] = useState(userData.preferredLanguage);
  const [schedule, setSchedule] = useState(userData.schedule);

  const saveSettings = () => {
    console.log('Updated Settings:', { preferredLanguage, schedule });
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Preferred Programming Language</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="C++">C++</option>
            <option value="Go">Go</option>
            <option value="Other">Other</option>
          </select>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Study Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="1-2 hours/day">1-2 hours/day</option>
            <option value="2-4 hours/day">2-4 hours/day</option>
            <option value="4-6 hours/day">4-6 hours/day</option>
            <option value="6+ hours/day">6+ hours/day</option>
          </select>
        </CardContent>
      </Card>

      <button
        onClick={saveSettings}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsView;