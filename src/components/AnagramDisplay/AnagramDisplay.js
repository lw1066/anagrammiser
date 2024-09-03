import React from "react";
import classes from "./AnagramDisplay.module.css";
import Button from "../../UI/Button/Button";

const AnagramDisplay = ({ letters, onError, onLetterSubmit }) => {
  if (!Array.isArray(letters)) {
    return;
  }

  const letterHandler = (event) => {
    event.preventDefault();

    // Select all input elements within the form
    const inputElements = event.target.querySelectorAll('input[type="text"]');

    // Map over the input elements to extract their values
    const list = Array.from(inputElements).map((input) =>
      input.value.toLowerCase().trim()
    );

    // Validate input
    const data = letters.map((item) => item.toLowerCase());
    for (let i = 0; i < list.length; i++) {
      if (!data.includes(list[i]) && list[i] !== "") {
        onError(
          "Wrong letters!",
          "Please check the letters are in your original anagram"
        );
        return;
      }
      if (list[i] === "?") {
        onError("Only include known letters!", "Don't add unknowns - ?");
        return;
      }
    }

    onLetterSubmit(list);
  };

  return (
    <form onSubmit={letterHandler} className={classes.aform}>
      <p
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: ".25rem",
          padding: "5px",
          margin: "5px",
          color: "#ed800f",
        }}
      >
        Position any letters ({letters})
      </p>
      <div className={classes.letters}>
        {letters.map((letter, index) => (
          <input type="text" id={index} key={index} size="1" maxLength="1" />
        ))}
      </div>
      <div className={classes.actions}>
        <Button type="submit">Let's go</Button>
      </div>
    </form>
  );
};

export default AnagramDisplay;
