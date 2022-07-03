// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AchievementData, AchievementResponse, InstancedAchievementData } from '../../../types/achievements';
import createUniqueId from '../../../utils/createUniqueId';

let mockData: InstancedAchievementData[] = [{
  id: 'test',
  userId: 'some-random-guy',
  checked: false,
  title: 'Weekly PvP',
  description: 'Play PvP bois! Also record it!',
  label: ['PvP'],
  group: 'Weekly',
  class: 'Hunter',
  reset: 'Weekly',
}];

export default function achievementHandler(
  req: NextApiRequest,
  res: NextApiResponse<AchievementResponse>,
) {
  const {
    query: { id },
    body,
    method,
  } = req;

  if (!id) {
    res.status(404);
    return;
  }

  switch (method) {
    case 'GET': {
      const result = mockData.filter((achievement) => achievement.id === id);
      if (result) {
        res.status(200).json({ data: result[0] });
      }
      res.status(404);
      break;
    }
    case 'POST': {
      // TODO: type checking body data
      const achievementData = body as AchievementData;
      const uniqueCreatedData: InstancedAchievementData = {
        ...achievementData,
        id: createUniqueId('achievement'),
        userId: 'testuser',
      };
      mockData.push(uniqueCreatedData);
      res.status(200).json({ data: uniqueCreatedData });
      break;
    }
    case 'PUT': {
      // TODO: type checking body data
      const achievementData = body as InstancedAchievementData;
      const included = mockData.filter((achievement) => achievement.id !== id);
      included.push(achievementData);
      mockData = included;
      res.status(200).json({ data: achievementData });
      break;
    }
    case 'DELETE': {
      const foundData = mockData.find((achievement) => achievement.id === id);
      const included = mockData.filter((achievement) => achievement.id !== id);
      mockData = included;
      if (foundData) {
        res.status(200).json({ data: foundData });
      }
      res.status(404);
      break;
    }
    default: {
      res.status(405);
    }
  }
}
