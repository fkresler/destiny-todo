// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AchievementResponse, AchievementTracker } from '../../types/achievements';

const mockData: AchievementTracker[] = [{
  id: 'test',
  checked: false,
  isSuggested: true,
  title: 'Weekly PvP',
  description: 'Play PvP bois! Also record it!',
  label: ['PvP'],
  group: 'Weekly',
  class: 'Hunter',
  reset: 'Weekly',
}, {
  id: 'test1',
  checked: false,
  isSuggested: true,
  title: 'Weekly PvP',
  description: 'Play PvP bois! Also record it!',
  label: ['PvP'],
  group: 'Weekly',
  class: 'Warlock',
  reset: 'Weekly',
}, {
  id: 'test2',
  checked: false,
  isSuggested: true,
  title: 'Weekly PvP',
  description: 'Play PvP bois! Also record it!',
  label: ['PvP'],
  group: 'Weekly',
  class: 'Titan',
  reset: 'Weekly',
}, {
  id: 'test3',
  checked: false,
  isSuggested: true,
  title: 'Focused Dungeon',
  description: 'Dungeons rock',
  group: 'Weekly',
  reset: 'Weekly',
}, {
  id: 'test4',
  checked: false,
  isSuggested: true,
  title: 'Solo Flawless Pit of Heresy',
  description: 'Hard but doable',
  group: 'Lifetime',
}, {
  id: 'test5',
  checked: false,
  isSuggested: true,
  title: 'Season Pass Rank 100',
  group: 'Seasonal',
}];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AchievementResponse>,
) {
  res.status(200).json({ data: mockData });
}
