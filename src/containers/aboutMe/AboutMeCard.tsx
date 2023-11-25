import { Box, Divider, Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import theme from "../../themes"

export default function AboutMeCard() {
  return (
    <Box sx={{
      border: `1px solid rgba(194, 224, 255, 0.08)`,
      p: 2,
      borderRadius: "4px",
      backgroundColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.background.paper,

    }}>
      <Box >
        <Typography variant="subtitle1" sx={{ color: theme.palette.mode !== "dark" ? theme.palette.grey[300] : 'black' }}>
          Hi! I'm Yong, a young web developer who loves React and Typescript. I'm working on a cool project that helps people find and manage their books. It's still a demo, but it's already pretty cool.
          <Box mt={3} />
          You can add books to your shelf, mark them as new, reading, or finished, and see their progress at a glance. I'm planning to add more features in the future, so stay tuned!
          <Box mt={3} />
          If you have any ideas, suggestions, or job openings, please hit me up. I'm always looking for ways to improve my project and my skills. Two minds are better than one, right?
        </Typography>
      </Box>
      <Box my={2}>
        <Divider sx={{ borderColor: theme.palette.grey[800] }} />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="flex-start"
        alignItems={{ xs: "start", sm: "center" }}
        spacing={{ xs: 1, sm: 2 }}
        ml={1}
      >
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Typography
            sx={{
              color:
                theme.palette.mode !== "dark"
                  ? theme.palette.grey[300]
                  : "black",
            }}
            variant="subtitle2"
          >
            LinkedIn:&nbsp;
          </Typography>
          <Typography
            component={Link}
            to={"https://www.linkedin.com/in/aydos-sankibaev/"}
            color="primary"
            variant="subtitle2"
          >
            Aydos Sankibaev
          </Typography>
        </Box>
        <Box sx={{
          color:
            theme.palette.mode !== "dark"
              ? theme.palette.grey[300]
              : "black",
          display: { xs: "none", sm: "block" }
        }}>|</Box>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Typography
            sx={{
              color:
                theme.palette.mode !== "dark"
                  ? theme.palette.grey[300]
                  : "black",
            }}
            variant="subtitle2"
          >
            Twitter:&nbsp;
          </Typography>
          <Typography
            component={Link}
            to={"https://twitter.com/Aydos84744724"}
            color="primary"
            variant="subtitle2"
          >
            @Aydos84744724
          </Typography>
        </Box>
        <Box sx={{
          color:
            theme.palette.mode !== "dark"
              ? theme.palette.grey[300]
              : "black",
          display: { xs: "none", sm: "block" }
        }}>|</Box>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Typography
            sx={{
              color:
                theme.palette.mode !== "dark"
                  ? theme.palette.grey[300]
                  : "black",
            }}
            variant="subtitle2"
          >
            GitHub:&nbsp;
          </Typography>
          <Typography
            component={Link}
            to={"https://github.com/AydosJs"}
            color="primary"
            variant="subtitle2"
          >
            AydosJs
          </Typography>
        </Box>
        <Box sx={{
          color:
            theme.palette.mode !== "dark"
              ? theme.palette.grey[300]
              : "black",
          display: { xs: "none", sm: "block" }
        }}>|</Box>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Typography
            sx={{
              color:
                theme.palette.mode !== "dark"
                  ? theme.palette.grey[300]
                  : "black",
            }}
            variant="subtitle2"
          >
            GitLab:&nbsp;
          </Typography>
          <Typography
            component={Link}
            to={"https://gitlab.com/Aydos"}
            color="primary"
            variant="subtitle2"
          >
            Aydos
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}