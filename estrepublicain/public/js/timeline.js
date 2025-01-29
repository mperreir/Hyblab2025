"use strict"
//
// // Récupération des éléments du SVG
// let svg = document.getElementById("line")
// let path = document.getElementById("path-line")
// const pathLength = path.getTotalLength()
//
// // Utilisation de GSAP pour dessiner le SVG en fonction du scroll
// gsap.set(path, {strokeDasharray : pathLength})
//
// gsap.fromTo(
//     path,
//     {
//         strokeDashoffset: pathLength
//     },
//     {
//         strokeDashoffset: 1,
//         duration: 1,
//         ease: "none",
//         scrollTrigger: {
//             trigger: ".svg-line",
//             start: "top bottom",
//             end: "bottom bottom",
//             scrub: 1
//         }
//     }
// );

function adjustLine(from, to, containerFrom, containerTo, line){

    var fT = from.offsetTop  + containerFrom.offsetTop + from.offsetHeight/2;
    var tT = to.offsetTop	 + containerTo.offsetTop + to.offsetHeight/2;
    var fL = from.offsetLeft + from.offsetWidth/2;
    var tL = to.offsetLeft 	 + to.offsetWidth/2;

    var CA   = Math.abs(tT - fT);
    var CO   = Math.abs(tL - fL);
    var H    = Math.sqrt(CA*CA + CO*CO);
    var ANG  = 180 / Math.PI * Math.acos( CA/H );

    if(tT > fT){
        var top  = (tT-fT)/2 + fT;
    }else{
        var top  = (fT-tT)/2 + tT;
    }
    if(tL > fL){
        var left = (tL-fL)/2 + fL;
    }else{
        var left = (fL-tL)/2 + tL;
    }

    if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
        ANG *= -1;
    }
    top-= H/2;

    line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-transform"] = 'rotate('+ ANG +'deg)';
    line.style.top    = top+'px';
    line.style.left   = left+'px';
    line.style.height = H + 'px';
}


window.addEventListener('load', function () {
    adjustLine(
        document.getElementById('div1'),
        document.getElementById('div2'),
        document.getElementById('case-1'),
        document.getElementById('case-2'),
        document.getElementById('line1')
    );
    adjustLine(
        document.getElementById('div2'),
        document.getElementById('div3'),
        document.getElementById('case-2'),
        document.getElementById('case-3'),
        document.getElementById('line2')
    );
    adjustLine(
        document.getElementById('div3'),
        document.getElementById('div4'),
        document.getElementById('case-3'),
        document.getElementById('case-4'),
        document.getElementById('line3')
    );

    adjustLine(
        document.getElementById('div4'),
        document.getElementById('div5'),
        document.getElementById('case-4'),
        document.getElementById('case-5'),
        document.getElementById('line4')
    );

    adjustLine(
        document.getElementById('div5'),
        document.getElementById('div6'),
        document.getElementById('case-5'),
        document.getElementById('case-6'),
        document.getElementById('line5')
    );

    adjustLine(
        document.getElementById('div5'),
        document.getElementById('div6'),
        document.getElementById('case-5'),
        document.getElementById('case-6'),
        document.getElementById('line5')
    );

    adjustLine(
        document.getElementById('div3'),
        document.getElementById('div6'),
        document.getElementById('case-3'),
        document.getElementById('case-6'),
        document.getElementById('line6')
    );

    adjustLine(
        document.getElementById('div4'),
        document.getElementById('div1'),
        document.getElementById('case-4'),
        document.getElementById('case-1'),
        document.getElementById('line7')
    );

    adjustLine(
        document.getElementById('div2'),
        document.getElementById('div5'),
        document.getElementById('case-2'),
        document.getElementById('case-5'),
        document.getElementById('line8')
    );
})