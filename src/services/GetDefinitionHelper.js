
import { CustomError } from '../UI/ErrorModal/CustomError';

export const GetDefinitionHelper = async (value, errorHandler) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
    if (!response.ok) {
      throw new CustomError('Nothing Found', `There aren't any results for that word (${response.status})`);
    }

    const data = await response.json();

    // Check if data contains meanings property
    if (Array.isArray(data) && data.length > 0 && data[0].meanings) {
      const wordDisplay = [];
      const wordData = data[0].meanings;

      for (const key in wordData) {
        wordDisplay.push({
          pos: wordData[key].partOfSpeech,
          definitions: wordData[key].definitions,
          word: value,
        });
      }

      return wordDisplay;
    } else {
      throw new CustomError('Nothing here', `No meanings found for the word: ${value}`);
    }
  } catch (error) {
    errorHandler(error.name, error.message);
  }
};
