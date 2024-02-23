import classes from './DictionaryItem.module.css';

export const DictionaryItem = ({ pos, definitions }) =>{

    return (
        <li className={classes.word}>
            {pos}
            <ul className={classes.item}>
                {definitions.map((definition, index) => (
                    <li className={classes.definition} key={index}>{definition.definition}</li>
                ))}  
            </ul>
        </li>
    );

};
