import { Divider } from "@mui/material"
import theme from "../themes"

export default function DeviderStyled() {

  const styledDivider = {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'none'
  }

  return (
    <Divider style={styledDivider} />
  )
}