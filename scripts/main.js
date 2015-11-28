$(document).ready(function() {

"use strict";

// results list
var resultsList = $("#resultsList");
resultsList.text("SADSASDASD");

// results button
var toggleButton = $("#toggleButton");
toggleButton.on("click", function() {
    resultsList.toggle(200);

    if (toggleButton.text() == "Hide results") {
        toggleButton.text("Show results")
    } else {
        toggleButton.text("Hide results")
    };
});

});
