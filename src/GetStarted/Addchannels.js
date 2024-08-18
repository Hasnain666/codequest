import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase_config";

async function addChannels() {
  const channels = [
    { name: "General" },
    { name: "Frontend Android" },
    { name: "Backend Developers" },
    { name: "Job Discussion" },
    { name: "Tech News" },
    { name: "Project Collaboration" },
  ];

  for (const channel of channels) {
    try {
      await addDoc(collection(db, "channels"), channel);
      console.log(`Added channel: ${channel.name}`);
    } catch (error) {
      console.error(`Error adding channel ${channel.name}:`, error);
    }
  }
}

export default addChannels;
