import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import theme from "../../themes";
import AppBarComponent from "./AppBarComponent";
import { useState } from "react";

export default function MainLayout({ children }: React.PropsWithChildren) {
  const [state, setState] = useState<boolean>(false);
  const htmlOverflowHidden = () => {
    const body = document.getElementsByTagName('body')
    body[0].style.overflow = 'hidden'
  }
  const htmlOverlowRemove = () => {
    const body = document.getElementsByTagName('body')
    body[0].style.removeProperty('overflow')
  }
  return (
    <Box sx={{ display: 'flex', mt: { xs: 0, sm: 0 } }}>
      <CssBaseline />
      <AppBarComponent
        open={state}
        handleOpen={() => {
          setState(true);
          htmlOverflowHidden()
        }}
        handleClose={() => {
          setState(false);
          htmlOverlowRemove()
        }}
      />
      <Sidebar open={state} handleClose={() => {
        setState(false);
        htmlOverlowRemove()
      }} />
      <Box sx={{ width: "100%", position: "relative", mt: { xs: 8, sm: 8 } }}>
        <Container maxWidth="xl" sx={{ backgroundColor: '#F8F9FD' }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1, backgroundColor: '#F8F9FD',
              padding: 2,
              minHeight: "calc(100vh - 137px)",
            }}

          >
            {children}
          </Box>
        </Container>
        <Box component='footer' sx={{ padding: '26px', width: "100%", borderTop: `1px solid ${theme.palette.grey[200]}` }}>
          <Typography variant="body2">
            {"Copyright © "}2023
          </Typography>
        </Box>
      </Box>
    </Box >
  )
}