import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, InputLabel, LinearProgress } from '@mui/material';
import { BookWithStatus } from '../../types/common';
import theme from '../../themes';
import { useMutation, useQueryClient } from 'react-query';
import { editBook } from '../../api/BooksAPI';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

type Props = {
  book: BookWithStatus
}

export default function BookStatus({ book }: Readonly<Props>) {
  const [bookStatus, setBookStatus] = React.useState(book.status ? String(book.status) : 0);
  const queryClient = useQueryClient();

  const editStatusMutate = useMutation(
    (data: { id: number; body: BookWithStatus }) => {
      const { id, body } = data;
      return editBook(id, body);
    },
    {
      onSuccess: (data: BookWithStatus) => {
        const currentData = queryClient.getQueryData<BookWithStatus[]>('bookshelf');
        if (currentData) {
          const itemIndex = currentData?.findIndex((book) => book.book.id === data.book.id);
          currentData[itemIndex] = data;
          queryClient.setQueryData('bookshelf', currentData);
        }
        toast.success("The modification has been successfully made");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      }
    }
  );

  const handleStatusChange = (event: SelectChangeEvent) => {
    event.stopPropagation()
    event.preventDefault()
    if (Number(event.target.value) !== Number(bookStatus)) {
      setBookStatus(event.target.value);
      const bookId = book.book.id
      const bookData = {
        ...book,
        status: Number(event.target.value)
      }
      editStatusMutate.mutate({ id: bookId, body: bookData })
    }
  };

  return (
    <FormControl disabled={editStatusMutate.isLoading} sx={{ width: "100%" }}>

      {/* Loader */}
      {editStatusMutate.isLoading &&
        <Box sx={{ width: '100%', position: 'fixed', top: '64px', left: 0, zIndex: 99999 }}>
          <LinearProgress />
        </Box>
      }

      <InputLabel sx={{
        color: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]
      }} id="demo-simple-select-label">Status</InputLabel>
      <Select
        id="demo-simple-select"
        value={String(bookStatus)}
        size='small'
        onChange={handleStatusChange}
        variant="outlined"
        label='Status'

        sx={{
          height: '2.5rem',
          color: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2'
          },
          '& .MuiSvgIcon-root': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]
          }
        }}

      >
        <MenuItem value={0}>New</MenuItem>
        <MenuItem value={1}>Reading</MenuItem>
        <MenuItem value={2}>Finished</MenuItem>
      </Select>
    </FormControl>
  )
}