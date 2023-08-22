
import theme from "../../themes";
import { Box, Button, Fab, Grid, LinearProgress, Tooltip, Typography } from "@mui/material";
import BooksCard from "../../components/book/BooksCard";
import MainLayout from "../layout/MainLayout";
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from "react";
import CreateBook from "./books-save/CreateBook";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteBook, getBooks } from "../../api/BooksAPI";
import { BookWithStatus } from "../../types/common";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { addBooksToMyBooks, getMyBooks, removeBookFromShelf } from "../../store/book/bookSlice";
const LIMIT = 10

export default function BooksContainer() {

  // const [booksWithStatus, setBooksWithStatus] = useState<BookWithStatus[]>([]);
  const [endOffset, setEndOffset] = useState(LIMIT)
  const [loader, setLoader] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);
  const dispatch = useDispatch()
  const books = useAppSelector(getMyBooks)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  };


  const getList = async () => {
    try {
      setLoader(true);
      const resp = await getBooks();
      dispatch(addBooksToMyBooks(resp))
      // setBooksWithStatus(resp);
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        logout();
      }
    } finally {
      setLoader(false);
    }
  }


  const handleDelete = async (id: number) => {
    try {
      setLoader(true);
      const res = await deleteBook(id)
      dispatch(removeBookFromShelf(res))
      toast.success('Book successfully DELETED')
    } catch (error) {
      console.log("Book delete error", error)
    } finally {
      setLoader(false);
    }
  }

  const fetchMore = () => {
    setEndOffset(endOffset + LIMIT)
  }

  useEffect(() => {
    getList()
  }, []);



  return (
    <MainLayout >

      {loader &&
        <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 9999999 }} mb={1}>
          <LinearProgress />
        </Box>
      }


      {/* TITLE */}
      <Box mb={4} mt={2}>
        <Typography color={theme.palette.text.primary} sx={{ fontWeight: 500 }} variant="h4">
          Books
        </Typography>
      </Box>


      {(books?.length == 0 || !books) && (
        <Box sx={{ width: "100%", height: "calc(100vh - 195px)", display: "flex", justifyContent: "center", alignItems: 'center' }}>
          <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}> NO BOOKS CREATED YET!</Typography>
        </Box>
      )}

      {/* book cards */}
      <Grid container spacing={4} sx={{ minHeight: "calc(100vh - 195px)" }}>
        {books?.slice(0, endOffset).map((item: BookWithStatus) => (
          <BooksCard
            deleteBook={() => handleDelete(item.book.id)}
            item={item}
            key={item.book.id} />
        ))}

        {/* MORE BUTTON */}
        {(books?.length !== 0 && books?.length >= endOffset) && (
          <Grid item xs={12}>
            <Button disabled={endOffset >= books?.length} sx={{ width: "100%", paddingY: 2 }} size="large" variant="contained" onClick={fetchMore} >
              {endOffset >= books?.length ? 'YOU ARE ALL SET' : 'MORE'}
            </Button>
          </Grid>
        )}

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