import React from "react";
import "./Code.css";

//Recommend the best code editors off the internet based on what its used for
const Code = () => {
  const editors = [
    {
      name: "CodePen",
      url: "https://codepen.io/",
      description: "Great for front-end web development",
    },
    {
      name: "JSFiddle",
      url: "https://jsfiddle.net/",
      description: "Supports multiple languages and frameworks",
    },
    {
      name: "Repl.it",
      url: "https://replit.com/",
      description: "Supports many languages, good for full-stack",
    },
    {
      name: "CodeSandbox",
      url: "https://codesandbox.io/",
      description: "Excellent for React development",
    },
    {
      name: "StackBlitz",
      url: "https://stackblitz.com/",
      description: "Online IDE for web applications",
    },
  ];

  return (
    <div className="code-container">
      <h2 className="code-title">Recommended Online Code Editors</h2>
      <p className="code-subtitle">
        Practice your coding skills using these popular online platforms:
      </p>
      <ul className="editor-list">
        {editors.map((editor, index) => (
          <li key={index} className="editor-item">
            <a
              href={editor.url}
              className="editor-name"
              target="_blank"
              rel="noopener noreferrer"
            >
              {editor.name}
            </a>
            <p className="editor-description">{editor.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Code;
