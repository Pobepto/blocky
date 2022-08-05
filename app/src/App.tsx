import React from "react";

import { Blockchain } from "./components/Blockchain";
import { Layout } from "./components/Layout";

export const App: React.FC = () => {
  // const appRef = createRef<HTMLDivElement>();

  // useEffect(() => {
  //   if (!appRef.current) return;
  //   appRef.current.innerHTML = "";
  //   setup(appRef.current);
  // }, []);

  return (
    <Layout>
      <Blockchain level={1} />
      {/* <div ref={appRef}></div> */}
    </Layout>
  );
};
