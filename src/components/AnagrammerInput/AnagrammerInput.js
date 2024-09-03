import React, { useState } from "react";
import classes from "./AnagrammerInput.module.css";
import Button from "../../UI/Button/Button";

const AnagrammerInput = ({ onError, onAnagrammise }) => {
  const [letters, setLetters] = useState("");

  const changeHandler = (event) => {
    setLetters(event.target.value);
  };

  const anagrammiseHandler = (event) => {
    event.preventDefault();

    const checkRegex = /^[A-Za-z?]+$/;
    const trimmedLetters = letters.trim();

    if (!trimmedLetters) {
      onError("No letters!", "Put some letters in to anagrammise");
      return;
    }
    if (!trimmedLetters.match(checkRegex)) {
      onError(
        "Invalid characters!",
        "You can only use letters and ? (for unknown letters)"
      );
      return;
    }

    const formattedLetters = trimmedLetters
      .replace(/\s+/g, " ")
      .replace(/\s*\?\s*/g, "?");

    onAnagrammise(formattedLetters);
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
