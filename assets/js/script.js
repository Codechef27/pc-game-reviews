//on form submit we will send the content to the form and search for a game
var submitBtn = document.getElementById("game-search");
var userInput = document.getElementById("user-input");

function searchGame(event) {
  event.preventDefault();

  fetch(
    "https://www.cheapshark.com/api/1.0/games?title=" +
      userInput.value +
      "&exact=0"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

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
      // add img element attribute src and give it the content
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
        popGameImg.setAttribute("style", "height: 100px;", "object-fit: fill;");
        popGamesContainer.append(popGameInfo);
        popGameInfo.append(popCon);
        popCon.append(popGameImg, gameTitle);
      }
    });
}

topRated();
submitBtn.addEventListener("submit", searchGame);
