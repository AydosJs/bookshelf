import { Box, Typography, Grid, styled, Divider, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import theme from "../../themes";
import { Book, BookWithStatus } from "../../types/common";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useAppSelector } from "../../store/hooks";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { getMyBooks } from "../../store/book/bookSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { some } from 'lodash';

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
    boxShadow: `rgba(0, 0, 0, 0.45) 0px 25px 20px -20px`,
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
  const hasBook = some(bookshelf as BookWithStatus[], (book: BookWithStatus) => book?.book?.isbn === item?.isbn);
  console.log('hasBook', hasBook)
  console.log('bokshelf', bookshelf)

  return (
    <Grid item xs={12} sm={12} md={6} >
      <Item container sx={{ padding: 0, margin: 0, cursor: "pointer", flexDirection: { xs: "column", sm: "row" }, maxWidth: 590 }}>
        <Grid item xs={12} sm={6} sx={{ p: 0, m: 0 }}>
          <ImageBox sx={{
            minHeight: 300,
            height: "100%",
            backgroundImage: `url(${item?.cover || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEGmmEQ4WlpXIfdqhhaFbJER2pXMLOFU3A&usqp=CAU'})`
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

            <Box mt={2} p={0}>
              <LoadingButton
                disabled={hasBook}
                color="primary"
                onClick={addBook}
                loading={loader}
                loadingPosition="start"
                startIcon={<AddRoundedIcon />}
                variant="outlined"
                sx={{ width: "100%" }}
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