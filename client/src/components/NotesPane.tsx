import { Box } from "@mui/material"
import Note from "./Note"

const NotesPane = () => {
  return (
    <Box
        sx = {{
            // border:'2px solid red',
            p:3,
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap'
        }}
    >
        <Note />
    </Box>
  )
}

export default NotesPane