$(document).ready(function() {

"use strict";

// results list
var resultsList = $("#resultsList");
resultsList.text("ASD");

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

//
var githubSearch = "https://api.github.com/search/repositories?q=jquery+language:javascript&sort=stars"

$.get(githubSearch)
    .success(function(r) {
        displayResults(r.items);
})
    .fail(function(err) {
        console.log("Failed to query GitHub API.")
})
.done(function() {

});

//
// var results = [{
//     name: "jQuery",
//     language: "JavaScript",
//     score: 4.5,
//     showLog: function () {
//     },
//     owner: {
//         login: "shawnwildermuth",
//         id: 123456
// }
// }, {
//     name: "jQuery UI",
//     language: "JavaScript",
//     score: 3.5,
//     showLog: function () {

//     },
//     owner: {
//         login: "shawnwildermuth",
//         id: 123456
//     }
// }];

function displayResults(results) {
    resultsList.empty();
    $.each(results, function(i, item) {
        var newResult = $("<div class = 'result'>" +
            "<div class = 'title'>" + item.name + "</div>" +
            "<div> Language: " + item.language + "</div>" +
            "<div> Owner: " + item.owner.login + "</div>" +
            "</div>" + "<br>");

        resultsList.append(newResult);
    });
}

});
