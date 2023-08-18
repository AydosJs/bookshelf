import { Box, Button, Typography, Grid, styled } from "@mui/material";
import theme from "../themes";
// import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import { BookWithStatus } from "../types/common";
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

}));

const ImageBox = styled(Box)(({ theme }) => ({
  minHeight: "282px",
  // border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[300],
  opacity: "20%"
}))

type Props = {
  item: BookWithStatus;
  deleteBook: () => void
}

export default function BooksCard({ item, deleteBook }: Props) {
  return (
    <Grid item xs={6} sm={12} md={6} sx={{ maxHeight: '360px' }} >
      <Item container >
        <Grid item xs>
          <ImageBox sx={{
            backgroundImage: `url(${item.book.cover})`
          }} >
          </ImageBox>
        </Grid>
        <Grid item xs sx={{ ml: '24px' }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", width: "100%" }}>
            <Box>
              <Box>
                <Typography color={theme.palette.text.primary} paragraph variant="h6" sx={{ width: '100%', textAlign: 'left', padding: "0px", margin: "0px", '-webkit-box-orient': 'vertical', display: "-webkit-box", overflow: "hidden", '-webkit-line-clamp': "2" }}>
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
                <Typography color={theme.palette.text.primary} paragraph variant="body1" sx={{ width: '100%', textAlign: 'left', '-webkit-box-orient': 'vertical', display: "-webkit-box", overflow: "hidden", '-webkit-line-clamp': "2" }}>
                  Author: {item.book.title}
                </Typography>
                <Typography color={theme.palette.text.primary} paragraph variant="body1" sx={{ width: '100%', textAlign: 'left' }}>
                  Published: {item.book.published}
                  <br />
                  Pages: {item.book.pages}
                </Typography>
              </Box>

            </Box>

            <Box>
              <BookStatus book={item} />
              <Button onClick={deleteBook} sx={{ mt: 1, width: "100%" }} variant="outlined" startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </Box>

          </Box>
        </Grid>
      </Item>
    </Grid>
  )
}