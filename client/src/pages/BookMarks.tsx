import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useGetNotes } from "../queries/notes";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import { useQueryClient } from "@tanstack/react-query";
import type NoteType from "../types/note";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const BookMarks = () => {
  const queryClient = useQueryClient();

  const { data: notes, isPending, isError } = useGetNotes();

  const bookMarkedNotes = notes?.filter((note: NoteType) => note.isBookMarked);
  queryClient.invalidateQueries({ queryKey: ["fetch-notes"] });

  return (
    <>
      <Navbar />
      <Box sx={{ mb: 1, mt: "75px", p: 2 }}>
        <Button
          component={Link}
          to="/dashboard"
          startIcon={<IoArrowBackOutline />}
          variant="outlined"
          sx={{
            borderRadius: "5px",
            textTransform: "none",
            fontWeight: 600,
            p: 2,

            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: 2,
              borderColor: "primary.main",
            },
          }}
        >
          Back to Notes
        </Button>
      </Box>
      <Box sx={{ p: 3 }}>
        {isPending && <CircularProgress />}
        {isError && (
          <Typography color="error">
            Something went wrong while fetching notes.
          </Typography>
        )}
        {!isPending && bookMarkedNotes?.length === 0 && (
          <Box textAlign="center" mt={5}>
            <Typography variant="h6">No bookmarked notes yet.</Typography>
          </Box>
        )}
        {bookMarkedNotes?.map((note: NoteType) => (
          <Note key={note.id} {...note} />
        ))}
      </Box>
    </>
  );
};

export default BookMarks;
