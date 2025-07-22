import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import Navbar from "./Navbar";
import { useCreateNote } from "../mutations/notes";
import { useNavigate, Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");

  const {
    mutateAsync: createNote,
    isError,
    isPending,
    error,
  } = useCreateNote();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newNote = {
      title,
      synopsis,
      content,
    };

    await createNote(newNote);
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mb: 1, mt: "70px", p: 2 }}>
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
              backgroundColor: "primary.light",
              boxShadow: 2,
              borderColor: "primary.main",
            },
          }}
        >
          Back to Notes
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          px: { xs: 3, sm: 5 },
          py: { xs: 3, sm: 5 },
          mt: 1,
          maxWidth: "md",
          mx: "auto",
          borderRadius: 4,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
          sx={{ textAlign: "center", color: "text.primary" }}
        >
          Create a New Note
        </Typography>
        <Typography
          variant="subtitle2"
          mb={4}
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          Capture your thoughts, drafts, or plans
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            placeholder="Input note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Synopsis"
            variant="outlined"
            placeholder="Enter a brief synopsis/description for your note"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            required
          />

          <TextField
            label="Content"
            placeholder="Enter your note content in markdown syntax"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            minRows={8}
            required
          />

          <Stack direction="row" justifyContent="center" mt={1}>
            {isError && (
              <Alert severity="error" sx={{ width: "100%", mt: 1 }}>
                {(error as any)?.response?.data?.errors?.[0]?.message ||
                  (error as any)?.response?.data?.error ||
                  (error as any)?.message ||
                  "Something went wrong"}
              </Alert>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                bgcolor: isPending ? "grey.500" : "primary.main",
                px: 4,
                py: 1.4,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: 1,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: 3,
                  backgroundColor: "primary.dark",
                },
              }}
            >
              {isPending ? (
                <>
                  <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                  Creating Note..
                </>
              ) : (
                "Create Note"
              )}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default NoteForm;
