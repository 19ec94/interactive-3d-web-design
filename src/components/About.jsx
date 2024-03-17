import React from "react";
import "./About.css"

export const About = () => {
  return (
    <div className="about-text">
      <div className="paragraph-container">
        <h1>Welcome to Anatomy 3D</h1>
        <img src="/src/Assets/logo.jpeg" width={"60%"}/>
        <p>You'll embark on an exciting journey through the inner workings of the human body!</p>
        <p>In this game, designed for curious minds like yours, you'll have the opportunity to explore and learn about various
          internal parts of the body, specifically organs and bones.</p>
        <p>Your challenge? It's all about speed and accuracy! The quicker you can correctly place these body parts, the faster you'll progress
          to the next level of the game. But don't worry, it's all in good fun!</p>
        <p>So get ready to dive into the fascinating world of anatomy, challenge yourself, and discover the wonders of the human body in a whole new way.
          Let's begin our adventure together in Anatomy 3D!</p>
      </div>
    </div>
  );
};
