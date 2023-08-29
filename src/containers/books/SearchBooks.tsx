import { useState } from "react";
import { createBook, getBooks, searchBooks } from "../../api/BooksAPI";
import Search from "../../components/search/Search";
import { Book } from "../../types/common";
import MainLayout from "../layout/MainLayout";
import SearchedBooksCard from "../../components/book/SearchedBooksCard";
import { Box, Grid, LinearProgress } from "@mui/material";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { setMyBooks, addToMyBooks, getSearchedBooks, setSearchedBooks } from "../../store/bookSlice";
import { eq, slice } from "lodash";
import MoreButton from "../../components/MoreButton";
import LogoText from "../../components/LogoText";

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

  const ifSearchBooksEmpty = Boolean(!searchedBooks.length)

  const styledBox = {
    position: { xs: 'relative', sm: ifSearchBooksEmpty ? 'absolute' : 'relative' },
    width: { xs: '100%', sm: ifSearchBooksEmpty ? "70%" : '100%' },
    left: { sm: ifSearchBooksEmpty ? "50%" : 'none' },
    top: { sm: ifSearchBooksEmpty ? "50%" : 'none' },
    transform: { sm: ifSearchBooksEmpty ? 'translate(-50%, -50%)' : 'none' }
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
      <Box sx={styledBox}>
        <Box mb={4} sx={{ display: { xs: 'none', sm: ifSearchBooksEmpty ? 'flex' : 'none' }, justifyContent: 'center' }}>
          <LogoText />
        </Box>
        <Search onSubmit={onSearch} />
      </Box>

      {/* NO BOOKS YET TYPOGRAPHY */}
      {/* {Boolean(!searchedBooks.length) && <Loader loader={loader} text="NO BOOKS FOUND!" />} */}

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
        {(searchedBooks?.length !== 0 && searchedBooks?.length >= endOffset) && (
          <MoreButton disabled={endOffset >= searchedBooks?.length} fetchMore={fetchMore} />
        )}

      </Grid>

    </MainLayout >
  )
} 