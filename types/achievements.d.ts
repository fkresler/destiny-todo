export type GuardianClass = 'Warlock' | 'Hunter' | 'Titan';

export type AchievementResetTimeframe = 'Weekly' | 'Seasonal';

export type AchievementPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export type AchievementGroup = 'Weekly' | 'Seasonal' | 'Lifetime' | 'Weapons' | 'Builds';

export type AchievementData = {
  title: string;
  description?: string;
  label?: string[];
  group: AchievementGroup;
  class?: GuardianClass;
  reset?: AchievementResetTimeframe;
  priority?: AchievementPriority;
};

export type InstancedAchievementData = AchievementData & {
  id: string;
  userId: string;
  sourceId?: string;
  checked?: boolean;
};

export type AchievementCollectionResponse = {
  data: InstancedAchievementData[];
};

export type AchievementCollectionErrorResponse = {
  error: string;
};

export type AchievementResponse = {
  data: InstancedAchievementData;
};

export type AchievementErrorResponse = {
  error: string;
};
