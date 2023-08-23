import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import theme from "../../themes";
import AppBarComponent from "./AppBarComponent";
import { useState } from "react";

export default function MainLayout({ children }: React.PropsWithChildren) {

  const [state, setState] = useState<boolean>(false);
  return (
    <Box sx={{ display: 'flex', mt: { xs: 0, sm: 0 } }}>
      <CssBaseline />
      <AppBarComponent
        open={state}
        handleOpen={() => {
          setState(true)
        }}
        handleClose={() => {
          setState(false)
        }}
      />
      <Sidebar open={state} handleClose={() => setState(false)} />
      <Box sx={{ width: "100%", position: "relative", mt: { xs: 8, sm: 8 } }}>
        <Container maxWidth="xl" >
          <Box
            component="main"
            sx={{
              flexGrow: 1, bgcolor: 'background.default',
              padding: 2,
              minHeight: "calc(100vh - 169px)"
            }}
          >
            {children}
          </Box>
        </Container>
        <Box component='footer' mt={4} sx={{ padding: '26px', width: "100%", borderTop: `1px solid ${theme.palette.grey[200]}` }}>
          <Typography variant="body2">
            {"Copyright © "}2023
          </Typography>
        </Box>
      </Box>
    </Box >
  )
}