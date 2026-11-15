/** Helper de requisição com tempo limite e mensagem de erro simples. */
export async function getJson<T>(url: string, timeoutMs = 10000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar dados`);
    }
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('A conexão demorou demais. Tente de novo.');
    }
    throw new Error('Não foi possível conectar. Verifique sua internet.');
  } finally {
    clearTimeout(timer);
  }
}
