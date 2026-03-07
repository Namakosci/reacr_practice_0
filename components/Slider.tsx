"use client";
import React from "react";
import { fruits } from "./data";

export default function Slider() {
    const [index, setIndex] = React.useState(0);
    const [showMore, setShowMore] = React.useState(false);
    const canNext = index < fruits.length - 1;
    const canPrev = index > 0;

    function nextClick() {
        if (canNext) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }

    function prevClick() {
        if (canPrev) {
            setIndex(index - 1);
        } else {
            setIndex(fruits.length - 1);
        }
    }

    function showMoreClick() {
        setShowMore(!showMore);
    }

    console.log("/images/" + fruits[index].image);
    return (
        <div>
            <h1>{fruits[index].name}</h1>
            <img src={`/images/${fruits[index].image}`} alt={fruits[index].name} />
            <p>Page {index + 1} of {fruits.length}</p>
            <button onClick={prevClick}>
                Prev
            </button>
            　　
            <button onClick={nextClick}>
                Next
            </button>
            <br />
            <button onClick={showMoreClick}>
                {showMore ? "Show Less" : "Show More"}
            </button>
            {showMore && (
                <p>
                    学名: {fruits[index].scientificName}
                    <br />
                    目: {fruits[index].order}
                    <br />
                    科: {fruits[index].family}
                    <br />
                    属: {fruits[index].genus}
                </p>)}
        </div>
    );

}