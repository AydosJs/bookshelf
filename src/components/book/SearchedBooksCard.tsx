import {
  Box,
  Typography,
  Grid,
  styled,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import theme from "../../themes";
import { Book, BookWithStatus } from "../../types/common";
import { useAppSelector } from "../../store/hooks";
import { getMyBooks } from "../../store/bookSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { some } from "lodash";
import DeviderStyled from "../DividerStyled";
import LazyImg from "./LazyImg";

const Item = styled(Grid)(() => ({
  backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#272B2F",
  textAlign: "center",
  color: theme.palette.grey[100],
  borderRadius: "4px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  overflow: "hidden",
  minHeight: 318,

  "&:hover": {
    boxShadow: `rgba(0, 0, 0, 0.45) 0px 25px 20px -20px`,
  },

  ...theme.typography.body2,
}));

const listItemStyle = {
  paddingX: 0,
  py: 1,
};

type Props = {
  item: Omit<Book, "id" | "pages">;
  addBook: () => void;
  loader: boolean;
  withIMage: boolean;
};

export default function SearchedBooksCard({
  item,
  addBook,
  loader,
  withIMage,
}: Readonly<Props>) {
  const bookshelf = useAppSelector(getMyBooks);
  const hasBook = some(
    bookshelf,
    (book: BookWithStatus) => book?.book?.isbn === item?.isbn
  );

  return (
    <Grid item xs={12} sm={withIMage ? 4 : 6}>
      <Item
        container
        sx={{
          margin: 0,
          cursor: "pointer",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {!withIMage && (
          <Grid item xs={12} sm={6} sx={{ p: 0, m: 0 }}>
            <LazyImg index={0} url={item?.cover} />
          </Grid>
        )}
        <Grid item xs={12} sm={withIMage ? 12 : 6} sx={{ p: 3, pt: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            <List component="nav" aria-label="mailbox folders" sx={{ p: 0 }}>
              <Typography
                color={
                  theme.palette.mode === "light"
                    ? theme.palette.grey[300]
                    : theme.palette.text.primary
                }
                variant="h6"
                sx={{
                  marginBottom: 1,
                  minHeight: 64,
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  width: "100%",
                  textAlign: "left",
                  padding: "0px",
                  WebkitBoxOrient: "vertical",
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitLineClamp: "2",
                }}
              >
                {item?.title}
              </Typography>
              <DeviderStyled />
              <ListItem sx={listItemStyle}>
                <ListItemText>
                  <Typography
                    color={
                      theme.palette.mode === "light"
                        ? theme.palette.grey[300]
                        : theme.palette.text.primary
                    }
                    variant="subtitle2"
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      WebkitBoxOrient: "vertical",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitLineClamp: "1",
                    }}
                  >
                    <span style={{ fontWeight: 500, display: "inline-block" }}>
                      Author:&nbsp;
                    </span>{" "}
                    {item?.title}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
              <ListItem sx={listItemStyle}>
                <ListItemText>
                  <Typography
                    color={
                      theme.palette.mode === "light"
                        ? theme.palette.grey[300]
                        : theme.palette.text.primary
                    }
                    variant="subtitle2"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    <span style={{ fontWeight: 500, display: "inline-block" }}>
                      Published:&nbsp;
                    </span>{" "}
                    {item?.published}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
              <ListItem sx={listItemStyle}>
                <ListItemText>
                  <Typography
                    color={
                      theme.palette.mode === "light"
                        ? theme.palette.grey[300]
                        : theme.palette.text.primary
                    }
                    variant="subtitle2"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    <span style={{ fontWeight: 500, display: "inline-block" }}>
                      Isbn:&nbsp;
                    </span>{" "}
                    {item?.isbn}
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>

            <Box mt={2} p={0}>
              <LoadingButton
                disabled={hasBook}
                onClick={addBook}
                loading={loader}
                variant="outlined"
                sx={{
                  width: "100%",
                }}
              >
                Put on bookshelf
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Item>
    </Grid>
  );
}
