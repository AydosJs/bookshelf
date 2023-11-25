import { Box, Container, Typography } from "@mui/material"
import theme from "../../themes";
import { Link } from "react-router-dom";

export default function LoginContainer() {




  return (
    <Box sx={{ width: '100%', height: "100%", backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.default : 'white' }}>
      <Container maxWidth="xs" sx={{ px: 4 }}>
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box mb={4} width={'100%'}>
              <Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} component="h1" variant="h4" sx={{ fontWeight: "500", textAlign: "start" }}>
                Login
              </Typography>
              <Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} component="p" variant="body1" >
                Welcome to BookShelf. If you don't have an account:&nbsp;
                <Typography component={Link} color='blue' to={'/register'}>Register</Typography>
              </Typography>
            </Box>

          </Box>
        </Box>
      </Container>
    </Box >
  )
}