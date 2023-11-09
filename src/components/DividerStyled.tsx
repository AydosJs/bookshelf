import { Divider } from "@mui/material"
import theme from "../themes"

export default function DividerStyled() {

  const styledDivider = {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[100]
  }

  return (
    <Divider style={styledDivider} />
  )
}