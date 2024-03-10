import React from 'react';
import classes from './AnagramDisplay.module.css';
import Button from '../../UI/Button/Button';


const AnagramDisplay = (props) => {

    if (!Array.isArray(props.letters)) {
        return;
    };

    const letterHandler = (event) => {
        event.preventDefault();
    
        // Select all input elements within the form
        const inputElements = event.target.querySelectorAll('input[type="text"]');
      
        // Map over the input elements to extract their values
        const list = Array.from(inputElements).map(input => input.value.toLowerCase().trim());
        
        // Validate input
        const data = props.letters.map(item => item.toLowerCase());
        for (let i = 0; i < list.length; i++) {
            if (!data.includes(list[i]) && list[i] !== '') {
                props.onError('Wrong letters!', 'Please check the letters are in your original anagram');
                return;
            }
        }
        
        props.onLetterSubmit(list);
    };

    return (
        <form onSubmit={letterHandler} className={classes.aform}>
            <p>Add letters you know ({props.letters}):</p>
            <div className={classes.letters}>
                {props.letters.map((letter, index) => (
                <input type='text' id={index} key={index} size='1' maxLength='1' ></input>
                ))}
            </div>
            <div className={classes.actions}>
                <Button type='submit'>Let's go</Button>
            </div>
        </form>
    )

};

export default AnagramDisplay;