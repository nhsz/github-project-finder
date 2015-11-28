"use strict";

var resultsList = $("#resultsList");
resultsList.text("SADSASDASD");

var toggleButton = $("#toggleButton");
toggleButton.on("click", function () {
    resultsList.toggle(200);

    if (toggleButton.text() == "Hide results") {
        toggleButton.text("Show results")
    } else {
        toggleButton.text("Hide results")
    };
});
