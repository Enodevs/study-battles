import type { Battle } from '@/types/battle';
import type { WeakTopic } from '@/types/practice';

/**
 * Hardcoded home-screen data for the UI-first phase.
 * Replace with Supabase queries once the backend lands.
 */

export const MOCK_USER = {
  name: 'Abdullah',
  streakDays: 3,
};

/** Ordered the way the server should eventually return them: actionable battles first. */
export const MOCK_BATTLES: Battle[] = [
  {
    id: 'b1',
    subject: 'Mathematics',
    topic: 'Algebra',
    opponent: { id: 'u2', name: 'David' },
    status: 'your_turn',
    questionCount: 10,
    opponentScore: 7,
  },
  {
    id: 'b2',
    subject: 'Physics',
    topic: 'Kinematics',
    opponent: { id: 'u3', name: 'Sarah' },
    status: 'waiting_opponent',
    questionCount: 10,
    yourScore: 9,
  },
  {
    id: 'b3',
    subject: 'English',
    topic: 'Grammar',
    opponent: { id: 'u5', name: 'Amina' },
    status: 'won',
    questionCount: 5,
    yourScore: 4,
    opponentScore: 3,
  },
  {
    id: 'b4',
    subject: 'Chemistry',
    topic: 'Ionic Bonding',
    opponent: { id: 'u3', name: 'Sarah' },
    status: 'won',
    questionCount: 10,
    yourScore: 8,
    opponentScore: 6,
  },
  {
    id: 'b5',
    subject: 'History',
    topic: 'Cold War',
    opponent: { id: 'u4', name: 'Musa' },
    status: 'lost',
    questionCount: 5,
    yourScore: 3,
    opponentScore: 4,
  },
];

/** Weakest topics first — the one worth drilling right now sits on top. */
export const MOCK_WEAK_TOPICS: WeakTopic[] = [
  {
    id: 'w1',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    accuracy: 0.58,
    questionsAnswered: 19,
  },
  {
    id: 'w2',
    subject: 'Biology',
    topic: 'Cell-cycle checkpoints',
    accuracy: 0.62,
    questionsAnswered: 21,
  },
  {
    id: 'w3',
    subject: 'English',
    topic: 'Sentence Structure',
    accuracy: 0.68,
    questionsAnswered: 25,
  },
  {
    id: 'w4',
    subject: 'History',
    topic: 'Cold War treaties',
    accuracy: 0.74,
    questionsAnswered: 15,
  },
];
