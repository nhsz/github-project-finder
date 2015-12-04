$(document).ready(function() {

"use strict";


// results list
var resultsList = $("#resultsList");
resultsList.text("Insert your keywords, select the language and press the Search button.");


// pagination
var paginationButton = $("#paginationButton");
paginationButton.hide();


// search flag
var searchDone = false;


//
$("#githubSearchForm").on("submit", function() {

    var searchPhrase = $("#projectKeywords").val();
    var sortBy = $("#sortBy").val();
    var langChoice = $("#langChoice").val();

    if (searchPhrase) {
        resultsList.text("Searching...");
        paginationButton.hide();

        // repo keywords
        var githubSearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);

        // choose repo language
        if (langChoice != "Any language") {
            githubSearch += "+language:" + encodeURIComponent(langChoice);
        }

        // sort results by stars, forks, updated
        if (sortBy == "Stars") {
            githubSearch += "&sort=stars";
        } else if (sortBy == "Forks") {
                githubSearch += "&sort=forks";
        } else {
            githubSearch += "&sort=updated";
        }

        // if there are no results, display an error message on console
        $.get(githubSearch)
            .success(function(r) {
                var totalCount = r.total_count;
                var numberOfPages = Math.ceil(totalCount / 30);
                console.log("Number of results: " + totalCount);
                console.log("Number of pages: " + numberOfPages);

                var numberOfResults = totalCount + " related repositories found.";

                displayResults(r.items);
                searchDone = true;

                if (numberOfPages > 1) {
                    paginationButton.show();
                }
        })
            .fail(function(err) {
                console.log("Failed to query GitHub API.")
        })
        .done(function() {

        });
    }

    return false;
});


//
function displayResults(results) {
    resultsList.empty();
    $.each(results, function(i, item) {

        var repoDescription = "<div>" + item.description + "</div>";

        if (repoDescription == "") {
            repoDescription = "Description not provided.";
        }

        var repoUrl = "'" + item.html_url + "'";
        var repoName =  "<a target='_blank' href=" + repoUrl + ">" + "<div class = 'title'>" + "<span class='octicon octicon-repo'></span> " + item.full_name + "</div>" + "<a/>";
        var repoLanguage = "<strong><div> Language: </strong>" + item.language + "</div>";
        var repoUpdatedOn = "<strong><div> Updated: </strong>" + item.updated_at + "</div>";

        var newResult = $("<div class = 'result'>" +
            repoName +
            repoDescription +
            repoLanguage +
            repoUpdatedOn +
            "<br>");

        resultsList.append(newResult);
    });
}

});
