import React from "react";

import { Blockchain } from "@components/Blockchain";
import { Layout } from "@components/Layout";

export const Game: React.FC = () => {
  return (
    <Layout>
      <Blockchain level={1} />
    </Layout>
  );
};
