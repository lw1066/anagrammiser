
import { CustomError } from '../UI/ErrorModal/CustomError';

export const GetDefinitionHelper = async (value, errorHandler) => {
  
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
   if(!response.ok) {
      throw new CustomError('We have no words', `Soz - nothing found for ${value}`);
   }
    const data = await response.json();
    const wordDisplay = data[0].meanings.map(item => {
      return {
          pos: item.partOfSpeech,
          definitions: item.definitions,
          word: value
      };
  });
    return wordDisplay;
  }catch (err) {
   throw err;
  }
};
