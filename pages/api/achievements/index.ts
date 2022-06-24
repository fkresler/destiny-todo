// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AchievementCollectionResponse, InstancedAchievementData } from '../../../types/achievements';

const mockData: InstancedAchievementData[] = [{
  id: 'test',
  userId: 'test-user',
  checked: false,
  title: 'Weekly PvP',
  description: 'Play PvP bois! Also record it!',
  label: ['PvP'],
  group: 'Weekly',
  class: 'Hunter',
  reset: 'Weekly',
}, {
  id: 'test1',
  userId: 'test-user',
  checked: false,
  title: 'Weekly PvP',
  description: 'Play PvP bois! Also record it!',
  label: ['PvP'],
  group: 'Weekly',
  class: 'Warlock',
  reset: 'Weekly',
}, {
  id: 'test2',
  userId: 'test-user',
  checked: false,
  title: 'Weekly PvP',
  description: 'Play PvP bois! Also record it!',
  label: ['PvP'],
  group: 'Weekly',
  class: 'Titan',
  reset: 'Weekly',
}, {
  id: 'test3',
  userId: 'test-user',
  checked: false,
  title: 'Focused Dungeon',
  description: 'Dungeons rock',
  group: 'Weekly',
  reset: 'Weekly',
}, {
  id: 'test4',
  userId: 'test-user',
  checked: false,
  title: 'Solo Flawless Pit of Heresy',
  description: 'Hard but doable',
  group: 'Lifetime',
}, {
  id: 'test5',
  userId: 'test-user',
  checked: false,
  title: 'Season Pass Rank 100',
  group: 'Seasonal',
}];

export default function achievementsHandler(
  req: NextApiRequest,
  res: NextApiResponse<AchievementCollectionResponse>,
) {
  res.status(200).json({ data: mockData });
}
