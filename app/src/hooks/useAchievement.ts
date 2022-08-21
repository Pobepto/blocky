import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ACHIEVEMENTS_KEY } from "@src/constants";
import { IStore, useStore } from "@src/store";

interface AchievementObject {
  id: number;
  title: string;
  isHidden: boolean;
  conditionFn: (store: IStore) => boolean;
}

export const ACHIEVEMENTS: AchievementObject[] = [
  {
    id: 0,
    title: "Create first blockchain",
    isHidden: false,
    conditionFn: (store: IStore) => store.blockchainsIds.length > 0,
  },
  {
    id: 1,
    title: "Create blockchains of all colors",
    isHidden: false,
    conditionFn: (store: IStore) => store.blockchainsIds.length >= 5,
  },
  {
    id: 2,
    title: "Receive 10 liquidity per block",
    isHidden: false,
    conditionFn: (store: IStore) =>
      store.blockchain ? store.blockchain.liquidityPerBlock.gte(1000) : false,
  },
  {
    id: 3,
    title: "Receive 100 liquidity per block",
    isHidden: false,
    conditionFn: (store: IStore) =>
      store.blockchain ? store.blockchain.liquidityPerBlock.gte(10000) : false,
  },
  {
    id: 4,
    title: "Receive 1,000 liquidity per block",
    isHidden: false,
    conditionFn: (store: IStore) =>
      store.blockchain ? store.blockchain.liquidityPerBlock.gte(100000) : false,
  },
  {
    id: 5,
    title: "Receive 10,000 liquidity per block",
    isHidden: false,
    conditionFn: (store: IStore) =>
      store.blockchain
        ? store.blockchain.liquidityPerBlock.gte(1000000)
        : false,
  },
  {
    id: 6,
    title: "Earn 100 liquidity",
    isHidden: false,
    conditionFn: (store: IStore) =>
      store.blockchain ? store.blockchain.liquidity.gte(10000) : false,
  },
  {
    id: 7,
    title: "Earn 10,000 liquidity",
    isHidden: false,
    conditionFn: (store: IStore) =>
      store.blockchain
        ? store.blockchain.liquidityPerBlock.gte(1000000)
        : false,
  },
  {
    id: 8,
    title: "Earn 1,000,000 liquidity",
    isHidden: false,
    conditionFn: (store: IStore) =>
      store.blockchain
        ? store.blockchain.liquidityPerBlock.gte(100000000)
        : false,
  },
  {
    id: 9,
    title: "Faster than Ethereum",
    isHidden: true,
    conditionFn: (store: IStore) =>
      store.blockchain ? store.blockchain.tps.gte(30) : false,
  },
  {
    id: 10,
    title: "Faster than Solana",
    isHidden: true,
    conditionFn: (store: IStore) =>
      store.blockchain ? store.blockchain.tps.gte(500) : false,
  },
  {
    id: 11,
    title: "Faster than Polkadot",
    isHidden: true,
    conditionFn: (store: IStore) =>
      store.blockchain ? store.blockchain.tps.gte(1000) : false,
  },
  {
    id: 12,
    title: "First profit",
    isHidden: false,
    conditionFn: (store: IStore) =>
      store.blockchain ? store.blockchain.dappsIds.length > 0 : false,
  },
  {
    id: 13,
    title: "DeFi Expert",
    isHidden: true,
    conditionFn: (store: IStore) =>
      store.blockchain
        ? [...new Set(store.blockchain.dappsIds)].length === 5
        : false,
  },
  {
    id: 14,
    title: "Master of Decentralization",
    isHidden: true,
    conditionFn: (store: IStore) =>
      store.blockchain ? store.blockchain.nodes.gte(100) : false,
  },
];

export const useAchievement = (): [number[]] => {
  const { store } = useStore();
  const [unlocked, setUnlocked] = useState<number[]>([]);

  useEffect(() => {
    const localStoreValue = localStorage.getItem(ACHIEVEMENTS_KEY) ?? "[]";
    const achievementsStore: number[] = JSON.parse(localStoreValue);
    setUnlocked(achievementsStore);

    ACHIEVEMENTS.forEach((ach) => {
      if (achievementsStore.includes(ach.id)) return;

      if (ach.conditionFn(store)) {
        toast.success(ach.title);
        achievementsStore.push(ach.id);
        localStorage.setItem(
          ACHIEVEMENTS_KEY,
          JSON.stringify(achievementsStore)
        );
        setUnlocked(achievementsStore);
      }
    });
  }, [store]);

  return [unlocked];
};
