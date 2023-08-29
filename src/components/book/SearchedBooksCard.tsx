import { Box, Typography, Grid, styled, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import theme from "../../themes";
import { Book, BookWithStatus } from "../../types/common";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useAppSelector } from "../../store/hooks";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { getMyBooks } from "../../store/bookSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { some } from 'lodash';
import Noimageplaceholder from '../../assets/Noimageplaceholder.png'
import { useEffect, useState } from "react";
import DeviderStyled from "../DividerStyled";

const Item = styled(Grid)(() => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#272B2F',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'}`,

  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.grey[100],
  borderRadius: "16px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  overflow: "hidden",

  '&:hover': {
    boxShadow: `rgba(0, 0, 0, 0.45) 0px 25px 20px -20px`,
  },

}));

const listItemStyle = {
  paddingX: 0
}

const listItemIconStyle = {
  minWidth: 32
}

type Props = {
  item: Omit<Book, "id" | "pages">;
  addBook: () => void;
  loader: boolean
}

export default function SearchedBooksCard({ item, addBook, loader }: Props) {
  const bookshelf = useAppSelector(getMyBooks)
  const hasBook = some(bookshelf, (book: BookWithStatus) => book?.book?.isbn === item?.isbn);

  const [loaderImage, setLoader] = useState({
    loading: false,
    error: false
  })
  const img = new Image();


  useEffect(() => {
    setLoader({
      loading: true,
      error: false
    })
    img.onload = () => {
      setLoader({
        loading: true,
        error: false
      })
    }

    img.onerror = () => {
      setLoader({
        loading: true,
        error: true
      })
    }

    img.src = item?.cover

    const imgInterval = setInterval(() => {
      if (img.complete) {
        setLoader({
          loading: false,
          error: false
        })
        clearInterval(imgInterval)
      }

    }, 1000);
  }, [])

  return (
    <Grid item xs={12} sm={6} >
      <Item container sx={{ margin: 0, cursor: "pointer", flexDirection: { xs: "column", sm: "row" } }}>
        <Grid item xs={12} sm={6} sx={{ p: 0, m: 0 }}>
          {
            (!loaderImage.loading && loaderImage.error) && <img
              src={Noimageplaceholder}
              alt={'No image'}
              style={{
                width: "100%",
                height: "100%",
                display: 'block',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                objectPosition: 'center'
              }} />
          }

          {
            (loaderImage.loading && !loaderImage.error) && <img
              src={Noimageplaceholder}
              alt={'No image'}
              style={{
                width: "100%",
                height: "100%",
                display: 'block',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'blur(4px)'
              }} />
          }

          {
            (!loaderImage.loading && !loaderImage.error) &&
            <img
              src={item?.cover !== "" ? item?.cover : Noimageplaceholder}
              alt={'No image'}
              style={{
                width: "100%",
                height: "100%",
                display: 'block',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                objectPosition: 'center'
              }} />
          }


        </Grid>
        <Grid item xs={12} sm={6} sx={{ padding: theme.spacing(4), paddingTop: theme.spacing(2) }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", width: "100%" }}>

            <List component="nav" aria-label="mailbox folders">
              <Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} variant="h6" sx={{ marginBottom: 1, minHeight: 64, width: '100%', textAlign: 'left', padding: "0px", WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "2" }}>
                {item?.title}
              </Typography>
              <DeviderStyled />
              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <Person2RoundedIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText >
                  <Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left', WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "1" }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Author:&nbsp;</span> {item?.title}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <CalendarMonthIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText >
                  <Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left' }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Published:&nbsp;</span> {item?.published}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <QrCodeIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText >
                  <Typography color={theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left' }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Isbn:&nbsp;</span> {item?.isbn}
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>

            <Box mt={2} p={0}>
              <LoadingButton
                disabled={hasBook}
                onClick={addBook}
                loading={loader}
                loadingPosition="start"
                startIcon={<AddRoundedIcon />}
                variant="outlined"
              // sx={{
              //   width: "100%",
              //   "&.Mui-disabled": {
              //     color: "#fff",
              //     borderColor: theme.palette.grey[300],
              //     cursor: 'not-allowed'
              //   }
              // }}
              >
                <span>ADD TO BOOKSHELF</span>
              </LoadingButton>
            </Box>

          </Box >
        </Grid >
      </Item >
    </Grid >
  )
}