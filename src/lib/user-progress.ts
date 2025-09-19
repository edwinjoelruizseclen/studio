// This file will be updated to use Firestore again after the project is recreated.

// Type for lesson progress, where keys are lesson IDs
export type LessonProgress = {
  [lessonId: string]: number; // e.g., { "1": 100, "2": 50 }
};

const LOCAL_STORAGE_KEY = 'rimayAppLessonProgress';

/**
 * Fetches the user's progress from localStorage.
 * @returns The user's lesson progress.
 */
export async function getLocalUserProgress(): Promise<LessonProgress> {
  try {
    if (typeof window !== 'undefined') {
      const savedProgress = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProgress) {
        return JSON.parse(savedProgress);
      }
    }
  } catch (e) {
    console.error("Could not parse lesson progress from localStorage", e);
  }
  // Default progress for a new user
  return { '1': 50, '2': 60 };
}

/**
 * Updates a user's progress for a specific lesson in localStorage.
 * @param lessonId The ID of the lesson to update.
 * @param progress The new progress value (0-100).
 */
export async function updateLocalUserProgress(
  lessonId: number | string,
  progress: number
): Promise<void> {
    try {
      if (typeof window !== 'undefined') {
        const savedProgress = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        const currentProgress = savedProgress ? JSON.parse(savedProgress) : {};
        currentProgress[String(lessonId)] = progress;
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentProgress));
      }
    } catch(e) {
        console.error("Could not save lesson progress to localStorage", e);
    }
}
