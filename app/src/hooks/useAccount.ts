import { useAccounts } from "@src/utils/metamask";

export const useAccount = () => {
  const accounts = useAccounts();

  return accounts ? accounts[0] : undefined;
};
