import { Box, Container } from "@mui/material";
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
      <Box sx={{ width: "100%", position: "relative", mt: { xs: 8, sm: 8 }, backgroundColor: theme.palette.mode === 'dark' ? '#eee' : '#212529' }}>
        <Container maxWidth="lg">
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: 2,
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
    </Box >
  )
}