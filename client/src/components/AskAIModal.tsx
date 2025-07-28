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
              bgcolor: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: 1,
              p: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              AI Response:
            </Typography>
            <Typography variant="body1" whiteSpace="pre-line">
              {response}
            </Typography>
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
