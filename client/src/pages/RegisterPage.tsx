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
import { useState } from "react";
import { FaUserPlus, FaRegUser, FaRegCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../mutations/auth";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword,setConfirmPassword]=useState('')

  const { mutateAsync: register, isError, error, isPending } = useRegister();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      userName,
      email,
      password,
    };
    await register(data);
    navigate("/login");
  };

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
      <form action="" onSubmit={handleRegister}>
        <Paper
          elevation={3}
          sx={{
            width: 450,
            px: 4,
            py: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
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
              name="given-name"
              autoComplete="given-name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaRegUser />
                  </InputAdornment>
                ),
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="family-name"
              autoComplete="family-name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaRegUser />
                  </InputAdornment>
                ),
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Box>

          <TextField
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaRegCircleUser />
                </InputAdornment>
              ),
            }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdEmail />
                </InputAdornment>
              ),
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          {/* <TextField
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
        /> */}

          {isError && (
            <Alert severity="error" sx={{ width: "100%", mt: 0.5 }}>
              {(error as any)?.response?.data?.errors?.[0]?.message ||
                (error as any)?.response?.data?.error ||
                "Something went wrong"}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 1, bgcolor: isPending ? "grey.500" : "primary.main" }}
            // onClick={handleLogin}
          >
            {isPending ? (
              <>
                <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                Signing you up...
              </>
            ) : (
              "Sign Up"
            )}
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
      </form>
    </Box>
  );
};

export default RegisterPage;
