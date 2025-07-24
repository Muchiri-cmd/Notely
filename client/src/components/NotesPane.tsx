import Note from "./Note";
import { useGetNotes } from "../queries/notes";
import {
  CircularProgress,
  Alert,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { CiGrid2H, CiGrid2V } from "react-icons/ci";
import SearchBar from "./SearchBar";
import type NoteType from "../types/note";

const NotesPane = () => {
  const { data, isPending, isError } = useGetNotes();
  const [columns, setColumns] = useState<1 | 2>(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = data
    ?.filter((note: any) => {
      const query = searchTerm.toLowerCase();
      return (
        note.title.toLowerCase().includes(query) ||
        note.synopsis?.toLowerCase().includes(query) ||
        note.content?.toLowerCase().includes(query)
      );
    })
    .reverse();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading notes
      </Alert>
    );
  }

  const pinnedNotes = filteredNotes?.filter((note: NoteType) => note.isPinned);
  const otherNotes = filteredNotes?.filter((note: NoteType) => !note.isPinned);

  return (
    <Box>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Box
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
          justifyContent: "flex-end",
          gap: 1,
          mr: 2,
        }}
      >
        <IconButton
          onClick={() => setColumns(1)}
          color={columns === 1 ? "primary" : "default"}
        >
          <CiGrid2H size={30} />
        </IconButton>
        <IconButton
          onClick={() => setColumns(2)}
          color={columns === 2 ? "primary" : "default"}
        >
          <CiGrid2V size={30} />
        </IconButton>
      </Box>
      <Box
        sx={{
          p: 2,
          display: "grid",
          gap: 1,
          justifyContent: "center",
          gridTemplateColumns: {
            xs: columns === 1 ? "1fr" : "repeat(2, 1fr)",
            sm: "repeat(auto-fill, minmax(300px, 1fr))",
          },
        }}
      >
        {filteredNotes?.length ? (
          <>
            {pinnedNotes.length > 0 && (
              <>
                <Typography
                  variant="h6"
                  sx={{ gridColumn: "1 / -1", mb: 1, fontWeight: 600 }}
                >
                  Pinned
                </Typography>
                {pinnedNotes.map((note: NoteType) => (
                  <Note key={note.id} {...note} />
                ))}
              </>
            )}

            {otherNotes.length > 0 && (
              <>
                {pinnedNotes.length > 0 && otherNotes.length > 0 && (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        gridColumn: "1 / -1",
                        mt: 2,
                        mb: 1,
                        fontWeight: 600,
                      }}
                    >
                      Others
                    </Typography>
                  </>
                )}
                {otherNotes.map((note: NoteType) => (
                  <Note key={note.id} {...note} />
                ))}
              </>
            )}
          </>
        ) : searchTerm ? (
          <Alert severity="info" sx={{ gridColumn: "1 / -1" }}>
            No notes match your search.
          </Alert>
        ) : (
          <Alert severity="info" sx={{ gridColumn: "1 / -1" }}>
            You don’t have any notes yet. Add notes.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default NotesPane;
