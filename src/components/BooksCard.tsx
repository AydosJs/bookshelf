import { Box, Typography, Grid, styled } from "@mui/material";
import theme from "../themes";
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import { BookWithStatus } from "../types/common";
import BookStatus from "./BookStatus";

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
  item: BookWithStatus
}

export default function BooksCard({ item }: Props) {
  return (
    <Grid item xs={6} sm={12} md={6} >
      <Item container >
        <Grid item xs>
          <ImageBox >
          </ImageBox>
        </Grid>
        <Grid item xs sx={{ ml: '24px' }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box mb={2}>
              <Typography color={theme.palette.text.primary} paragraph variant="h6" sx={{ width: '100%', textAlign: 'left', padding: "0px", margin: "0px" }}>
                {item.book.title}
              </Typography>
            </Box>
            <Box mb={2} sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
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
            </Box>

            <Box mb={2}>
              <Typography color={theme.palette.text.primary} paragraph variant="body1" sx={{ width: '100%', textAlign: 'left' }}>
                Author: John dev
              </Typography>
              <Typography color={theme.palette.text.primary} paragraph variant="body1" sx={{ width: '100%', textAlign: 'left' }}>
                Published: 2018
              </Typography>
            </Box>

            <BookStatus book={item} />

          </Box>
        </Grid>
      </Item>
    </Grid>
  )
}