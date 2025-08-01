import { Box, Typography, CircularProgress} from "@mui/material";
import { useGetNotes } from "../queries/notes";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import { useQueryClient } from "@tanstack/react-query";
import type NoteType from "../types/note";
import BackButton from "../components/BackButton";

const BookMarks = () => {
  const queryClient = useQueryClient();

  const { data: notes, isPending, isError } = useGetNotes();

  const bookMarkedNotes = notes?.filter((note: NoteType) => note.isBookMarked);
  queryClient.invalidateQueries({ queryKey: ["fetch-notes"] });

  return (
    <>
      <Navbar />
      <BackButton />
      <Box sx={{ p: 3 }}>
        {isPending && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
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
