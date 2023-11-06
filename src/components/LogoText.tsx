import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import AllInboxIcon from '@mui/icons-material/AllInbox';

export default function LogoText() {
  return (
    <Link to={'/'} style={{ textDecoration: "none" }}>
      <Typography variant="h5" color="primary" sx={{ display: 'flex', fontWeight: 500, flexDirection: 'row', alignItems: "center" }}>
        {/* <AllInboxIcon sx={{ mr: 1 }} /> */}
        <span>
          BOOKSHELF
        </span>
      </Typography>
    </Link>
  )
}