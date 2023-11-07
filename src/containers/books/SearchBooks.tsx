import { useState } from "react";
import { createBook, getBooks, searchBooks } from "../../api/BooksAPI";
import Search from "../../components/search/Search";
import { Book } from "../../types/common";
import MainLayout from "../layout/MainLayout";
import SearchedBooksCard from "../../components/book/SearchedBooksCard";
import { Box, Chip, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { setMyBooks, addToMyBooks, getSearchedBooks, setSearchedBooks } from "../../store/bookSlice";
import { eq, slice } from "lodash";
import MoreButton from "../../components/MoreButton";
import AboutMe from "../aboutMe/AboutMeCard";
import theme from "../../themes";

const LIMIT = 10

export default function SearchBooks() {
  const [endOffset, setEndOffset] = useState(LIMIT)

  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch()
  const searchedBooks = useAppSelector(getSearchedBooks)
  const [addingBooks, setAddingBooks] = useState<Omit<Book, "id" | "pages"> | undefined>()
  const [withIMage, setWithImage] = useState<boolean>(false)

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
      toast.success('Book successfully ADDED')
      setLoader(true);
      const value = {
        isbn: isbn
      }
      const res = await createBook(value)
      dispatch(addToMyBooks(res))
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
    transform: { sm: ifSearchBooksEmpty ? 'translate(-50%, -50%)' : 'none' },
  }

  return (
    <MainLayout >

      {/* Loader */}
      {loader &&
        <Box sx={{ width: '100%', position: 'fixed', top: '64px', left: 0 }}>
          <LinearProgress />
        </Box>
      }

      {/* search */}
      <Box sx={styledBox}>
        <Search
          arrayIsEmpty={ifSearchBooksEmpty}
          withIMage={withIMage}
          hideImage={() => setWithImage(!withIMage)}
          onSubmit={onSearch}
        />

        {/* About Me */}
        {ifSearchBooksEmpty && <AboutMe />}

      </Box>

      {!ifSearchBooksEmpty && (
        <Box mb={2} >
          <Divider
            sx={{
              "&::after": {
                borderColor: theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'
              },
              "&::before": {
                borderColor: theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'
              }
            }}
          >
            <Chip
              size="medium" sx={{ color: theme.palette.mode === 'light' ? '#fff' : 'black', backgroundColor: theme.palette.mode === 'light' ? "#272B2F" : "white", borderColor: theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'white' }}
              label={
                <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], fontSize: '0.8125rem' }}>
                  <Box sx={{ display: 'inline-block' }} mr={.5}>
                    {searchedBooks?.length}
                  </Box>
                  book results
                </Typography>
              } />
          </Divider>
        </Box>
      )}

      {/* MAPPING THE ARRAY */}
      <Grid container spacing={4}>

        {slice(searchedBooks, 0, endOffset).map((item: Omit<Book, "id" | "pages">) =>
          <SearchedBooksCard
            withIMage={withIMage}
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