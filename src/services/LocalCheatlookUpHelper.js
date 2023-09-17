import localDictionaryData from '../assets/wordsByLength.json';
import { GetDefinitionHelper } from './GetDefinitionHelper';

// Utility function to check if two words have the same letters
const HasSameLetters = (word, sortedCheatWord) => {
  const wordLetters = word.toLowerCase().split('').sort().join('');
  const sortedLetters = sortedCheatWord.toLowerCase();
  return wordLetters === sortedLetters;
};

export const LocalCheatLookUpHelper = async (cheatWord, letters, errorHandler) => {
  const sortedCheatWord = letters.sort().join('');
  const pattern = cheatWord.map((letter) => (letter === '' ? '.' : letter));
  const regexPattern = pattern.join('');
  const regex = new RegExp(`^${regexPattern}$`, 'i');
  const wordLength = letters.length;
  const wordArray = localDictionaryData[wordLength] || [];
  const cheatData = [];

  for (const word of wordArray) {
    if (regex.test(word) && HasSameLetters(word, sortedCheatWord)) {
      try {
        const definitionsData = await GetDefinitionHelper(word, errorHandler);
        let definitions = ['No definitions found']; 

        if (definitionsData && Array.isArray(definitionsData)) {
          definitions = definitionsData.flatMap((item) =>
            item.definitions.map((definitionItem) => definitionItem.definition)
          );
        }

        console.log(definitions);

        cheatData.push({ word: word, defs: definitions });
      } catch (error) {
        console.error(`Error processing word '${word}': ${error.message}`);
      }
    }
  }

  console.log(cheatData);
  return cheatData;
};
