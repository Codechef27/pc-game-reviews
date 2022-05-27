//on form submit we will send the content to the form and search for a game
var submitBtn =  document.getElementById('game-search');
var userInput = document.getElementById('user-input');

function searchGame(event){
    event.preventDefault();

 fetch('https://www.cheapshark.com/api/1.0/games?title='+ userInput.value +'&exact=1').then(function (res){
     return res.json()
 }).then(function (data) {
console.log(data)
//grab content from api and render on page

//result container from html
var resultContainer =document.getElementById('results')

// create img element
var gameImg =  document.createElement('img')
// add img element attribute src and gve it the content
gameImg.setAttribute('src', data[0].thumb)


// append children elements to the result container
resultContainer.append(gameImg)

 })
}

submitBtn.addEventListener('submit', searchGame)

