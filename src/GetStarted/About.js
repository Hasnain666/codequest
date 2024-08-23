import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase_config";
import "./About.css";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "query",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", type: "query" });
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div className="about-page-container">
      <section className="about-page-info">
        <h1 className="about-page-title">About Us</h1>
        <p className="about-page-text">
          We help users discover the best learning resources from the internet.
          Our goal is to promote deserving creators who produce amazing
          educational content.
        </p>
        <h2 className="about-page-subtitle">Our Criteria</h2>
        <ul className="about-page-list">
          <li className="about-page-list-item">
            Like/Dislike ratio: Evaluates overall reception
          </li>
          <li className="about-page-list-item">
            Feedback and comments: Provides insights into content quality
          </li>
          <li className="about-page-list-item">
            Content Freshness: Ensures relevance to current industry standards
          </li>
          <li className="about-page-list-item">
            Engagement: Considers shares, reviews, and likes
          </li>
          <li className="about-page-list-item">
            Content Interactivity: Prioritizes hands-on learning experiences
          </li>
        </ul>
        <p className="about-page-text">
          We don't host resources or use thumbnails. We only provide links to
          original content.
        </p>
      </section>

      <section className="about-page-contact">
        <h2 className="about-page-subtitle">Contact Us</h2>
        <form className="about-page-form" onSubmit={handleSubmit}>
          <input
            className="about-page-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            className="about-page-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <select
            className="about-page-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="query">General Query</option>
            <option value="content_removal">Content Removal Request</option>
            <option value="content_suggestion">Content Suggestion</option>
          </select>
          <textarea
            className="about-page-textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          ></textarea>
          <button className="about-page-button" type="submit">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default About;
