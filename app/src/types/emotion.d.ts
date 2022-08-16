import { Colors } from "@src/theme/colors";

import "@emotion/react";
declare module "@emotion/react" {
  export interface Theme {
    colors: Colors;
    color: string;
  }
}
