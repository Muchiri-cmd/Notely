import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi";
import ReactMarkdown from "react-markdown";

interface AskAIModalProps {
  open: boolean;
  onClose: () => void;
  onAsk: (question: string) => Promise<void>;
  loading: boolean;
  response: string | null;
}

const AskAIModal = ({
  open,
  onClose,
  onAsk,
  loading,
  response,
}: AskAIModalProps) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = async () => {
    if (question.trim() && !loading) {
      await onAsk(question.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && event.metaKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: "bold",
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Ask AI About This Note
        <Button onClick={onClose} sx={{ minWidth: "auto", p: 1 }}>
          <IoClose />
        </Button>
      </DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 3, mt: 1 }}
      >
        <TextField
          variant="outlined"
          multiline
          minRows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="e.g. What are the key ideas in this note?"
          disabled={loading}
        />

        {response && (
          <Box
            sx={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.5,
              color: "text.primary",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              borderRadius: 2,
              backgroundColor: "background.paper",
              boxShadow: 1,
              p: 3,
              "& h1": {
                fontSize: "1.8rem",
                fontWeight: 700,
                mt: 1,
                mb: 1,
              },
              "& h2": {
                fontSize: "1.5rem",
                fontWeight: 600,
                mt: 1,
                mb: 1,
              },
              "& p": {
                mb: 1,
              },
              "& code": {
                backgroundColor: "#f5f5f5",
                padding: "2px 4px",
                borderRadius: "4px",
                fontFamily: "monospace",
                fontSize: "0.85rem",
              },
              "& pre": {
                backgroundColor: "#f0f0f0",
                padding: 2,
                borderRadius: 2,
                overflowX: "auto",
              },
              "& ul": {
                pl: 1,
                mb: 1,
              },
              "& blockquote": {
                borderLeft: "4px solid #ccc",
                margin: "1rem 0",
                paddingLeft: "1rem",
                color: "text.secondary",
                fontStyle: "italic",
              },
              "& a": {
                color: "primary.main",
                textDecoration: "underline",
                "&:hover": {
                  textDecoration: "none",
                },
              },
            }}
          >
            <ReactMarkdown>{response}</ReactMarkdown>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !question.trim()}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <HiSparkles />
            )
          }
        >
          {loading ? "Thinking..." : "Ask AI"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AskAIModal;
