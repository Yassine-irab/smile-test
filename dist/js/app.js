var btn = document.getElementById("play-pause");

// ▬▬▬▬▬▬▬▬▬▬▬▬

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

// ▬▬▬▬▬▬▬▬▬▬▬▬

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

// ▬▬▬▬▬▬▬▬▬▬▬▬
