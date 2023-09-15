import React from 'react';
import classes from './AnagramDisplay.module.css';
import Button from '../../UI/Button/Button';


const AnagramDisplay = (props) => {

    if (!Array.isArray(props.letters)) {
        return;
    };

    const letterHandler = (event) => {
        event.preventDefault();
        let list = [];
        let data = props.letters.map(item => item.toLowerCase());
        
        for (let i=0; i<data.length; i++) {
            list.push(event.target[i].value.toLowerCase())
        };

        //validate input - only allow letters from original input
        for (let i=0; i<data.length; i++) {
            if (data.includes(list[i])) {
                const indexToRemove = data.indexOf(list[i]);
                if (indexToRemove !== -1) {
                    data.splice(indexToRemove, 1)
                    continue
                } 
            } else if (list[i] === '') {
                continue;
            } else {
                props.onError('Wrong letters!', 'Please check the letters are in your original anagram');
               
                
                return;
            }
        }
        props.onLetterSubmit(list);
    };

    return (
        <form onSubmit={letterHandler}className={classes.aform}>
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