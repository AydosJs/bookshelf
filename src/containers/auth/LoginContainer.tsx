import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function LoginContainer() {
  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "26%"
        }}
      >
        <Box mb={4} width={'100%'}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: "500", textAlign: "start" }}>
            Welcome back!
          </Typography>
          <Typography component="p" variant="body1" color="textSecondary">
            Don't you have an account? <Typography component={Link} color='blue' to={'/register'}>Register</Typography>
          </Typography>
        </Box>

        <Box component="form" sx={{ mt: 1 }}>

          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 4 }}
          >
            Sign In
          </Button>

        </Box>


      </Box>
    </Box >
  )
}