import { Navbar } from "../components";
import { Box } from "@mui/material";
import { Alert, CircularProgress } from "@mui/material";
import { useGetDeletedNotes } from "../queries/notes";
import { TrashNote } from "../components";
import type Note from "../types/note";

const Trash = () => {
  const { data: notes = [], isPending, isSuccess } = useGetDeletedNotes();
  return (
    <>
      <Navbar />
      <Box
        sx={{
          mt: "70px",
          p: 2,
          display: "grid",
          gap: 1.2,
          justifyContent: "center",
          gridTemplateColumns: { sm: "repeat(auto-fill, minmax(300px, 1fr))" },
        }}
      >
        {isPending ? (
          <CircularProgress />
        ) : isSuccess && notes?.length === 0 ? (
          <Alert severity="info" sx={{ gridColumn: "1 / -1" }}>
            You don’t have any deleted notes yet.
          </Alert>
        ) : (
          notes.map((note: Note) => <TrashNote key={note.id} {...note} />)
        )}
      </Box>
    </>
  );
};

export default Trash;
