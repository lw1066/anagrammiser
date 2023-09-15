import classes from './DictionaryItem.module.css';

export const DictionaryItem = ({ pos, definitions }) =>{
    console.log(pos, definitions)
    
    

    return (
        <li className={classes.word}>
            {pos}
            <ul className={classes.item}>
                {definitions.map((definitionObject, index) => (
                    <li className={classes.definition} key={index}>{definitionObject.definition}</li>
                ))}  
            </ul>
        </li>
    );

};
