import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Type for lesson progress, where keys are lesson IDs
export type LessonProgress = {
  [lessonId: number]: number; // e.g., { 1: 100, 2: 50 }
};

// Type for the entire user progress document
export type UserProgressData = {
  lessons: LessonProgress;
  streak: number;
  lastCompleted: Date | null;
};

/**
 * Fetches the user's progress from Firestore.
 * If no progress exists, it initializes it with default values.
 * @param userId The user's unique ID from Firebase Auth.
 * @returns The user's lesson progress.
 */
export async function getUserProgress(userId: string): Promise<LessonProgress> {
  const userProgressRef = doc(db, 'userProgress', userId);
  const docSnap = await getDoc(userProgressRef);

  if (docSnap.exists()) {
    return docSnap.data().lessons || {};
  } else {
    // If the user has no progress, create a default document for them
    const defaultProgress: UserProgressData = {
      lessons: {1: 50}, // Start with some progress on the first lesson
      streak: 0,
      lastCompleted: null,
    };
    await setDoc(userProgressRef, defaultProgress);
    return defaultProgress.lessons;
  }
}

/**
 * Updates a user's progress for a specific lesson.
 * @param userId The user's unique ID.
 * @param lessonId The ID of the lesson to update.
 * @param progress The new progress value (0-100).
 */
export async function updateUserProgress(
  userId: string,
  lessonId: number,
  progress: number
): Promise<void> {
  const userProgressRef = doc(db, 'userProgress', userId);
  const fieldToUpdate = `lessons.${lessonId}`;

  try {
    // Use updateDoc to modify only the specific lesson's progress
    await updateDoc(userProgressRef, {
      [fieldToUpdate]: progress,
    });
  } catch (error: any) {
    // If the document doesn't exist, create it first.
    if (error.code === 'not-found') {
      await setDoc(userProgressRef, {
        lessons: {
          [lessonId]: progress,
        },
      });
    } else {
      throw error;
    }
  }
}
