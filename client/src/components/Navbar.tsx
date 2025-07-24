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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { FaNoteSticky } from "react-icons/fa6";
import {
  FaPlus,
  FaTimes,
  FaPowerOff,
  FaUserEdit,
  FaTrash,
  FaBookmark,
} from "react-icons/fa";
import { Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGetUser } from "../queries/user";
import { isLoggedIn } from "./ProtectedRoute";
import { GrNotes } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { data } = useGetUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    id: "",
    avatar: "",
  });

  useEffect(() => {
    if (data) {
      setUserData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        userName: data.userName || "",
        email: data.email || "",
        id: data.id || "",
        avatar: data.avatar || "",
      });
    }
  }, [data]);

  const location = useLocation();
  const navigate = useNavigate();

  const hideIconPaths = ["/create", "/user", "/note"];
  const shouldHideIcon = hideIconPaths.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`),
  );

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleDrawerClose();
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    handleDrawerClose();
    navigate(path);
  };

  const initials = `${userData.firstName[0] ?? ""}${userData.lastName[0] ?? ""}`;

  const mobileMenuItems = [
    { text: "My Notes", icon: <GrNotes />, path: "/dashboard" },
    { text: "Create Note", icon: <FaPlus />, path: "/create" },
    { text: "Bookmarks", icon: <FaBookmark />, path: "/bookmarks" },
    // { text: "Trash", icon: <FaTrash />, path: "/trash" },
  ];

  const userMenuItems = [
    { text: "Trash", icon: <FaTrash />, path: "/trash" },
    { text: "Manage Account", icon: <FaUserEdit />, path: "/user" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: "1px solid #e2e8f0",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "transparent",
            color: "black",
            minHeight: { xs: 60, sm: 68 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Stack direction="row" alignItems="center" sx={{ mr: 3 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              component={Link}
              to="/"
              sx={{
                color: "#3182ce",
                mr: 1,
                p: 1,
              }}
            >
              <FaNoteSticky size={24} />
            </IconButton>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 600,
                color: "#1a202c",
                textDecoration: "none",
                fontSize: { xs: "18px", sm: "20px", md: "22px" },
                letterSpacing: "-0.025em",
              }}
            >
              Notely
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          {isLoggedIn() ? (
            <>
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}
              >
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#4a5568",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#f8fafc",
                      color: "#2d3748",
                    },
                  }}
                >
                  My Notes
                </Button>
                <Button
                  component={Link}
                  to="/create"
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#4a5568",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#f8fafc",
                      color: "#2d3748",
                    },
                  }}
                >
                  Create
                </Button>
                <Button
                  component={Link}
                  to="/bookmarks"
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#4a5568",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#f8fafc",
                      color: "#2d3748",
                    },
                  }}
                >
                  Bookmarks
                </Button>
                <Button
                  component={Link}
                  to="/trash"
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#4a5568",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#f8fafc",
                      color: "#2d3748",
                    },
                  }}
                >
                  Trash
                </Button>
              </Stack>

              <Stack direction="row" spacing={3} alignItems="center">
                <Box
                  sx={{
                    textAlign: "right",
                    mr: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      display: "block",
                      fontSize: "0.75rem",
                    }}
                  >
                    Welcome back,
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "#1e293b",
                      fontSize: "0.875rem",
                    }}
                  >
                    {userData.firstName || "User"}
                  </Typography>
                </Box>

                <IconButton
                  onClick={toggleDrawer}
                  sx={{
                    display: { xs: "flex", md: "none" },
                    color: "white",
                    bgcolor: "#3182ce",
                    borderRadius: 2,
                    p: 1.5,
                    "&:hover": {
                      bgcolor: "#f1f5f9",
                      color: "#334155",
                    },
                  }}
                >
                  <GiHamburgerMenu size={20} />
                </IconButton>

                <IconButton
                  onClick={toggleDrawer}
                  sx={{
                    p: 0,
                    display: { xs: "none", md: "inline-flex" },
                  }}
                >
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
                      width: 42,
                      height: 42,
                      fontSize: "0.95rem",
                      border: "2px solid #e2e8f0",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#cbd5e1",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {!userData.avatar && initials}
                  </Avatar>
                </IconButton>
              </Stack>
            </>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  color: "#475569",
                  borderColor: "#d1d5db",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 3,
                  "&:hover": {
                    bgcolor: "#f8fafc",
                    borderColor: "#9ca3af",
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  bgcolor: "#3182ce",
                  "&:hover": { bgcolor: "#2563eb" },
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                Get Started
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {!shouldHideIcon && isLoggedIn() && (
        <Fab
          color="primary"
          size="large"
          sx={{
            position: "fixed",
            bottom: { xs: 20, sm: 28 },
            right: { xs: 20, sm: 28 },
            bgcolor: "#3182ce",
            "&:hover": { bgcolor: "#2563eb" },
            zIndex: 1000,
          }}
          component={Link}
          to="/create"
        >
          <FaPlus size={20} />
        </Fab>
      )}

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            backgroundColor: "white",
            boxShadow: 6,
            border: "none",
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#1e293b",
                fontSize: "1.125rem",
              }}
            >
              <Box sx={{ display: { xs: "block", md: "none" } }}>Menu</Box>
              <Box sx={{ display: { xs: "none", md: "block" } }}>Profile</Box>
            </Typography>
            <IconButton
              onClick={handleDrawerClose}
              size="small"
              sx={{
                color: "#64748b",
                "&:hover": {
                  bgcolor: "#f8fafc",
                  color: "#334155",
                },
              }}
            >
              <FaTimes size={18} />
            </IconButton>
          </Box>

          <Box
            sx={{
              p: 1.5,
              textAlign: "center",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <Avatar
              src={
                userData.avatar?.startsWith("http")
                  ? userData.avatar
                  : undefined
              }
              sx={{
                bgcolor: "#3182ce",
                color: "white",
                width: 72,
                height: 72,
                fontSize: "1.5rem",
                mx: "auto",
                mb: 1,
                border: "3px solid #f1f5f9",
              }}
            >
              {!userData.avatar && initials}
            </Avatar>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#1e293b",
                mb: 0.5,
                fontSize: "1.125rem",
              }}
            >
              {userData.firstName} {userData.lastName}
            </Typography>

            <Typography variant="body2" sx={{ color: "#64748b", mb: 2 }}>
              {userData.email}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "#94a3b8",
                backgroundColor: "#f8fafc",
                px: 3,
                py: 1,
                borderRadius: 2,
                fontFamily: "ui-monospace, monospace",
                fontSize: "0.75rem",
                border: "1px solid #f1f5f9",
              }}
            >
              User ID: {userData.id}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, py: 2 }}>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <List sx={{ px: 2 }}>
                {mobileMenuItems.map((item, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      borderRadius: 3,
                      mb: 0.5,
                      py: 1,
                      "&:hover": {
                        bgcolor: "#f8fafc",
                        cursor: "pointer",
                      },
                    }}
                    component="button"
                  >
                    <ListItemIcon
                      sx={{
                        color: "#475569",
                        minWidth: 44,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ mx: 3, my: 2, bgcolor: "#f1f5f9" }} />
            </Box>

            <List sx={{ px: 2 }}>
              {userMenuItems.map((item, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 3,
                    mb: 1,
                    py: 1.5,
                    bgcolor: "white",
                    "&:hover": {
                      bgcolor: "#f8fafc",
                      cursor: "pointer",
                    },
                  }}
                  component="button"
                >
                  <ListItemIcon
                    sx={{
                      color: "#475569",
                      minWidth: 44,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ p: 3, borderTop: "1px solid #f1f5f9" }}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<FaPowerOff />}
              onClick={handleLogout}
              sx={{
                borderRadius: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "#dc2626",
                "&:hover": { bgcolor: "#b91c1c" },
                boxShadow: "0 1px 3px rgba(220, 38, 38, 0.2)",
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
