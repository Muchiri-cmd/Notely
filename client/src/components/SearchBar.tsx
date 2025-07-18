import { Box } from "@mui/material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { FaSearch, FaTimes } from "react-icons/fa";

type Props = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
};

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Box
      sx={{
        mt: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <TextField
        sx={{
          width: "80%",
        }}
        variant="outlined"
        placeholder="Search your notes..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch style={{ color: "#9e9e9e" }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                onClick={clearSearch}
                edge="end"
                size="small"
                sx={{
                  color: "#9e9e9e",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <FaTimes />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </Box>
  );
};

export default SearchBar;
