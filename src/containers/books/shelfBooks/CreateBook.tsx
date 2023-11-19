import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import theme from '../../../themes';
import { FormControl, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Book } from '../../../types/common';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom';
import { useShelfBooksData } from './useShelfBooksData';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '80%', sm: 480 },
  boxShadow: 24,
  p: 4,
  borderRadius: "6px"
};

export interface BookPayload extends Partial<Book> {
  isbn: string;
}

interface Props {
  handleClose: () => void,
  open: boolean,
}

export default function CreateBook({ handleClose, open }: Readonly<Props>) {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { createBookMutation } = useShelfBooksData()

  const formik = useFormik<BookPayload>({
    initialValues: {
      isbn: ""
    },
    validationSchema: Yup.object({
      isbn: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      createBookMutation.mutate(values)
      handleClose()
      formik.resetForm()
      if (pathname !== '/') {
        navigate('/')
      }
    }
  });

  const borderColor = theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]

  const styledInput = {
    width: "100%",
    color: 'white',

    '& label ': {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[600]
          : theme.palette.text.primary,
    },

    '& label.Mui-focused': {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[600]
          : theme.palette.text.primary,
    },

    '& .MuiOutlinedInput-root': {
      color: theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.text.primary,
      '& fieldset': {
        borderColor: borderColor,
      },
      '&.Mui-focused fieldset': {
        borderColor: borderColor,
      },
      '&:hover fieldset': {
        borderColor: borderColor,
      },
    },
  }

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 99999999999 }}
      >
        <Box component="form" onSubmit={formik.handleSubmit} sx={
          {
            ...style,
            bgcolor: theme.palette.mode === 'dark' ? 'white' : '#212529'
          }
        }>
          <Typography id="modal-modal-title" variant="h4" sx={{
            mb: 4, fontWeight: 500, color: theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.text.primary,
          }} component="h2">
            Create a Book
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <Box mb={2}>
              <TextField
                sx={styledInput}
                id="isbn"
                label="isbn"
                name='isbn'
                variant="outlined"
                value={formik.values.isbn}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.isbn && formik.errors.isbn)}
              />
            </Box>

            <LoadingButton
              loading={createBookMutation.isLoading}
              type="submit"
              fullWidth
              size="large"
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Create
            </LoadingButton>

          </FormControl>
        </Box>
      </Modal>
    </Box>
  )
}