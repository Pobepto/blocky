import { useEffect, useState } from "react";

import { useAccounts } from "@src/utils/metamask";

export const useAccount = () => {
  const accounts = useAccounts();
  const [currentAccount, setCurrentAccount] = useState<string>();

  useEffect(() => {
    if (accounts && accounts.length) {
      setCurrentAccount(accounts[0]);
    }
  }, [accounts]);

  return currentAccount;
};
