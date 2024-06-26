

import { Box, Typography, useTheme } from "@mui/material";
import { mockMesseges } from "../../../../data/mockData";
import { tokens } from "../../../../theme";

function RecentMessages() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Recent Messeges
          </Typography>
        </Box>
        {mockMesseges.map((messeges, i) => (
          <Box
            key={`${messeges.txId}-${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                {messeges.txId}
              </Typography>
              <Typography color={colors.grey[100]}>
                {messeges.user}
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>{messeges.date}</Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              ${messeges.cost}
            </Box>
          </Box>
        ))}
      </Box>
    );
    }
    
export default RecentMessages;