var links = document.getElementById('flex-wrapper').getElementsByTagName('a');
var array, cards;
array = [0, 1, 2, 3, 4];
arrStatic = [];
cards = ['one', 'two', 'three', 'four', 'five']
var parkData;

//  When page loads, get park data from JSON
var parkRequest = new XMLHttpRequest();
parkRequest.open("GET", "../park-list.json");
parkRequest.onload = function () {
  parkData = JSON.parse(parkRequest.responseText);
  renderHTML(parkData);
};
parkRequest.send();

function shuffle(data) {
  var m = data.length,
    t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = data[m];
    data[m] = data[i];
    data[i] = t;
  }
}

function randomizer() {
  shuffle(array);
  parkRequest.onload();
}

function next() {
  for (var i = 0; i < 5; i++) {
    array.push(array.shift())
  }
  parkRequest.onload();
}

function previous() {
  var popped;
  for (var i = 0; i < 5; i++) {
    popped = array.pop();
    array.unshift(popped)
  }
  parkRequest.onload();
}

function renderHTML(data) {
  if (array.length < 6) {
    array = [];
    for (var j = 0; j < data.length; j++) {
      array.push(j);
      arrStatic.push(j);
    }
  }
  console.log(array)
  console.log(arrStatic)
  if (document.getElementById("drawer").children.length === 0) {
    for (var d = 0; d < arrStatic.length; d++) {
      var drawerContent =
        "<div id='dlink" + d + "' class='drawer-link initial-drawer-link' onclick='drawerClick(" + d + ")'>" +
        "<div id='image" + d + "' class='drawer-image'></div>" +
        "<div id='content-wrapper" + d + "' class='drawer-content-wrapper'>" +
        "<div id='title" + d + "' class='drawer-title'>" +
        data[d].parkName +
        "</div><div id='location" + d + "' class='drawer-location'>" +
        data[d].location +
        "</div></div></div>";
      document.getElementById("drawer").insertAdjacentHTML("beforeend", drawerContent)
      document.getElementById("image" + d).classList.add(data[d].bgClass)
    }
  }

  for (var i = 0; i < links.length; i++) {

    // Store div locations in variables:
    var location = data[array[i]].location;
    var parkName = data[array[i]].parkName;
    var coords = data[array[i]].coords;
    var area = data[array[i]].area;
    var est = data[array[i]].established;
    var visitors = data[array[i]].visitors;
    var fact = data[array[i]].fact;
    var slideshow = data[array[i]].slideshow;
    var bgClass = data[array[i]].bgClass;

    // Clear each card before inserting new content
    if (document.getElementById('cirText' + (i + 1)).innerHTML != "") {
      document.getElementById('cirText' + (i + 1)).innerHTML = "";
      document.getElementById('park-name' + (i + 1)).innerHTML = "";
      document.getElementById('coords' + (i + 1)).innerHTML = "";
      document.getElementById('area' + (i + 1)).innerHTML = "";
      document.getElementById('est' + (i + 1)).innerHTML = "";
      document.getElementById('visitors' + (i + 1)).innerHTML = "";
      document.getElementById('fact' + (i + 1)).innerHTML = "";
      links[i].classList = cards[i];
    }

    // Insert new content
    document.getElementById('cirText' + (i + 1)).insertAdjacentHTML('afterbegin', location);
    document.getElementById('park-name' + (i + 1)).insertAdjacentHTML('afterbegin', parkName);
    document.getElementById('coords' + (i + 1)).insertAdjacentHTML('afterbegin', coords);
    document.getElementById('area' + (i + 1)).insertAdjacentHTML('afterbegin', area);
    document.getElementById('est' + (i + 1)).insertAdjacentHTML('afterbegin', est);
    document.getElementById('visitors' + (i + 1)).insertAdjacentHTML('afterbegin', visitors);
    document.getElementById('fact' + (i + 1)).insertAdjacentHTML('afterbegin', fact);
    links[i].classList.add(bgClass)

    var demo1 = new CircleType(document.getElementById('cirText1')).radius(360);
    var demo2 = new CircleType(document.getElementById('cirText2')).radius(360);
    var demo3 = new CircleType(document.getElementById('cirText3')).radius(360);
    var demo4 = new CircleType(document.getElementById('cirText4')).radius(360);
    var demo5 = new CircleType(document.getElementById('cirText5')).radius(360);
  }
}

