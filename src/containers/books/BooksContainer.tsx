import theme from "../../themes";
import { Box, Button, Fab, Grid, LinearProgress, Tooltip, Typography } from "@mui/material";
import BooksCard from "../../components/book/BooksCard";
import MainLayout from "../layout/MainLayout";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import CreateBook from "./books-save/CreateBook";
import { deleteBook, getBooks } from "../../api/BooksAPI";
import { BookWithStatus } from "../../types/common";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { setMyBooks, getMyBooks } from "../../store/book/bookSlice";
import { slice } from "lodash";
import Loader from "../layout/Loader";
import { logOut } from "../../store/auth/auth";
const LIMIT = 10

export default function BooksContainer() {

  const [endOffset, setEndOffset] = useState(LIMIT)
  const [loader, setLoader] = useState<boolean>(false);
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
      dispatch(setMyBooks(resp))
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        dispatch(logOut());
      }
    } finally {
      setLoader(false);
    }
  }


  const handleDelete = async (id: number) => {
    try {
      setLoader(true);
      if (confirm('Are you sure that you want to DELETE this book!')) {
        const res = await deleteBook(id)
        dispatch(setMyBooks(res))
        toast.success('Book successfully DELETED')
      }
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


      {(books?.length == 0 || !books) && <Loader loader={loader} text="NO BOOKS CREATED YET!" />}
      {/* book cards */}
      <Grid container spacing={4}>
        {slice(books, 0, endOffset).map((item: BookWithStatus) => (
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