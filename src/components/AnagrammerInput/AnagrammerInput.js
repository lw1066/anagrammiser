import React from 'react';
import { useState } from 'react';
import classes from './AnagrammerInput.module.css';
import Button from '../../UI/Button/Button';


const AnagrammerInput = (props) => {

    const [letters, setLetters] = useState('');

    const changeHandler = (event) => {
        setLetters(event.target.value);
    };

    const anagrammiseHandler = (event) => {
        event.preventDefault();
        const checkRegex = /^[A-Za-z]+$/;
        const trimmedLetters = letters.trim();

        if (!trimmedLetters) {
            props.onError('No letters!', 'Put some letters in to anagrammise');
            return;
        };
        if (!trimmedLetters.match(checkRegex)) {
            props.onError('Not letters!', 'You can only anagrammise letters - be careful');
            return;
        };
        props.onAnagrammise(trimmedLetters);
        setLetters('');
;    };


    return (
        <form onSubmit={anagrammiseHandler} className={classes.form}>
            <label>Type in your letters</label>
            <input 
                onChange={changeHandler}
                value={letters}
                type='text'
            ></input>
            <p className={classes.actions}>
                <Button type='submit' >Let's Anagrammise!</Button>
            </p>
            
        </form>
    )
};

export default AnagrammerInput