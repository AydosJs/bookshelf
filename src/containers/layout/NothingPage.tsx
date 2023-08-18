import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from "../../themes";

export default function NothingPage() {
  return (
    <main style={{
      width: "100%",
      height: '100vh',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Typography variant="h2">There is nothing here!</Typography>

      <Box sx={{ display: "block" }} mt={4}>
        <Link to={'/'} style={{ textDecoration: "none" }} >
          <Typography variant="h6" sx={{ border: `1px solid ${theme.palette.grey[200]}`, padding: "10px 20px", borderRadius: "200px", display: 'flex', flexDirection: "row", alignItems: 'center' }}>
            <ArrowBackIcon sx={{ mr: 2 }} />
            GO BACK
          </Typography>
        </Link>
      </Box>

    </main >
  )
}