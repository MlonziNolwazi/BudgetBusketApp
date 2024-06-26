import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (<div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>React Js</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          
          This application was developed using React, a JavaScript library for building user interfaces. It consists of several key features that React provides, enabling the creation of efficient and dynamic single-page applications with reusable UI components.
           Here are some of the main React features that this application was built with:

            <br/><br/>

            <ol>
                <li><strong>JSX</strong> − JSX , a JavaScript syntax extension. While it is not necessary to use JSX in React development, it was highly useful for me during development for readability and ease of use.</li>
                <li><strong>Components</strong> − the application is built around the concept of components (<em>functional components to be specific</em>). Each part of the user app interface is a component then I collectively combined those components thus making the UI modular and maintainable.</li>
                <li><strong>Hooks</strong> − React hooks such as useState, useEffect, useContext, useReducer, useRef, useMemo, useCallback, useImperativeHandle, and useNavigate providing a powerful way to manage state and side effects in functional components.</li>
                <li><strong>Props</strong> − Props which are inputs to components.facilitating data flow and configuration.</li>
                <li><strong>Router</strong> − React Router to configure routing for my application. It enables navigation among different views of various pages(components) which allows changing the browser URL, and keeps the UI in sync with the URL.</li>
                <li><strong>Context</strong> − Context provides a way to pass data through the component tree without having to pass props down manually at every level, thus avoiding prop drilling.</li>
                <li><strong>Link</strong> − The Link component is used to navigate between routes in the application. It is a wrapper around the anchor tag ("<a></a>") to prevent full page refresh, preserving the state and props data of the application</li>
            </ol>

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Data Storage</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Database : Firebase Firestore
              <br/><br/>
                Firebase Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform. 
                It is a NoSQL database that stores data in JSON-like documents(<em>document-oriented</em>). Firestore is a cloud-hosted, fully-managed, serverless document-oriented database
                 that is optimized for high availability, strong consistency, and automatic scaling. Firestore is a part of the Firebase suite of products and services, 
                 which is a platform for mobile and web application development.

                    <br/><br/>

                    <strong>Key Features of Firebase Firestore:</strong>
                    <br/><br/>
                    <ol>
                        <li><strong>Real-time Updates</strong> − Firestore provides real-time data synchronization, which means that any change to the data is immediately reflected in the application without requiring a refresh.(<em>this was my biggest motivation</em>)</li>
                        <li><strong>Scalability</strong> − Firestore scales automatically with the application's usage, so there is no need to worry about managing the database infrastructure.</li>
                        <li><strong>Security</strong> − Firestore provides built-in security rules that allow developers to control access to the data at a granular level.</li>
                        <li><strong>Offline Support</strong> − Firestore provides offline support, which means that the application can continue to work even when the device is offline, and the data will be synchronized when the device comes back online.</li>
                        <li><strong>Querying</strong> − Firestore allows developers to query the data in real-time, enabling complex queries and filtering of data.</li>
                        <li><strong>Integration</strong> − Firestore integrates seamlessly with other Firebase services, such as Firebase Authentication, Firebase Cloud Functions, and Firebase Hosting.</li>
                        
                    </ol>
                    <br></br>
                    
                    <strong>Firebase Firestore Collections  For The Application:</strong>
                    <br/><br/>
                    <ol>
                        <li>Users</li>
                        <li>Customer Lists</li>
                        <li>Store Price Lists</li>
                        <li>Roles</li>
                        <li>Permissions</li>
                        <li>Chats</li>
                        <li>Feedback</li>
                    </ol>


          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Libraries</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Material-UI</strong> - used it to implement popup dialogs, icons, fields and Navbar components.
            <br/><br/>
            <strong>Nivo Charts</strong> - used it to implement the charts in the application. e.g the bar, line and pie charts on the dashboard.
            <br/><br/>
            <strong>React Router</strong> - used it to implement routing in the application.
            <br/><br/>
            <strong>Formik</strong> - used it to implement forms in the application.
            <br/><br/>
            <strong>Yup</strong> - used it to implement form validation in the application.
            <br/><br/>
            <strong>Snackbar</strong> - used it to implement the snackbar component in the application for displaying notifications. e.g success, error, warning and info messages.
            <br/><br/>
            <strong>uuid</strong> - used it to generate unique ids for new records created in the application. e.g new chat message sent.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
