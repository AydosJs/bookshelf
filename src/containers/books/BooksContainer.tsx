
import SearchComponent from "../../components/search/SearchComponent";
import theme from "../../themes";
import { Box, Fab, Grid, Tooltip, Typography } from "@mui/material";
import BooksCard from "../../components/BooksCard";
import MainLayout from "../layout/MainLayout";
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from "react";
import CreateBook from "./books-edit/CreateBook";
import { AxiosError } from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { getBooksRequestList } from "../../api/BooksAPI";

export interface IBook {
  id?: number;
  isbn: string;
  title: string;
  cover: string;
  author: string;
  published: number;
  pages: number;
}
export interface BookRequest {
  book: IBook,
  status: boolean
}

export default function BooksContainer() {

  const [books, setBooks] = useState<BookRequest[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);

  const getList = async () => {
    try {
      setLoader(true);
      const resp = await getBooksRequestList();
      console.log('ress---- ', resp);
      // setBooks(resp.requests);
    } catch (e: unknown | AxiosError) {
      // if ((e as AxiosError)?.response?.status === 401) {
      //   logout();
      // }
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getList()
  }, []);


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("books", books)

  return (
    <MainLayout >

      {/* search */}
      <SearchComponent />

      {/* TITLE */}
      <Box mb={2}>
        <Typography color={theme.palette.text.primary} sx={{ fontWeight: 500 }} variant="h4">
          Books
        </Typography>
      </Box>

      {/* book cards */}
      <Grid container spacing={4}>
        {Array.from(Array(6)).map((_, index) => (
          <BooksCard key={index} />
        ))}
      </Grid>

      <Tooltip title="Create a book">
        <Fab
          onClick={() => handleOpen()}
          sx={{ position: "fixed", right: theme.spacing(2.5), bottom: theme.spacing(2.5), zIndex: 99999 }} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* BOOK CREATE MODAL  */}
      <CreateBook open={open} handleClose={() => handleClose()} handleOpen={() => handleOpen()} />

    </MainLayout >
  )
}