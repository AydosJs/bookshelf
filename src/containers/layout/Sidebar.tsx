import { Drawer, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { Link, useLocation } from "react-router-dom";
import theme from "../../themes";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
const drawerWidth = 240;

export default function Sidebar() {

  const { logout } = useContext(AuthContext);
  const { pathname } = useLocation()

  const pathChecker = pathname === "/"

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        flexWrap: "nowrap",
      }}>
        <Box>
          {/* bar header */}
          <Toolbar >
            <Typography variant="h6" >
              BOOKSHELF
            </Typography>
          </Toolbar>
          <Divider />

          {/* menues */}
          <List sx={{ px: 2 }}>
            <Link
              to={'/'} style={{ textDecoration: "none", color: theme.palette.text.primary }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ borderRadius: '8px', margin: '4px 0', backgroundColor: pathChecker ? theme.palette.grey[100] : '', }}>
                  <ListItemIcon sx={{ minWidth: '38px' }} >
                    <AutoStoriesRoundedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText color="primary" primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>Books</Typography>} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>

        {/* logout */}
        <Box>
          <Divider />
          <List sx={{ px: 2 }} >
            <ListItem onClick={logout} disablePadding>
              <ListItemButton sx={{ borderRadius: '8px', margin: '4px 0' }}>
                <ListItemIcon sx={{ minWidth: '38px' }} >
                  <LogoutRoundedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  Logout
                </Typography>} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

      </Box>
    </Drawer >
  )
}