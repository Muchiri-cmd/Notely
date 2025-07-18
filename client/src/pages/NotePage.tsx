import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useGetNote } from "../queries/notes";

const NotePage = () => {
  const { id } = useParams();
  const { data: note, isPending, isError } = useGetNote(id!);

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

        {note && (
          <Box
            sx={{
              minHeight: "650px",
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

            <Typography
              variant="caption"
              sx={{ color: "text.disabled", textAlign: "right" }}
            >
              Last edited {new Date(note.lastUpdated).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default NotePage;
