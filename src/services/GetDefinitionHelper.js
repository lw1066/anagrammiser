

export const GetDefinitionHelper = async (value, errorHandler) => {
    
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
        if (!response.ok) { 
            throw new Error(`There aren't any results for that collection of letters (${response.status})`)
        };

      const data = await response.json();
      const wordDisplay = []
      const wordData = data[0].meanings

        for (const key in wordData) {
            wordDisplay.push({
                pos: wordData[key].partOfSpeech,
                definitions: wordData[key].definitions,
                word: value
            });
        }
      return wordDisplay;
    } catch (error) {
        errorHandler(error.name, error.message)
    }
  };

