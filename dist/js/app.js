var btn = document.getElementById("play-pause");

// ▬▬▬▬▬▬▬▬▬▬▬▬ Play pause Button

function togglePlayPause() {
    var videos = document.querySelectorAll("video");
    for(var i=0;len=videos.length; i<len, i++) {

        var video = videos[i];

        if (video.paused) {
            btn.className = 'pause';
            video.play();
        } else {
            btn.className = 'play';
            video.pause();
        }
    }
}

btn.onclick = function() {
    togglePlayPause();
}

// ▬▬▬▬▬▬▬▬▬▬▬▬ slider switch

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("video");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}

// ▬▬▬▬▬▬▬▬▬▬▬▬ go to top button

//Get the button
var gotTop = document.getElementById("gotTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    gotTop.style.display = "block";
  } else {
    gotTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}