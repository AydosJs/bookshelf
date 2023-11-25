import { Divider } from "@mui/material"
import theme from "../themes"

export default function DividerStyled() {

  return (
    <Divider sx={{
      backgroundColor: "rgba(218, 224, 231, 0.08)",
      "&::after": {
        borderColor: theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'
      },
      "&::before": {
        borderColor: theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'
      }
    }} />
  )
}