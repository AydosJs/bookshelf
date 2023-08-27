import { colors } from "@mui/material";
import { grey } from "@mui/material/colors";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  primary: {
    light: "#6573c3",
    main: "#3f51b5",
    dark: "#2c387e",
    contrastText: "#fff",
  },
  secondary: {
    light: "#33c9dc",
    main: "#00bcd4",
    dark: "#008394",
    contrastText: "#000000",
  },
  success: {
    contrastText: white,
    dark: "#0d9d78",
    main: "#06d6a0",
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: "#f4772e",
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: "#C4361D",
    // main: '#ff595e',
    light: colors.red[400],

    // NEW
    main: colors.red[400],
  },
  helpers: {
    primary: "#5383ff",
    main: "rgba(25, 46, 91, .035)",
  },
  grey: {
    300: "#b2bec3",
    200: "#dfe6e9",
    100: "#f1f2f6",
  },
  text: {
    primary: "#3F3C3F",
    // primary: '#fff',
    secondary: "#969AA7",
    link: "#142fbc",
    dark: grey[300],
  },
  background: {
    default: "#F4F6F8",
    paper: white,
  },
  contrastThreshold: 3,
  tonalOffset: 0.1,
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
