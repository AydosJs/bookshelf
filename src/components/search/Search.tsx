import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from "formik";
import { Book } from '../../types/common';
import theme from '../../themes';

const SearchStyle = styled('div')(() => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'white' : '#272B2F',
  position: 'relative',
  borderRadius: '100px',
  marginLeft: 0,
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'}`,
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
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

  return (
    <Box component='form' onSubmit={formik.handleSubmit} sx={{ mb: 4 }}>
      <SearchStyle>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[300] : "black" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          value={formik.values.title}
          onChange={formik.handleChange}
          name='title'
          id='title'
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchStyle>
    </Box>
  )
}