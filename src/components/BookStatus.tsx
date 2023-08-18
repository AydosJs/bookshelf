import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Typography } from '@mui/material';
import theme from '../themes';
import { editBook } from '../api/BooksAPI';
import { BookWithStatus } from '../types/common';

type Props = {
  book: BookWithStatus
}

export default function BookStatus({ book }: Props) {

  const [bookStatus, setBookStatus] = React.useState(book.status ? String(book.status) : "0");

  const handleChange = async (event: SelectChangeEvent) => {
    setBookStatus(event.target.value);
    await editBook(book.book.id, {
      ...book,
      status: Number(event.target.value)
    })
  };


  return (
    <FormControl sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexWrap: "nowrap", flexDirection: "row", alignItems: "center", justifyContent: "start" }}>
        <Typography color={theme.palette.text.primary} variant="body1" sx={{ mr: 2 }}>
          Status:
        </Typography>
        <Select
          value={String(bookStatus)}
          size='small'
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={0}>New</MenuItem>
          <MenuItem value={1}>Reading</MenuItem>
          <MenuItem value={2}>Finished</MenuItem>
        </Select>
      </Box>
    </FormControl>
  )
}