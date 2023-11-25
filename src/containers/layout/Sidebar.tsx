import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth";
import theme from "../../themes";
import DividerStyled from "../../components/DividerStyled";
import InfoIcon from '@mui/icons-material/Info';
import PageviewIcon from '@mui/icons-material/Pageview';
import AllInboxIcon from '@mui/icons-material/AllInbox';

const drawerWidth = 240;
type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function Sidebar({ open, handleClose }: Readonly<Props>) {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  const { pathname } = useLocation();

  const styledDrawer = {
    display: { xs: !open ? "none" : "block", sm: 'none' },
    zIndex: 999999999,
    position: { xs: "absolute", sm: "relative" },
    flexShrink: 0,
    left: `calc(100vw - ${drawerWidth}px)`,
    "& .MuiDrawer-paper": {
      top: "64px",
      zIndex: 999999999,
      height: "calc(100vh - 64px)",
      background: theme.palette.mode === "light" ? theme.palette.background.default : "#fff",
      borderColor:
        theme.palette.mode === "dark" ? "none" : "rgba(194, 224, 255, 0.08)",
      width: drawerWidth,
      boxSizing: "border-box",
      right: { xs: !open ? "-240px" : "0px", sm: "0px" },
    },

  };

  const styledListItemButton = {
    borderRadius: "8px",
    margin: "4px 0",
  };

  return (
    <Drawer
      anchor={"right"}
      onClose={handleClose}
      sx={styledDrawer}
      variant="permanent"
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        <Box>
          <DividerStyled />
          <List sx={{ px: 2 }}>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  style={styledListItemButton}
                  onClick={handleClose}
                  sx={{
                    backgroundColor:
                      pathname === "/"
                        ? theme.palette.mode === "light"
                          ? theme.palette.background.paper
                          : theme.palette.grey[100]
                        : "",

                    '&:hover': {
                      background: theme.palette.mode === "light" ? theme.palette.background.paper : theme.palette.grey[100],
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "38px" }}>
                    <AllInboxIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        color={
                          theme.palette.mode === "light"
                            ? theme.palette.grey[300]
                            : theme.palette.text.primary
                        }
                        variant="body1"
                        sx={{ fontWeight: "medium" }}
                      >
                        Shelf
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={"/search-books"}
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              <ListItem onClick={handleClose} disablePadding>
                <ListItemButton
                  style={styledListItemButton}
                  sx={{
                    backgroundColor:
                      pathname === "/search-books"
                        ? theme.palette.mode === "light"
                          ? theme.palette.background.paper
                          : theme.palette.grey[100]
                        : "",
                    '&:hover': {
                      background: theme.palette.mode === "light" ? theme.palette.background.paper : theme.palette.grey[100],
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "38px" }}>
                    <PageviewIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        color={
                          theme.palette.mode === "light"
                            ? theme.palette.grey[300]
                            : theme.palette.text.primary
                        }
                        variant="body1"
                        sx={{ fontWeight: "medium" }}
                      >
                        Search Books
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={"/about-me"}
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              <ListItem onClick={handleClose} disablePadding>
                <ListItemButton
                  style={styledListItemButton}
                  sx={{
                    backgroundColor:
                      pathname === "/about-me"
                        ? theme.palette.mode === "light"
                          ? theme.palette.background.paper
                          : theme.palette.grey[100]
                        : "",
                    '&:hover': {
                      background: theme.palette.mode === "light" ? theme.palette.background.paper : theme.palette.grey[100],
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "38px" }}>
                    <InfoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        color={
                          theme.palette.mode === "light"
                            ? theme.palette.grey[300]
                            : theme.palette.text.primary
                        }
                        variant="body1"
                        sx={{ fontWeight: "medium" }}
                      >
                        About Me
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>

        {/* logout */}
        <Box>
          <DividerStyled />
          <List sx={{ px: 2 }}>
            <ListItem
              onClick={() => {
                handleLogOut();
                handleClose();
              }}
              disablePadding
            >
              <ListItemButton style={styledListItemButton}
                sx={{
                  '&:hover': {
                    background: theme.palette.mode === "light" ? theme.palette.background.paper : theme.palette.grey[100],
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: "38px" }}>
                  <LogoutRoundedIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      color={
                        theme.palette.mode === "light"
                          ? theme.palette.grey[300]
                          : theme.palette.text.primary
                      }
                      variant="body1"
                      sx={{ fontWeight: "medium" }}
                    >
                      Logout
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
