import theme from "../../themes";
import { Box, Fab, Grid, LinearProgress, Tooltip, Typography } from "@mui/material";
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
import { setMyBooks, getMyBooks } from "../../store/bookSlice";
import { slice } from "lodash";
import Loader from "../layout/Loader";
import { logOut } from "../../store/auth";
import MoreButton from "../../components/MoreButton";
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
        <Typography sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary }} variant="h4">
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
          <MoreButton disabled={endOffset >= books?.length} fetchMore={fetchMore} />
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