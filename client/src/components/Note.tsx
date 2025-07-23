import { Paper, Typography, Button, Box, IconButton } from "@mui/material";
import type NoteType from "../types/note";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { TiPin } from "react-icons/ti";
import { FaBookmark } from "react-icons/fa";
import { useUpdateNote } from "../mutations/notes";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Note = (note: NoteType) => {
  const queryClient = useQueryClient(); 
  const { title, synopsis, content } = note;
  const [bookMarked, setBookMarked] = useState(note.isBookMarked)
  const [pinned,setPinned] = useState(note.isPinned)
  

  const { mutateAsync: updateNote } = useUpdateNote();

  const handleUpdate = async (id:string,type: "pin" | "bookmark") => {
    const updatedNote = {
      title: note.title,
      synopsis: note.synopsis,
      content: note.content,
      isPinned: type === "pin" ? !pinned : pinned,
      isBookMarked: type === "bookmark" ? !bookMarked : bookMarked,
    };
  
    if (type === "pin") setPinned(!pinned);
    if (type === "bookmark") setBookMarked(!bookMarked);
  
    await updateNote({ id: id!, data: updatedNote });
    queryClient.invalidateQueries(["fetch-notes"]);
  };

  return (
    <Paper
      sx={{
        maxWidth: "350px",
        p: 2.5,
        boxShadow: 2,
        transition: "all 0.3s ease",
        textDecoration: "none",
        "&:hover": {
          transform: "translateY(-4px)",
          cursor: "pointer",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      elevation={2}
      // component={Link}
      // to={`/note/${note.id}`}
    >
      <Box>
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.8rem" },
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
            fontSize: "16px",
            color: "text.secondary",
          }}
          component="div"
        >
          <ReactMarkdown>{synopsis}</ReactMarkdown>
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
          component="div"
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            // border:'2px solid red'
          }}
        >
          <IconButton onClick={() => handleUpdate(note.id, "pin")}>
            <TiPin color={pinned ? "#1976d2" : "inherit"} />
          </IconButton>
          <IconButton onClick={() => handleUpdate(note.id, "bookmark")}>
            <FaBookmark color={bookMarked ? "#1976d2" : "inherit"} size={16} />
          </IconButton>
        </Box>

        <Button
          component={Link}
          to={`/note/${note.id}`}
          sx={{
            fontSize: "12px",
          }}
        >
          Read More
        </Button>
      </Box>
    </Paper>
  );
};

export default Note;
