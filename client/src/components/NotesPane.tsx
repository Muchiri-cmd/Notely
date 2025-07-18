import Note from "./Note";
import { useGetNotes } from "../queries/notes";
import { CircularProgress, Alert, Box, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { CiGrid2H, CiGrid2V } from "react-icons/ci";
import SearchBar from "./SearchBar";

const NotesPane = () => {
  const { data, isPending, isError } = useGetNotes();
  const [columns, setColumns] = useState<1 | 2>(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = data?.filter((note: any) => {
    const query = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.synopsis?.toLowerCase().includes(query) ||
      note.content?.toLowerCase().includes(query)
    );
  });

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
          gap: 1.2,
          justifyContent: "center",
          gridTemplateColumns: {
            xs: columns === 1 ? "1fr" : "repeat(2, 1fr)",
            sm: "repeat(auto-fill, minmax(300px, 1fr))",
          },
        }}
      >
        {filteredNotes?.length ? (
          filteredNotes.map((note: any) => <Note key={note.id} {...note} />)
        ) : (
          <Alert severity="info" sx={{ gridColumn: "1 / -1" }}>
            No notes match your search.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default NotesPane;
