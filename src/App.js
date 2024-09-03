import React from "react";
import { useState } from "react";
import AnagrammerInput from "./components/AnagrammerInput/AnagrammerInput";
import AnagramDisplay from "./components/AnagramDisplay/AnagramDisplay";
import FinalAnagram from "./components/FinalAnagram/FinalAnagram";
import { ErrorModal } from "./UI/ErrorModal/ErrorModal";
import Header from "./components/Header/Header";
import DictionaryCheck from "./components/DictionaryCheck/DictionaryCheck";
import { Helmet } from "react-helmet";
import DictionaryDisplay from "./components/DictionaryDisplay/DictionaryDisplay";
import { GetDefinitionHelper } from "./services/GetDefinitionHelper";
import { useErrorState } from "./UI/ErrorModal/useErrorState";
import { CheatDataInfiniteScroll } from "./components/CheatDataInfiniteScroll/CheatDataInfiniteScroll.js";
import { CheatLookUpHelper } from "./services/CheatLookUpHelper";
import { LocalCheatLookUpHelper } from "./services/LocalCheatlookUpHelper";
import Button from "./UI/Button/Button.js";

function App() {
  const { error, removeErrorHandler, errorHandler } = useErrorState();
  const [letters, setLetters] = useState("");
  const [anaLetters, setAnaLetters] = useState({ ul: "", ld: "" });
  const [dictionaryDisplay, setDictionaryDisplay] = useState([]);
  const [dictLook, setDictLook] = useState(false);
  const [cheatData, setCheatData] = useState(undefined);
  const [showWelcomeText, setShowWelcomeText] = useState(true);

  const anagrammiserHandler = (letters) => {
    letters = letters.toLowerCase().split("");
    setLetters(letters);
  };

  const letterSubmitHandler = (letterData) => {
    const updatedLetters = [...letters];
    for (const letter of letterData) {
      const indexToRemove = updatedLetters.indexOf(letter);
      if (indexToRemove !== -1) {
        updatedLetters.splice(indexToRemove, 1);
      }
    }

    setAnaLetters({ ul: updatedLetters, ld: letterData });
  };

  const resetAnaHandler = () => {
    setAnaLetters({ ul: "", ld: "" });
    setLetters("");
    setDictLook(false);
    setCheatData(undefined);
  };

  const resetAnaLetters = () => {
    setAnaLetters({ ul: "", ld: "" });

    setDictLook(false);
    setCheatData(undefined);
  };

  const DictLookUpHandler = async (word, errorHandler) => {
    try {
      const data = await GetDefinitionHelper(word, errorHandler);
      setDictionaryDisplay(data);
    } catch (err) {
      errorHandler(err.name, err.message);
    }
  };

  const removeDisplayHandler = () => {
    setDictionaryDisplay([]);
  };

  const removeCheatDisplayHandler = () => {
    setCheatData(undefined);
  };

  const cheatLookUpHandler = async (cheatWord, letters) => {
    let data;

    if (letters.length >= 15) {
      data = await LocalCheatLookUpHelper(cheatWord, letters, errorHandler);
    } else {
      data = await CheatLookUpHelper(cheatWord, letters, errorHandler);
    }

    setCheatData(data);
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ana-gram-miser</title>
        <link rel="canonical" href="http://anagrammiser.netlify.app" />
        <meta name="description" content="Anagram solver" />
      </Helmet>
      <Header />
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={removeErrorHandler}
        />
      )}

      {showWelcomeText && (
        <div
          style={{
            color: "orange",
            width: "50%",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p>If you have an anagram, enter all the letters to get started.</p>
          <p>
            If you are missing some letters, enter ? for each missing letter.
            Then put the letters you know in the correct positions and press the
            cheat button to see any words that fit the pattern.
          </p>
          <Button
            onClick={() => {
              setShowWelcomeText(false);
            }}
          >
            Let's Go
          </Button>
        </div>
      )}

      {!letters && !showWelcomeText && anaLetters.ul.length === 0 && (
        <AnagrammerInput
          onAnagrammise={anagrammiserHandler}
          onError={errorHandler}
        />
      )}
      {letters && anaLetters.ul.length === 0 && (
        <AnagramDisplay
          letters={letters}
          onLetterSubmit={letterSubmitHandler}
          onError={errorHandler}
        />
      )}
      {letters && (
        <FinalAnagram
          anaLetters={anaLetters}
          resetAna={resetAnaHandler}
          resetAnaLetters={resetAnaLetters}
          dictLookUp={() => setDictLook(true)}
          cheatLookUp={cheatLookUpHandler}
          letters={letters}
        />
      )}
      {dictLook && (
        <DictionaryCheck
          onDictLookUp={DictLookUpHandler}
          onError={errorHandler}
        />
      )}
      {dictionaryDisplay.length > 0 && (
        <DictionaryDisplay
          wordDisplay={dictionaryDisplay}
          onConfirm={removeDisplayHandler}
        />
      )}
      {cheatData && (
        <CheatDataInfiniteScroll
          cheatData={cheatData}
          letters={letters}
          onConfirm={removeCheatDisplayHandler}
        />
      )}
    </div>
  );
}

export default App;
