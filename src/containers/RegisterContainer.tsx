import { Box, Container, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik';
import { User } from "../types/common";
import * as Yup from 'yup'
import LoadingButton from "@mui/lab/LoadingButton";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";
import { createUser } from "../store/auth";
import { store } from "../store/store";
import { useAppSelector } from "../store/hooks";
import theme from "../themes";

export default function RegisterContainer() {
  const navigate = useNavigate()
  const loading = useAppSelector(item => item.auth.isLoading)

  const formic = useFormik<Omit<User, 'id'>>({
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

  const styledTextField = {
    '& .MuiInputBase-input': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[300] : 'none',
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[300] : 'none'
    },
    // '& .MuiOutlinedInput-notchedOutline': {
    //   borderColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : 'none',
    // },
    // '&:hover .MuiOutlinedInput-notchedOutline': {
    //   borderColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : 'none'
    // },
    "& .MuiFilledInput-root": {
      backgroundColor: '#272B2F',
    }
  }

  return (
    <Box sx={{ width: '100%', height: "100%", backgroundColor: theme.palette.mode === 'light' ? '#212529' : 'white' }}>
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
                Create an account
              </Typography>
              <Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} component="p" variant="body1" >
                Welcome to BookShelf
                {/* If you already have an account: <Typography component={Link} color='blue' to={'/login'}>Login</Typography> */}
              </Typography>
            </Box>

            <Box component="form" onSubmit={formic.handleSubmit} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

              <TextField
                variant={theme.palette.mode === 'light' ? 'filled' : 'outlined'}
                disabled={loading}
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange={formic.handleChange}
                value={formic.values.name}
                error={Boolean(formic.touched.name && formic.errors.name)}
                sx={styledTextField}
              />

              <Box mt={2}>
                <TextField
                  variant={theme.palette.mode === 'light' ? 'filled' : 'outlined'}
                  disabled={loading}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={formic.handleChange}
                  value={formic.values.email}
                  error={Boolean(formic.touched.email && formic.errors.email)}
                  sx={styledTextField}
                />
              </Box>

              <Box mt={2}>
                <TextField
                  variant={theme.palette.mode === 'light' ? 'filled' : 'outlined'}
                  disabled={loading}
                  fullWidth
                  name="key"
                  label="Key"
                  id="key"
                  onChange={formic.handleChange}
                  value={formic.values.key}
                  error={Boolean(formic.touched.key && formic.errors.key)}
                  sx={styledTextField}
                />
              </Box>

              <Box mt={2}>
                <TextField
                  variant={theme.palette.mode === 'light' ? 'filled' : 'outlined'}
                  disabled={loading}
                  fullWidth
                  name="secret"
                  label="Secret"
                  id="secret"
                  onChange={formic.handleChange}
                  value={formic.values.secret}
                  error={Boolean(formic.touched.secret && formic.errors.secret)}
                  sx={styledTextField}
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
    </Box>
  )
}