import Button from '../../UI/Button/Button';
import { DictionaryItem } from '../DictionaryItem/DictionaryItem';
import classes from './DictionaryDisplay.module.css';


const DictionaryDisplay = (props) => {
    console.log(props.wordDisplay)

    return (
        <div>
            <div className={classes.backdrop} onClick={props.onConfirm}/>
                <div className={classes.modal}>
                    <header className={classes.header}>
                        <h2>{props.wordDisplay[0].word}</h2>
                    </header>
                    <div className={classes.content}>
                        <ul>
                            {props.wordDisplay.map((word) => (
                               <DictionaryItem
                               key={word.pos}
                               pos={word.pos}
                               definitions= {word.definitions}
                               />  
                            ))}
                        </ul>
                        
                    </div>
                    <footer className={classes.actions}>
                        <Button onClick={props.onConfirm}>Okay</Button>
                    </footer>
            </div>
        </div>
    );
};

export default DictionaryDisplay;