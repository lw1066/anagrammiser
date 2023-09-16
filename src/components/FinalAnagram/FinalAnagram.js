import React from 'react';
import { useState, useEffect } from 'react';
import classes from './FinalAnagram.module.css';
import Button from '../../UI/Button/Button';



const FinalAnagram = (props) => {
    
    const initialAna = props.anaLetters.ul || [];
    const [ana, setAna] = useState([initialAna])
    let letterData = props.anaLetters.ld

    useEffect(() => {
        // Update the 'ana' state when 'props.anaLetters.ul' changes
        setAna(props.anaLetters.ul || []);
    }, [props.anaLetters.ul]);

    if (!Array.isArray(letterData)) {
        return null;
    };
       
    const mixTheLetters = () => {
        const shuffledLetters = [...ana];
        
        for (let i = shuffledLetters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledLetters[i], shuffledLetters[j]] = [shuffledLetters[j], shuffledLetters[i]];
        }
        setAna([...shuffledLetters]); 
    };    

    return (
        <div className={classes.anag} >
            <p className={classes.spaces}>
            {letterData.map((item, index) => (
                item ? <span className={classes.letters} key={index}>{item}</span> : <span className={classes.letters} key={index}>_</span>
            ))}
            </p>
            <p className={classes.mixLetters}>{ana}</p>
            <div className={classes.actions}>
                <Button onClick={mixTheLetters} type='button'>Mix!</Button>
                <Button onClick={props.dictLookUp} type='button'>Dictionary</Button>
                <Button onClick={() => props.cheatLookUp(letterData, props.letters)} type='button'>Cheat!</Button>
                <Button className={classes.reset} onClick={props.resetAna} type='button'>Reset</Button>
            </div>
        </div>
    );

};

export default FinalAnagram;