import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import theme from '../../../themes';
import { FormControl, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { createBook } from '../../../api/BooksAPI';
import { Book } from '../../../types/common';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import toast from 'react-hot-toast';
import * as Yup from 'yup'
import { AxiosError } from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "6px"
};

export interface BookPayload extends Partial<Book> {
  isbn: string;
}

type Props = {
  handleOpen: () => void;
  handleClose: () => void;
  updateList: () => void;
  open: boolean;
}

export default function CreateBook({ handleClose, open, updateList }: Props) {

  const [loader, setLoader] = useState<boolean>(false);

  const formik = useFormik<BookPayload>({
    initialValues: {
      isbn: "",
      title: "",
      cover: "",
      author: "",
      published: 0,
      pages: 0,
    },
    validationSchema: Yup.object({
      isbn: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoader(true);
        await createBook(values);
        toast.success('Book successfully CREATED')
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message)
        }
      } finally {
        setLoader(false);
        updateList()
      }

      handleClose()
      formik.resetForm()
    }
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 999999 }}
      >
        <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
          <Typography id="modal-modal-title" variant="h4" sx={{ mb: 4, fontWeight: 500, color: theme.palette.text.primary }} component="h2">
            Create a Book
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <Box mb={2}>
              <TextField
                sx={{ width: "100%" }}
                id="isbn"
                label="isbn"
                name='isbn'
                variant="outlined"
                value={formik.values.isbn}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.isbn && formik.errors.isbn)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                sx={{ width: "100%" }}
                id="title"
                label="title"
                name='title'
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.title && formik.errors.title)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                sx={{ width: "100%" }}
                id="cover"
                label="cover"
                name='cover'
                variant="outlined"
                value={formik.values.cover}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.cover && formik.errors.cover)}
              />
            </Box>

            <Box mb={2}>
              <TextField
                sx={{ width: "100%" }}
                id="author"
                label="author"
                name='author'
                variant="outlined"
                value={formik.values.author}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.author && formik.errors.author)}
              />
            </Box>

            <Box mb={2}>
              <TextField
                type='number'
                sx={{ width: "100%" }}
                id="published"
                label="published"
                name='published'
                variant="outlined"
                value={formik.values.published}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.published && formik.errors.published)}
              />
            </Box>


            <Box mb={2}>
              <TextField
                type='number'
                sx={{ width: "100%" }}
                id="pages"
                label="pages"
                name='pages'
                variant="outlined"
                value={formik.values.pages}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.pages && formik.errors.pages)}
              />
            </Box>


            <LoadingButton
              loading={loader}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Create
            </LoadingButton>

          </FormControl>
        </Box>
      </Modal>
    </div>
  )
}