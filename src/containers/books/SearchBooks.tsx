import { useState } from "react";
import { createBook, getBooks, searchBooks } from "../../api/BooksAPI";
import Search from "../../components/search/Search";
import { Book } from "../../types/common";
import MainLayout from "../layout/MainLayout";
import SearchedBooksCard from "../../components/book/SearchedBooksCard";
import { Box, Button, Grid, LinearProgress } from "@mui/material";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { setMyBooks, addToMyBooks, getSearchedBooks, setSearchedBooks } from "../../store/book/bookSlice";
import { eq, slice } from "lodash";
import Loader from "../layout/Loader";

const LIMIT = 10

export default function SearchBooks() {
  const [endOffset, setEndOffset] = useState(LIMIT)

  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch()
  const searchedBooks = useAppSelector(getSearchedBooks)
  const [addingBooks, setAddingBooks] = useState<Omit<Book, "id" | "pages"> | undefined>()

  const onSearch = async ({ title }: Pick<Book, "title">) => {
    try {
      setLoader(true);
      const [resShelfBooks, res] = await Promise.all([getBooks(), searchBooks(title)]);
      dispatch(setMyBooks(resShelfBooks));
      dispatch(setSearchedBooks(res));
      setEndOffset(LIMIT)
    } catch (error) {
      console.log('Error', error)
    } finally {
      setLoader(false);
    }
  }

  const addBook = async (isbn: string) => {
    try {
      setLoader(true);
      const value = {
        isbn: isbn
      }
      const res = await createBook(value)
      dispatch(addToMyBooks(res))
      toast.success('Book successfully ADDED')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
    setLoader(false);
  }

  const fetchMore = () => {
    setEndOffset(endOffset + LIMIT)
  }

  return (
    <MainLayout >

      {/* Loader */}
      {loader &&
        <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 9999999 }} mb={1}>
          <LinearProgress />
        </Box>
      }

      {/* search */}
      <Search onSubmit={onSearch} />

      {/* NO BOOKS YET TYPOGRAPHY */}
      {Boolean(!searchedBooks.length) && <Loader loader={loader} text="NO BOOKS FOUND!" />}

      {/* MAPPING THE ARRAY */}
      <Grid container spacing={4}>

        {slice(searchedBooks, 0, endOffset).map((item: Omit<Book, "id" | "pages">) =>
          <SearchedBooksCard
            loader={(loader && eq(addingBooks?.isbn, item.isbn))}
            addBook={() => {
              addBook(item?.isbn);
              setAddingBooks(item);
            }}
            item={item} key={item?.isbn}
          />
        )}

        {/* MORE BUTTON */}
        {(Boolean(searchedBooks.length) && !loader) && (
          <Grid item xs={12}>
            <Button disabled={endOffset >= searchedBooks?.length} sx={{ width: "100%", paddingY: 2 }} size="large" variant="contained"
              onClick={fetchMore} >
              {endOffset >= searchedBooks?.length ? 'YOU ARE ALL SET' : 'MORE'}
            </Button>
          </Grid>
        )}

      </Grid>

    </MainLayout>
  )
} 