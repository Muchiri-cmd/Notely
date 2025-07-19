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
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useGetNote } from "../queries/notes";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

const NotePage = () => {
  const { id } = useParams();
  const { data: note, isPending, isError } = useGetNote(id!);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setSynopsis(note.synopsis);
      setContent(note.content);
    }
  }, [note]);

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
                backgroundColor: "primary.light",
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
            <Button
              variant="contained"
              sx={{
                mt: 2,
              }}
              fullWidth
            >
              Update
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
                  gap: 2,
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
                      fontSize: { xs: "2rem", sm: "2.5rem" },
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
                  >
                    {note.synopsis}
                  </Typography>

                  <Divider
                    sx={{
                      my: 2.5,
                    }}
                  ></Divider>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {note.content}
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
                        sx={{ color: "text.secondary", mr: 1 }}
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
                          // handleDelete(note.id)
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
      </Container>
    </>
  );
};

export default NotePage;
