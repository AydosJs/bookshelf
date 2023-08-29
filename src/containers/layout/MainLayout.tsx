import { Box, Container } from "@mui/material";
import Sidebar from "./Sidebar";
import theme from "../../themes";
import AppBarComponent from "./AppBarComponent";
import { useState } from "react";

export default function MainLayout({ children }: React.PropsWithChildren) {
  const [state, setState] = useState<boolean>(false);
  const htmlOverflowHiddenSm = () => {
    if (window.innerWidth <= 600) {
      const body = document.getElementsByTagName('body')
      body[0].style.overflow = 'hidden'
    }
  }
  const htmlOverlowRemoveSm = () => {
    if (window.innerWidth <= 600) {
      const body = document.getElementsByTagName('body')
      body[0].style.removeProperty('overflow')
    }
  }
  return (
    <Box sx={{ display: 'flex', mt: { xs: 0, sm: 0 } }}>
      <AppBarComponent
        open={state}
        handleOpen={() => {
          setState(true);
          htmlOverflowHiddenSm()
        }}
        handleClose={() => {
          setState(false);
          htmlOverlowRemoveSm()
        }}
      />
      <Sidebar open={state} handleClose={() => {
        setState(false);
        htmlOverlowRemoveSm()
      }} />
      <Box sx={{ width: "100%", position: "relative", mt: { xs: 8, sm: 8 }, backgroundColor: theme.palette.mode === 'dark' ? '#eee' : '#212529' }}>
        <Container maxWidth="lg">
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: 2,
              minHeight: "calc(100vh - 64px)",
              position: 'relative'
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
    </Box >
  )
}