"use client";
import React, { useState, useEffect } from "react";
import styles from "../Home.module.css";

const App = () => {
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <p className="ml-10 text-center text-blue-600">
            Please wait while your account is being created
          </p>
        </div>
      ) : (
        <div className="main-content">
          <h1>Hello World!</h1>
          <p>
            This is a demo Project to show how to add animated loading with
            React.
          </p>
          <div className="buttons">
            <button className="btn">
              <a href="#">Read Article</a>
            </button>
            <button className="btn get-quote">Generate Quote</button>
          </div>
          <div className="quote-section">
            <blockquote className="quote">
              If you do not express your own original ideas, if you do not
              listen to your own being, you will have betrayed yourself.
            </blockquote>
            - <span className="author">Rollo May</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
