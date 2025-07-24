import { Navbar } from "../components";
import { Box } from "@mui/material";
import { Alert, CircularProgress } from "@mui/material";
import { useGetDeletedNotes } from "../queries/notes";
import { TrashNote } from "../components";
import type NoteType from "../types/note";
import { useEffect, useState } from "react";

const Trash = () => {
  const { data: notes = [], isPending, isSuccess } = useGetDeletedNotes();
  const [localNotes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setNotes(notes);
    }
  }, [notes, isSuccess]);

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
              {localNotes.map((note: NoteType) => (
                <TrashNote key={note.id} {...note} setNotes={setNotes} />
              ))}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Trash;
