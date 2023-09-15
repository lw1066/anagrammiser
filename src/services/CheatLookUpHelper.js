
import { HasSameLetters } from './HasSameLetters';


// const cheatLookUpHandler = async (cheatWord, letters) => {
    // USES DICTIONARY.TXT LIST OF WORDS STORED LOCALLY IN JSON
    // const sortedCheatWord = letters.sort().join('')
    // const pattern = cheatWord.map((letter) => (letter === '' ? '.' : letter));
    // const regexPattern = pattern.join('');
    // const regex = new RegExp(`^${regexPattern}$`, 'i');
    // let cheatData = []

    // for (let i = 0; i < output.length; i++) {
    //   const wordArray = output[i];
    //   if (wordArray[i].length === cheatWord.length) {
    //     for (const word of wordArray) {
    //       if (regex.test(word) && HasSameLetters(word, sortedCheatWord)) {
    //         cheatData.push(word)
    //       }
    //     }
    //     setCheatData(cheatData);
    //   }
    // }
  
    // DATAMUSE LOOKUP 
    export const CheatLookUpHelper = async (cheatWord, letters, errorHandler) => {
        const sortedCheatWord = letters.sort().join('');
        const pattern = cheatWord.map((letter) => (letter === '' ? '.' : letter));
        const regexPattern = pattern.join('');
        const regex = new RegExp(`^${regexPattern}$`, 'i');
        
        let datamusePrep = '';
      
        cheatWord.forEach(item => {
          datamusePrep += item === '' ? '?' : item;
        });
        
        if (/^\?*$/.test(datamusePrep)) {
          datamusePrep = '//' + letters.join('');
        }
      
        try {
          const response = await fetch(`https://api.datamuse.com/words?sp=${datamusePrep}&max=1000&md=d`);
          if (!response.ok) {
            throw new Error(`There aren't any results on datamuse for that collection of letters (${response.status})`);
          }
      
          const data = await response.json();
          ;
      
          const filteredData = data.filter(item => {
            const matchCondition = regex.test(item.word) && HasSameLetters(item.word, sortedCheatWord);
            return matchCondition;
          });
      
          if (filteredData === undefined || filteredData.length === 0) {
            throw new Error(`There are no anagram matches for this lot of letters - soz`)
          }
          const cheatData = filteredData.map(item => ({
            word: item.word,
            defs: item.defs
          }));
          return cheatData;
        } catch (error) {
          errorHandler(error.name, error.message)
        }
      }