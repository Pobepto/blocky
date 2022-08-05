import "@emotion/react";

import { Breakpoints } from "./theme/breakpoints";
import { Colors } from "./theme/colors";
import { Spacing } from "./theme/spacing";
import { Text } from "./theme/text";

declare module "@emotion/react" {
  export interface Theme {
    breakpoints: Breakpoints;
    spacing: Spacing;
    colors: Colors;
    text: Text;
  }
}
