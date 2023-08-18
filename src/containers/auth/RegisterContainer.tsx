import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { User } from "../../types/common";
import * as Yup from 'yup'


export default function RegisterContainer() {
  const { register } = useContext(AuthContext);

  const formik = useFormik<Omit<User, 'id'>>({
    initialValues: {
      name: '',
      email: '',
      key: '',
      secret: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().required('Required'),
      key: Yup.string().required('Required'),
      secret: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      await register(values);
    }
  });

  return (
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
            <Typography component="h1" variant="h4" sx={{ fontWeight: "500", textAlign: "start" }}>
              Create an account
            </Typography>
            <Typography component="p" variant="body1" color="textSecondary">
              Welcome to BookShelf
              {/* If you already have an account: <Typography component={Link} color='blue' to={'/login'}>Login</Typography> */}
            </Typography>
          </Box>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

            <TextField
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={Boolean(formik.touched.name && formik.errors.name)}
            />

            <Box mt={2}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={Boolean(formik.touched.email && formik.errors.email)}
              />
            </Box>

            <Box mt={2}>
              <TextField
                fullWidth
                name="key"
                label="Key"
                id="key"
                onChange={formik.handleChange}
                value={formik.values.key}
                error={Boolean(formik.touched.key && formik.errors.key)}
              />
            </Box>

            <Box mt={2}>
              <TextField
                fullWidth
                name="secret"
                label="Secret"
                id="secret"
                onChange={formik.handleChange}
                value={formik.values.secret}
                error={Boolean(formik.touched.secret && formik.errors.secret)}
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
    </Container>
  )
}