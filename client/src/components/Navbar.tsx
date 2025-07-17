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
import { useState } from "react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <AppBar position="static">
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
            }}
            // component={Link}
            // to="/"
          >
            Notely
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              sx={{
                color: "#1a202c",
                display: {
                  md: "block",
                  sm: "none",
                  xs: "none",
                },
              }}
            >
              <FaPlus size={24} />
            </IconButton>

            <Button
              color="inherit"
              href="null"
              sx={{
                color: "#1a202c",
                display: {
                  md: "block",
                  sm: "none",
                  xs: "none",
                },
              }}
            >
              <Avatar />
            </Button>
            <Button color="inherit" onClick={toggleDrawer}>
              <Avatar
                sx={{ bgcolor: "#3182ce", color: "white", fontWeight: 600 }}
              >
                D
              </Avatar>
            </Button>
          </Stack>

          <Fab
            color="primary"
            sx={{
              display: { xs: "flex", sm: "flex", md: "none" },
              position: "fixed",
              bottom: 40,
              right: 15,
            }}
          >
            <FaPlus />
          </Fab>
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
                D
              </Avatar>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#2d3748",
                  mb: 0.5,
                }}
              >
                Davis Muchiri
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#718096",
                  mb: 1,
                }}
              >
                davismuchiri21@gmail.com
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
                User ID: 0917597057219
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
