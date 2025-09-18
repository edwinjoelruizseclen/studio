
// This file will be updated to use Firestore again after the project is recreated.

// Type for lesson progress, where keys are lesson IDs
export type LessonProgress = {
  [lessonId: number]: number; // e.g., { 1: 100, 2: 50 }
};

/**
 * Fetches the user's progress.
 * For now, it uses localStorage as a fallback.
 * @param userId The user's unique ID from Firebase Auth.
 * @returns The user's lesson progress.
 */
export async function getUserProgress(userId: string): Promise<LessonProgress> {
  // Fallback to localStorage while Firestore is being reconfigured
  try {
    const savedProgress = localStorage.getItem('lessonProgress');
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
  } catch (e) {
    console.error("Could not parse lesson progress from localStorage", e);
  }
  return { 1: 50 }; // Default progress
}

/**
 * Updates a user's progress for a specific lesson.
 * For now, it uses localStorage as a fallback.
 * @param userId The user's unique ID.
 * @param lessonId The ID of the lesson to update.
 * @param progress The new progress value (0-100).
 */
export async function updateUserProgress(
  userId: string,
  lessonId: number,
  progress: number
): Promise<void> {
    try {
        const savedProgress = localStorage.getItem('lessonProgress');
        const currentProgress = savedProgress ? JSON.parse(savedProgress) : {};
        currentProgress[lessonId] = progress;
        localStorage.setItem('lessonProgress', JSON.stringify(currentProgress));
    } catch(e) {
        console.error("Could not save lesson progress to localStorage", e);
    }
}
