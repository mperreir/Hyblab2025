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
        strokeDashoffset: 1,
        duration: 1,
        ease: "none",
        scrollTrigger: {
            trigger: ".svg-line",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1
        }
    }
);