"use strict";

const videoId = ["EsiugWDeZJw", "Ttb0F6Pamnk", "sq7tUSgvUPc", "C2RRR8uKrzk", "273ZNrAbhmI"]
var filter = ""
// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  loop: true,
  pagination: false,
  observer: true
});

var section = document.createElement("section")
section.classList.add("swiper-slide")
section.id = "intro"
section.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec metus sapien, pharetra et pretium at, semper ac ex. Aenean et aliquam urna. Proin maximus, dolor non consequat commodo, turpis ligula aliquam est, quis molestie mauris lorem eget urna. Integer auctor libero nisl, sed commodo libero interdum eget. Nunc tristique congue sapien. Aliquam erat volutpat. Nam vehicula tincidunt bibendum. Morbi at massa sit amet felis faucibus eleifend. Quisque at condimentum nisi.\n"
document.getElementsByClassName("swiper-wrapper")[0].appendChild(section)

videoId.forEach((id, idx) => {
  var section = document.createElement("section")
  section.classList.add("swiper-slide")
  var overlay = document.createElement("div")
  overlay.classList.add("w-100")
  overlay.classList.add("h-100")
  overlay.classList.add("position-absolute")
  overlay.classList.add("z-1")
  overlay.id = "videoOverlay" + idx.toString()

  overlay.onclick = () => {
    pauseResume(idx)
  }

  var pause = document.createElement("div")
  pause.classList.add("pauseBtn")
  pause.style.display = "none"
  var pauseLogo = document.createElement("div")
  pauseLogo.classList.add("pauseLogo")
  pause.appendChild(pauseLogo)

  var pauseLogo = document.createElement("div")
  pauseLogo.classList.add("pauseLogo")
  pause.appendChild(pauseLogo)

  overlay.appendChild(pause)
  section.appendChild(overlay)
  var iframe = document.createElement("iframe")

  iframe.id = "video" + idx.toString()
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
  iframe.classList.add("w-100")
  iframe.style = "height: calc(100% - 46px)"

  section.appendChild(iframe)

  document.getElementsByClassName("swiper-wrapper")[0].appendChild(section)
})

swiper.on("slideChange", function () {
  initSlide(swiper.activeIndex)
});

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => { 
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 1000,
    targets: '#loader',
    opacity: '0',
    'z-index' : -1,
    easing: 'easeOutQuad',
  });
  // Init first slide
  initSlide(0);
}, 1000);

const initSlide = async function(slideNo){
  if (slideNo === 0) {
    document.getElementById("filters").style.display = "none"
  }
  else {
    document.getElementById("intro").style.display = "none"
    document.getElementById("video" + (slideNo-1).toString()).src = "https://player.vimeo.com/video/1047771321?h=62e4427273&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1&loop=1&controls=0";
    document.getElementById("filters").style.display = "block"
  }
};

const changeFilter = function(element) {
  [].forEach.call(document.getElementsByClassName("filter"), function (e) {e.classList.remove("selected")});
  element.classList.add("selected")
  filter = element.id
}

const pauseResume = function (id) {
  var iframe = document.getElementById('video' + id.toString());
  var player = new Vimeo.Player(iframe);
  player.getPaused().then(function(paused) {
    if (paused) {
      player.play()
      document.getElementById("pauseBtn").style.display = "none"
    } else {
      document.getElementById("pauseBtn").style.display = "flex"
      player.pause()
    }
  });
}