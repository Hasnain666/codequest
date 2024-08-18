import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase_config";
import { useAuth } from "../contexts/authContext/index";
import "../GetStarted/Forum.css";
import ChannelList from "./ChannelList";

function Forum() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChannel, setCurrentChannel] = useState("");
  const [currentChannelName, setCurrentChannelName] = useState("");
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (currentChannel) {
      const channelRef = doc(db, "channels", currentChannel);

      const unsubscribe = onSnapshot(channelRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const channelData = docSnapshot.data();
          setCurrentChannelName(channelData.name);
          setMessages(channelData.messages || []);
        }
      });

      return () => unsubscribe();
    }
  }, [currentChannel]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !currentChannel) return;

    try {
      const messageData = {
        text: newMessage,
        createdAt: new Date().toISOString(),
        userId: user.uid,
        displayName: user.email || "Anonymous",
        photoURL: user.photoURL || "",
        isRead: false,
        edited: false,
        attachments: [],
      };

      const channelRef = doc(db, "channels", currentChannel);

      // Add the message to the array
      await updateDoc(channelRef, {
        messages: arrayUnion(messageData),
      });

      setNewMessage("");
    } catch (error) {}
  };

  const handleChannelSelect = async (channelId) => {
    setCurrentChannel(channelId);

    const channelRef = doc(db, "channels", channelId);
    const channelSnap = await getDoc(channelRef);
    if (channelSnap.exists()) {
      setCurrentChannelName(channelSnap.data().name);
    }
  };

  return (
    <div className="chat-container">
      <ChannelList
        onChannelSelect={handleChannelSelect}
        currentChannel={currentChannel}
      />
      <div className="chat-room">
        <h2>{currentChannelName} Channel</h2>
        <div className="messages" ref={messagesContainerRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.userId === user.uid ? "sent" : "received"
              }`}
            >
              <span className="user">
                {msg.displayName
                  ? msg.displayName.charAt(0).toUpperCase()
                  : "U"}
              </span>
              <div>
                <p>{msg.text}</p>
                <small>{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Forum;
