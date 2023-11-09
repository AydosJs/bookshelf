import { colors } from "@mui/material";
import { grey } from "@mui/material/colors";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  primary: {
    light: "#e0e9fe",
    main: "#1976D2",
    dark: "#01142c",
    contrastText: "#313234",
  },
  secondary: {
    light: "#33c9dc",
    main: "#9e5610",
    dark: "#008394",
    contrastText: "#313234",
  },
  success: {
    dark: "#1f0c01",
    main: "#06d6a0",
    light: "#fed1bd",
    contrastText: white,
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
    primary: "#313234",
    secondary: "#73757A",
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
