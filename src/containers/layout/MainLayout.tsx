import { Box, Container, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          {children}
        </Box>
      </Box>
    </Container>
  )
}