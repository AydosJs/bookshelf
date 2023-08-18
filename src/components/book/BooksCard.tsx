import { Box, Button, Typography, Grid, styled } from "@mui/material";
import theme from "../../themes";
// import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
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

  maxHeight: '330px'

}));

const ImageBox = styled(Box)(({ theme }) => ({
  minHeight: "282px",
  // border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[300],
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  // opacity: "20%"
}))

type Props = {
  item: BookWithStatus;
  deleteBook: () => void
}

export default function BooksCard({ item, deleteBook }: Props) {
  return (
    <Grid item xs={6} sm={12} md={6} >
      <Item container >
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
                <Typography color={theme.palette.text.primary} variant="h6" sx={{ width: '100%', textAlign: 'left', padding: "0px", margin: "0px", '-webkit-box-orient': 'vertical', display: "-webkit-box", overflow: "hidden", '-webkit-line-clamp': "2" }}>
                  {item.book.title}
                </Typography>
              </Box>
              {/* <Box mb={2} sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
              <span>
                <GradeRoundedIcon sx={{ color: '#FFDB42' }} />
              </span>
              <span>
                <GradeRoundedIcon sx={{ color: '#FFDB42' }} />
              </span>
              <span>
                <GradeRoundedIcon sx={{ color: '#FFDB42' }} />
              </span>
              <span>
                <GradeRoundedIcon sx={{ color: '#FFDB42' }} />
              </span>
              <span>
                <GradeRoundedIcon sx={{ color: '#FFDB42' }} />
              </span>
            </Box> */}

              <Box >
                <Typography color={theme.palette.text.primary} variant="body1" sx={{ width: '100%', textAlign: 'left', '-webkit-box-orient': 'vertical', display: "-webkit-box", overflow: "hidden", '-webkit-line-clamp': "2" }}>
                  <Box sx={{ fontWeight: 500, display: "inline-block" }}> Author:</Box> {item.book.title}
                </Typography>
                <Typography color={theme.palette.text.primary} variant="body1" sx={{ width: '100%', textAlign: 'left' }}>
                  <Box sx={{ fontWeight: 500, display: "inline-block" }}> Published:</Box> {item.book.published}
                  <br />
                  <Box sx={{ fontWeight: 500, display: "inline-block" }}>Pages: </Box>
                  {item.book.pages}
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