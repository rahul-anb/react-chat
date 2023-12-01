import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from 'axios';

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    // add a check for /prompt
    if(message.startsWith("/prompt")) {
      // trim /prompt from message
      let msg = message.substring(8).trim();
      console.log("chat msg = " + msg)
      //send to backend
      try {
        const response = await axios.post('http://127.0.0.1:5000/process', {
          prompt: msg,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = response.data;
    
        console.log(data);
    
        if (response.status === 200) {
          console.log('Prompt sent successfully');
          const processedMessage = data.processed_message;
          await addDoc(collection(db, "messages"), {
            text: processedMessage,
            name: "bot",
            avatar: "https://media.wired.com/photos/5b6df22751297c21002b4536/master/pass/HackerBot.jpg",
            createdAt: serverTimestamp(),
            uid:"bot",
          });
          alert(`Processed Message: ${processedMessage}`);
        } else {
          console.log('Prompt failed to send');
          // Handle error, if needed
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