function clickHandler(id) {
  var arrTarget;
  for (var i = 0; i < links.length; i++) {
    links[i].classList.add('not-selected')
    if (id === links[i].classList[0]) {
      links[i].classList.remove("not-selected");
      links[i].classList.add("selected");
    }
  }

  document.getElementById('page-controls').classList.remove('not-visible');
  document.getElementById('page-controls').classList.add('visible');
  document.getElementById('ss-visibility').className = "displayed";

  if (id === "one") {
    arrTarget = 0;
  } else if (id === "two") {
    arrTarget = 1;
  } else if (id === "three") {
    arrTarget = 2;
  } else if (id === "four") {
    arrTarget = 3;
  } else {
    arrTarget = 4;
  }

  var parkBG = parkData[array[arrTarget]].bgClass;
  var slideshow = parkData[array[arrTarget]].slideshow;
  var location = parkData[array[arrTarget]].location;
  var topBG = parkData[array[arrTarget]].bgClass + 'top';
  var botBG = parkData[array[arrTarget]].bgClass + 'bot';
  document.getElementById('topClip').className = topBG;
  document.getElementById('botClip').className = botBG;
  document.getElementById('ss-previous').classList.add(botBG);
  document.getElementById('ss-pause').classList.add(botBG);
  document.getElementById('ss-next').classList.add(botBG);
  document.getElementById('ss-totop').classList.add(botBG);
  document.getElementById('ss-buttons').classList.add(topBG);
  // document.getElementByID('ss-home').classList.add(botBG);
  // document.getElementById('park-location-label').innerHTML = " " + location + " ";
  if (parkBG === "catba") {
    document.getElementById('park-label').innerHTML += " Cat Ba ";
  } else {
    document.getElementById('park-label').innerHTML += " " + parkBG + " ";
  }

  if (slideshow) {
    document.getElementById('slides').innerHTML = "";
    var slide = "<div class='slide showing' id='" + parkBG + 1 + "'><img src='" + slideshow[0] + "'/></div>";
    document.getElementById('slides').insertAdjacentHTML('beforeend', slide);
    console.log(parkBG)
    if (slideshow.length > 1) {
      for (var j = 1; j < slideshow.length; j++) {
        slide = "<div class='slide' id='" + parkBG + (j + 1) + "'><img src='" + slideshow[j] + "'/></div>";
        document.getElementById('slides').insertAdjacentHTML('beforeend', slide);
        console.log(slideshow[j]);
      }
    }
    slideshowStart();
  }
  document.getElementById("drawer").className = "closed";
  document.getElementById("hamburger").classList.remove("is-active")
}

function homeHandler() {
  for (var i = 0; i < links.length; i++) {
    links[i].classList.remove('not-selected');
    links[i].classList.remove('selected');
    console.log(array)
  }

  document.getElementById('page-controls').classList.remove('visible')
  document.getElementById('page-controls').classList.add('not-visible')
  document.getElementById('ss-visibility').className = "not-displayed";
  document.getElementById('ss-previous').className = 'ss-controls'
  document.getElementById('ss-pause').className = 'ss-controls'
  document.getElementById('ss-next').className = 'ss-controls'
  document.getElementById('ss-totop').className = 'ss-controls'
  document.getElementById('ss-buttons').className = 'ss-buttons'
  document.getElementById('park-label').innerHTML = "";

  var location = parkData[array[2]].location;
  var parkName = parkData[array[2]].parkName;
  var coords = parkData[array[2]].coords;
  var area = parkData[array[2]].area;
  var est = parkData[array[2]].established;
  var visitors = parkData[array[2]].visitors;
  var fact = parkData[array[2]].fact;
  var slideshow = parkData[array[2]].slideshow;
  var bgClass = parkData[array[2]].bgClass;

  if (document.getElementById('cirText3').innerHTML != "") {
    document.getElementById('cirText3').innerHTML = "";
    document.getElementById('park-name3').innerHTML = "";
    document.getElementById('coords3').innerHTML = "";
    document.getElementById('area3').innerHTML = "";
    document.getElementById('est3').innerHTML = "";
    document.getElementById('visitors3').innerHTML = "";
    document.getElementById('fact3').innerHTML = "";
    links[2].classList = cards[2];
  }

  document.getElementById('cirText3').insertAdjacentHTML('afterbegin', location);
  document.getElementById('park-name3').insertAdjacentHTML('afterbegin', parkName);
  document.getElementById('coords3').insertAdjacentHTML('afterbegin', coords);
  document.getElementById('area3').insertAdjacentHTML('afterbegin', area);
  document.getElementById('est3').insertAdjacentHTML('afterbegin', est);
  document.getElementById('visitors3').insertAdjacentHTML('afterbegin', visitors);
  document.getElementById('fact3').insertAdjacentHTML('afterbegin', fact);
  links[2].classList.add(bgClass)
}

