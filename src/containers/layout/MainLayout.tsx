import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import theme from "../../themes";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />

        <Box sx={{ width: "100%" }}>

          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
          >
            {children}
          </Box>

          <Box component='footer' mt={4} sx={{ padding: 3, width: "100%", borderTop: `1px solid ${theme.palette.grey[200]}` }}>
            <Typography variant="body2">
              {"Copyright © "}2023
            </Typography>
          </Box>

        </Box>
      </Box>
    </Container>
  )
}