import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ACHIEVEMENTS_KEY, IBlockchain } from "@src/constants";
import { useStore } from "@src/store";

interface AchievementObject {
  id: number;
  title: string;
  isHidden: boolean;
  conditionFn: (...args: unknown[]) => boolean;
}

const ACHIEVEMENTS = (blockchain: IBlockchain): AchievementObject[] => [
  {
    id: 0,
    title: "Create first blockchain",
    isHidden: false,
    conditionFn: () => blockchain.id.gt(0),
  },
  {
    id: 1,
    title: "Receive 1 L/S",
    isHidden: false,
    conditionFn: () => blockchain.liquidityPerBlock.gte(100),
  },
];

export const useAchievement = (): [AchievementObject[], number[]] => {
  const [achievements, setAchievements] = useState<AchievementObject[]>([]);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const {
    store: { blockchain },
  } = useStore();

  useEffect(() => {
    if (blockchain) {
      setAchievements(ACHIEVEMENTS(blockchain));
      const localStoreValue = localStorage.getItem(ACHIEVEMENTS_KEY) ?? "[]";
      const achievementsStore: number[] = JSON.parse(localStoreValue);
      setUnlocked(achievementsStore);

      achievements.forEach((ach) => {
        if (achievementsStore.includes(ach.id)) return;

        if (ach.conditionFn()) {
          toast.success(ach.title);
          achievementsStore.push(ach.id);
          localStorage.setItem(
            ACHIEVEMENTS_KEY,
            JSON.stringify(achievementsStore)
          );
          setUnlocked(achievementsStore);
        }
      });
    }
  }, [blockchain]);

  return [achievements, unlocked];
};
