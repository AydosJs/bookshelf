import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function RegisterContainer() {
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
            Create an account
          </Typography>
          <Typography component="p" variant="body1" color="textSecondary">
            If you already have an account: <Typography component={Link} color='blue' to={'/login'}>Login</Typography>
          </Typography>
        </Box>

        <Box component="form" sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
          />

          <Box mt={2}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </Box>

          <Box mt={2}>

            <TextField
              required
              fullWidth
              name="key"
              label="Password"
              type="password"
              id="key"
              autoComplete="current-password"
            />
          </Box>


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