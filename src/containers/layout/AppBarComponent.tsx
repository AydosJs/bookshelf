import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import theme from "../../themes";
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import { Link } from "react-router-dom";

type Props = {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

export default function AppBarComponent({ open, handleOpen, handleClose }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ paddingX: 0, width: { xs: "100%", sm: "calc(100% - 240px)" }, paddingY: { xs: '4px', sm: "0px" }, marginLeft: { sm: '240px' }, left: 0, right: 0, backgroundColor: "white", boxShadow: "none", borderBottom: `1px solid ${theme.palette.grey[200]}` }}>
        <Toolbar >
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Link to={'/'} style={{ textDecoration: "none" }}>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                  <BoltRoundedIcon />
                  <span>
                    BOOKSHELF
                  </span>
                </Typography>
              </Link>
            </Box>
            <Box>
              <IconButton
                size="large"
                color="primary"
                aria-label="menu"
                onClick={handleOpen}

                sx={{
                  display: { xs: 'block', sm: 'none' }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {open && <Box onClick={handleClose} sx={{ position: 'fixed', top: 0, left: 0, background: '#000', opacity: "50%", width: "100%", height: "100%", zIndex: 9999 }} />}

    </Box >
  )
}