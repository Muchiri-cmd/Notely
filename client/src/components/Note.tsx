
import { Paper,Typography } from "@mui/material"

const Note = () => {
  return (
    <Paper
        sx = {{
            maxWidth:'500px',
            p:3
        }}
        elevation={2}
    >
        <Typography variant="h1"
            sx = {{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 2,
                letterSpacing: "-0.02em",
            }}
        >Title</Typography>
        <Typography
        variant="h6">Synopsis</Typography>
        <Typography
            variant="body2"
            sx = {{
                mt:1
            }}
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat voluptate voluptatem iure totam vitae, praesentium temporibus labore in! Ea similique incidunt nesciunt magnam repellat, aliquam ad harum ipsam? Perspiciatis a deserunt sapiente, pariatur vitae eveniet assumenda velit? At a, dolor cumque reiciendis aliquam repudiandae asperiores magnam. Corrupti quis eum eius?</Typography>
    </Paper>
  )
}

export default Note