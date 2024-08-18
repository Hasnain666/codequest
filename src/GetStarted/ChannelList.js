import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase_config";
import "./ChannelList.css";

function ChannelList({ onChannelSelect, currentChannel }) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "channels"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedChannels = [];
      querySnapshot.forEach((doc) => {
        fetchedChannels.push({ id: doc.id, ...doc.data() });
      });
      console.log("Fetched channels:", fetchedChannels);
      setChannels(fetchedChannels);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="channel-list">
      <h3 className="channels">Channels</h3>
      <ul>
        {channels.map((channel) => (
          <li
            key={channel.id}
            className={channel.id === currentChannel ? "active" : ""}
            onClick={() => onChannelSelect(channel.id)}
          >
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChannelList;
