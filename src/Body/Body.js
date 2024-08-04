import React from "react";
import "../Body/Body.css";
import { MdSchool } from "react-icons/md";
import { HiCode, HiChat } from "react-icons/hi";

const Body = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Welcome to CodeQuest!</h1>
        <p>
          "Discover top courses, practice coding, and connect with a thriving
          community - all in one place!"
        </p>
        <button className="cta-button">Get Started</button>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <MdSchool className="feature-icon" aria-hidden="true" />
            <h3>Discover top courses</h3>
            <p>
              Discover top courses to enhance your skills and achieve your goals
              - 90% are free
            </p>
          </div>
          <div className="feature-card">
            <HiCode className="feature-icon" aria-hidden="true" />
            <h3>Code Editor</h3>
            <p>Practice coding effortlessly with our integrated code editor</p>
          </div>
          <div className="feature-card">
            <HiChat className="feature-icon" aria-hidden="true" />
            <h3>Build community</h3>
            <p>
              Connect with peers, share knowledge, and grow together in our
              vibrant community
            </p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>What We Offer</h2>
        <p>
          Discover the best courses from around the web to help you master
          computer science skills. Practice coding seamlessly with our
          integrated editor, and join a vibrant community where you can connect,
          share resources, and grow together
        </p>
      </section>

      <section className="testimonials">
        <h2>Reviews</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              "This platform will revolutionise the way i learn computer
              science. Highly recommended!"
            </p>
            <h4>John Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "The ease of use and powerful features make this a must-have
              tool."
            </p>
            <h4>Jane Smith</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
