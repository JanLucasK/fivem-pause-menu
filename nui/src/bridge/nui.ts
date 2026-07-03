/**
 * Bridge zwischen NUI (Browser/CEF) und dem Client-Skript.
 * Ausserhalb von FiveM (kein `GetParentResourceName`) laeuft die App im
 * Mock-Modus mit Beispieldaten, damit das UI standalone im Browser entwickelt
 * werden kann.
 */

export const isInFivem = typeof (window as any).invokeNative === 'function';

const resourceName = isInFivem ? (window as any).GetParentResourceName() : 'neov-pause-menu';

export async function fetchNui<TResponse>(
  eventName: string,
  data: unknown = {},
): Promise<TResponse> {
  if (!isInFivem) {
    return Promise.resolve({} as TResponse);
  }

  const response = await fetch(`https://${resourceName}/${eventName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  });

  return response.json();
}

export function onNuiMessage<TPayload>(
  action: string,
  handler: (payload: TPayload) => void,
): () => void {
  const listener = (event: MessageEvent) => {
    if (event.data?.action === action) {
      handler(event.data.payload as TPayload);
    }
  };
  window.addEventListener('message', listener);
  return () => window.removeEventListener('message', listener);
}
