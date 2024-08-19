import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase_config";
import "../GetStarted/Home.css";
import discoverImage from "./exploring.jpg";
import codeImage from "./code.jpg";
import collaborateImage from "./collaborate.jpg";

const Home = () => {
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedResources, setDisplayedResources] = useState(4); // Start with 4 resources
  const resourcesPerPage = 4; // Number of resources to load on scroll
  const [currentSlide, setCurrentSlide] = useState(0); //slides

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
  const slides = [
    {
      image: discoverImage,
      caption: "Discover top Android development resources.",
    },
    { image: codeImage, caption: "Practice coding in our integrated editor." },
    {
      image: collaborateImage,
      caption: "Collaborate and share in the community forum.",
    },
  ];
  const handleLike = async (resourceId) => {
    const resourceRef = doc(db, "resources", resourceId);
    await updateDoc(resourceRef, {
      likes: increment(1),
    });
  };

  const handleDislike = async (resourceId) => {
    const resourceRef = doc(db, "resources", resourceId);
    await updateDoc(resourceRef, {
      dislikes: increment(1),
    });
  };

  // Load more resources when the user scrolls to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (scrollPosition) {
        setDisplayedResources((prev) =>
          Math.min(prev + resourcesPerPage, resources.length)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [resources]);

  // Search and filter resources
  const filterResources = () => {
    return resources
      .slice(0, displayedResources) // Only filter the displayed resources
      .filter((resource) => {
        const matchesCategory =
          selectedCategory === "All" || resource.category === selectedCategory;
        const matchesSearch = searchTerm
          .toLowerCase()
          .split(" ")
          .every(
            (term) =>
              resource.title.toLowerCase().includes(term) ||
              resource.description.toLowerCase().includes(term) ||
              resource.category.toLowerCase().includes(term) ||
              (resource.cost && resource.cost.toLowerCase().includes(term)) ||
              (resource.difficulty &&
                resource.difficulty.toLowerCase().includes(term))
          );
        return matchesCategory && matchesSearch;
      });
  };

  const uniqueCategories = [
    "All",
    ...new Set(resources.map((resource) => resource.category).filter(Boolean)),
  ];

  return (
    <div className="home-container">
      <div className="content">
        <section className="hero">
          <div className="slider-container">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? "active" : ""}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slide-content">
                  <p className="slide-caption">{slide.caption}</p>
                </div>
              </div>
            ))}
            <div className="slider-nav">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`slider-nav-btn ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))}
            </div>
          </div>
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
                {resource.description && resource.description.length > 100
                  ? `${resource.description.slice(0, 100)}...`
                  : resource.description || "No description available"}
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
              <div className="card-actions">
                <button
                  onClick={() => handleLike(resource.id)}
                  className="like-button"
                >
                  👍 {resource.likes || 0}
                </button>
                <button
                  onClick={() => handleDislike(resource.id)}
                  className="dislike-button"
                >
                  👎 {resource.dislikes || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
