import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useFormik } from 'formik';
import { AuthPayload } from "../../api/authApi";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


export default function RegisterContainer() {
  const { register } = useContext(AuthContext);

  const formik = useFormik<AuthPayload>({
    initialValues: {
      name: '',
      email: '',
      key: '',
      secret: '',
    },
    onSubmit: async (values) => {
      await register(values);
    }
  });

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

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <Box mt={2}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Box>

          <Box mt={2}>
            <TextField
              required
              fullWidth
              name="key"
              label="Key"
              id="key"
              onChange={formik.handleChange}
              value={formik.values.key}
            />
          </Box>

          <Box mt={2}>
            <TextField
              required
              fullWidth
              name="secret"
              label="Secret"
              id="secret"
              onChange={formik.handleChange}
              value={formik.values.secret}
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