import { Paper, Typography, Tooltip, IconButton, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { MdDelete, MdRestorePage } from "react-icons/md";
import type Note from "../types/note";
import { useDeleteNote, useRestoreNote } from "../mutations/notes";
import { useNavigate } from "react-router-dom";
import type React from "react";

type TrashNoteProps = Note & {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const TrashNote = ({ setNotes, ...note }: TrashNoteProps) => {
  const { mutateAsync: deleteNote } = useDeleteNote();
  const { mutateAsync: restoreNote } = useRestoreNote();

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleRestore = async (id: string) => {
    console.log("Restoring Note", id);
    await restoreNote({ id, note });
    navigate("/dashboard");
  };
  return (
    <Paper
      sx={{
        minWidth: "350px",
        p: 3,
        boxShadow: 2,
        transition: "all 0.3s ease",
        textDecoration: "none",
        "&:hover": {
          transform: "translateY(-4px)",
          cursor: "pointer",
        },
      }}
      elevation={2}
    >
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          fontWeight: 800,
          lineHeight: 1.2,
          mb: 2,
          letterSpacing: "-0.02em",
        }}
      >
        {note.title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
        }}
        component="div"
      >
        <ReactMarkdown>{note.synopsis}</ReactMarkdown>
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
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </Typography>
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Tooltip title="Restore Note">
          <IconButton
            size="small"
            sx={{ color: "text.secondary", mr: 1 }}
            onClick={() => {
              //restore note
              handleRestore(note.id);
            }}
          >
            <MdRestorePage size={28} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Note Permanently">
          <IconButton
            size="small"
            sx={{ color: "error.main" }}
            onClick={() => {
              handleDelete(note.id);
            }}
          >
            <MdDelete size={28} />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default TrashNote;
