import { Box, Typography, Grid, styled, Button } from "@mui/material";
import theme from "../../themes";
import { Book } from "../../types/common";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

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
  // opacity: "20%"
}))

type Props = {
  item: Omit<Book, "id" | "pages">;
  addBook: () => void
}

export default function SearchedBooksCard({ item, addBook }: Props) {
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
          <Box sx={{ maxWidth: 263, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", width: "100%" }}>

            <Box >
              <Box mb={2}>
                <Typography color={theme.palette.text.primary} variant="h6" sx={{ width: '100%', textAlign: 'left', padding: "0px", margin: "0px", WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "2" }}>
                  {item?.title}
                </Typography>
              </Box>
              <Typography color={theme.palette.text.primary} variant="body1" sx={{ width: '100%', textAlign: 'left', WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "2" }}>
                <span style={{ fontWeight: 500, display: "inline-block" }}>Author:&nbsp;</span> {item?.title}
              </Typography>
              <Typography color={theme.palette.text.primary} variant="body1" sx={{ width: '100%', textAlign: 'left' }}>
                <span style={{ fontWeight: 500, display: "inline-block" }}>Published:&nbsp;</span> {item?.published}
              </Typography>
              <Typography color={theme.palette.text.primary} variant="body1" sx={{ width: '100%', textAlign: 'left' }}>
                <span style={{ fontWeight: 500, display: "inline-block" }}>Isbn:&nbsp;</span> {item?.isbn}
              </Typography>
            </Box>

            <Box >
              <Button onClick={addBook} sx={{ width: "100%", height: "100%" }} variant="outlined" startIcon={<AddRoundedIcon />}>
                ADD TO MY BOOKS
              </Button>
            </Box>

          </Box>

        </Grid>
      </Item >
    </Grid >
  )
}