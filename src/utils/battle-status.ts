import type { Tone } from '@/constants/theme';
import type { BattleStatus } from '@/types/battle';

export type BattleStatusDisplay = {
  label: string;
  /** Semantic colour used for the label/pill accent. */
  tone: Tone;
  /** Unfinished battles show a pill; finished ones show the score plus a result label. */
  emphasis: 'pill' | 'result';
};

const DISPLAY: Record<BattleStatus, BattleStatusDisplay> = {
  your_turn: { label: 'Your turn', tone: 'accent', emphasis: 'pill' },
  waiting_opponent: { label: 'Waiting', tone: 'muted', emphasis: 'pill' },
  won: { label: 'You won', tone: 'success', emphasis: 'result' },
  lost: { label: 'You lost', tone: 'danger', emphasis: 'result' },
  draw: { label: 'Draw', tone: 'muted', emphasis: 'result' },
};

export function getBattleStatusDisplay(status: BattleStatus): BattleStatusDisplay {
  return DISPLAY[status];
}
