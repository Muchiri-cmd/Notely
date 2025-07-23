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
          p: 2,
          display: "flex",
          mt: "60px",
          flexDirection: "column",
          // border:'2px solid red'
        }}
      >
        {isPending ? (
          <CircularProgress />
        ) : isSuccess && notes?.length === 0 ? (
          <Alert severity="info" sx={{ gridColumn: "1 / -1" }}>
            Nothing to show here
          </Alert>
        ) : (
          <>
            <Box>
              <Alert severity="info">
                Notes in trash will be permanently deleted after 30 days
              </Alert>
            </Box>

            <Box
              sx={{
                display: "grid",
                gap: {
                  xs: 2,
                  md: 6,
                },
                mt: 2,
                justifyContent: "center",
                gridTemplateColumns: {
                  sm: "repeat(auto-fill, minmax(300px, 1fr))",
                },
              }}
            >
              {notes.map((note: Note) => (
                <TrashNote key={note.id} {...note} />
              ))}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Trash;
