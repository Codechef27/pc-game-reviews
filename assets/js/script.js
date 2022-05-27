//on form submit we will send the content to the form and search for a game
var submitBtn = document.getElementById("game-search");
var userInput = document.getElementById("user-input");

function searchGame(event) {
  event.preventDefault();

  fetch(
    "https://www.cheapshark.com/api/1.0/games?title=" +
      userInput.value +
      "&exact=1"
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

      // create img element
      var gameImg = document.createElement("img");
      // add img element attribute src and gve it the content
      gameImg.setAttribute("src", data[0].thumb);
      gameImg.setAttribute("style", "height: 100px");

      var infoCon = document.createElement("div");
      infoCon.setAttribute("class", "info-Con");
      infoCon.setAttribute("id", data[0].steamAppID);

      // fix game name id posting above price
      /*var gameName = document.createElement("p");
      gameName.setAttribute("class", "search-results");
      gameName.innerHTML = data[0].external;
      console.log(data[0].external);*/

      var cheapPrice = document.createElement("p");
      cheapPrice.setAttribute("class", "search-results");
      cheapPrice.innerHTML = "Cheapest Price:" + " $" + data[0].cheapest;

      // append children elements to the result container
      resultContainer.append(gameImg);
      resultContainer.append(infoCon);
      //infoCon.appendChild(gameName);
      infoCon.append(cheapPrice);
    });
}

submitBtn.addEventListener("submit", searchGame);
