import { Box, Typography } from "@mui/material";
import theme from "../../themes";

type Props = {
  text?: string;
  loader: boolean
}

export default function Loader({ text, loader }: Props) {
  return (
    <Box sx={{
      width: "100%", display: "flex", position: "absolute",
      top: "50%",
      left: '50%',
      transform: 'translate(-50%, -50%)',
      justifyContent: "center", alignItems: 'center'
    }}>
      <Typography variant="body1" sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.text.primary, fontWeight: 500 }}>
        {loader ? 'Loading...' : text}
      </Typography>
    </Box>
  )
}