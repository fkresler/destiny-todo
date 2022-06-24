import * as React from 'react';
import {
  AchievementCollectionResponse, AchievementResponse, AchievementData, InstancedAchievementData,
} from '../types/achievements';

interface AchievementContextDefinition {
  data: InstancedAchievementData[];
  getAchievements: () => Promise<InstancedAchievementData[]>;
  getAchievement: (id: string) => Promise<InstancedAchievementData>;
  addAchievement: (id: string, data: AchievementData) => Promise<InstancedAchievementData>;
  editAchievement: (id: string, data: AchievementData) => Promise<InstancedAchievementData>;
  deleteAchievement: (id: string) => Promise<InstancedAchievementData>;
}

interface AchievementProviderProps {
  children: React.ReactNode,
  initialData?: InstancedAchievementData[],
}

export const AchievementContext = React.createContext<AchievementContextDefinition>({
  data: [],
  getAchievements: () => Promise.reject(new Error('Default context should not be called')),
  getAchievement: () => Promise.reject(new Error('Default context should not be called')),
  addAchievement: () => Promise.reject(new Error('Default context should not be called')),
  editAchievement: () => Promise.reject(new Error('Default context should not be called')),
  deleteAchievement: () => Promise.reject(new Error('Default context should not be called')),
});

export function AchievementProvider({ children, initialData }: AchievementProviderProps) {
  const [achievementData, setAchievementData] = React.useState<InstancedAchievementData[]>([]);

  const getAchievements = React.useCallback(async () => {
    const result = await fetch('/api/achievements');
    if (result.ok) {
      const { data } = await result.json() as AchievementCollectionResponse;
      return data;
    }
    throw new Error('Data could not be fetched');
  }, []);

  const getAchievement = React.useCallback(async (id: string) => {
    const result = await fetch(`/api/achievements/${id}`);
    if (result.ok) {
      const { data } = await result.json() as AchievementResponse;
      return data;
    }
    throw new Error('Data could not be fetched');
  }, []);

  const addAchievement = React.useCallback(async (id: string, newData: AchievementData) => {
    const result = await fetch(`/api/achievements/${id}`, {
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (result.ok) {
      const { data } = await result.json() as AchievementResponse;
      const newLocalData = [...achievementData, data];
      setAchievementData(newLocalData);
      return data;
    }
    throw new Error('Data could not be fetched');
  }, [achievementData]);

  const editAchievement = React.useCallback(async (id: string, newData: AchievementData) => {
    const result = await fetch(`/api/achievements/${id}`, {
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    if (result.ok) {
      const { data } = await result.json() as AchievementResponse;
      let newLocalData = achievementData.filter((achievement) => achievement.id !== id);
      newLocalData = [...newLocalData, data];
      setAchievementData(newLocalData);
      return data;
    }
    throw new Error('Data could not be fetched');
  }, [achievementData]);

  const deleteAchievement = React.useCallback(async (id: string) => {
    const result = await fetch(`/api/achievements/${id}`, {
      method: 'DELETE',
    });
    if (result.ok) {
      const { data } = await result.json() as AchievementResponse;
      const newLocalData = achievementData.filter((achievement) => achievement.id !== id);
      setAchievementData(newLocalData);
      return data;
    }
    throw new Error('Data could not be fetched');
  }, [achievementData]);

  React.useEffect(() => {
    const initAchievements = async () => {
      try {
        const result = await getAchievements();
        setAchievementData(result);
      } catch {
        setAchievementData([]);
      }
    };

    if (!initialData) {
      initAchievements();
    } else {
      setAchievementData(initialData);
    }
  }, [initialData, getAchievements]);

  const providerValue = React.useMemo(() => ({
    data: achievementData.map((object) => ({ ...object })),
    getAchievements,
    getAchievement,
    addAchievement,
    editAchievement,
    deleteAchievement,
  }), [
    achievementData,
    getAchievements,
    getAchievement,
    addAchievement,
    editAchievement,
    deleteAchievement,
  ]);

  return (
    <AchievementContext.Provider value={providerValue}>
      {children}
    </AchievementContext.Provider>
  );
}
