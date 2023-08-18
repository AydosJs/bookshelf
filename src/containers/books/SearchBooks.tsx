import { useState } from "react";
import { createBook, searchBooks } from "../../api/BooksAPI";
import Search from "../../components/search/Search";
import { Book } from "../../types/common";
import MainLayout from "../layout/MainLayout";
import SearchedBooksCard from "../../components/book/SearchedBooksCard";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import theme from "../../themes";

export default function SearchBooks() {

  const [searchedBooks, setSearchedBooks] = useState<Omit<Book, "id" | "pages">[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const onSearch = async ({ title }: Pick<Book, "title">) => {
    try {
      setLoader(true);
      const res = await searchBooks(title)
      setSearchedBooks(res)
    } catch (error) {
      console.log('Error', error)
    }
    setLoader(false);
  }

  const addBook = async (isbn: string) => {
    try {
      setLoader(true);
      const value = {
        isbn: isbn
      }
      await createBook(value)
      toast.success('Book successfully ADDED')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
    setLoader(false);
  }

  return (
    <MainLayout >

      {/* Loader */}
      {loader &&
        <Box sx={{ width: '100%' }} mb={1}>
          <LinearProgress />
        </Box>
      }

      {/* search */}
      <Search onSubmit={onSearch} />

      {searchedBooks?.length == 0 && (
        <Box sx={{ width: "100%", height: "calc(100vh - 230px)", display: "flex", justifyContent: "center", alignItems: 'center' }}>
          <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}> NO BOOK FOUND!</Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        {(searchBooks !== null) && searchedBooks.map((item: Omit<Book, "id" | "pages">) => <SearchedBooksCard addBook={() => addBook(item?.isbn)} item={item} key={item?.isbn} />)}
      </Grid>

    </MainLayout>
  )
} 