import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
} from "@mui/material";
import { FaNoteSticky } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Box
      sx={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 500,
          px: 4,
          py: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <FaNoteSticky size={48} style={{ color: "#3182ce" }} />
        <Box textAlign="center">
          <Typography variant="h6" fontWeight={600}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to access your notes
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Email or Username"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaRegUser />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TbLockPassword />
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" fullWidth sx={{ mt: 1 }}>
          Sign In
        </Button>

        <Divider flexItem />

        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Don’t have an account?
          </Typography>
          <Button variant="text" size="small" component={Link} to="/register">
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
