import React, { createRef, useEffect } from "react";

import { Layout } from "./components/Layout";
import { Node } from "./components/Node";
import { setup } from "./utils/pixi";

export const App: React.FC = () => {
  const appRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!appRef.current) return;
    appRef.current.innerHTML = "";
    setup(appRef.current);
  }, []);

  return (
    <Layout>
      <Node level={1} />
      {/* <div ref={appRef}></div> */}
    </Layout>
  );
};
