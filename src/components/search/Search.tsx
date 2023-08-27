import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Fab, Stack, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from "formik";
import { Book } from '../../types/common';
import theme from '../../themes';
import AddIcon from '@mui/icons-material/Add';
import CreateBook from '../../containers/books/books-save/CreateBook';
import { useState } from 'react';


const SearchStyle = styled('div')(() => ({
  position: 'relative',
  borderRadius: '100px',
  marginLeft: 0,
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : '#272B2F',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'}`,
  overflow: 'hidden',
  width: '90%',
}));

const SearchIconWrapper = styled('div')(() => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: theme.palette.mode === 'dark' ? 'black' : theme.palette.grey[300],
  width: "100%",
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 2, 2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

type SearchFormType = Pick<Book, 'title'>

type Props = {
  onSubmit: (values: SearchFormType) => Promise<void>
}

export default function Search({ onSubmit }: Props) {

  const formik = useFormik<SearchFormType>({
    initialValues: {
      title: '',
    },
    onSubmit: async (values: SearchFormType) => {
      await onSubmit(values);
    }
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  };

  return (
    <Box component='form' onSubmit={formik.handleSubmit} sx={{ mb: 4, mt: 4 }}>
      <Stack direction='row' spacing={2}>
        <SearchStyle>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[300] : "black" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search books…"
            value={formik.values.title}
            onChange={formik.handleChange}
            name='title'
            id='title'
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchStyle>
        <Box>
          <Tooltip title="Create book">
            <Fab
              onClick={() => handleOpen()}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'white' : '#272B2F',
                border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'}`,
                overflow: 'hidden',
                boxShadow: "none"
              }}
              color="primary" aria-label="add">
              <AddIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[300] : "black" }} />
            </Fab>
          </Tooltip>

          <CreateBook open={open} handleClose={() => handleClose()} handleOpen={() => handleOpen()} />

        </Box>
      </Stack>
    </Box>
  )
}