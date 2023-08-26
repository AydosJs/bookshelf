import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { toggleMode } from "../../store/settings";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import theme from "../../themes";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

type Props = {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

export default function AppBarComponent({ open, handleOpen, handleClose }: Props) {
  const mode = useAppSelector((state) => state.settings.mode);
  const dispatch = useDispatch();

  const handleSwitchMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    dispatch(toggleMode(newMode));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ paddingX: 0, width: "100%", paddingY: { xs: '4px', sm: "0px" }, left: 0, right: 0, backgroundColor: theme.palette.mode === 'dark' ? 'white' : '#212529', boxShadow: theme.palette.mode === 'dark' ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px' : 'none', borderBottom: theme.palette.mode === 'light' ? '1px solid rgba(194, 224, 255, 0.08)' : 'none', }}>
        <Toolbar >
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Link to={'/'} style={{ textDecoration: "none" }}>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                  <AllInboxIcon sx={{ mr: 1 }} />
                  <span>
                    BOOKSHELF
                  </span>
                </Typography>
              </Link>
            </Box>
            <Box>
            </Box>
            <Box>
              <IconButton onClick={handleSwitchMode} color="primary">
                {theme.palette.mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton onClick={() => {
                open ? handleClose() : handleOpen()
              }} color="primary">
                <AccountCircleRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {open && <Box onClick={handleClose} sx={{ display: { xs: 'block', sm: "none" }, position: 'fixed', top: 0, left: 0, background: '#000', opacity: "50%", width: "100%", height: "100%", zIndex: 9999 }} />}

    </Box >
  )
}