//  SLIDESHOW LOGIC

var playing = true; //  Need this var to be global

function slideshowStart() {
  var controls = document.querySelectorAll('.slideshow-controls');
  for (var i = 0; i < controls.length; i++) {
    controls[i].style.display = 'inline-block';
  }

  var slides = document.querySelectorAll('#slides .slide');
  var currentSlide = 0;
  var slideInterval = setInterval(nextSlide, 3000);

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function previousSlide() {
    goToSlide(currentSlide - 1);
  }

  function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = 'slide showing';
  }

  var pauseButton = document.getElementById('ss-pause');

  function pauseSlideshow() {
    pauseButton.innerHTML = '<i class="fas fa-play"></i>'; // play character
    playing = false;
    clearInterval(slideInterval);
  }

  function playSlideshow() {
    pauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // pause character
    playing = true;
    slideInterval = setInterval(nextSlide, 3000);
  }

  pauseButton.onclick = function () {
    if (playing) {
      pauseSlideshow();
    } else {
      playSlideshow();
    }
  };

  var next = document.getElementById('ss-next');
  var previous = document.getElementById('ss-previous');

  next.onclick = function () {
    pauseSlideshow();
    nextSlide();
  };
  previous.onclick = function () {
    pauseSlideshow();
    previousSlide();
  };
}

function navText(text) {
  document.getElementById("nav-text").innerHTML = "";
  if (text === "Pause" && playing === false) {
    document.getElementById("nav-text").innerHTML = "Play";
    document.getElementById("nav-text-wrapper").classList.add("show-nav-text-bg")

  } else {
    document.getElementById("nav-text").innerHTML = text;
    document.getElementById("nav-text-wrapper").classList.add("show-nav-text-bg")

    if (text === "") {
      document.getElementById("nav-text-wrapper").classList.remove("show-nav-text-bg")

    }
  }
}

function drawerLinkLooper() {
  for (var i = 0; i < array.length; i++) {
    var dlink = document.getElementById("dlink" + i);
    if (dlink.classList[dlink.classList.length - 1] === "initial-drawer-link") {
      dlink.classList.remove("initial-drawer-link");
      dlink.classList.add("visible-drawer-link");
    } else {
      dlink.classList.remove("visible-drawer-link");
      dlink.classList.add("initial-drawer-link")
    }
  }
}

/* Set the width of the side navigation to 250px */
function navHandler() {
  var isActive = null;
  const burger = document.getElementById("hamburger");
  for (var i = 0; i < burger.classList.length; i++) {
    if (burger.classList[i] === "is-active") {
      isActive = true
    } else {
      isActive = false
    }
  }
  if (!isActive) {
    document.getElementById("drawer").className = "open"
    burger.classList.add("is-active")
  } else {
    document.getElementById("drawer").className = "closed"
    burger.classList.remove("is-active")
  }
  drawerLinkLooper();
}

