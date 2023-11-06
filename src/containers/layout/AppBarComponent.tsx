import {
  Box,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { toggleMode } from "../../store/settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import theme from "../../themes";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoText from "../../components/LogoText";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

export default function AppBarComponent({
  open,
  handleOpen,
  handleClose,
}: Readonly<Props>) {
  const mode = useAppSelector((state) => state.settings.mode);
  const dispatch = useDispatch();

  const handleSwitchMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    dispatch(toggleMode(newMode));
  };

  const styledText = {
    textDecoration: "none",
    opacity: "75%",
    fontWeight: 500,

    "&:hover": {
      opacity: "100%",
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 999999999,
          paddingX: 0,
          width: "100%",
          paddingY: { xs: "4px", sm: "0px" },
          left: 0,
          right: 0,
          backgroundColor: theme.palette.mode === "dark" ? "white" : "#212529",
          boxShadow:
            theme.palette.mode === "dark"
              ? "rgba(149, 157, 165, 0.2) 0px 8px 24px"
              : "none",
          borderBottom:
            theme.palette.mode === "light"
              ? "1px solid rgba(194, 224, 255, 0.08)"
              : "none",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Tooltip
                title="Change theme"
                sx={{ display: { md: "flex", sm: "flex", xs: "none" } }}
              >
                <IconButton onClick={handleSwitchMode} color="primary">
                  {theme.palette.mode === "light" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Tooltip>
              <Box
                sx={{ display: { md: "none", sm: "none", xs: "inline-grid" } }}
              >
                <LogoText />
              </Box>
            </Box>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ display: { md: "flex", sm: "flex", xs: "none" } }}
            >
              <Typography
                component={Link}
                to="/search-books"
                variant="subtitle2"
                color={"primary"}
                sx={styledText}
              >
                SEARCH
              </Typography>
              <Divider
                variant="middle"
                sx={{
                  opacity: "40%",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "#1976d2"
                      : theme.palette.grey[800],
                }}
                orientation="vertical"
                flexItem
              />
              <Box>
                <LogoText />
              </Box>
              <Divider
                variant="middle"
                sx={{
                  opacity: "40%",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "#1976d2"
                      : theme.palette.grey[800],
                }}
                orientation="vertical"
                flexItem
              />
              <Typography
                component={Link}
                to="/about-me"
                variant="subtitle2"
                color={"primary"}
                sx={styledText}
              >
                ABOUT-ME
              </Typography>
            </Stack>

            <Box>
              <Tooltip
                title="Change theme"
                sx={{ display: { md: "none", sm: "none", xs: "inline-grid" } }}
              >
                <IconButton onClick={handleSwitchMode} color="primary">
                  {theme.palette.mode === "light" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title="Open menu">
                <IconButton
                  onClick={() => {
                    open ? handleClose() : handleOpen();
                  }}
                  color="primary"
                >
                  <AccountCircleRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {open && (
        <Box
          onClick={handleClose}
          sx={{
            display: { xs: "block", sm: "none" },
            position: "fixed",
            top: 0,
            left: 0,
            background: "#000",
            opacity: "50%",
            width: "100%",
            height: "100%",
            zIndex: 9999,
          }}
        />
      )}
    </Box>
  );
}
