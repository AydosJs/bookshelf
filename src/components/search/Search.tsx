import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from "formik";
import { Book } from '../../types/common';


const SearchStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.black, 0.15),
  border: `1px solid ${theme.palette.grey[300]}`,
  '&:hover': {
    // backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: "100%",
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 2, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
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
          <SearchIcon />
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