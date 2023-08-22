import { Box, Button, Typography, Grid, styled, List, Divider, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import theme from "../../themes";
import { BookWithStatus } from "../../types/common";
import BookStatus from "./BookStatus";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LayersIcon from '@mui/icons-material/Layers';

const ImageBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[300],
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100%"
}))

const insideGridStlye = {
  flexDirection: { xs: "column", sm: "row" },
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '4px',
  overflow: "hidden",
  cursor: 'pointer',
  '&:hover': {
    boxShadow: `rgba(0, 0, 0, 0.45) 0px 25px 20px -20px`,
  },
}

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
  return (
    <Grid item xs={12} sm={12} md={6} sx={{ minHeight: 380 }} >
      <Grid sx={insideGridStlye} container>
        <Grid item xs={12} sm={6} sx={{ p: 0, m: 0 }}>
          <ImageBox sx={{
            minHeight: 300,
            backgroundImage: `url(${item?.book.cover !== '' ? item?.book.cover : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEGmmEQ4WlpXIfdqhhaFbJER2pXMLOFU3A&usqp=CAU'})`
          }} />
        </Grid>
        <Grid item xs={12} sm={6} p={3}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <List component="nav" aria-label="mailbox folders" sx={{ p: 0 }}>
              <Typography color={theme.palette.text.primary} variant="h6" sx={{ mb: 2, minHeight: 64, width: '100%', textAlign: 'left', padding: "0px", WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "2" }}>
                {item?.book?.title}
              </Typography>
              <Divider />

              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText >
                  <Typography color={theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left', WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "1" }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Author:&nbsp;</span> {item?.book?.author}
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
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Published:&nbsp;</span> {item?.book?.published}
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
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Isbn:&nbsp;</span> {item?.book?.isbn}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText >
                  <Typography color={theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left' }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Pages:&nbsp;</span> {item?.book?.pages}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider />
            </List>
            <Box mt={{ xs: theme.spacing(4) }} sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <BookStatus book={item} />
              <Button sx={{ height: "100%", }} onClick={deleteBook} variant="outlined">
                <DeleteIcon />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}