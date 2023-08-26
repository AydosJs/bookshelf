import { Box, Container, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik';
import { User } from "../../types/common";
import * as Yup from 'yup'
import LoadingButton from "@mui/lab/LoadingButton";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";
import { createUser } from "../../store/auth";
import { store } from "../../store/store";
import { useAppSelector } from "../../store/hooks";

export default function RegisterContainer() {
  const navigate = useNavigate()
  const loading = useAppSelector(item => item.auth.isLoading)

  const formik = useFormik<Omit<User, 'id'>>({
    initialValues: {
      name: '',
      email: '',
      key: '',
      secret: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email').required('Required'),
      key: Yup.string().required('Required'),
      secret: Yup.string().required('Required')
    }),
    onSubmit: (values: Omit<User, "id">) => {
      store.dispatch(createUser(values))
      navigate('/')
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
              disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                fullWidth
                name="secret"
                label="Secret"
                id="secret"
                onChange={formik.handleChange}
                value={formik.values.secret}
                error={Boolean(formik.touched.secret && formik.errors.secret)}
              />
            </Box>


            <LoadingButton
              fullWidth
              size="large"
              color="primary"
              loading={loading}
              loadingPosition="start"
              startIcon={<ExitToAppIcon />}
              variant="contained"
              type="submit"
              sx={{ width: "100%", mt: 4 }}
            >
              <span>Create account</span>
            </LoadingButton>

          </Box>
        </Box>
      </Box >
    </Container>
  )
}