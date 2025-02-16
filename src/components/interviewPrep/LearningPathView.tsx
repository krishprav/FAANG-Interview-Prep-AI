import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { Copy, Loader2, BookOpen, PlusCircle, CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { generateAIResponse } from '@/utils/ai';

const LearningPathView = ({ userData }) => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [userCode, setUserCode] = useState('');

  const topics = {
    arrays: [
      {
        id: 'arrays-1',
        title: 'Arrays Fundamentals',
        type: 'concept',
        content: 'Understanding array manipulation and operations',
        difficulty: 'beginner',
        estimatedTime: 30,
        prerequisites: [],
        exercises: [
          {
            id: 'ex1',
            title: 'Two Sum',
            description: 'Find two numbers that add up to a target',
            template: '// Write your solution here\nfunction twoSum(nums, target) {\n\n}',
            testCases: [
              { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
              { input: [[3, 2, 4], 6], expected: [1, 2] },
            ],
          },
        ],
      },
    ],
    strings: [
      {
        id: 'strings-1',
        title: 'String Manipulation',
        type: 'concept',
        content: 'Understanding string operations and algorithms',
        difficulty: 'beginner',
        estimatedTime: 30,
        prerequisites: [],
        exercises: [
          {
            id: 'ex2',
            title: 'Reverse a String',
            description: 'Reverse a given string',
            template: '// Write your solution here\nfunction reverseString(s) {\n\n}',
            testCases: [
              { input: ['hello'], expected: 'olleh' },
              { input: ['world'], expected: 'dlrow' },
            ],
          },
        ],
      },
    ],
    linkedLists: [
      {
        id: 'linked-lists-1',
        title: 'Singly Linked List',
        type: 'concept',
        content: 'Understanding singly linked list operations',
        difficulty: 'beginner',
        estimatedTime: 45,
        prerequisites: [],
        exercises: [
          {
            id: 'ex3',
            title: 'Reverse a Linked List',
            description: 'Reverse a singly linked list',
            template: `
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
// Write your solution here
function reverseList(head) {
  
}`,
            testCases: [],
          },
        ],
      },
    ],
    stacksQueues: [
      {
        id: 'stacks-queues-1',
        title: 'Stacks & Queues',
        type: 'concept',
        content: 'Understanding stack and queue operations',
        difficulty: 'beginner',
        estimatedTime: 30,
        prerequisites: [],
        exercises: [],
      },
    ],
    trees: [
      {
        id: 'trees-1',
        title: 'Binary Trees',
        type: 'concept',
        content: 'Understanding binary tree traversal and operations',
        difficulty: 'intermediate',
        estimatedTime: 60,
        prerequisites: [],
        exercises: [],
      },
    ],
    graphs: [
      {
        id: 'graphs-1',
        title: 'Graph Traversal',
        type: 'concept',
        content: 'Understanding BFS and DFS in graphs',
        difficulty: 'intermediate',
        estimatedTime: 60,
        prerequisites: [],
        exercises: [],
      },
    ],
    hashing: [
      {
        id: 'hashing-1',
        title: 'Hash Maps',
        type: 'concept',
        content: 'Understanding hash maps and collision resolution',
        difficulty: 'beginner',
        estimatedTime: 30,
        prerequisites: [],
        exercises: [],
      },
    ],
    heaps: [
      {
        id: 'heaps-1',
        title: 'Heaps',
        type: 'concept',
        content: 'Understanding heap operations (min/max heap)',
        difficulty: 'intermediate',
        estimatedTime: 45,
        prerequisites: [],
        exercises: [],
      },
    ],
    sorting: [
      {
        id: 'sorting-1',
        title: 'Sorting Algorithms',
        type: 'concept',
        content: 'Understanding QuickSort, MergeSort, and BubbleSort',
        difficulty: 'intermediate',
        estimatedTime: 45,
        prerequisites: [],
        exercises: [],
      },
    ],
    searching: [
      {
        id: 'searching-1',
        title: 'Searching Algorithms',
        type: 'concept',
        content: 'Understanding Binary Search and Linear Search',
        difficulty: 'beginner',
        estimatedTime: 30,
        prerequisites: [],
        exercises: [],
      },
    ],
    recursion: [
      {
        id: 'recursion-1',
        title: 'Recursion',
        type: 'concept',
        content: 'Understanding recursive functions and base cases',
        difficulty: 'beginner',
        estimatedTime: 30,
        prerequisites: [],
        exercises: [],
      },
    ],
    dynamicProgramming: [
      {
        id: 'dp-1',
        title: 'Dynamic Programming',
        type: 'concept',
        content: 'Understanding memoization and tabulation techniques',
        difficulty: 'advanced',
        estimatedTime: 90,
        prerequisites: [],
        exercises: [],
      },
    ],
    greedyAlgorithms: [
      {
        id: 'greedy-1',
        title: 'Greedy Algorithms',
        type: 'concept',
        content: 'Understanding greedy techniques for optimization problems',
        difficulty: 'intermediate',
        estimatedTime: 45,
        prerequisites: [],
        exercises: [],
      },
    ],
    backtracking: [
      {
        id: 'backtracking-1',
        title: 'Backtracking',
        type: 'concept',
        content: 'Understanding backtracking techniques for solving problems',
        difficulty: 'advanced',
        estimatedTime: 60,
        prerequisites: [],
        exercises: [],
      },
    ],
    bitManipulation: [
      {
        id: 'bit-manipulation-1',
        title: 'Bit Manipulation',
        type: 'concept',
        content: 'Understanding bitwise operations and their applications',
        difficulty: 'intermediate',
        estimatedTime: 45,
        prerequisites: [],
        exercises: [],
      },
    ],
    advancedTopics: [
      {
        id: 'trie-1',
        title: 'Trie Data Structure',
        type: 'concept',
        content: 'Understanding Trie and its applications',
        difficulty: 'advanced',
        estimatedTime: 60,
        prerequisites: [],
        exercises: [],
      },
    ],
  };

  const handleExplainConcept = async (concept: string) => {
    setIsLoading(true);
    setExplanation('');
    const prompt = `
      Explain ${concept} for a ${userData.level} developer.
      Include:
      - Basic definition
      - Real-world examples
      - Common interview questions
      - Code examples in ${userData.preferredLanguage}
      - Best practices
      - Common pitfalls
      - Related concepts to explore
    `;
    try {
      const aiExplanation = await generateAIResponse(prompt);
      setExplanation(aiExplanation);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Celebrate completion
    } catch (error) {
      setExplanation('Error: Failed to get explanation. Please try again.');
    }
    setIsLoading(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="p-8">
      {showConfetti && <Confetti />}

      <h1 className="text-3xl font-bold mb-6 text-center">Your Learning Journey</h1>

      {/* Learning Path Navigation */}
      <div className="mb-8">
        {Object.entries(topics).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-2">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            {items.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setActiveLesson(topic);
                  handleExplainConcept(topic.title);
                }}
                className={`w-full text-left p-3 rounded-lg mb-2 ${
                  activeLesson?.id === topic.id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {topic.type === 'concept' ? <BookOpen size={16} className="mr-2 inline-block" /> : <Code size={16} className="mr-2 inline-block" />}
                {topic.title}
                <span className="text-sm text-gray-500 ml-auto">
                  {' '}
                  {topic.estimatedTime} mins • {topic.difficulty}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Active Lesson Content */}
      {activeLesson && (
        <Card>
          <CardHeader>
            <CardTitle>{activeLesson.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
                <p className="mt-2 text-gray-500">Thinking 💭...</p>
              </div>
            ) : (
              <>
                <p className="mb-4">{explanation || 'Loading explanation...'}</p>

                {/* Code Example */}
                {activeLesson.exercises.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Code Example</h3>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
                      <code>{activeLesson.exercises[0].template}</code>
                      <Button
                        onClick={() => handleCopyCode(activeLesson.exercises[0].template)}
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600"
                      >
                        <Copy size={16} />
                      </Button>
                    </pre>
                  </div>
                )}

                {/* Code Editor */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Practice Exercise</h3>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-32 p-2 border rounded-lg resize-none"
                    placeholder="Write your solution here..."
                  />
                  <Button onClick={() => alert('Code submitted!')} className="mt-2">
                    Submit Solution
                  </Button>
                </div>

                {/* Test Cases */}
                {activeLesson.exercises.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Test Cases</h3>
                    {activeLesson.exercises[0].testCases.map((test, idx) => (
                      <div key={idx} className="bg-gray-100 p-2 rounded-lg mb-2">
                        <p>
                          Input: {JSON.stringify(test.input)} | Expected: {JSON.stringify(test.expected)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Flashcards */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Key Concepts</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Array Manipulation', 'String Operations', 'Two Pointers'].map((concept, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors"
                      >
                        {concept}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Follow-Up Questions */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mb-4">
                      <PlusCircle size={16} className="mr-2" /> Add Example or Follow-Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <h2 className="text-lg font-semibold mb-2">Request More Examples</h2>
                    <textarea
                      placeholder="Ask for more examples or clarifications..."
                      className="w-full h-32 p-2 border rounded-lg resize-none"
                    />
                    <Button className="mt-4">Submit</Button>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LearningPathView;