import { Navbar } from "../components";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Grid,
  Avatar,
  Container,
} from "@mui/material";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  FaCloudUploadAlt,
  FaSearch,
  FaLaptop,
  FaRegEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: <FaCloudUploadAlt size={24} color="white" />,
      title: "Cloud Sync",
      description:
        "Your notes are safely backed up and synced across all devices with enterprise-grade security.",
    },
    {
      icon: <FaSearch size={24} color="white" />,
      title: "Smart Search",
      description:
        "Quickly find notes using tags, keywords or intelligent content filtering.",
    },
    {
      icon: <FaLaptop size={24} color="white" />,
      title: "Cross-Platform",
      description:
        "Seamlessly access your notes anywhere mobile or web with real-time sync.",
    },
    {
      icon: <FaRegEdit size={24} color="white" />,
      title: "Manage Notes",
      description:
        "Powerful organization tools with seamless updating & deletion of notes",
    },
  ];

  const stats = [
    { number: "50K+", label: "Users" },
    { number: "1M+", label: "Notes" },
    { number: "24/7", label: "Customer Support" },
    { number: "99.999%", label: "Uptime" },
  ];

  return (
    <>
      <Navbar />

      <Box
        sx={{
          mt: "70px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              minHeight: "80vh",
              display: "flex",
              p: 4,
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
                animation: "fadeInUp 1s ease-out",
                "@keyframes fadeInUp": {
                  from: {
                    opacity: 0,
                    transform: "translateY(30px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                The Future of
                <br />
                Digital Notes
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  mb: 3,
                  lineHeight: 1.6,
                  maxWidth: "500px",
                  color: "text.secondary",
                }}
              >
                Organize and streamline your thoughts, ideas and knowledge
                management with seamless digital note-taking, tracking and
                updating.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: "15px",
                    fontWeight: 600,
                  }}
                  component={Link}
                  to="/register"
                >
                  Join Us Today
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    px: 3,
                    border: "2px solid lightblue",
                    borderRadius: "15px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                justifyContent: "center",
                animation: "fadeInRight 1s ease-out 0.3s both",
                "@keyframes fadeInRight": {
                  from: {
                    opacity: 0,
                    transform: "translateX(30px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: { xs: "50vh", md: "65vh" },
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "20px",
                  p: 3,
                  boxShadow: 6,
                  transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform:
                      "perspective(1000px) rotateY(-2deg) rotateX(2deg)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Today's Notes
                  </Typography>
                  <HiDotsHorizontal size={32} style={{ color: "#4c63d2" }} />
                </Box>
                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  {[
                    {
                      title: "Todo",
                      preview:
                        "Refactor code, update documentation and complete milestone...",
                    },
                    {
                      title: "Annual Meeting",
                      preview:
                        "4Bs of a good morning - Benediction,Body,Bed,Bath...",
                    },
                    {
                      title: "Shopping List",
                      preview:
                        "Sneakers,Backlit Keyboard, Phone Holder,Pods...",
                    },
                  ].map((note, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        borderRadius: "10px",
                        p: 2,
                        borderLeft: "4px solid #4c63d2",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "1rem", md: "1.125rem" },
                        }}
                      >
                        {note.title}
                      </Typography>
                      <Typography variant="body2">{note.preview}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center">
            {stats.map((stat, idx) => (
              <Grid size={{ xs: 6, sm: 3 }} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    background: "transparent",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "2rem", md: "3rem" },
                      fontWeight: 600,
                      mb: 1,
                      color: "black",
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      opacity: 0.9,
                      fontSize: { xs: "1rem", md: "1.1rem" },
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: 8,
          background: "white",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mb: 6,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Built for The Digital Era
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: "600px",
              }}
            >
              Powerful note-taking app with features designed to enhance
              productivity and streamline your thoughts.
            </Typography>
          </Box>

          <Grid container spacing={8}>
            {features.map((feature, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: "20px",
                    border: "1px solid lightgray",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: 2,
                      cursor: "pointer",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "linear-gradient(135deg, #4c63d2, #5a67d8)",
                      background: "linear-gradient(135deg, #4c63d2, #5a67d8)",
                      mx: "auto",
                      mb: 2,
                      width: 80,
                      height: 80,
                      fontSize: "2rem",
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1.5,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Ready to Transform Your Thoughts Into Organized Format?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "text.secondary",
              }}
            >
              Join thousands of forward-thinking users that trust Notely for
              their notes management needs.
            </Typography>
            <Button
              variant="contained"
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: "15px",
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
              component={Link}
              to="/register"
            >
              Join Us Today
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
