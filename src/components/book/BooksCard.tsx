import { Box, Button, styled, Typography, Grid, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import theme from "../../themes";
import { BookWithStatus } from "../../types/common";
import BookStatus from "./BookStatus";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LayersIcon from '@mui/icons-material/Layers';
import DeviderStyled from "../DividerStyled";
import LazyImg from "./LazyImg";


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

  const Item = styled(Grid)(() => ({
    background: item?.status === 0 ? '#D6FFF3' : item?.status === 1 ? '#72DDBD' : "#F9C74F",

    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.grey[100],
    borderRadius: "16px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "hidden",

    '&:hover': {
      boxShadow: `rgba(0, 0, 0, 0.45) 0px 25px 20px -20px`,
    },

  }));

  const styledIcon = {
    // color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary
  }

  return (
    <Grid item xs={12} sm={6} >
      <Item container sx={{ margin: 0, cursor: "pointer", flexDirection: { xs: "column", sm: "row" } }}>

        <Grid item xs={12} sm={6} sx={{ p: 0, m: 0 }}>
          <LazyImg index={0} url={item?.book?.cover} />
        </Grid>
        <Grid item xs={12} sm={6} p={3}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <List component="nav" aria-label="mailbox folders" sx={{ p: 0 }}>
              <Typography color={theme.palette.text.primary} variant="h6" sx={{ marginBottom: 1, minHeight: 64, width: '100%', textAlign: 'left', padding: "0px", WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "2" }}>
                {item?.book?.title}
              </Typography>
              <DeviderStyled />

              <ListItem sx={listItemStyle} >
                <ListItemIcon sx={listItemIconStyle}>
                  <PersonIcon style={styledIcon} />
                </ListItemIcon>
                <ListItemText >
                  <Typography color={theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left', WebkitBoxOrient: 'vertical', display: "-webkit-box", overflow: "hidden", WebkitLineClamp: "1" }}>
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
                  <Typography color={theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left' }}>
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
                  <Typography color={theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left' }}>
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
                  <Typography color={theme.palette.text.primary} variant="body2" sx={{ width: '100%', textAlign: 'left' }}>
                    <span style={{ fontWeight: 500, display: "inline-block" }}>Pages:&nbsp;</span> {item?.book?.pages}
                  </Typography>
                </ListItemText>
              </ListItem>
              <DeviderStyled />
            </List>
            <Box mt={{ xs: theme.spacing(4) }} sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <BookStatus book={item} />
              <Button sx={{ height: "100%", borderColor: "rgba(0, 0, 0, 0.57)" }} onClick={deleteBook} variant="outlined">
                <DeleteIcon sx={{ color: 'rgba(0, 0, 0, 0.57)' }} />
              </Button>
            </Box>
          </Box>
        </Grid>

      </Item>
    </Grid >
  )
}