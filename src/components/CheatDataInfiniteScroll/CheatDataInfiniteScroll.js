import React, { useState, useEffect, useCallback } from "react";
import Button from '../../UI/Button/Button';
// import { CheatScrollerItem } from '../CheatScrollerItem/CheatScrollerItem';
import classes from './CheatDataInfiniteScroll.module.css';

export const CheatDataInfiniteScroll = (props) => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const batchSize = 20; // Set your batch size here

    // Function to load items initially and when "Load More" is clicked
    const loadItems = useCallback(() => {
        const newVisibleItems = props.cheatData.slice(0, offset + batchSize);
        setVisibleItems(newVisibleItems);
    }, [props.cheatData, offset, batchSize]);

    // Load initial items when the component mounts
    useEffect(() => {
        loadItems();
    }, [loadItems]);

    // Function to load more items when "Load More" is clicked
    const loadMoreItems = () => {
        const newOffset = offset + batchSize;
        if (newOffset < props.cheatData.length) {
            setOffset(newOffset);
        }
    };

    // Determine whether to show the "Load More" button based on available data
    const showLoadMoreButton = offset + batchSize < props.cheatData.length;

    return (
        <div>
            <div className={classes.backdrop} onClick={props.onConfirm} />
            <div className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.cheatData.length === 0 ? 'No' : props.cheatData.length} anagram{props.cheatData.length > 1 ? 's' : ''} found of these letters: {props.letters} </h2>
                </header>
                <div className={classes.content}>
                    <div>
                        <ul style={{ height: "40vh", overflowY: "scroll" }}>
                            {visibleItems.map((item, index) => (
                                <><li key={index}>{item.word}</li><ul>
                                    {item.defs.map((definition, i) => (
                                        <li className={classes.definition} key={i}>{definition}</li>
                                    ))}
                                </ul></>
                            ))}
                        </ul>
                    </div>
                </div>
                <footer className={classes.actions}>
                    {showLoadMoreButton && (
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
