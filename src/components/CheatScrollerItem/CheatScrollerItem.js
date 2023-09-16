import classes from './CheatScrollerItem.module.css';

export const CheatScrollerItem = ({ word, defs }) =>{  
    console.log(word, defs)
    
    return (
        <li className={classes.word}>
            {word}
            <ul className={classes.item}>
            {defs ? (
                    defs.map((definition, index) => (
                        <li className={classes.definition} key={index}>{definition}</li>
                    ))
                ) : (
                    <li className={classes.definition}>The word is here but no definitions!</li>
                )}
            </ul>
        </li>
    );

};