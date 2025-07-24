import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FaNoteSticky } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../mutations/auth";

const LoginPage = () => {
  const [userNameOrEmail, setUserNameorEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: login, isError, error, isPending } = useLogin();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmail = userNameOrEmail.includes("@");

    const payload = {
      password,
      ...(isEmail ? { email: userNameOrEmail } : { userName: userNameOrEmail }),
    };

    const res = await login(payload);
    const token = res.data.token;
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
      }}
    >
      <form action="" onSubmit={handleLogin}>
        <Paper
          elevation={3}
          sx={{
            width: {
              md: 500,
              xs: 350,
            },
            px: 4,
            py: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
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
            name="email"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaRegUser />
                </InputAdornment>
              ),
            }}
            value={userNameOrEmail}
            onChange={(e) => setUserNameorEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="new-password"
            autoComplete="new-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TbLockPassword />
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isError && (
            <Alert severity="error" sx={{ width: "100%", mt: 0.5 }}>
              {(error as any)?.response?.data?.errors?.[0]?.message ||
                (error as any)?.response?.data?.error ||
                (error as any)?.message ||
                "Something went wrong"}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1, bgcolor: isPending ? "grey.500" : "primary.main" }}
            // onClick={handleLogin}
            type="submit"
          >
            {isPending ? (
              <>
                <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                Signing you in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <Divider flexItem />

          <Box
            textAlign="center"
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Don’t have an account?
            </Typography>
            <Button variant="text" size="small" component={Link} to="/register">
              Sign Up
            </Button>
          </Box>

          <Box textAlign="end">
            <Button variant="text" size="small">
              Forgot Password
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

export default LoginPage;
