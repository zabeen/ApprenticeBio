const GIF_LIMIT = 10;
const API_KEY = "apiKey=CFlZlBzN15Wj9vrQg73KT6RuLydG2vvV";

const URL = "https://api.giphy.com/v1";
const TRENDING_END_POINT = "/gifs/trending?";
const LIMIT_PARAM = "&limit=" + GIF_LIMIT;
const RATING_PARAM = "&rating=G";

var mainSection = document.querySelector('main');

function loadPage(){
    writeWelcome();
    getTrendingGifs();
}

function writeWelcome(){
    var para = document.createElement('p');
    para.textContent = "The top " + GIF_LIMIT + " GIFs trending on Giphy."
    mainSection.appendChild(para);
}

function getTrendingGifs() {
  var request = new XMLHttpRequest();

  var requestUrl = URL + TRENDING_END_POINT + API_KEY + LIMIT_PARAM + RATING_PARAM;
  
  request.open('GET', requestUrl);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    var response = request.response;

    for (var i = 0 ; i < GIF_LIMIT ; i++) {
        var imageUrl  = response['data'][i]['images']['original']['url'];
        var caption = response['data'][i]['title'];
        addGifImg(imageUrl, caption);
    }
  }
}

function addGifImg(imageUrl, caption) {
    var article = document.createElement('article');
    var figure = document.createElement('figure');

    var img = document.createElement('img');
    img.src = imageUrl;
    
    var figCaption = document.createElement('figcaption');
    figCaption.textContent = caption; 

    figure.appendChild(img);
    figure.appendChild(figCaption);

    article.appendChild(figure);
    mainSection.appendChild(article);
}

window.onload = loadPage();