import { Paper, Typography } from "@mui/material";
import { Note } from "../types/note";

const Note = (note: Note) => {
  const { title, synopsis, content } = note;
  return (
    <Paper
      sx={{
        maxWidth: "350px",
        p: 3,
        boxShadow: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          cursor: "pointer",
        },
      }}
      elevation={2}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          fontWeight: 800,
          lineHeight: 1.2,
          mb: 2,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
        }}
      >
        {synopsis}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {content}
      </Typography>
    </Paper>
  );
};

export default Note;
