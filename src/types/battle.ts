/** Where a battle sits in the async loop, from the current user's point of view. */
export type BattleStatus =
  /** Opponent finished (or challenge was just accepted) — user still has to play. */
  | 'your_turn'
  /** User finished, waiting on the opponent to complete their run. */
  | 'waiting_opponent'
  | 'won'
  | 'lost'
  | 'draw';

export type BattleOpponent = {
  id: string;
  name: string;
};

export type Battle = {
  id: string;
  subject: string;
  topic: string;
  opponent: BattleOpponent;
  status: BattleStatus;
  questionCount: number;
  /** Only set once the corresponding player has finished their run. */
  yourScore?: number;
  opponentScore?: number;
};

export type Subject =
  | 'Biology'
  | 'Chemistry'
  | 'Mathematics'
  | 'Physics'
  | 'English'
  | 'Other';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuestionCount = 5 | 10 | 15;

/** What the user configures on `/battle/create`, before anything is generated. */
export type BattleDraft = {
  subject: Subject;
  topic: string;
  difficulty: Difficulty;
  questionCount: QuestionCount;
};

