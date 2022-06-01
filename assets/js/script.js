//on form submit we will send the content to the form and search for a game
var submitBtn = document.getElementById("game-search");
var userInput = document.getElementById("user-input");
//new variable used by both input box and search history
var newInput;

//get container element used for search history buttons
var searchHistoryEl = document.getElementById("search-history-results");

// establish searchHistory variable
var searchHistory;
//if local storage has results then make search history equal to that, otherwise make searchHistory an empty array
var LSsearchHistory = JSON.parse(localStorage.getItem("searchHistory"));
if (LSsearchHistory) {
  searchHistory = LSsearchHistory;
} else {
  searchHistory = [];
}
// console.log(searchHistory);

// function that creates buttons from data in local storage.
function populateSearchHistory() {
  for (let i = 0; i < searchHistory.length; i++) {
    //needs to be a button to be clickable later
    searchHistoryEl.innerHTML = "";
    var listItem = document.createElement("button");
    listItem.innerHTML = searchHistory[i];
    //set id and class for styling purposes
    //add any bulma/bootstrap classes necessary here
    /*listItem.setAttribute(
      "href",
      "https://store.steampowered.com/app/" + data[0].steamAppID
    );*/
    listItem.setAttribute("id", "search-history-button");
    listItem.classList = "search-history-button";
    //this "value" will be used by search function when button is clicked
    listItem.setAttribute("value", searchHistory[i]);
    searchHistoryEl.appendChild(listItem);
  }
}
// call function that creates buttons from data in local storage on onload.
populateSearchHistory();

//new function created by CRH
//function for prelim search needs when game name entered into search box, information then saved to local storage and passed to search game function
var searchGamePrelim = function (event) {
  event.preventDefault();
  //add to searchHistory to end of current array
  searchHistory.push(userInput.value);
  // store stringified array into local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  //convert user input into search game variable for search game func
  newInput = userInput.value;
  //clear variable & search bar
  userInput.value = "";
  //updated search history display to include most recent game
  populateSearchHistory();
  searchGame(newInput);
};

//function for searching for a game. newInput is the game name brought in by either the search box user input or the button value under search history

//change variables to newInput, nothing else changed -CRH
//a couple of the data[0].steamAppID things were giving me trouble so I commented out.
var searchGame = function (newInput) {
  //get data
  fetch(
    "https://www.cheapshark.com/api/1.0/games?title=" + newInput + "&exact=0"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      //clear variable
      newInput = "";
      //clear display search result

      //grab content from api and render on page

      //result container from html
      var resultContainer = document.getElementById("results");
      resultContainer.innerHTML = "";

      var imgContainer = document.createElement("a");
      imgContainer.setAttribute(
        "href",
        "https://store.steampowered.com/app/" + data[0].steamAppID
      );
      resultContainer.append(imgContainer);

      // create img element
      var gameImg = document.createElement("img");
      // add img element attribute src and give it the content
      gameImg.setAttribute("src", data[0].thumb);
      gameImg.setAttribute("style", "height: 100px");
      //console.log("https://store.steampowered.com/app/" + data[0].steamAppID);

      var infoCon = document.createElement("div");
      infoCon.setAttribute("class", "info-Con");
      // infoCon.setAttribute("id", data[0].steamAppID);

      // fix game name id posting above price
      var gameName = document.createElement("p");
      gameName.setAttribute("class", "search-results");
      gameName.innerHTML = data[0].external;
      console.log(data[0].external);

      var cheapPrice = document.createElement("p");
      cheapPrice.setAttribute("class", "search-results");
      cheapPrice.innerHTML = "Cheapest Price:" + " $" + data[0].cheapest;

      // append children elements to the result container
      imgContainer.append(gameImg);
      resultContainer.append(infoCon);
      infoCon.appendChild(gameName);
      gameName.append(cheapPrice);
    });
};
//function to collected top rated array and display
//nothing changed by CRH
function topRated() {
  fetch(
    "https://api.rawg.io/api/games?key=0348bed11a46424494a92449b6237be9&page=2"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (dataPop) {
      console.log(dataPop);

      //result container from html
      var popGamesContainer = document.getElementById("popular-games");
      popGamesContainer.innerHTML = "";

      popGamesContainer.setAttribute(
        "style",
        "display: flex; flex-wrap:wrap; justify-content:space-around"
      );

      for (var i = 0; i < 12; i++) {
        var popGameInfo = document.createElement("div");
        popGameInfo.setAttribute("class", "pop-game-info");
        var popCon = document.createElement("a");
        popCon.setAttribute(
          "href",
          "https://rawg.io/games/" + dataPop.results[i].slug
        );
        var gameTitle = document.createElement("div");
        gameTitle.innerHTML = dataPop.results[i].name;
        // gameTitle.setAttribute("class", "width: 20vw" )

        // create img element
        var popGameImg = document.createElement("img");
        // add img element attribute src and gve it the content
        popGameImg.setAttribute("src", dataPop.results[i].background_image);
        //popGameImg.setAttribute("style", "height: 100px;", "object-fit: fill;");
        popGamesContainer.append(popGameInfo);
        popGameInfo.append(popCon);
        popCon.append(popGameImg, gameTitle);
      }
    });
}
//populate top rated on onload
topRated();
//call for searching game entered into search box
submitBtn.addEventListener("submit", searchGamePrelim);

//If a search history game name is clicked on then the function will make the variable newInput equal to the "value" which was saved to the button during display search history and uses that value to run the game search
searchHistoryEl.addEventListener("click", function (event) {
  newInput = [event.target.value];
  searchGame(newInput);
});

// function to clear local storage and search history array
/*var clearHistoryFunc = function () {
  localStorage.clear();
  searchHistory = [];
  searchHistoryEl.innerHTML = "";
};
// call function to clear search history
document.getElementById("clearHistory");
.addEventListener("click", clearHistoryFunc);*/
