import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Checkbox, Chip, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from "formik";
import { Book } from '../../types/common';
import theme from '../../themes';
import { useState } from 'react';
import { AxiosError } from 'axios';
import toast from "react-hot-toast";


const SearchStyle = styled('div')(() => ({
  position: 'relative',
  borderRadius: '32px',
  marginLeft: 0,
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : '#272B2F',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'}`,
  overflow: 'hidden',
  width: '100%',
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
  fontWeight: "500",

  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 2, 2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

type SearchFormType = Pick<Book, 'title'>

type Props = {
  onSubmit: (values: SearchFormType) => Promise<void>;
  hideImage: () => void;
  withIMage: boolean
  arrayIsEmpty: boolean
}

export default function Search({ onSubmit, hideImage, withIMage, arrayIsEmpty }: Readonly<Props>) {

  const [loader, setLoader] = useState(false)

  const formik = useFormik<SearchFormType>({
    initialValues: {
      title: '',
    },
    onSubmit: async (values: SearchFormType) => {
      try {
        setLoader(true)
        await onSubmit(values);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message)
        }
        console.log("Search error: ", error)
      } finally {
        setLoader(false)
      }
    }
  });
  return (
    <Box component='form' onSubmit={formik.handleSubmit} sx={{ mb: 4, mt: 4 }}>
      <SearchStyle>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[300] : "black" }} />
        </SearchIconWrapper>
        <StyledInputBase
          disabled={loader}
          placeholder="Search books…"
          value={formik.values.title}
          onChange={formik.handleChange}
          name='title'
          id='title'
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchStyle>

      {!arrayIsEmpty && (
        <FormGroup>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            mt={1}
          >
            <Chip
              sx={{ borderRadius: "16px", backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#272B2F', border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'}`, }}
              label={
                <FormControlLabel disabled={loader} control={
                  <Checkbox checked={withIMage} onChange={hideImage} name='withImage' id='withImage' size="small" />
                }
                  label={<Typography style={{ userSelect: 'none', color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary }} variant='subtitle2'>Show without image</Typography>}
                />
              } />

          </Stack>
        </FormGroup>
      )
      }
    </Box >
  )
}