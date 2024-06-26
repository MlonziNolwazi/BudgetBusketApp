import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { tokens } from "../../theme";
import { useTheme, IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { documentationText } from "../../data/documentationText";
// If SpeechSynthesisUtterance is part of the default export
import Stake from './Stake';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Documentation() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const speechRef = useRef(null);
  const [playAudio, setPlayAudio] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickPlayAudio = () => {
    if (speechRef.current) {
      setPlayAudio(false);
      window.speechSynthesis.cancel();
    }

    setPlayAudio(true);
    const text = documentationText.content;
    const speechSynthesis = window.speechSynthesis;

    // Then you can access SpeechSynthesisUtterance (if it's available) like so:
//const utterance = new WebSpeech.SpeechSynthesisUtterance(text);
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = speechSynthesis.getVoices();
    // Check if a female voice is available
    const femaleVoice = voices.find(voice => voice.name.includes('Nederlands') || voice.name.includes('Microsoft Zira'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    } else {
      // Fallback to a default voice if no female voice is found
      utterance.voice = voices[0];
      
    }
console.log(voices,'voices ', utterance.voice);
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.onend = (event) => {
      console.log('SpeechSynthesisUtterance.onend');
    };
    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
      // Optionally retry or fallback to another voice
    };
    speechRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const handleClickStopAudio = () => {
    if (speechRef.current) {
      setPlayAudio(false);
      window.speechSynthesis.cancel();
      speechRef.current = null;
    }
  };

  useEffect(() => {
    const loadVoices = () => {
      // Force the voices to load
      speechSynthesis.getVoices();
    };
    
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    loadVoices(); // Initial load
  
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);
  
/*
  useEffect(() => {
    document.body.style.transform = 'scale(0.5)';
    document.body.style.transformOrigin = '0 0';
    document.body.style.cssText += ' transform: scale(0.5) !important;';

    return () => {
      document.body.style.transform = '';
      document.body.style.transformOrigin = '';
      document.body.style.cssText = document.body.style.cssText.replace(' transform: scale(0.5) !important;', '');
    };
  }, []);*/

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
        maxHeight: "100%",
        margin: "5px 30px",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="App Summary" {...a11yProps(0)} />
        <Tab label="Technology Stack" {...a11yProps(1)} />
        <Tab label="Data Storage" {...a11yProps(2)} />
        <Tab label="App Design" {...a11yProps(3)} />
        <Tab label="Programming Tools" {...a11yProps(4)} />
        <Tab label="App Features" {...a11yProps(5)} />
        <Tab label="Stakeholders" {...a11yProps(6)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Typography
          variant="h4"
          color={colors.greenAccent[500]}
          marginBottom={"50px"}
        >
          Summary Overview
          {playAudio ? (
            <IconButton
              sx={{ mr: 2 }}
              aria-label="stop audio"
              onClick={handleClickStopAudio}
              title="Stop Audio"
            >
              <StopCircleIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{ mr: 2 }}
              aria-label="play audio"
              onClick={handleClickPlayAudio}
              title="Play Audio"
            >
              <VolumeUpIcon />
            </IconButton>
          )}
        </Typography>

        <main>
          Introduction:
          <Typography variant="h6">
            In today's fast-paced world, consumers are always looking for ways
            to save time and money. Grocery shopping is a routine task that
            often involves comparing prices across multiple stores to find the
            best deals.
            <br />
            However, manually checking prices at different retail stores can be
            time-consuming and cumbersome. There is a need for a solution that
            simplifies this process, allowing consumers to quickly find the
            cheapest options for their grocery lists.
          </Typography>
          <br />
          Problem Description:
          <Typography variant="h6">
            Consumers need a convenient way to compare grocery prices across
            various retail stores to ensure they get the best deals. The current
            methods of manually comparing prices are inefficient and often
            result in missed savings opportunities. An application that
            automates this process and provides users with the best purchasing
            options would greatly benefit consumers by saving them time and
            money.
          </Typography>

          Objective:
          <Typography variant="h6">
            Develop an application that allows users to upload their grocery lists and automatically 
            compares the prices of the items against registered retail stores. The application should recommend 
            the cheapest store for the entire list or highlight which stores have the best prices for individual items.
          </Typography>
        
          Key Features:
          <Typography variant="h6">
            User-Friendly Interface: An intuitive and easy-to-use interface for
            users to upload their grocery lists.
            <br />
            Data Integration: Integration with multiple retail stores' databases
            to retrieve real-time price information for grocery items.
            <br />
            Price Comparison Algorithm: An efficient algorithm that compares
            prices of the uploaded grocery list items across different stores.
            <br />
            Recommendation Engine: A recommendation system that identifies and
            suggests the cheapest store for the entire grocery list or indicates
            the best prices for individual items.
            <br />
            Cost Breakdown: A detailed cost breakdown showing price comparisons
            for each item and the total cost at each store.
            <br />
            User Notifications: Alerts and notifications to inform users about
            price changes, special discounts, and promotions at registered stores.
          </Typography>

          Benefits:
          <Typography variant="h6">
            Time Savings: Users can quickly compare prices across multiple stores
            without manually checking each store's prices.
            <br />
            Cost Savings: Users can identify the cheapest options for their
            grocery items and save money on their purchases.
            <br />
            Convenience: The application provides a hassle-free way to find the
            best deals on grocery items, saving users time and effort.
            <br />
            Smart Shopping: Users can make informed decisions about their
            purchases based on real-time price comparisons and recommendations.
          </Typography>

          Target Users:
          <Typography variant="h6">
            The application is designed for consumers who want to save time and
            money on their grocery shopping. It is ideal for busy individuals,
            families, and budget-conscious shoppers who are looking for a
            convenient way to compare prices and find the best deals on grocery
            items.
          </Typography>

          Conclusion:
          <Typography variant="h6">
            The Grocery Price Comparison Application is a valuable tool for
            consumers who want to make smart purchasing decisions and save money
            on their grocery shopping. By automating price comparisons and
            providing personalized recommendations, the application offers a
            seamless shopping experience that benefits users by saving them time
            and money.
          </Typography>
        </main>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h4" color={colors.greenAccent[500]}>
          Technology Stack

        </Typography>
        <main>
          <Typography variant="h6">
            <Stake />
            </Typography>
        </main>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h4" color={colors.greenAccent[500]}>
          Data Storage
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="h4" color={colors.greenAccent[500]}>
          App Design
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography variant="h4" color={colors.greenAccent[500]}>
          Programming Tools
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Typography variant="h4" color={colors.greenAccent[500]}>
          App Features
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Typography variant="h4" color={colors.greenAccent[500]}>
          Stakeholders
        </Typography>
      </TabPanel>
    </Box>
  );
}

export default Documentation;
