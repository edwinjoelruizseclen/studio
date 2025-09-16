import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';

const lessonCategories = [
  {
    category: 'Beginner Module',
    lessons: [
      {
        id: 1,
        title: 'Greetings & Introductions',
        progress: 100,
        description: 'Learn to say hello and introduce yourself.',
      },
      {
        id: 2,
        title: 'Common Phrases',
        progress: 60,
        description: 'Essential phrases for everyday conversation.',
      },
      {
        id: 3,
        title: 'Numbers & Colors',
        progress: 0,
        description: 'Master counting and describing things with color.',
      },
      {
        id: 4,
        title: 'Family Members',
        progress: 0,
        description: 'Talk about your family.',
      },
    ],
  },
  {
    category: 'Intermediate Module',
    lessons: [
      {
        id: 5,
        title: 'Ordering Food',
        progress: 0,
        description: 'Navigate a restaurant menu in Quechua.',
      },
      {
        id: 6,
        title: 'Asking for Directions',
        progress: 0,
        description: 'Find your way around.',
      },
    ],
  },
];

export default function LessonsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 font-headline text-3xl font-bold">All Lessons</h1>
      <div className="space-y-8">
        {lessonCategories.map((category) => (
          <div key={category.category}>
            <h2 className="mb-4 font-headline text-2xl font-bold">
              {category.category}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {category.lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="transform transition-transform hover:-translate-y-1"
                >
                  <Link href={`/lessons/${lesson.id}`} className="block h-full">
                    <CardContent className="flex h-full flex-col justify-between p-4">
                      <div>
                        <h3 className="text-lg font-semibold">{lesson.title}</h3>
                        <p className="mt-1 mb-3 text-sm text-muted-foreground">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Progress
                            value={lesson.progress}
                            className="h-2 w-32"
                          />
                          <span className="text-xs font-medium text-muted-foreground">
                            {lesson.progress}%
                          </span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
