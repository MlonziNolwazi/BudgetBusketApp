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
import React from "react";

const PostLists = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newRows, setNewRows] = useState([]);

  const filterByOwnerName = (items) => {
    return items.reduce((acc, item) => {
      const { owner_name } = item;
      if (!acc[owner_name]) {
        acc[owner_name] = [];
      }
      acc[owner_name].push(item);
      return acc;
    }, {});
  };

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
       
        console.log("posted posts",newRows);
       
          
          const groupedByOwner = filterByOwnerName(newRows);
          setNewRows(groupedByOwner);
          console.log(groupedByOwner);
    });
}, []);
return (
    <Box m="20px">
      <Header title="Posts" subtitle="Posted Notifications Page" />
      {Object.keys(newRows).map(owner => (
        <Accordion key={owner} defaultExpanded style={{ backgroundColor: colors.grey[800] }}>
          <Box display="flex" justifyContent="flex-end">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.blueAccent[400]} variant="h5" mr={10}>
                {owner}
              </Typography>
            </AccordionSummary>
          </Box>
          {newRows[owner].map((row, index) => (
            <React.Fragment key={index}>
              <AccordionSummary>
                <Typography color={colors.blueAccent[400]} variant="h6">
                  {row.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {row.description}
                </Typography>
              </AccordionDetails>
            </React.Fragment>
          ))}
        </Accordion>
      ))}
    </Box>
  );
};

export default PostLists;
