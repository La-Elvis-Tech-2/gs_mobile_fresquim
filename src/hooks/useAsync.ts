import { useCallback, useEffect, useState } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

function sameDeps(a: unknown[], b: unknown[]) {
  return a.length === b.length && a.every((value, i) => Object.is(value, b[i]));
}

/** Executa uma função assíncrona e controla os estados de loading e erro. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  // Quando as dependências mudam (ou o usuário pede para recarregar), volta para "carregando"
  // já nesta renderização, sem precisar de setState dentro do useEffect.
  const currentDeps = [...deps, attempt];
  const [prevDeps, setPrevDeps] = useState(currentDeps);
  if (!sameDeps(prevDeps, currentDeps)) {
    setPrevDeps(currentDeps);
    setLoading(true);
    setError(null);
  }

  useEffect(() => {
    let active = true;
    fn()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Algo deu errado.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, currentDeps);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { data, loading, error, reload };
}
