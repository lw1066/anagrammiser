import React from 'react';
import { useState } from 'react';
import classes from '../AnagrammerInput/AnagrammerInput.module.css';
import Button from '../../UI/Button/Button';


const DictionaryCheck = (props) => {

    const [letters, setLetters] = useState('');

    const changeHandler = (event) => {
        setLetters(event.target.value);
    };

    const dictCheckHandler = (event) => {
        event.preventDefault();
        const checkRegex = /^[A-Za-z]+$/;
        if (!letters) {
            props.onError('No letters!', 'Put a word in mate');
            return
        };
        if (!letters.match(checkRegex)) {
            props.onError('Not letters!', "You can't check stuff that ain't letters");
            return
        };
        props.onDictLookUp(letters, props.onError)    
;    };


    return (
        <form onSubmit={dictCheckHandler} className={classes.form}>
            <label>What word do you want to dictionary check?</label>
            <input 
                onChange={changeHandler}
                value={letters}
                type='text'
            ></input>
            <p className={classes.actions}>
                <Button type='submit' >Check it out</Button>
            </p>
            
        </form>
    )
};

export default DictionaryCheck