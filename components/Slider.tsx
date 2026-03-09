"use client";
import React from "react";
import Image from "next/image";
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
        <div className="text-center">
            <h1 className="font-bold text-4xl">{fruits[index].name}</h1>
            <img
                src={`/images/${fruits[index].image}`}
                alt={fruits[index].name}
                className="h-64 mx-auto h-100"
            />
            <p>Page {index + 1} of {fruits.length}</p>

            <button
                onClick={prevClick}
                className="bg-cyan-700 hover:bg-cyan-950 mr-4 px-4 py-1 text-white rounded disabled:bg-gray-400"
            >
                Prev
            </button>

            <button
                onClick={nextClick}
                className="bg-cyan-700 hover:bg-cyan-950 ml-30 px-4 py-1 text-white rounded disabled:bg-gray-400"
            >
                Next
            </button>
            <br />

            <button
                onClick={showMoreClick}
                className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded mt-5 mb-3"
            >
                {showMore ? "Show Less" : "Show More"}
            </button>

            {showMore && (
                <ul className="text-left max-w-md mx-auto mb-5 bg-gray-200 p-4 rounded">
                    <li>学名: {fruits[index].scientificName}</li>
                    <li>目　: {fruits[index].order}</li>
                    <li>科　: {fruits[index].family}</li>
                    <li>属　: {fruits[index].genus}</li>
                </ul>
            )}
        </div>
    );
}