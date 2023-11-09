import theme from "../../themes";
import {
  Box,
  Checkbox,
  Chip,
  Divider,
  Fab,
  FormControlLabel,
  Grid,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import BooksCard from "../../components/book/BooksCard";
import MainLayout from "../layout/MainLayout";
import AddIcon from "@mui/icons-material/Add";
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
const LIMIT = 10;

export default function BooksContainer() {
  const [endOffset, setEndOffset] = useState(LIMIT);
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const books = useAppSelector(getMyBooks);
  const [withIMage, setWithImage] = useState<boolean>(false)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const getList = async () => {
    try {
      setLoader(true);
      const resp = await getBooks();
      dispatch(setMyBooks(resp));
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        dispatch(logOut());
      }
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoader(true);
      if (confirm("Are you sure that you want to DELETE this book!")) {
        const res = await deleteBook(id);
        dispatch(setMyBooks(res));
        toast.success("Book successfully DELETED");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log("Book delete error", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchMore = () => {
    setEndOffset(endOffset + LIMIT);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <MainLayout>
      {loader && (
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999999,
          }}
          mb={1}
        >
          <LinearProgress />
        </Box>
      )}

      {/* TITLE */}
      {books?.length !== 0 && (
        <Box mb={4} mt={2}>

          <Typography
            sx={{
              color:
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.text.primary,
            }}
            variant="h4"
          >
            Books
          </Typography>

          <Chip
            sx={{
              borderRadius: "16px",
              mt: 2,
              backgroundColor:
                theme.palette.mode === "dark" ? "#fff" : "#272B2F",
              border: `1px solid ${theme.palette.mode === "light"
                ? "rgba(194, 224, 255, 0.08)"
                : "none"
                }`,
            }}
            label={
              <FormControlLabel
                disabled={loader}
                control={
                  <Checkbox
                    checked={withIMage} onChange={() => setWithImage(!withIMage)}
                    name="withImage" id="withImage" size="small" />
                }
                label={
                  <Typography
                    style={{
                      userSelect: "none",
                      color:
                        theme.palette.mode === "light"
                          ? theme.palette.grey[100]
                          : theme.palette.text.primary,
                    }}
                    variant="subtitle2"
                  >
                    Show without image
                  </Typography>
                }
              />
            }
          />

          <Box mb={2}>
            <Divider
              sx={{
                "&::after": {
                  borderColor:
                    theme.palette.mode === "light"
                      ? "rgba(194, 224, 255, 0.08)"
                      : "none",
                },
                "&::before": {
                  borderColor:
                    theme.palette.mode === "light"
                      ? "rgba(194, 224, 255, 0.08)"
                      : "none",
                },
              }}
            >
              <Chip
                size="medium"
                sx={{
                  color: theme.palette.mode === "light" ? "#fff" : "black",
                  backgroundColor:
                    theme.palette.mode === "light" ? "#272B2F" : "white",
                  borderColor:
                    theme.palette.mode === "light"
                      ? "rgba(194, 224, 255, 0.08)"
                      : "white",
                }}
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        theme.palette.mode === "light"
                          ? theme.palette.grey[100]
                          : theme.palette.grey[900],
                      fontSize: "0.8125rem",
                    }}
                  >
                    <Box sx={{ display: "inline-block" }} mr={0.5}>
                      {books?.length}
                    </Box>
                    books on you shelf
                  </Typography>
                }
              />
            </Divider>
          </Box>
        </Box>
      )}

      {(books?.length == 0 || !books) && (
        <Loader loader={loader} text="Shelf empty." />
      )}
      {/* book cards */}
      <Grid container spacing={4}>
        {slice(books, 0, endOffset).map((item: BookWithStatus) => (
          <BooksCard
            withIMage={withIMage}
            deleteBook={() => handleDelete(item.book.id)}
            item={item}
            key={item.book.id}
          />
        ))}

        {/* MORE BUTTON */}
        {books?.length !== 0 && books?.length >= endOffset && (
          <MoreButton
            disabled={endOffset >= books?.length}
            fetchMore={fetchMore}
          />
        )}
      </Grid>

      <Tooltip title="Create a book">
        <Fab
          onClick={() => handleOpen()}
          sx={{
            position: "fixed",
            right: theme.spacing(2.5),
            bottom: theme.spacing(2.5),
            zIndex: 99999,
          }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* BOOK CREATE MODAL  */}
      <CreateBook
        updateList={() => getList()}
        open={open}
        handleClose={() => handleClose()}
        handleOpen={() => handleOpen()}
      />
    </MainLayout>
  );
}
