
import Search from "../../components/search/Search";
import theme from "../../themes";
import { Box, Fab, Grid, LinearProgress, Tooltip, Typography } from "@mui/material";
import BooksCard from "../../components/book/BooksCard";
import MainLayout from "../layout/MainLayout";
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from "react";
import CreateBook from "./books-edit/CreateBook";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteBook, getBooks, searchBooks } from "../../api/BooksAPI";
import { Book, BookWithStatus } from "../../types/common";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function BooksContainer() {

  const [booksWithStatus, setBooksWithStatus] = useState<BookWithStatus[]>([]);
  const [searchedBooks, setSearchedBooks] = useState<Omit<Book, "id" | "pages">[]>([]);

  const [loader, setLoader] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);

  const getList = async () => {
    try {
      setLoader(true);
      const resp = await getBooks();
      console.log('ress---- ', resp);
      setBooksWithStatus(resp);
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        logout();
      }
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getList()
  }, []);


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  };

  const onSearch = async ({ title }: Pick<Book, "title">) => {
    try {
      const res = await searchBooks(title)
      setSearchedBooks(res.data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id)
    } catch (error) {
      console.log("Book delete error", error)
    } finally {
      getList()
      toast.success('Book successfully DELETED')
    }
  }

  return (
    <MainLayout >

      {loader &&
        <Box sx={{ width: '100%' }} mb={1}>
          <LinearProgress />
        </Box>
      }
      {/* search */}
      <Search onSubmit={onSearch} />

      {/* TITLE */}
      <Box mb={2}>
        <Typography color={theme.palette.text.primary} sx={{ fontWeight: 500 }} variant="h4">
          Books
        </Typography>
      </Box>

      {/* book cards */}
      <Grid container spacing={4}>
        {(booksWithStatus && !loader) && booksWithStatus.map((item: BookWithStatus) => (
          <BooksCard
            deleteBook={() => handleDelete(item.book.id)}
            item={item}
            key={item.book.id} />
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
      <CreateBook updateList={() => getList()} open={open} handleClose={() => handleClose()} handleOpen={() => handleOpen()} />

    </MainLayout >
  )
}