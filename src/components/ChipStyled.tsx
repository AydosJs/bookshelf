import { Chip, Typography } from "@mui/material"
import theme from "../themes"

interface ChipStyledProps {
  amount: number; // Assuming length is a number
}

export default function ChipStyled({ amount }: ChipStyledProps) {

  const styledChip = {
    color: theme.palette.mode === 'light' ? '#fff' : 'black',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.paper : "white",
    borderColor: theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'white'
  }

  return (
    <Chip
      size="medium"
      sx={styledChip}
      label={
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], fontSize: '0.8125rem' }}>
          <span style={{ display: 'inline-block', marginRight: ".5px" }}>
            {amount}&nbsp;
          </span>
          book results
        </Typography>
      } />
  )
}