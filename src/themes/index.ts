import { Theme, createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";

const theme: Theme = createTheme({
  palette,
  typography,
  zIndex: {},
});

export default theme;
