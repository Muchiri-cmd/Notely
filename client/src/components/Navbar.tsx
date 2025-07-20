import {
  AppBar,
  Toolbar,
  Stack,
  Button,
  IconButton,
  Typography,
  Avatar,
  Drawer,
  Box,
} from "@mui/material";
import { FaNoteSticky } from "react-icons/fa6";
import { FaPlus, FaTimes, FaPowerOff, FaUserEdit } from "react-icons/fa";
import { Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGetUser } from "../queries/user";

const Navbar = () => {
  const { data } = useGetUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    id: "",
    avatar: "",
  });

  useEffect(() => {
    if (data) {
      setUserData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        username: data.username || "",
        email: data.email || "",
        id: data.id || "",
        avatar: data.avatar || "",
      });
    }
  }, [data]);

  const location = useLocation();

  const hideIconPaths = ["/create", "/user"];
  const shouldHideIcon = hideIconPaths.includes(location.pathname);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const initials = `${userData.firstName[0] ?? ""}${userData.lastName[0] ?? ""}`;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            color: "black",
            backgroundColor: "white",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{
              color: "#3182ce",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <FaNoteSticky />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#1a202c",
              ml: 1,
              letterSpacing: 0.5,
              textDecoration: "none",
            }}
            component={Link}
            to="/dashboard"
          >
            Notely
          </Typography>

          <Stack direction="row" spacing={4} alignItems="center">
            <Button
              component={Link}
              to="/create"
              variant="contained"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              Create Note
            </Button>
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              All Notes
            </Button>

            <IconButton onClick={toggleDrawer} sx={{ p: 0 }}>
              <Avatar
                src={
                  userData.avatar?.startsWith("http")
                    ? userData.avatar
                    : undefined
                }
                sx={{
                  bgcolor: "#3182ce",
                  color: "white",
                  fontWeight: 600,
                  width: 48,
                  height: 48,
                }}
              >
                {!userData.avatar && initials}
              </Avatar>
            </IconButton>
          </Stack>

          {!shouldHideIcon && (
            <Fab
              color="primary"
              sx={{
                display: { xs: "flex", sm: "flex", md: "none" },
                position: "fixed",
                bottom: 20,
                right: 15,
              }}
              component={Link}
              to="/create"
            >
              <FaPlus />
            </Fab>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            backgroundColor: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box sx={{ width: 300, height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton onClick={handleDrawerClose}>
              <FaTimes />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
              pb: 3,
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#3182ce",
                  color: "white",
                  width: 60,
                  height: 60,
                  fontSize: "1.5rem",
                  mb: 2,
                }}
              >
                {initials}
              </Avatar>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#2d3748",
                  mb: 0.5,
                }}
              >
                {userData.firstName}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#718096",
                  mb: 1,
                }}
              >
                {userData.email}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  backgroundColor: "#f7fafc",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  fontFamily: "monospace",
                }}
              >
                User ID: {userData.id}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                startIcon={<FaUserEdit />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: "#3182ce",
                  "&:hover": {
                    backgroundColor: "#2c5aa0",
                  },
                }}
                component={Link}
                to="/user"
              >
                Manage Account
              </Button>

              <Button
                variant="contained"
                color="error"
                startIcon={<FaPowerOff />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#c53030",
                  },
                }}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
