import { useState } from "react";

import { useEventListener } from "./useEventListener";

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  useEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === targetKey) {
      setKeyPressed(true);
    }
  });

  useEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === targetKey) {
      setKeyPressed(false);
    }
  });

  return keyPressed;
};
