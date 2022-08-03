import React, { createRef, useEffect } from "react";

import { setup } from "./utils/pixi";

import "./App.css";

export const App: React.FC = () => {
  const appRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!appRef.current) return;
    appRef.current.innerHTML = "";
    setup(appRef.current);
  }, []);

  return <div ref={appRef} className="App"></div>;
};

export default App;

// export const App: React.FC = () => {
//   return <Node level={1} />;
// };
