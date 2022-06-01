//on form submit we will send the content to the form and search for a game
var submitBtn = document.getElementById("game-search");
var userInput = document.getElementById("user-input");
var searchHistory = [];
var searchHistoryEl = document.getElementById("search-history-list");

function saveUserInput(search) {
  // add search into seachhistory Array
  searchHistory.push(search)
  // store stringified array into local storage
  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  // save search into local storage
  // call function that creates buttons from data in local storage. 
}

function checkLocalStorage() {
  // check local storage for a key called search history and save as variable called 'stored'
  var stored = localStorage.getItem('search-history');

  // if stored exists we want to parse stored and make it equal searchHistory
  if (stored) {
    searchHistory = JSON.parse(stored);
    return true;
  } else {
    return false;
  }

  // call function that creates buttons from data in local storage. 

}

console.log(checkLocalStorage());

function populateSearchHistory() {
  if (checkLocalStorage()) {
    for (let i = 0; i < searchHistory.length; i++) {
      var listItem = document.createElement("li");
      listItem.innerHTML = searchHistory[i];
      searchHistoryEl.appendChild(listItem);
    }
  }
}
populateSearchHistory();
// declare function that creates the search history buttons

function captureUserInput(event) {
  event.preventDefault();
  searchGame(userInput.value)
}

function searchGame(search) {


  fetch(
    "https://www.cheapshark.com/api/1.0/games?title=" +
    search +
    "&exact=1"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      saveUserInput(search);
      //clear seach bar
      userInput.value = "";
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
      // add img element attribute src and gve it the content
      gameImg.setAttribute("src", data[0].thumb);

      gameImg.setAttribute("style", "height: 100px");
      //console.log("https://store.steampowered.com/app/" + data[0].steamAppID);

      var infoCon = document.createElement("div");
      infoCon.setAttribute("class", "info-Con");
      infoCon.setAttribute("id", data[0].steamAppID);

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
}

function topRated() {
  fetch(
    "https://api.bestbuy.com/v1/products((search=PC&search=games)&customerReviewAverage>4&salePrice<70)?sort=image.asc&show=sku,image,name,thumbnailImage,customerReviewAverage,type,longDescription,manufacturer,shortDescription,salePrice,categoryPath.name&facet=customerReviewAverage,10&format=json&apiKey=qhqws47nyvgze2mq3qx4jadt"
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
        "display: flex; justify-content: space-around;"
      );

      for (var i = 0; i < 5; i++) {
        var popGameInfo = document.createElement("div");
        popGameInfo.setAttribute("class", "pop-game-info");
        var popCon = document.createElement("a");
        popCon.setAttribute(
          "href",
          "https://www.bestbuy.com/site/searchpage.jsp?st=" +
          dataPop.products[i].sku
        );

        // create img element
        var popGameImg = document.createElement("img");
        // add img element attribute src and gve it the content
        popGameImg.setAttribute("src", dataPop.products[i].image);
        //console.log(dataPop.products[i].image);
        popGameImg.setAttribute("style", "height: 10vw;");

        popGamesContainer.append(popGameInfo);
        popGameInfo.append(popCon);
        popCon.append(popGameImg);
      }
    });
}

topRated();
submitBtn.addEventListener("submit", captureUserInput);
