import { Box, Button, Typography, Grid, styled, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import theme from "../../themes";
import { BookWithStatus } from "../../types/common";
import BookStatus from "./BookStatus";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LayersIcon from '@mui/icons-material/Layers';
import { useEffect, useState } from "react";
import Noimageplaceholder from '../../assets/Noimageplaceholder.png'
import DeviderStyled from "../DividerStyled";


const ImageBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100%"
}))

const listItemStyle = {
  paddingX: 0
}

const listItemIconStyle = {
  minWidth: 32
}

type Props = {
  item: BookWithStatus;
  deleteBook: () => void
}

export default function BooksCard({ item, deleteBook }: Props) {

  const styledGrid = {
    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#272B2F',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'}`,

    borderRadius: '4px',
    overflow: "hidden",
    cursor: 'pointer',
  }

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

    img.src = item.book?.cover

    const imgInterval = setInterval(() => {
      if (img.complete) {
        setLoader({ ...loaderImage, loading: false })
        clearInterval(imgInterval)
      }

    }, 1000);

  }, [])

  const styledIcon = {
    color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary
  }

  return (
    <Grid item xs={12} sm={12} md={6} sx={{
      minHeight: 380, '&:hover': {
        boxShadow: `rgba(0, 0, 0, 0.45) 0px 25px 20px -20px`,
      },
    }} >
      <Grid container style={styledGrid} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
        <Grid item xs={12} sm={6} sx={{ p: 0, m: 0 }}>

          {
            (!loaderImage.error && loaderImage.loading) &&
            <ImageBox sx={{
              minHeight: 300,
              backgroundImage: `url(${Noimageplaceholder})`,
              filter: 'blur(4px)'
            }} />
          }

          {
            (loaderImage.error && !loaderImage.loading) &&
            <ImageBox sx={{
              minHeight: 300,
              backgroundImage: `url(${Noimageplaceholder})`,
            }} />
          }


          {
            (!loaderImage.loading && !loaderImage.error) &&
            <ImageBox sx={{
              minHeight: 300,
              backgroundImage: `url(${item.book?.cover !== "" ? item.book?.cover : Noimageplaceholder})`
            }} />
          }

        </Grid>
        <Grid item xs={12} sm={6} p={3}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <List component="nav" aria-label="mailbox folders" sx={{ p: 0 }}>
              <Typography variant="h6" sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary, mb: 2, minHeight: 64, width: '100%', textAlign: 'left', padding: "0px", WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "2" }}>
                {item?.book?.title}
              </Typography>
              <DeviderStyled />

              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <PersonIcon style={styledIcon} />
                </ListItemIcon>
                <ListItemText >
                  <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary, width: '100%', textAlign: 'left', WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "1" }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Author:&nbsp;</span> {item?.book?.author}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <CalendarMonthIcon style={styledIcon} />
                </ListItemIcon>
                <ListItemText >
                  <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary, width: '100%', textAlign: 'left' }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Published:&nbsp;</span> {item?.book?.published}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <QrCodeIcon style={styledIcon} />
                </ListItemIcon>
                <ListItemText >
                  <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary, width: '100%', textAlign: 'left' }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Isbn:&nbsp;</span> {item?.book?.isbn}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <LayersIcon style={styledIcon} />
                </ListItemIcon>
                <ListItemText >
                  <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary, width: '100%', textAlign: 'left' }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Pages:&nbsp;</span> {item?.book?.pages}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
            </List>
            <Box mt={{ xs: theme.spacing(4) }} sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <BookStatus book={item} />
              <Button sx={{ height: "100%", borderColor: theme.palette.mode === 'dark' ? "rgba(0, 0, 0, 0.57)" : theme.palette.grey[300] }} onClick={deleteBook} variant="outlined">
                <DeleteIcon sx={{ color: theme.palette.mode === 'dark' ? "rgba(0, 0, 0, 0.57)" : theme.palette.grey[300] }} />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid >
  )
}