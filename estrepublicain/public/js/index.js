"use strict";

let svg = document.getElementById("line")
let path = document.getElementById("linePath")

const pathLength = path.getTotalLength()

gsap.set(path, {strokeDasharray : pathLength})

gsap.fromTo(
    path,
    {
        strokeDashoffset: pathLength
    },
    {
        strokeDashoffset: 0,
        duration: 1,
        ease: "none",
        scrollTrigger: {
            trigger: ".svg-line",
            start: "top center",
            end: "bottom bottom",
            scrub: 1
        }
    }
    );

window.addEventListener('scroll', function(){
    var value = window.scrollY;
    document.getElementById("cloud1").style.left = - value * 0.5 + 'px';
    document.getElementById("cloud2").style.right = - value * 0.7 + 'px';
    document.getElementById("cloud2").style.top = - value * 1.2 + 'px';

})