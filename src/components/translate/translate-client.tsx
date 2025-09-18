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
import { Input } from '@/components/ui/input';
import {
  getTranslationAssistance,
  FormState,
} from '@/app/(app)/translate/actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, BookText } from 'lucide-react';

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
          Analizando...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Obtener Definición
        </>
      )}
    </Button>
  );
}

export function TranslateClient() {
  const [state, formAction] = useFormState(
    getTranslationAssistance,
    initialState
  );
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
          <CardTitle>Analizar Texto en Quechua</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sentence">Oración en Quechua</Label>
              <Textarea
                id="sentence"
                name="sentence"
                placeholder="Ej., Payqa wasi-n-pi-mikhun."
                rows={4}
                required
              />
              {state.errors?.sentence && (
                <p className="text-sm text-destructive">
                  {state.errors.sentence[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="wordOrPhrase">Palabra o Frase a Definir</Label>
              <Input
                id="wordOrPhrase"
                name="wordOrPhrase"
                placeholder="Ej., wasi"
                required
              />
              {state.errors?.wordOrPhrase && (
                <p className="text-sm text-destructive">
                  {state.errors.wordOrPhrase[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {state.data ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>Definición</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{state.data.definition}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <BookText className="h-5 w-5 text-accent" />
                <CardTitle>Consideraciones Dialectales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {state.data.dialectConsiderations}
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="flex h-full flex-col items-center justify-center border-dashed bg-card/80 p-8 text-center">
            <Sparkles className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              Los resultados aparecerán aquí
            </h3>
            <p className="text-sm text-muted-foreground/80">
              Introduce una oración y un término para empezar.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
