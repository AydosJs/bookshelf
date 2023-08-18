import { Box, Typography, Grid, styled } from "@mui/material";
import theme from "../../themes";
import { Book } from "../../types/common";

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
    boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`
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
  // opacity: "20%"
}))

type Props = {
  item: Omit<Book, "id" | "pages">;
}

export default function SearchedBooksCard({ item }: Props) {
  return (
    <Grid item xs={6} sm={12} md={6} >
      <Item container sx={{ cursor: "pointer" }}>
        <Grid item xs>
          <ImageBox sx={{
            backgroundImage: `url(${item?.cover !== '' ? item?.cover : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEGmmEQ4WlpXIfdqhhaFbJER2pXMLOFU3A&usqp=CAU'})`
          }} >
          </ImageBox>
        </Grid>
        <Grid item xs sx={{ ml: '24px' }}>
          <Box mb={2}>
            <Typography color={theme.palette.text.primary} variant="h6" sx={{ width: '100%', textAlign: 'left', padding: "0px", margin: "0px", '-webkit-box-orient': 'vertical', display: "-webkit-box", overflow: "hidden", '-webkit-line-clamp': "2" }}>
              {item?.title}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography color={theme.palette.text.primary} variant="body1" sx={{ width: '100%', textAlign: 'left', '-webkit-box-orient': 'vertical', display: "-webkit-box", overflow: "hidden", '-webkit-line-clamp': "2" }}>
              <Box sx={{ fontWeight: 500, display: "inline-block" }}> Author:</Box> {item?.title}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography color={theme.palette.text.primary} variant="body1" sx={{ width: '100%', textAlign: 'left' }}>
              <Box sx={{ fontWeight: 500, display: "inline-block" }}> Published:</Box> {item?.published}
            </Typography>
          </Box>

        </Grid>
      </Item >
    </Grid >
  )
}