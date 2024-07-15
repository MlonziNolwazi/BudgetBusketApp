import React, { useEffect, useState, useRef,useCallback } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import UserProfile from '../UserProfile';
import {Box, Typography, useTheme} from '@mui/material';
import { tokens } from '../../../theme';
import {
    doc,
    setDoc,
    collection,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
    where, getDocs, writeBatch
  } from 'firebase/firestore';
  import db from "../../../uath/firebase";
import { useAuth } from '../../../uath/AuthenticationContex';
import NoMessagesIcon from '@mui/icons-material/Message'; 

let isException = false;
export default function ChatContainer() {
  
    const {loggedInUserDetails} = useAuth();
    let socketio  = socketIOClient("http://localhost:5001")
    const [chats , setChats] = useState([])
    const [users , setUsers] = useState([])
    const [user, setUser] = useState(loggedInUserDetails.firstname)
    const avatar = localStorage.getItem('avatar')
    const chatsRef = collection(db , "Messages")
    const messagesEndRef = useRef(null)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }   

   

  const [selectedUserId, setSelectedUserId] = useState(null);
 

  const handleSelectUser = (userId, exception = false) => {
    setSelectedUserId(userId);
    //isException = exception;
    if(exception === true){
      updateMessagesToRead(userId);
    }
    const updatedChats = chats.map(chat => {
      if ((chat.user_id === userId || (chat.role === 'admin' && chat.recipient_id === userId)) && !chat.read) {
        return { ...chat, read: true };
      }
      return chat;
    });
    setChats(updatedChats);
  };

    useEffect(() => {
      scrollToBottom()
    }, [chats])

    useEffect(()=> {
        socketio.on('chat', senderChats => {
            setChats(senderChats)
        })
    })

    useEffect(() => {
      if (selectedUserId && loggedInUserDetails.role === 'admin') {
        updateMessagesToRead(selectedUserId);
      }
    }, [selectedUserId]);

    const updateMessagesToRead = async (userId) => {
      try {
        const chatsRef = collection(db, 'Messages');
        const q = query(chatsRef, where('user_id', '==', userId), where('read', '==', false));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);
        
        querySnapshot.forEach((doc) => {
          batch.update(doc.ref, { read: true });
        });
  
        await batch.commit();
        console.log("Messages updated to read");
      } catch (error) {
        console.error("Error updating messages to read: ", error);
      }
    };


    useEffect(()=>{

        const q = query(chatsRef , orderBy('createdAt' , 'asc'))
      
        const unsub = onSnapshot(q, (querySnapshot) =>{
          const fireChats =[]
          querySnapshot.forEach(doc => {
            fireChats.push(doc.data())
          });
         setChats([...fireChats])
         const uniqueUsers = Array.from(
          new Set(fireChats.filter((msg) => msg.role !== 'admin').map((msg) => msg.user))
        ).map((name, index) => ({
          name,
          id: index + 1,
          user_id: fireChats.filter((msg) => msg.user === name)[0].user_id
        }));
        console.log('uniqueUsers',uniqueUsers)
        setUsers(uniqueUsers)
        })
        return ()=> {
          unsub()
        }
      
      },[])

     function addToFirrebase(chat){
        const newChat = {
            avatar,
            createdAt: serverTimestamp(),
            user,
            message: chat.message,
            role: loggedInUserDetails.role,
            user_id: loggedInUserDetails.id,
            read : false
        }
        const sendChat = loggedInUserDetails.role === 'admin' ? {...newChat ,  recipient_id: selectedUserId } : newChat;
        const chatRef = doc(chatsRef)
        setDoc(chatRef , sendChat)
        .then(()=> console.log('Chat added succesfully',sendChat))
        .catch(console.log)
     } 
   

    function sendChatToSocket(chat){
        socketio.emit("chat" , chat)
    }

    function addMessage(chat){
        const newChat = {...chat , user:loggedInUserDetails.firstname, user_id: loggedInUserDetails.id , role: loggedInUserDetails.role, avatar, read : false}
        addToFirrebase(chat)
        setChats([...chats , newChat])
        sendChatToSocket([...chats , newChat])
    }

    let setMessagesToRead = [];
    let filteredChats =[];

    
    if(loggedInUserDetails.role === 'admin'){
    
      filteredChats = chats.filter((chat) => selectedUserId && (chat.user_id === selectedUserId || (chat.role === 'admin' && chat.recipient_id === selectedUserId)))
    
      //setMessagesToRead = filteredChats.map((chat) => ({ ...chat, read: true }))
    }
    else
    {
       filteredChats = chats.filter((chat) => chat?.recipient_id === loggedInUserDetails.id || chat.user_id === loggedInUserDetails.id);  //chat.recipient_id === loggedInUserDetails.id - to get admin sent m
    }

    console.log('filteredChats',filteredChats)
    console.log('chats',chats)
    console.log('selectedUserId',selectedUserId)
    console.log('setMessagesToRead',setMessagesToRead)  
    const getUserUnreadMessages = (user) => {
      console.log("inside the badge function", user);
      //return selectedUserId === user ? 0 : chats.filter((chat) => chat.user_id === user && chat.read === false).length
      return  chats.filter((chat) => chat.user_id === user && chat.read === false).length;
    };
    
   

    function ChatsList(){
      return (
        <div style={{ height: '75vh', overflow: 'scroll', overflowX: 'hidden' }}>
          {filteredChats.length === 0 ? (
            <Box
              style={{
                display: 'block',
                flexDirection: 'row',
                textAlign: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                marginRight: '10px',
                color: colors.blueAccent[700], // Ensure colors.blueAccent[700] is defined correctly
              }}
            >
               <NoMessagesIcon style={{ fontSize: 40, marginBottom: 10 }} />
              <Typography
                variant='h6'
                style={{ textAlign: 'center', fontWeight: "normal", fontStyle: 'italic' }}
              >
                No User Selected or Chat Messages that are Available.
              </Typography>
            </Box>
          ) : (
            filteredChats.map((chat, index) => {
              if (chat.user === user) { //display your sent messages on the right
                return (
                  <ChatBoxSender
                    key={index}
                    message={chat.message}
                    avatar={chat.avatar}
                    user={'You'}
                    role={chat.role}
                  />
                );
              } else if (loggedInUserDetails.role === 'admin') { 
                if (chat.role !== 'admin') { //display user's messages on the left customer/store
                  return (
                    <ChatBoxReciever
                      key={index}
                      message={chat.message}
                      avatar={chat.avatar}
                      user={chat.user}
                      role={chat.role}
                    />
                  );
                }
              } else {
                if (chat.role === 'admin') { //display admin's messages on the left
                  return (
                    <ChatBoxReciever
                      key={index}
                      message={chat.message}
                      avatar={chat.avatar}
                      user={chat.user}
                      role={chat.role}
                    />
                  );
                }
              }

              return null; // Ensure a value is returned in all cases
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      );
    }

  return (
    <div>
         <div>
        
        
       
        { loggedInUserDetails.role === 'admin' && <div>
          
          <div id='users' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
         
            <div id='profiles' style={{flex: 1, borderRight: '1px solid #ccc'}} >
                <UserProfile users={users} onSelectUser={handleSelectUser}  unreadMsgs = {getUserUnreadMessages}/>
            </div>
            <div id='chats' style={{flex: 6}} >
                <ChatsList />
                <InputText addMessage={addMessage}  isDisabled = {!selectedUserId }/>
            </div>
        </div>




        </div>
        }

       
          { loggedInUserDetails.role !== 'admin' &&   <div>
           <ChatsList/>
           <InputText addMessage={addMessage} />
           </div> 
           }
       </div>

    <div style={{margin:10 , display:'flex', justifyContent:'center'}} >
    
        
    </div>
     
    </div>
  )
}
