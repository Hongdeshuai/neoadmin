import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from './registerServiceWorker';

if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();