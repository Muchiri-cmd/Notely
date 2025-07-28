import { Navbar } from "../components";
import { Box, Button } from "@mui/material";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { useGetDeletedNotes } from "../queries/notes";
import { TrashNote } from "../components";
import type NoteType from "../types/note";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

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
      <Box
        sx={{
          p: 2,
          display: "flex",
          // mt: "60px",
          flexDirection: "column",
          // border:'2px solid red'
        }}
      >
        {isPending ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : isSuccess && notes?.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <Typography variant="h6">Nothing to show here.</Typography>
          </Box>
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
