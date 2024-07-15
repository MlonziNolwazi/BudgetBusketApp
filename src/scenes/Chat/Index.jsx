import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import {useAuth} from '../../uath/AuthenticationContex';
import ChatContainer from './components/ChatContainer';

const Chat = () => {


  return (
    <div style={{backgroundColor: "#ece5dd" , maxHeight:"100%" , padding:10}} >
      <ChatContainer/>
    </div>
  );
};

export default Chat;
