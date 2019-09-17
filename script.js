"strict mode";

const apiKey = "BNRyuaD408mceWyfwJlF09LATWzzvbN7ESkkcOld";
const searchURL = "https://api.nps.gov/api/v1/parks";

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join("&");
}

function displayResults(responseJson) {
    console.log(responseJson);

    $("#results").empty();

    for (let i = 0; i < responseJson.data.length; i++) {
        $("#results").append(
            `<h1>${responseJson.data[i].fullName}</h1>

      <p>${responseJson.data[i].description}</p>

      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>`
        );
    }

    $("#results").removeClass("hidden");
}

function getNationalParks(query, maxResults = 10) {
    const params = {
        key: apiKey,
        limit: maxResults,
        stateCode: query
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $("#err-results").text(`Something went wrong:${error.message}`);
        });
}

function watchForm() {
    $("form").submit(event => {
        event.preventDefault();
        let stateSearch = $("#search-term").val();
        let resultNum = $("#max-results").val();
        getNationalParks(stateSearch, resultNum);
    });
}

$(watchForm);