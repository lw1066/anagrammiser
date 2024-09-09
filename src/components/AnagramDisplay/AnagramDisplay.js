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
      if (list[i] === "?") {
        onError("Only include known letters!", "Don't add unknowns - ?");
        return;
      }

      const index = data.indexOf(list[i]);
      if (index === -1 && list[i] !== "") {
        onError(
          "Wrong letters!",
          "Please check the letters are in your original anagram"
        );
        return;
      }

      if (index !== -1) {
        data.splice(index, 1); // Remove the letter to prevent further matches
      }
    }

    onLetterSubmit(list);
  };

  // Calculate flex-basis based on the number of letters
  const inputWidthPercentage = `${100 / letters.length - 3}%`;

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
          <input
            type="text"
            id={index}
            key={index}
            size="1"
            maxLength="1"
            style={{
              flexBasis: inputWidthPercentage,
              margin: "2px",
              textAlign: "center",
            }}
          />
        ))}
      </div>
      <div className={classes.actions}>
        <Button type="submit">Let's go</Button>
      </div>
    </form>
  );
};

export default AnagramDisplay;
