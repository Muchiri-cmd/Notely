import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
} from "@mui/material";
import { FaUserPlus, FaRegUser, FaRegCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link } from "react-router-dom";

const RegisterPage = () => {
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
          width: 450,
          px: 4,
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <FaUserPlus size={44} style={{ color: "#3182ce" }} />

        <Box textAlign="center">
          <Typography variant="h6" fontWeight={600}>
            Create an Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign up to get started with your notes
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            label="First Name"
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
            label="Last Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaRegUser />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TextField
          fullWidth
          label="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaRegCircleUser />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdEmail />
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

        <TextField
          fullWidth
          label="Confirm Password"
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
          Sign Up
        </Button>

        <Divider flexItem />

        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Already have an account?
          </Typography>
          <Button variant="text" size="small" component={Link} to="/login">
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
