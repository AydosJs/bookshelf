import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { Link, useLocation } from "react-router-dom";
import theme from "../../themes";
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import Drawer from '@mui/material/Drawer';
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth/auth";

const drawerWidth = 240;
type Props = {
  open: boolean,
  handleClose: () => void
}

export default function Sidebar({ open, handleClose }: Props) {
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(logOut())
  }
  const { pathname } = useLocation()

  return (
    <Drawer
      anchor={'left'}
      onClose={handleClose}
      sx={{
        display: { xs: !open ? 'none' : 'block', sm: 'block' },
        zIndex: 99999,
        position: { xs: "absolute", sm: 'relative' },
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          left: { xs: !open ? '-240px' : '0px', sm: '0px' },

        },
      }}
      variant="permanent"
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
          <Toolbar sx={{ padding: 2 }}>
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
                <ListItemButton onClick={handleClose} sx={{ borderRadius: '8px', margin: '4px 0', backgroundColor: pathname === "/" ? theme.palette.grey[100] : '', }}>
                  <ListItemIcon sx={{ minWidth: '38px' }} >
                    <AutoStoriesRoundedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText color="primary" primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>My Books</Typography>} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={'/search-books'} style={{ textDecoration: "none", color: theme.palette.text.primary }}>
              <ListItem onClick={handleClose} disablePadding>
                <ListItemButton sx={{ borderRadius: '8px', margin: '4px 0', backgroundColor: pathname === "/search-books" ? theme.palette.grey[100] : '', }}>
                  <ListItemIcon sx={{ minWidth: '38px' }} >
                    <ContentPasteSearchRoundedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText color="primary" primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>Search Books</Typography>} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>

        {/* logout */}
        <Box>
          <Divider />
          <List sx={{ px: 2 }} >
            <ListItem onClick={() => {
              handleLogOut();
              handleClose()
            }} disablePadding>
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