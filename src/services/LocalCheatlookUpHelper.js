import localDictionaryData from '../assets/wordsByLength.json';
import { GetDefinitionHelper } from './GetDefinitionHelper';


// Utility function to check if two words have the same letters
const HasSameLetters = (word, sortedCheatWord) => {
  const wordLetters = word.split('').sort().join('');
  return wordLetters === sortedCheatWord;
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
      const definitionsData = await GetDefinitionHelper(word, errorHandler);
      let definitions = ['No definitions found']; // Default value
      
      if (definitionsData && Array.isArray(definitionsData)) {
        definitions = definitionsData.map((item) =>
          item.definitions.map((definitionItem) => definitionItem.definition)
        );
      }
      
      cheatData.push({ word: word, defs: definitions });
    }
  }

  return cheatData;
};
