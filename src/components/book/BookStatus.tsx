import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { editBook } from '../../api/BooksAPI';
import { BookWithStatus } from '../../types/common';
import toast from 'react-hot-toast';

type Props = {
  book: BookWithStatus
}

export default function BookStatus({ book }: Props) {

  const [bookStatus, setBookStatus] = React.useState(book.status ? String(book.status) : "0");

  const handleChange = async (event: SelectChangeEvent) => {
    if (event.target.value !== bookStatus) {
      setBookStatus(event.target.value);
      try {
        await editBook(book.book.id, {
          ...book,
          status: Number(event.target.value)
        })
        toast.success('Status successfully EDITED')
      } catch (error) {
        console.log("Error", error)
      }
    }
  };


  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
      <Select
        id="demo-simple-select"
        value={String(bookStatus)}
        size='small'
        onChange={handleChange}
        variant="outlined"
        label='Status'
        sx={{ borderColor: 'red' }}
      >
        <MenuItem value={0}>New</MenuItem>
        <MenuItem value={1}>Reading</MenuItem>
        <MenuItem value={2}>Finished</MenuItem>
      </Select>
    </FormControl>
  )
}