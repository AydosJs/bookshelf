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
import { useState } from "react";
import CreateBook from "./books-save/CreateBook";
import { BookWithStatus } from "../../types/common";
import { slice } from "lodash";
import Loader from "../layout/Loader";
import MoreButton from "../../components/MoreButton";
import { useShelfBooksData } from "./shelfHooks/useShelfBooksData";

const LIMIT = 10;

export default function BooksContainer() {
  const [endOffset, setEndOffset] = useState(LIMIT);
  const [withIMage, setWithImage] = useState<boolean>(false)
  const { data: shelfBooks, isDeleteBookLoading, isLoading: isBooksLoading, handleDelete } = useShelfBooksData();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const shelfBooksLength = shelfBooks?.length ?? 0
  const loading = isBooksLoading || isDeleteBookLoading;

  const fetchMore = () => {
    setEndOffset(endOffset + LIMIT);
  };

  return (
    <MainLayout>
      {loading && (
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            top: 64,
            left: 0,
            zIndex: 9999999,
          }}
          mb={1}
        >
          <LinearProgress />
        </Box>
      )}

      {/* TITLE */}
      {shelfBooksLength !== 0 && (
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
              borderRadius: "4px",
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
                disabled={loading}
                control={
                  <Checkbox
                    sx={{
                      color: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[300],
                    }}
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

          <Box mb={2} mt={2}>
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
                      {shelfBooksLength}
                    </Box>
                    books on you shelf
                  </Typography>
                }
              />
            </Divider>
          </Box>
        </Box>
      )}

      {(shelfBooksLength == 0 || !shelfBooks) && (
        <Loader loader={loading} text="Shelf empty." />
      )}
      {/* book cards */}
      <Grid container spacing={4}>
        {slice(shelfBooks, 0, endOffset).map((item: BookWithStatus) => (
          <BooksCard
            withIMage={withIMage}
            deleteBook={() => handleDelete(item.book.id)}
            item={item}
            key={item.book.id}
          />
        ))}

        {/* MORE BUTTON */}
        {shelfBooksLength !== 0 && shelfBooksLength >= endOffset && (
          <MoreButton
            disabled={endOffset >= shelfBooksLength}
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
        open={open}
        handleClose={() => handleClose()}
        handleOpen={() => handleOpen()}
      />
    </MainLayout>
  );
}
