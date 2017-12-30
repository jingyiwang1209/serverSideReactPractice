import React from "react";

const Home = () => {
    return (
        <div>
            <div>I am the best home component</div>
            <button onClick={() => console.log("Hi")}>Press me!</button>
        </div>
    );
};

export default {
    component:Home
};