import { Box, Button, Typography, Grid, styled } from "@mui/material";
import theme from "../../themes";
import { BookWithStatus } from "../../types/common";
import BookStatus from "./BookStatus";
import DeleteIcon from '@mui/icons-material/Delete';

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
  maxHeight: '330px',

  '&:hover': {
    boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
  },

}));

const ImageBox = styled(Box)(({ theme }) => ({
  minHeight: "282px",
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[300],
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}))

type Props = {
  item: BookWithStatus;
  deleteBook: () => void
}

export default function BooksCard({ item, deleteBook }: Props) {
  return (
    <Grid item xs={6} sm={12} md={6} >
      <Item container sx={{ cursor: "pointer" }}>
        <Grid item xs>
          <ImageBox sx={{
            backgroundImage: `url(${item?.book.cover !== '' ? item?.book.cover : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEGmmEQ4WlpXIfdqhhaFbJER2pXMLOFU3A&usqp=CAU'})`
          }} >
          </ImageBox>
        </Grid>
        <Grid item xs sx={{ ml: '24px' }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", width: "100%" }}>
            <Box>
              <Box mb={2}>
                <Typography color={theme.palette.text.primary} variant="h6" sx={{ width: '100%', textAlign: 'left', padding: "0px", margin: "0px", WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "2" }}>
                  {item.book.title}
                </Typography>
              </Box>

              <Box >
                <Typography color={theme.palette.text.primary} variant="body1" sx={{ width: '100%', textAlign: 'left', WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "2" }}>
                  <span style={{ fontWeight: 500, display: "inline-block" }}>Author:&nbsp;</span> {item.book.title}
                </Typography>
                <Typography color={theme.palette.text.primary} variant="body1" sx={{ width: '100%', textAlign: 'left' }}>
                  <span style={{ fontWeight: 500, display: "inline-block" }}> Published:&nbsp;</span> {item.book.published}
                  <br />
                  <span style={{ fontWeight: 500, display: "inline-block" }}>Pages:&nbsp;</span>
                  {item.book.pages}
                  <br />
                  <span style={{ fontWeight: 500, display: "inline-block" }}>Isbn:&nbsp;</span>
                  {item.book.isbn}
                </Typography>
              </Box>

            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <BookStatus book={item} />
              <Button onClick={deleteBook} sx={{ width: "100%", height: "100%" }} variant="outlined" startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </Box>

          </Box>
        </Grid>
      </Item >
    </Grid >
  )
}