
 export const HasSameLetters = (word, sortedCheatWord) => {
    const wordLetters = word.split('').sort().join('');
    return wordLetters === sortedCheatWord;
  };