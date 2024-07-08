import React, { useState } from 'react';
import styles from './ChartPage.module.css';

const Index = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, How are you?', type: 'left' },
    { text: "I'm good, thanks for asking! How about you?", type: 'right' }
  ]);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    setMessages([...messages, { text: message, type: 'right' }]);
    setMessage('');
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.imgAvatar}>
            <img src="../../assets/profile.png" alt="avatar" />
        </div>
        <div className={styles.textChat}>Chat</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.messageBox} ${styles[msg.type]}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.messageInput}>
          <form onSubmit={handleSendMessage} className='formMessage' style={{width:"100%", display: "flex"}}>
            <textarea
              placeholder="Type your message here"
              className={styles.messageSend}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className={styles.buttonSend}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
