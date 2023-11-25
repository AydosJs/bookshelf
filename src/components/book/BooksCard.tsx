import {
  Box,
  Button,
  styled,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import theme from "../../themes";
import { BookWithStatus } from "../../types/common";
import BookStatus from "./BookStatus";
import DeleteIcon from "@mui/icons-material/Delete";
import DeviderStyled from "../DividerStyled";
import LazyImg from "../LazyImg";

const listItemStyle = {
  paddingX: 0,
  paddingY: 1,
};

type Props = {
  item: BookWithStatus;
  deleteBook: () => void;
  withIMage: boolean;
};

export default function BooksCard({ item, deleteBook, withIMage }: Readonly<Props>) {
  const Item = styled(Grid)(() => ({
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : theme.palette.background.paper,

    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.grey[100],
    borderRadius: "4px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "hidden",


    "&:hover": {
      boxShadow: `rgba(0, 0, 0, 0.45) 0px 25px 20px -20px`,
    },
  }));

  const styledBox = {
    position: "absolute",
    transform: "rotate(45deg)",
    top: "-32px",
    right: "-49px",
    width: "124px",
    height: "66px",
    zIndex: 1,
    background:
      item?.status === 0
        ? '#f1c40f'
        : item?.status === 1
          ? "#3498db"
          : "#27ae60",

    boxShadow:
      item?.status === 0
        ? 'rgba(241, 196, 15, 0.2) 0px 0px 29px 0px'
        : item?.status === 1
          ? "rgba(52, 152, 219, 0.2) 0px 0px 29px 0px"
          : "rgba(39, 174, 96, 0.2) 0px 0px 29px 0px",

  };

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
          <Grid item xs={12} sm={6} sx={{ p: 0, m: 0, zIndex: 2 }}>
            <LazyImg index={0} url={item?.book?.cover} />
          </Grid>
        )}

        <Grid item xs={12} sm={withIMage ? 12 : 6} sx={{ p: 3, pt: 2, position: "relative" }}>
          <Box sx={styledBox} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
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
                  minHeight: 77,
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
                {item?.book?.title}
              </Typography>
              <DeviderStyled />
              <ListItem sx={listItemStyle}>
                <ListItemText>
                  <Typography
                    variant="subtitle2"
                    color={
                      theme.palette.mode === "light"
                        ? theme.palette.grey[300]
                        : theme.palette.text.secondary
                    }
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      WebkitBoxOrient: "vertical",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitLineClamp: "1",
                    }}
                  >
                    <Typography style={{ display: "inline-block" }}>
                      Author:&nbsp;
                    </Typography>
                    {item?.book?.author}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
              <ListItem sx={listItemStyle}>
                <ListItemText>
                  <Typography
                    variant="subtitle2"
                    color={
                      theme.palette.mode === "light"
                        ? theme.palette.grey[300]
                        : theme.palette.text.secondary
                    }
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    <span style={{ fontWeight: 500, display: "inline-block" }}>
                      Published:&nbsp;
                    </span>
                    {item?.book?.published}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
              <ListItem sx={listItemStyle}>
                <ListItemText>
                  <Typography
                    variant="subtitle2"
                    color={
                      theme.palette.mode === "light"
                        ? theme.palette.grey[300]
                        : theme.palette.text.secondary
                    }
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    <span style={{ fontWeight: 500, display: "inline-block" }}>
                      Isbn:&nbsp;
                    </span>
                    {item?.book?.isbn}
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
                        : theme.palette.text.secondary
                    }
                    variant="subtitle2"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    <span style={{ fontWeight: 500, display: "inline-block" }}>
                      Pages:&nbsp;
                    </span>
                    {item?.book?.pages}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
            </List>
            <Box
              mt={{ xs: theme.spacing(4) }}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <BookStatus book={item} />
              <Button
                sx={{ height: "100%", borderColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800] }}
                onClick={deleteBook}
                variant="outlined"
              >
                <DeleteIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800] }} />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Item>
    </Grid>
  );
}
