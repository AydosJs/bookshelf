import { Box, Typography, Grid, styled, Button, Divider, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import theme from "../../themes";
import { Book } from "../../types/common";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useAppSelector } from "../../store/hooks";
import { bookSelector } from "../../store/book/bookSlice";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCodeIcon from '@mui/icons-material/QrCode';

const Item = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",

  '&:hover': {
    boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
  },

}));

const ImageBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[300],
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100%"
}))

const listItemStyle = {
  paddingX: 0
}

type Props = {
  item: Omit<Book, "id" | "pages">;
  addBook: () => void
}

const listItemIconStyle = {
  minWidth: 32
}

export default function SearchedBooksCard({ item, addBook }: Props) {
  const bookshelf = useAppSelector(bookSelector)
  const ifBookInTheShelf = bookshelf.findIndex(shelfedBooks => shelfedBooks?.book.isbn === item?.isbn)

  return (
    <Grid item xs={12} sm={12} md={6} >
      <Item container sx={{ padding: 0, margin: 0, cursor: "pointer", flexDirection: { xs: "column", sm: "row" }, maxWidth: 590 }}>
        <Grid item xs={12} sm={6} sx={{ p: 0, m: 0 }}>
          <ImageBox sx={{
            minHeight: 300,
            height: "100%",
            backgroundImage: `url(${item?.cover !== '' ? item?.cover : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEGmmEQ4WlpXIfdqhhaFbJER2pXMLOFU3A&usqp=CAU'})`
          }} >
          </ImageBox>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ padding: theme.spacing(4), paddingTop: theme.spacing(2) }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", width: "100%" }}>

            <List component="nav" aria-label="mailbox folders">
              <Typography color={theme.palette.text.primary} variant="h6" sx={{ marginBottom: 1, minHeight: 64, width: '100%', textAlign: 'left', padding: "0px", WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "2" }}>
                {item?.title}
              </Typography>
              <Divider />

              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <Person2RoundedIcon />
                </ListItemIcon>
                <ListItemText >
                  <Typography color={theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left', WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "1" }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Author:&nbsp;</span> {item?.title}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText >
                  <Typography color={theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left' }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Published:&nbsp;</span> {item?.published}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <QrCodeIcon />
                </ListItemIcon>
                <ListItemText >
                  <Typography color={theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left' }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Isbn:&nbsp;</span> {item?.isbn}
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>


            <Box mt={{ xs: 4 }}>
              <Button disabled={ifBookInTheShelf !== -1} onClick={addBook} sx={{ width: "100%", height: "100%" }} variant="outlined" startIcon={<AddRoundedIcon />}>
                ADD TO BOOKSHELF
              </Button>
            </Box>

          </Box >

        </Grid >
      </Item >
    </Grid >
  )
}