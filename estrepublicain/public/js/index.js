"use strict";
fetch('api/videos')
    .then(response => {
      // Retourne une erreur s'il y en a une
      if (!response.ok) {
        throw new Error('Erreur d\'import des données');
      }

      // Conversion des données JSON en objet (avec une promesse)
      response.json().then(data => {
        console.log(data)
      })
    })

const videoId = ["EsiugWDeZJw", "Ttb0F6Pamnk", "sq7tUSgvUPc", "C2RRR8uKrzk", "273ZNrAbhmI"]
var filter = ""
// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  loop: true,
  pagination: false,
});

videoId.forEach((id, idx) => {
  var section = document.createElement("section")
  section.classList.add("swiper-slide")
  var overlay = document.createElement("div")
  overlay.classList.add("w-100")
  overlay.classList.add("h-100")
  overlay.classList.add("position-absolute")
  overlay.classList.add("z-1")
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
  document.getElementById("video" + (slideNo).toString()).src = "https://player.vimeo.com/video/1047771321?h=62e4427273&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1&loop=1&controls=0";
  //document.getElementById("video" + (slideNo).toString()).src = "https://www.youtube.com/embed/" + videoId[slideNo] + "?autoplay=1&controls=0&showinfo=0&rel=0&t=0?playlist=" + videoId[slideNo];
};

const changeFilter = function(element) {
  [].forEach.call(document.getElementsByClassName("filter"), function (e) {e.classList.remove("selected")});
  element.classList.add("selected")
  filter = element.id
}