import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_config";
import "../GetStarted/Home.css";

const Home = () => {
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      const querySnapshot = await getDocs(collection(db, "resources"));
      const resourcesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResources(resourcesList);
    };

    fetchResources();
  }, []);

  const filterResources = () => {
    if (selectedCategory === "All") {
      return resources;
    }
    return resources.filter(
      (resource) => resource.category === selectedCategory
    );
  };

  const uniqueCategories = [
    "All",
    ...new Set(resources.map((resource) => resource.category).filter(Boolean)),
  ];

  return (
    <div className="home-container">
      <div className="content">
        <section className="hero">
          <h1>Let's Learn Mobile Development</h1>
          <p>
            Discover top courses and sort through filters of your choice, use
            the code editor to practice and join channels to build community!
          </p>
          <button className="cta-button">Get Started</button>
        </section>
        <div className="search-and-filter">
          <input
            type="text"
            placeholder="Search resources by topic, cost (free/paid), category, and skill level (beginner/mid/senior)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-categories">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="card-container">
          {filterResources().map((resource) => (
            <div className="resource-card" key={resource.id}>
              <h3 className="card-title">{resource.title}</h3>
              <p className="card-description">
                {resource.description.length > 100
                  ? `${resource.description.slice(0, 100)}...`
                  : resource.description}
              </p>
              <div className="card-details">
                {resource.category && (
                  <span className="category-badge">{resource.category}</span>
                )}
                {resource.difficulty && (
                  <span
                    className={`difficulty-badge ${resource.difficulty.toLowerCase()}`}
                  >
                    {resource.difficulty}
                  </span>
                )}
              </div>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-link"
              >
                Visit Link
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
