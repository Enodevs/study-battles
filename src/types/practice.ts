export type WeakTopic = {
  id: string;
  subject: string;
  topic: string;
  /** Share of questions answered correctly on this topic, 0-1. */
  accuracy: number;
  /** How many questions the accuracy is based on. */
  questionsAnswered: number;
};