function drawerClick(n) {
  var location = parkData[arrStatic[n]].location;
  var parkName = parkData[arrStatic[n]].parkName;
  var coords = parkData[arrStatic[n]].coords;
  var area = parkData[arrStatic[n]].area;
  var est = parkData[arrStatic[n]].established;
  var visitors = parkData[arrStatic[n]].visitors;
  var fact = parkData[arrStatic[n]].fact;
  var slideshow = parkData[arrStatic[n]].slideshow;
  var bgClass = parkData[arrStatic[n]].bgClass;

  if (document.getElementById('cirText3').innerHTML != "") {
    document.getElementById('cirText3').innerHTML = "";
    document.getElementById('park-name3').innerHTML = "";
    document.getElementById('coords3').innerHTML = "";
    document.getElementById('area3').innerHTML = "";
    document.getElementById('est3').innerHTML = "";
    document.getElementById('visitors3').innerHTML = "";
    document.getElementById('fact3').innerHTML = "";
    links[2].classList = cards[2];
  }

  document.getElementById('cirText3').insertAdjacentHTML('afterbegin', location);
  document.getElementById('park-name3').insertAdjacentHTML('afterbegin', parkName);
  document.getElementById('coords3').insertAdjacentHTML('afterbegin', coords);
  document.getElementById('area3').insertAdjacentHTML('afterbegin', area);
  document.getElementById('est3').insertAdjacentHTML('afterbegin', est);
  document.getElementById('visitors3').insertAdjacentHTML('afterbegin', visitors);
  document.getElementById('fact3').insertAdjacentHTML('afterbegin', fact);
  links[2].classList.add(bgClass)

  var parkBG = parkData[arrStatic[n]].bgClass;
  var slideshow = parkData[arrStatic[n]].slideshow;
  var topBG = parkData[arrStatic[n]].bgClass + 'top';
  var botBG = parkData[arrStatic[n]].bgClass + 'bot';
  document.getElementById('topClip').className = topBG;
  document.getElementById('botClip').className = botBG;
  document.getElementById('ss-previous').classList.add(botBG);
  document.getElementById('ss-pause').classList.add(botBG);
  document.getElementById('ss-next').classList.add(botBG);
  document.getElementById('ss-totop').classList.add(botBG);
  document.getElementById('ss-buttons').classList.add(topBG);

  for (var i = 0; i < links.length; i++) {
    links[i].classList.add('not-selected')
  }

  links[2].classList.remove("not-selected");
  links[2].classList.add("selected");
  document.getElementById('page-controls').classList.remove('not-visible');
  document.getElementById('page-controls').classList.add('visible');
  document.getElementById('ss-visibility').className = "displayed";

  if (parkBG === "catba") {
    document.getElementById('park-label').innerHTML = " Cat Ba ";
  } else {
    document.getElementById('park-label').innerHTML = parkBG;
  }

  if (slideshow) {
    document.getElementById('slides').innerHTML = "";
    var slide = "<div class='slide showing' id='" + parkBG + 1 + "'><img src='" + slideshow[0] + "'/></div>";
    document.getElementById('slides').insertAdjacentHTML('beforeend', slide);
    console.log(parkBG)
    if (slideshow.length > 1) {
      for (var j = 1; j < slideshow.length; j++) {
        slide = "<div class='slide' id='" + parkBG + (j + 1) + "'><img src='" + slideshow[j] + "'/></div>";
        document.getElementById('slides').insertAdjacentHTML('beforeend', slide);
        console.log(slideshow[j]);
      }
    }
    slideshowStart();
  }
  navHandler();
}


var loadingString = "Getting things ready!";
var loadingTarget = document.getElementById("loading-text")

function readyTextHTML(str) {
  var strArr = str.split("")
  console.log(str)
  for (var i = 0; i < strArr.length; i++) {
    if (strArr[i] === " ") {
      strArr[i] = "&nbsp;"
    }
    loadingTarget.insertAdjacentHTML("beforeend", 
    "<div id='load" + i + "' class='loadAnimation'>" + strArr[i] + "</div>")    
  }
  console.log(loadingString.split("").length)
}

function readyTextClassToggle(ms) {
  setInterval(() => {
    for (var i = 0; i < loadingString.length; i++) {
      document.getElementById("load" + i).classList.toggle("loadAnimation")
    }
  }, ms)
}

readyTextHTML(loadingString);
readyTextClassToggle(1500);

window.onload = function() {
  setTimeout(() => {
  document.getElementById("loadScreen").style.transition = ".25s";
  document.getElementById("loadScreen").style.opacity = "0"
  }, 1500)
  setTimeout(() => {
    document.getElementById("loadScreen").className = "not-displayed"
    }, 1750)

}
