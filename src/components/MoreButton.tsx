import { Divider, Grid, Chip, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "../themes";

type Props = {
  fetchMore: () => void;
  disabled: boolean;
};

export default function MoreButton({ fetchMore, disabled }: Props) {
  return (
    <Grid item xs={12} mt={4} mb={4}>
      <Divider
        sx={{
          "&::after": {
            borderColor:
              theme.palette.mode === "light"
                ? "rgba(194, 224, 255, 0.08)"
                : "none",
          },
          "&::before": {
            borderColor:
              theme.palette.mode === "light"
                ? "rgba(194, 224, 255, 0.08)"
                : "none",
          },
        }}
      >
        <Chip
          disabled={disabled}
          onClick={fetchMore}
          size="medium"
          sx={{
            color: theme.palette.mode === 'light' ? '#fff' : 'black',
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.paper : "white",
            borderColor: theme.palette.mode === 'light' ? 'rgba(194, 224, 255, 0.08)' : 'white'
          }}
          label={
            <Stack direction={"row"}>
              <ExpandMoreIcon sx={{ mr: 1 }} fontSize="small" />
              <span>More books</span>
            </Stack>
          }
          variant="outlined"
        />
      </Divider>
    </Grid>
  );
}
