'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getTranslation, FormState } from '@/app/(app)/translate/actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, ArrowRightLeft } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Traduciendo...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Traducir
        </>
      )}
    </Button>
  );
}

export function TranslateClient() {
  const [state, formAction] = useFormState(getTranslation, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== '¡Éxito!') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="mx-auto max-w-5xl">
      <form action={formAction} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-0">
        <Card className="rounded-b-none rounded-r-none md:rounded-r-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Detectar Idioma</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="text"
              name="text"
              placeholder="Escribe en español o quechua..."
              rows={8}
              required
              className="border-0 p-0 text-lg focus-visible:ring-0"
            />
          </CardContent>
        </Card>
        
        <div className="relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <Button variant="outline" size="icon" className="z-10 h-10 w-10 rounded-full border-4 border-background" type="button" aria-label="Intercambiar idiomas">
                    <ArrowRightLeft className="h-5 w-5 text-muted-foreground"/>
                </Button>
            </div>
            <Card className="rounded-t-none rounded-l-none md:rounded-l-none">
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Traducción</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="min-h-[196px] w-full rounded-md p-0 text-lg">
                        {state.data ? (
                            <p>{state.data.translation}</p>
                        ) : (
                             <p className="text-muted-foreground">La traducción aparecerá aquí</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
        
        <div className="col-span-1 mt-4 md:col-span-2">
          <SubmitButton />
        </div>
         {state.errors?.text && (
            <p className="col-span-1 text-sm text-destructive md:col-span-2">
                {state.errors.text[0]}
            </p>
         )}
      </form>
    </div>
  );
}
