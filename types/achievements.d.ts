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

export type AchievementTracker = AchievementData & {
  id: string;
  checked: boolean;
  isSuggested: boolean;
};

type AchievementResponse = {
  data: AchievementTracker[];
};

type AchievementErrorResponse = {
  error: string;
};
