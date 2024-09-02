import React, { useState } from "react";
import classes from "./AnagrammerInput.module.css";
import Button from "../../UI/Button/Button";

const AnagrammerInput = (props) => {
  const [letters, setLetters] = useState("");

  const changeHandler = (event) => {
    setLetters(event.target.value);
  };

  const anagrammiseHandler = (event) => {
    event.preventDefault();

    // Updated regex to allow letters and '?'
    const checkRegex = /^[A-Za-z?]+$/;
    const trimmedLetters = letters.trim();

    if (!trimmedLetters) {
      props.onError("No letters!", "Put some letters in to anagrammise");
      return;
    }
    if (!trimmedLetters.match(checkRegex)) {
      props.onError(
        "Invalid characters!",
        "You can only use letters and ? (for unknown letters)"
      );
      return;
    }

    // Replace any extra spaces around the '?' with a single space
    const formattedLetters = trimmedLetters
      .replace(/\s+/g, " ")
      .replace(/\s*\?\s*/g, "?");

    props.onAnagrammise(formattedLetters);
    setLetters("");
  };

  return (
    <form onSubmit={anagrammiseHandler} className={classes.form}>
      <label>Type in your letters (use ? for unknown letters)</label>
      <input
        onChange={changeHandler}
        value={letters}
        type="text"
        placeholder="e.g. a?ple"
      />
      <p className={classes.actions}>
        <Button type="submit">Let's Anagrammise!</Button>
      </p>
    </form>
  );
};

export default AnagrammerInput;
