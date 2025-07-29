import { Box, Button } from "@mui/material";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
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
  );
};

export default BackButton;
