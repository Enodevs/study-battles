import type { Difficulty, QuestionCount, Subject } from '@/types/battle';
import type { Option } from '@/types/option';

/**
 * Subjects carry an icon and an identity colour: they are the hero choice on
 * the create screen, and a subject keeps the same colour everywhere it appears.
 */
export const SUBJECT_OPTIONS: Option<Subject>[] = [
  { value: 'Biology', label: 'Biology', icon: 'dna', color: '#16A34A' },
  { value: 'Chemistry', label: 'Chemistry', icon: 'flask', color: '#9333EA' },
  { value: 'Mathematics', label: 'Maths', icon: 'calculator-variant', color: '#2563EB' },
  { value: 'Physics', label: 'Physics', icon: 'atom', color: '#0891B2' },
  { value: 'English', label: 'English', icon: 'book-alphabet', color: '#E11D48' },
  { value: 'Other', label: 'Other', icon: 'shape-outline', color: '#D97706' },
];

/** Difficulty reads as a ramp: a seedling, then a spark, then a fire. */
export const DIFFICULTY_OPTIONS: Option<Difficulty>[] = [
  { value: 'easy', label: 'Easy', icon: 'sprout', color: '#16A34A' },
  { value: 'medium', label: 'Medium', icon: 'lightning-bolt', color: '#D97706' },
  { value: 'hard', label: 'Hard', icon: 'fire', color: '#DC2626' },
];

export const QUESTION_COUNT_OPTIONS: Option<QuestionCount>[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
];

export const DEFAULT_SUBJECT: Subject = 'Biology';
export const DEFAULT_DIFFICULTY: Difficulty = 'medium';
export const DEFAULT_QUESTION_COUNT: QuestionCount = 5;

/** Longest topic the generator will be asked to work with. */
export const MAX_TOPIC_LENGTH = 60;

/** The colour a subject is drawn in, for screens that only carry its name. */
export function subjectColor(subject: string) {
  return SUBJECT_OPTIONS.find((option) => option.value === subject)?.color;
}
