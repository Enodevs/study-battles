import type { Difficulty, QuestionCount, Subject } from '@/types/battle';
import type { Option } from '@/types/option';

/** Subjects carry an icon: they are the hero choice on the create screen. */
export const SUBJECT_OPTIONS: Option<Subject>[] = [
  { value: 'Biology', label: 'Biology', icon: 'dna' },
  { value: 'Chemistry', label: 'Chemistry', icon: 'flask' },
  { value: 'Mathematics', label: 'Maths', icon: 'calculator-variant' },
  { value: 'Physics', label: 'Physics', icon: 'atom' },
  { value: 'English', label: 'English', icon: 'book-alphabet' },
  { value: 'Other', label: 'Other', icon: 'shape-outline' },
];

export const DIFFICULTY_OPTIONS: Option<Difficulty>[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
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
