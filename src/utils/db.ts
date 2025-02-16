import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface InterviewPrepDB extends DBSchema {
  users: {
    key: string;
    value: User;
  };
  problems: {
    key: string;
    value: Problem;
  };
  progress: {
    key: string;
    value: {
      userId: string;
      problemId: string;
      status: 'completed' | 'in-progress';
      solution?: string;
    };
  };
  mockInterviews: {
    key: string;
    value: MockInterview;
  };
}

let db: IDBPDatabase<InterviewPrepDB>;

export async function initDB() {
  db = await openDB<InterviewPrepDB>('interview-prep-db', 1, {
    upgrade(db) {
      db.createObjectStore('users', { keyPath: 'id' });
      db.createObjectStore('problems', { keyPath: 'id' });
      db.createObjectStore('progress', { keyPath: 'id' });
      db.createObjectStore('mockInterviews', { keyPath: 'id' });
    },
  });
  return db;
}

export async function getUser(id: string) {
  return await db.get('users', id);
}

export async function saveUser(user: User) {
  return await db.put('users', user);
}

export async function updateProgress(progressData: any) {
  return await db.put('progress', progressData);
}