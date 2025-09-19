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
import { Loader2, Sparkles } from 'lucide-react';
import { ArrowRightLeft } from 'lucide-react';

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
          <ArrowRightLeft className="mr-2 h-4 w-4" />
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
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Texto a Traducir</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Introduce texto en Español o Quechua</Label>
              <Textarea
                id="text"
                name="text"
                placeholder="Ej., Allinllachu?"
                rows={5}
                required
              />
              {state.errors?.text && (
                <p className="text-sm text-destructive">
                  {state.errors.text[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {state.data ? (
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Traducción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{state.data.translation}</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex h-full flex-col items-center justify-center border-dashed bg-card/80 p-8 text-center">
            <Sparkles className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              La traducción aparecerá aquí
            </h3>
            <p className="text-sm text-muted-foreground/80">
              Introduce una palabra o frase y presiona "Traducir".
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
