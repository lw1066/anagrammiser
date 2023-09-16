import React, { useState, useEffect } from "react";
import Button from '../../UI/Button/Button';
import { CheatScrollerItem } from '../CheatScrollerItem/CheatScrollerItem';
import classes from './CheatDataInfiniteScroll.module.css';

export const CheatDataInfiniteScroll = (props) => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const batchSize = 20; // Set your batch size here

    // Function to load items initially and when "Load More" is clicked
    const loadItems = () => {
        const newVisibleItems = props.cheatData.slice(0, offset + batchSize);
        setVisibleItems(newVisibleItems);
        setOffset(offset + batchSize);
    };

    // Load items initially when the component mounts
    useEffect(() => {
        loadItems();
    }, []);

    // Function to load more items when "Load More" is clicked
    const loadMoreItems = () => {
        loadItems();
    };

    return (
        <div>
            <div className={classes.backdrop} onClick={props.onConfirm}/>
            <div className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.cheatData.length === 0 ? 'No' : props.cheatData.length} anagram{props.cheatData.length > 1 ? 's': ''} found of these letters: {props.letters} </h2>
                </header>
                <div className={classes.content}>
                    <div>
                        <div style={{ height: "40vh", overflowY: "scroll" }}>
                            {visibleItems.map((item, index) => (
                                <div key={index}><CheatScrollerItem word={item.word} defs={item.defs} /></div>
                            ))}
                        </div>
                        
                    </div>  
                </div>
                <footer className={classes.actions}>
                    {offset < props.cheatData.length && (
                        <div className={classes.loadMoreButton}>
                            <Button onClick={loadMoreItems}>Load More</Button>
                        </div>
                    )}
                    <Button onClick={props.onConfirm}>Okay</Button>
                </footer>
            </div>
        </div>
    );
};
