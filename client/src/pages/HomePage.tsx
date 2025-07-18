import { Navbar } from "../components";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          mt: "70px",
        }}
      >
        HomePage
      </Box>
    </>
  );
};

export default HomePage;
