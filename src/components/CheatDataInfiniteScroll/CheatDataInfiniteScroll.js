import React, { useState, useEffect, useRef, useCallback } from "react";
import Button from '../../UI/Button/Button';
import { CheatScrollerItem } from '../CheatScrollerItem/CheatScrollerItem';
import classes from './CheatDataInfiniteScroll.module.css';



export const CheatDataInfiniteScroll = (props) => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const containerRef = useRef(null);
    const anagramNumber = props.cheatData.length
    
    const loadMoreItems = useCallback(() => {
        const batchSize = 20; // You can adjust the batch size
        const newVisibleItems = props.cheatData.slice(0, offset + batchSize);
        setVisibleItems(newVisibleItems);
        setOffset(offset + batchSize);
    }, [props.cheatData, offset]);
    
    useEffect(() => {
        // Initialize Intersection Observer
        const options = {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.1, // When 10% of the container is visible, trigger the callback
        };
    
        const container = containerRef.current;

        const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            loadMoreItems();
        }
        }, options);
    
        if (container) {
        observer.observe(container);
        }
    
        // Cleanup the observer
        return () => {
        if (container) {
            observer.unobserve(container);
        }
        };
    }, [props.cheatData, offset, loadMoreItems]);

    return (
        <div>
            <div className={classes.backdrop} onClick={props.onConfirm}/>
                <div className={classes.modal}>
                    <header className={classes.header}>
                        <h2>{anagramNumber === 0 ? 'No' : anagramNumber} anagram{anagramNumber > 1 ? 's': ''} found of these letters: {props.letters} </h2>
                    </header>
                    <div className={classes.content}>
                        <div>
                            <div ref={containerRef} style={{ height: "40vh", overflowY: "scroll" }}>
                                {visibleItems.map((item, index) => (
                                <div key={index}><CheatScrollerItem word={item.word} defs={item.defs} /></div>
                                ))}
                            </div>
                        </div>  
                    </div>
                <footer className={classes.actions}>
                    <Button onClick={props.onConfirm}>Okay</Button>
                </footer>
            </div>
        </div>
    );
};
