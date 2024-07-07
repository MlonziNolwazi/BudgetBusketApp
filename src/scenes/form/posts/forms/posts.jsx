import { Box, useTheme } from "@mui/material";
import Header from "../../../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../../../theme";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "../../../../data/service/api";

const PostLists = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newRows, setNewRows] = useState([]);

  useEffect(() => {
    get({ table: "posts" }).then((data) => {
        const newRows = data.map((row) => {
            return {
                id: row.id,
                name: row.name,
                owner_name: row.owner_name,
                description: row.description,
                user_id: row.user_id,
            };
        });
        setNewRows(newRows);
        console.log("posted posts",newRows);
    });
}, []);
  return (
    <Box m="20px">
      <Header title="Posted Notifications" subtitle="Posted Notifications Page" />
        {newRows.map((row) => (
             <Accordion defaultExpanded style={{backgroundColor: colors.grey[800] }}>
             
      <Box display="flex" justifyContent="flex-end" >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.blueAccent[400]} variant="h5" mr={10}>
            {row.owner_name}
          </Typography>
        </AccordionSummary>
      </Box>
      <AccordionSummary>
        <Typography color={colors.blueAccent[400]} variant="h5">
          {row.name}
        </Typography>
      </AccordionSummary>
            <AccordionDetails>
            <Typography>
                {row.description}
            </Typography>
            </AccordionDetails>
            </Accordion>
        ))}
    
    
    </Box>
  );
};

export default PostLists;
