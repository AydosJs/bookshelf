import { useState } from "react";
import { searchBooks } from "../../api/BooksAPI";
import Search from "../../components/search/Search";
import { Book } from "../../types/common";
import MainLayout from "../layout/MainLayout";
import SearchedBooksCard from "../../components/book/SearchedBooksCard";
import { Box, Grid, LinearProgress } from "@mui/material";

export default function SearchBooks() {

  const [searchedBooks, setSearchedBooks] = useState<Omit<Book, "id" | "pages">[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const onSearch = async ({ title }: Pick<Book, "title">) => {
    try {
      setLoader(true);
      const res = await searchBooks(title)
      console.log('searchedBooks', res)
      setSearchedBooks(res)
    } catch (error) {
      console.log('Error', error)
    }
    setLoader(false);
  }

  console.log("serched", searchedBooks)

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

      <Grid container spacing={4}>
        {(searchBooks !== null && !loader) && searchedBooks.map(item => <SearchedBooksCard item={item} key={item?.isbn} />)}
      </Grid>

    </MainLayout>
  )
} 