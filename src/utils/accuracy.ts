import type { Tone } from '@/constants/theme';

/**
 * Colour bands for an accuracy score (0-1).
 * Below 70% reads as a weak topic, 70-85% as improving, above that as solid.
 */
export function getAccuracyTone(accuracy: number): Tone {
  if (accuracy < 0.7) return 'danger';
  if (accuracy < 0.85) return 'streak';
  return 'success';
}

export function formatAccuracy(accuracy: number): string {
  return `${Math.round(accuracy * 100)}%`;
}
