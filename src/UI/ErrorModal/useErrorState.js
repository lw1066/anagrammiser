import { useState } from 'react';

export const useErrorState = () => {
    
    const [error, setError] = useState(null);
    
    const removeErrorHandler = () => {
      setError(null);
    };
   
    const errorHandler = (error, message) => {
      setError({
        title: error,
        message: message,
      });
    };
   
    return {
      error,
      removeErrorHandler,
      errorHandler,
    };
  };
