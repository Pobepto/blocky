import React from "react";

import { Node } from "@components/Node";

import "./App.css";

// function App() {
//   const appRef = createRef<HTMLDivElement>();

//   useEffect(() => {
//     if (!appRef.current) return;
//     setup(appRef);
//   }, []);

//   return <div ref={appRef} className="App"></div>;
// }

// export default App;

export const App: React.FC = () => {
  return <Node level={1} />;
};
