export interface User {
    id: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    preferredLanguage: string;
    completedTopics: string[];
    savedResponses: SavedResponse[];
    progress: {
      algorithms: number;
      systemDesign: number;
      behavioral: number;
      concepts: number;
    };
  }
  
  export interface SavedResponse {
    id: string;
    question: string;
    answer: string;
    category: string;
    timestamp: Date;
    notes: string;
  }
  
  export interface MockInterview {
    id: string;
    type: string;
    questions: Question[];
    feedback: string;
    score: number;
    timestamp: Date;
  }
  
  export interface Question {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
  }