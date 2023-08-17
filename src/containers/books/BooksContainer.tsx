
import SearchComponent from "../../components/search/SearchComponent";
import theme from "../../themes";
import { Box, Fab, Grid, Tooltip, Typography } from "@mui/material";
import BooksCard from "../../components/BooksCard";
import MainLayout from "../layout/MainLayout";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CreateBook from "./books-edit/CreateBook";


export default function BooksContainer() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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