import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { editBook } from '../../api/BooksAPI';
import { BookWithStatus } from '../../types/common';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { changeBookStatus } from '../../store/bookSlice';
import theme from '../../themes';
import { AxiosError } from 'axios';

type Props = {
  book: BookWithStatus
}

export default function BookStatus({ book }: Readonly<Props>) {
  const [bookStatus, setBookStatus] = React.useState(book.status ? String(book.status) : "0");
  const dispach = useDispatch()

  const handleStatusChange = async (event: SelectChangeEvent) => {
    if (event.target.value !== bookStatus) {
      setBookStatus(event.target.value);
      try {
        const res = await editBook(book.book.id, {
          ...book,
          status: Number(event.target.value)
        })
        dispach(changeBookStatus(res))
        toast.success('Status successfully EDITED')
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message)
        }
      }
    }
  };
  return (
    <FormControl sx={{ width: "100%" }}>
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