import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const vocabulary = [
  { quechua: 'Allinllachu?', english: 'Hello, how are you?' },
  { quechua: 'Allinllam', english: 'I am well' },
  { quechua: 'Imaynallam?', english: 'How are you?' },
  { quechua: 'Sutipacha', english: 'My name is...' },
  { quechua: 'Tupananchiskama', english: 'Goodbye / Until we meet again' },
];

export default function LessonDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Link
        href="/lessons"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lessons
      </Link>
      <h1 className="mb-2 font-headline text-3xl font-bold">
        Lesson {params.id}: Greetings & Introductions
      </h1>
      <p className="mb-8 text-muted-foreground">
        Learn the basics of saying hello and introducing yourself in Quechua.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Vocabulary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vocabulary.map((item) => (
              <div
                key={item.quechua}
                className="flex items-center justify-between rounded-md bg-background p-3 hover:bg-accent/10"
              >
                <div>
                  <p className="text-lg font-semibold">{item.quechua}</p>
                  <p className="text-muted-foreground">{item.english}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Volume2 className="h-6 w-6" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
        </Button>
        <Button>
          Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
