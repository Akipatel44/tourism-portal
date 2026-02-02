/**
 * Global UI Controller (imperative)
 * Provides simple event-based API for non-React modules (axios interceptors)
 */

type ErrorPayload = {
  message: string;
  code?: number;
  raw?: any;
};

const emitter = new EventTarget();

let loadingCount = 0;

export function incrementLoading() {
  loadingCount += 1;
  emitter.dispatchEvent(new CustomEvent('globalui:loading', { detail: loadingCount }));
}

export function decrementLoading() {
  loadingCount = Math.max(0, loadingCount - 1);
  emitter.dispatchEvent(new CustomEvent('globalui:loading', { detail: loadingCount }));
}

export function getLoadingCount() {
  return loadingCount;
}

export function notifyError(payload: ErrorPayload) {
  emitter.dispatchEvent(new CustomEvent('globalui:error', { detail: payload }));
}

// Subscriptions
export function onLoading(cb: (count: number) => void) {
  const handler = (e: Event) => cb((e as CustomEvent).detail as number);
  emitter.addEventListener('globalui:loading', handler as EventListener);
  return () => emitter.removeEventListener('globalui:loading', handler as EventListener);
}

export function onError(cb: (err: ErrorPayload) => void) {
  const handler = (e: Event) => cb((e as CustomEvent).detail as ErrorPayload);
  emitter.addEventListener('globalui:error', handler as EventListener);
  return () => emitter.removeEventListener('globalui:error', handler as EventListener);
}

export default {
  incrementLoading,
  decrementLoading,
  getLoadingCount,
  notifyError,
  onLoading,
  onError,
};
