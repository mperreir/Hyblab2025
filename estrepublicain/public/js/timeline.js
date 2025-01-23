"use strict"

// Récupération des éléments du SVG
let svg = document.getElementById("line")
let path = document.getElementById("path-line")
const pathLength = path.getTotalLength()

// Utilisation de GSAP pour dessiner le SVG en fonction du scroll
gsap.set(path, {strokeDasharray : pathLength})

gsap.fromTo(
    path,
    {
        strokeDashoffset: pathLength
    },
    {
        strokeDashoffset: 0,
        duration: 10,
        ease: "none",
        scrollTrigger: {
            trigger: ".svg-line",
            start: "top middle",
            end: "bottom bottom",
            scrub: 1
        }
    }
);