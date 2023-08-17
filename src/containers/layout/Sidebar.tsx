import { Drawer, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
const drawerWidth = 240;

export default function Sidebar() {
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
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: '8px', margin: '4px 0' }}>
                <ListItemIcon sx={{ minWidth: '38px' }} >
                  <AutoStoriesRoundedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>Books</Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: '8px', margin: '4px 0' }}>
                <ListItemIcon sx={{ minWidth: '38px' }} >
                  <GradeRoundedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>Favorites</Typography>} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* logout */}
        <Box>
          <Divider />
          <List sx={{ px: 2 }} >
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: '8px', margin: '4px 0' }}>
                <ListItemIcon sx={{ minWidth: '38px' }} >
                  <LogoutRoundedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>Logout</Typography>} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

      </Box>
    </Drawer >
  )
}