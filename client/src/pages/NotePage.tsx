import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Button,
  Tooltip,
  IconButton,
  TextField,
  Modal,
} from "@mui/material";
import { IoIosCloseCircle } from "react-icons/io";
import Navbar from "../components/Navbar";
import { useGetNote } from "../queries/notes";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useEffect, useState } from "react";
import {
  useAskAI,
  useGetSummary,
  useSoftDeleteNote,
  useUpdateNote,
} from "../mutations/notes";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import AskAIModal from "../components/AskAIModal";

const NotePage = () => {
  const { id } = useParams();

  const { data: note, isPending, isError } = useGetNote(id!);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");

  const [open, setOpen] = useState(false);
  const [summaryText, setSummaryText] = useState("");

  const [askModalOpen, setAskModalOpen] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");

  const { mutateAsync: deleteNote } = useSoftDeleteNote();

  const {
    mutateAsync: updateNote,
    isError: updateError,
    isPending: updatePending,
    error,
  } = useUpdateNote();

  const { mutateAsync: summarize, isPending: PendingSummary } = useGetSummary();
  const { mutateAsync: askAI, isPending: isAsking } = useAskAI();

  const navigate = useNavigate();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setSynopsis(note.synopsis);
      setContent(note.content);
    }
  }, [note]);

  const handleDelete = async (id: string) => {
    const note = {
      title,
      synopsis,
      content,
    };
    await deleteNote({ id, note });
    navigate("/dashboard");
  };

  const handleUpdate = async (e: React.MouseEvent) => {
    e.preventDefault();
    const note = {
      title,
      synopsis,
      content,
      isPinned: false,
      isBookMarked: false,
    };

    await updateNote({ id: id!, data: note });
    navigate("/dashboard");
  };

  const handleSummarize = async (e: React.MouseEvent) => {
    // console.log('summarizing')
    e.preventDefault();
    try {
      const response = await summarize({ content });
      setSummaryText(response.summary);
      setOpen(true);
    } catch (error) {
      console.error("Failed to summarize", error);
    }
  };

  const handleAskAI = async (question: string) => {
    try {
      // console.log("asking AI");
      const response = await askAI({ content, question });
      setAiAnswer(response.answer);
    } catch (err) {
      setAiAnswer("Sorry, something went wrong.");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 10, px: { xs: 2, sm: 4 } }}>
        {isPending && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error" sx={{ mt: 4 }}>
            Failed to load note.
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
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

        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Content"
              multiline
              minRows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Box>
              {updateError && (
                <Alert severity="error" sx={{ width: "100%", mt: 1 }}>
                  {(error as any)?.response?.data?.errors?.[0]?.message ||
                    (error as any)?.response?.data?.error ||
                    (error as any)?.message ||
                    "Something went wrong"}
                </Alert>
              )}
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: isPending ? "grey.500" : "primary.main",
              }}
              fullWidth
              onClick={handleUpdate}
            >
              {updatePending ? (
                <>
                  <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                  Updating Note.
                </>
              ) : (
                "Update Note"
              )}
            </Button>
          </>
        ) : (
          <>
            {note && (
              <Box
                sx={{
                  //   minHeight: "650px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  // border:'2px solid red',
                  bgcolor: "background.paper",
                  p: { xs: 2, sm: 3 },
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "2rem" },
                      fontWeight: 700,
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {note.title}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{ color: "text.secondary", mb: 2 }}
                    component="div"
                  >
                    <ReactMarkdown>{note.synopsis}</ReactMarkdown>
                  </Typography>

                  <Divider
                    sx={{
                      my: 2.5,
                    }}
                  ></Divider>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => setAskModalOpen(true)}
                      sx={{
                        color: "#4b0082",
                        borderColor: "#4b0082",
                        backgroundColor: "#f0e6ff",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "8px 24px 8px 24px",
                        "&:hover": {
                          backgroundColor: "#e0d2ff",
                        },
                        py: 1,
                        mb: 2,
                      }}
                    >
                      Ask AI
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#1a4d2e",
                        borderColor: "#1a4d2e",
                        backgroundColor: "#e6f4ea",
                        borderRadius: "8px 24px 8px 24px",
                        fontWeight: 600,
                        py: 1,
                        mb: 2,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#c3ebd4",
                        },
                      }}
                      onClick={handleSummarize}
                      // disabled={true}
                    >
                      {PendingSummary ? (
                        <>
                          <CircularProgress size={18} />
                          <Typography
                            sx={{
                              ml: 1,
                            }}
                          >
                            Summarizing...
                          </Typography>
                        </>
                      ) : (
                        "AI - Summarize"
                      )}
                    </Button>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1,
                      whiteSpace: "pre-line",
                    }}
                    component="div"
                  >
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "text.disabled" }}>
                    Last edited {new Date(note.lastUpdated).toLocaleString()}
                  </Typography>

                  <Box>
                    <Tooltip title="Edit Note">
                      <IconButton
                        size="small"
                        sx={{ color: "#3182ce", mr: 1 }}
                        onClick={() => {
                          // handleEdit(note.id)
                          setIsEditing(true);
                        }}
                      >
                        <FaEdit size={24} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Note">
                      <IconButton
                        size="small"
                        sx={{ color: "error.main" }}
                        onClick={() => {
                          handleDelete(note.id);
                        }}
                      >
                        <MdDelete size={24} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            )}
          </>
        )}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Summary
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <IoIosCloseCircle color="#d32f2f" />
              </IconButton>
            </Box>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {summaryText}
            </Typography>
          </Box>
        </Modal>
        <AskAIModal
          open={askModalOpen}
          onClose={() => setAskModalOpen(false)}
          onAsk={handleAskAI}
          loading={isAsking}
          response={aiAnswer}
        />
      </Container>
    </>
  );
};

export default NotePage;
