import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { Link, useLocation } from "react-router-dom";
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import Drawer from '@mui/material/Drawer';
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth";
import theme from "../../themes";
import DividerStyled from "../../components/DividerStyled";

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



  const styledDrawer = {
    display: { xs: !open ? 'none' : 'block' },
    zIndex: 999999999,
    position: { xs: "absolute", sm: 'relative' },
    flexShrink: 0,
    left: `calc(100vw - ${drawerWidth}px)`,
    '& .MuiDrawer-paper': {
      top: '64px',
      zIndex: 999999999,
      height: 'calc(100vh - 64px)',
      background: theme.palette.mode === 'light' ? '#212529' : '#fff',
      borderColor: theme.palette.mode === 'dark' ? 'none' : 'rgba(194, 224, 255, 0.08)',
      width: drawerWidth,
      boxSizing: 'border-box',
      right: { xs: !open ? '-240px' : '0px', sm: '0px' },
    },
  }

  const styledListItemButton = {
    borderRadius: '8px',
    margin: '4px 0',
  }

  return (
    <Drawer
      anchor={'right'}
      onClose={handleClose}
      sx={styledDrawer}
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
          <DividerStyled />
          <List sx={{ px: 2 }}>
            <Link
              to={'/'} style={{ textDecoration: "none", color: theme.palette.text.primary }}>
              <ListItem disablePadding>
                <ListItemButton style={styledListItemButton} onClick={handleClose} sx={{ backgroundColor: pathname === "/" ? theme.palette.mode === 'light' ? '#272B2F' : theme.palette.grey[100] : '' }}>
                  <ListItemIcon sx={{ minWidth: '38px' }} >
                    <AutoStoriesRoundedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} variant="body1" sx={{ fontWeight: 'medium' }}>My Books</Typography>} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={'/search-books'} style={{ textDecoration: "none", color: theme.palette.text.primary }}>
              <ListItem onClick={handleClose} disablePadding>
                <ListItemButton style={styledListItemButton} sx={{ backgroundColor: pathname === "/search-books" ? theme.palette.mode === 'light' ? '#272B2F' : theme.palette.grey[100] : '' }}>
                  <ListItemIcon sx={{ minWidth: '38px' }} >
                    <ContentPasteSearchRoundedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} variant="body1" sx={{ fontWeight: 'medium' }}>
                    Search Books
                  </Typography>} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>

        {/* logout */}
        <Box>
          <DividerStyled />
          <List sx={{ px: 2 }} >
            <ListItem onClick={() => {
              handleLogOut();
              handleClose()
            }} disablePadding>
              <ListItemButton style={styledListItemButton}>
                <ListItemIcon sx={{ minWidth: '38px' }} >
                  <LogoutRoundedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={<Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} variant="body1" sx={{ fontWeight: 'medium' }}>
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