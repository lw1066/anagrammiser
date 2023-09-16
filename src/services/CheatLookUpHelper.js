import { CustomError } from '../UI/ErrorModal/CustomError';

export const CheatLookUpHelper = async (cheatWord, letters, errorHandler) => {
  const pattern = cheatWord.map((letter) => (letter === '' ? '.' : letter));
  const regexPattern = pattern.join('');
  const regex = new RegExp(`^${regexPattern}$`, 'i');
  const datamusePrep = '//' + letters.join('') + '//';

  try {
    const response = await fetch(`https://api.datamuse.com/words?sp=${datamusePrep}&max=100&md=d`);
    if (!response.ok) {
      throw new CustomError('Error', `There is a problem at datamuse (${response.status})`);
    }

    const data = await response.json();
    
    if (data.length === 0){
      throw new CustomError('Nothing found', `There aren't any results on datamuse for that collection of letters`);
    }

    const filteredData = data.filter(item => {
      const matchCondition = regex.test(item.word) && item.defs;
      return matchCondition;
    });

    if (filteredData.length === 0) {
      throw new CustomError('Nothing with the letters added', `There are no anagram matches for this lot of letters - soz ${filteredData}`)
    }
    
    const cheatData = filteredData.map(item => ({
        word: item.word,
        defs: item.defs
      })
    );
    return cheatData;
  } catch (error) {
    errorHandler(error.name, error.message)
  }
}