import { useState, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
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
import { useCreateNote, useSuggestNote } from "../mutations/notes";
import { useNavigate, Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { FiZap } from "react-icons/fi";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);

  const {
    mutateAsync: createNote,
    isError,
    isPending,
    error,
  } = useCreateNote();

  const { mutateAsync: suggestNote, isPending: isSuggesting } =
    useSuggestNote();

  const debouncedSuggest = useRef(
    debounce((input: { title: string; synopsis: string; content: string }) => {
      suggestNote(input, {
        onSuccess: (data) => {
          setSuggestion(data.suggestion);
        },
        onError: () => {
          setSuggestion("");
        },
      });
    }, 1000),
  ).current;

  useEffect(() => {
    if (suggestionsEnabled && title && synopsis && content.length) {
      debouncedSuggest({ title, synopsis, content });
    } else {
      setSuggestion("");
    }
  }, [title, synopsis, content, suggestionsEnabled]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Tab" || e.key === "ArrowRight") && suggestion) {
      e.preventDefault();
      if (suggestion.startsWith(content)) {
        setContent(suggestion);
      } else {
        setContent(content + suggestion);
      }
      setSuggestion("");
    }

    if (e.key === "Escape") {
      setSuggestion("");
    }
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
              boxShadow: 2,
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
          py: 3,
          mt: 1,
          maxWidth: "md",
          mx: "auto",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={1}
          sx={{ textAlign: "center", color: "text.primary" }}
        >
          Create a New Note
        </Typography>
        <Typography
          variant="subtitle2"
          mb={3}
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          Capture your thoughts, drafts, or plans
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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

          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxHeight: "300px",
              overflowY: "auto",
              "& textarea": {
                overflow: "hidden",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {(isSuggesting || suggestion) && suggestionsEnabled && (
                  <>
                    {isSuggesting ? (
                      <>
                        <CircularProgress size={12} />
                        <Typography variant="caption">
                          AI is thinking...
                        </Typography>
                      </>
                    ) : (
                      <>
                        <FiZap size={12} color="#4caf50" />
                        <Typography
                          variant="caption"
                          sx={{ color: "success.main" }}
                        >
                          AI suggestion ready
                        </Typography>
                      </>
                    )}
                  </>
                )}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  AI Suggestions
                </Typography>
                <Button
                  size="small"
                  variant={suggestionsEnabled ? "contained" : "outlined"}
                  onClick={() => {
                    setSuggestionsEnabled(!suggestionsEnabled);
                    if (!suggestionsEnabled) {
                      setSuggestion("");
                    }
                  }}
                  sx={{
                    minWidth: "60px",
                    height: "24px",
                    fontSize: "0.7rem",
                    textTransform: "none",
                    px: 1,
                  }}
                >
                  {suggestionsEnabled ? "ON" : "OFF"}
                </Button>
              </Box>
            </Box>

            <TextField
              label="Content"
              placeholder="Enter your note content in markdown syntax"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              minRows={8}
              InputProps={{
                sx: {
                  fontFamily: "monospace",
                  color: suggestion ? "rgba(0,0,0,0.87)" : "inherit",
                  position: "relative",
                  zIndex: 2,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  height: "100%",
                },
              }}
              sx={{
                backgroundColor: "transparent",
                position: "relative",
              }}
              onKeyDown={handleKeyDown}
            />

            {suggestion && suggestionsEnabled && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  px: "14px",
                  py: "16.5px",
                  mt: "56px",
                  whiteSpace: "pre-wrap",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  pointerEvents: "none",
                  zIndex: 1,
                  overflow: "hidden",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                <span style={{ color: "transparent" }}>{content}</span>
                <span
                  style={{
                    color: "#666",
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontStyle: "italic",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {suggestion.startsWith(content)
                    ? suggestion.slice(content.length)
                    : suggestion}
                </span>
              </Box>
            )}
          </Box>

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
              disabled={isPending}
              sx={{
                bgcolor: isPending ? "grey.500" : "primary.main",
                px: 4,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: 1,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: 3,
                  backgroundColor: "primary.dark",
                },
                "&:disabled": {
                  backgroundColor: "grey.400",
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

        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: "rgba(25, 118, 210, 0.04)",
            borderRadius: 2,
            border: "1px solid rgba(25, 118, 210, 0.12)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "primary.main", mb: 1, fontWeight: 600 }}
          >
            Writing Tips:
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block", lineHeight: 1.4 }}
          >
            • Use{" "}
            <kbd
              style={{
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                padding: "2px 4px",
                borderRadius: "3px",
                fontSize: "0.7rem",
              }}
            >
              Tab
            </kbd>{" "}
            or{" "}
            <kbd
              style={{
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                padding: "2px 4px",
                borderRadius: "3px",
                fontSize: "0.7rem",
              }}
            >
              →
            </kbd>{" "}
            to accept suggestions
            <br />• Press{" "}
            <kbd
              style={{
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                padding: "2px 4px",
                borderRadius: "3px",
                fontSize: "0.7rem",
              }}
            >
              Esc
            </kbd>{" "}
            to dismiss current suggestion
            <br />
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default NoteForm;
