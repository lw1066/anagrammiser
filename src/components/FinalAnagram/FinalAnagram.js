import React from "react";
import { useState, useEffect } from "react";
import classes from "./FinalAnagram.module.css";
import Button from "../../UI/Button/Button";

const FinalAnagram = ({
  anaLetters,
  dictLookUp,
  cheatLookUp,
  resetAna,
  resetAnaLetters,
  letters,
}) => {
  const initialAna = anaLetters.ul || [];
  const [ana, setAna] = useState([initialAna]);
  let letterData = anaLetters.ld;

  useEffect(() => {
    setAna(anaLetters.ul || []);
  }, [anaLetters.ul]);

  if (!Array.isArray(letterData)) {
    return null;
  }

  const mixTheLetters = () => {
    const shuffledLetters = [...ana];

    for (let i = shuffledLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledLetters[i], shuffledLetters[j]] = [
        shuffledLetters[j],
        shuffledLetters[i],
      ];
    }
    setAna([...shuffledLetters]);
  };

  return (
    <>
      <div className="anagram">
        <p className={classes.spaces}>
          {letterData.map((item, index) =>
            item ? (
              <span className={classes.letters} key={index}>
                {item}
              </span>
            ) : (
              <span className={classes.letters} key={index}>
                _
              </span>
            )
          )}
        </p>
        <p className={classes.mixLetters}>{ana}</p>
      </div>
      <div className={classes.anag}>
        <div className={classes.actions}>
          <Button onClick={mixTheLetters} type="button">
            Mix
          </Button>
          <Button onClick={dictLookUp} type="button">
            Dictionary
          </Button>
          <Button
            onClick={() => cheatLookUp(letterData, letters)}
            type="button"
          >
            Cheat!
          </Button>
          <Button
            className={classes.reset}
            onClick={resetAnaLetters}
            type="button"
          >
            Back
          </Button>
          <Button className={classes.reset} onClick={resetAna} type="button">
            Restart
          </Button>
        </div>
      </div>
    </>
  );
};

export default FinalAnagram;
