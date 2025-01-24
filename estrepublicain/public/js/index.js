"use strict";

const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

const initSlide1 = async function(){
    // Get logo element
    const logo = document.querySelector('#logo-hyblab');

    // (Re)set initial scale of logo
    logo.setAttribute('style', 'transform :scale(1);');

    // Animate hyblab logo and make shrink on click
    anime({
        targets: '#logo-hyblab',
        scale: 1.2,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });

    // Add click listener
    logo.addEventListener('click', () => {
        anime({
            targets: '#logo-hyblab',
            scale: 0
        });
        swiper.slideNext()
    });

    // Retrieve the partner's topic from our API
    let response = await fetch('api/topic');
    const data1 = await response.json();

    // Get some dummy data
    response = await fetch('data/dummy.json');
    const data2 = await response.json();

    // Update the DOM to insert topic and data
    const footer = document.querySelector('footer p');
    footer.textContent = `Our partner is "${data1.topic}" and here is "${data2.message}" retrieved on the server.`;
};

const podcastsDataset = [
    {
        nom: "Mystères Nocturnes",
        lieuDuCrime: "Paris",
        dateDuCrime: "2023-10-12",
        video: "null",
        tag: "mystère",
        description: "Une disparition inexplicable dans les rues sombres de Montmartre."
    },
    {
        nom: "Chroniques Macabres",
        lieuDuCrime: "New York",
        dateDuCrime: "1998-05-22",
        video: "yes",
        tag: "historique",
        description: "description . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        nom: "Ombres du Passé",
        lieuDuCrime: "Berlin",
        dateDuCrime: "2001-07-13",
        tag: "espionnage",
        description: "Un assassinat lié à une opération secrète pendant la Guerre Froide."
    },
    {
        nom: "Meurtres Modernes",
        lieuDuCrime: "Tokyo",
        dateDuCrime: "2015-11-03",
        video: "null",
        tag: "technologie",
        description: "Une enquête sur un crime cybernétique qui a mal tourné."
    },
    {
        nom: "Secrets Sombres",
        lieuDuCrime: "Sydney",
        dateDuCrime: "2010-09-18",
        video: "null",
        tag: "intrigue",
        description: "La disparition mystérieuse d'un yacht au large de la côte."
    },
    {
        nom: "Enigmes de Minuit",
        lieuDuCrime: "Londres",
        dateDuCrime: "1888-08-31",
        video: "null",
        tag: "classique",
        description: "Un retour sur les crimes de Jack l'Éventreur."
    },
    {
        nom: "Piste Rouge",
        lieuDuCrime: "Montréal",
        dateDuCrime: "2021-03-10",
        video: "null",
        tag: "sanglant",
        description: "Une série de meurtres étranges qui ont ébranlé la ville."
    },
    {
        nom: "Enquête Oubliée",
        lieuDuCrime: "Rome",
        dateDuCrime: "1984-02-14",
        video: "null",
        tag: "catholique",
        description: "Un mystère impliquant le Vatican et une disparition choquante."
    },
    {
        nom: "Frissons et Faits Divers",
        lieuDuCrime: "Bangkok",
        dateDuCrime: "2005-06-28",
        video: "null",
        tag: "étranger",
        description: "Un touriste américain disparaît dans des circonstances suspectes."
    },
    {
        nom: "Meurtres Rituels",
        lieuDuCrime: "Lagos",
        dateDuCrime: "1993-11-15",
        video: "null",
        tag: "occultisme",
        description: "Un tueur en série s'attaque à des membres de sectes locales."
    },
    {
        nom: "Justice Retardée",
        lieuDuCrime: "Moscou",
        dateDuCrime: "1990-04-01",
        video: "null",
        tag: "judiciaire",
        description: "Un crime politique qui a défié les tribunaux pendant des décennies."
    },
    {
        nom: "Affaires Glaciales",
        lieuDuCrime: "Reykjavik",
        dateDuCrime: "2017-01-23",
        video: "null",
        tag: "glacial",
        description: "Une enquête sur une disparition dans la neige."
    },
    {
        nom: "Crime et Forêts",
        lieuDuCrime: "Amazonie",
        dateDuCrime: "2019-08-10",
        video: "null",
        tag: "environnement",
        description: "Un meurtre lié à la déforestation illégale."
    },
    {
        nom: "Mystères Subaquatiques",
        lieuDuCrime: "Lac Baïkal",
        dateDuCrime: "2012-06-19",
        video: "null",
        tag: "aquatique",
        description: "Une disparition dans les profondeurs mystérieuses du lac."
    },
    {
        nom: "Traque de l'Inconnu",
        lieuDuCrime: "Johannesburg",
        dateDuCrime: "2008-09-04",
        video: "null",
        tag: "inconnu",
        description: "Un criminel insaisissable dans les rues de Johannesburg."
    },
    {
        nom: "Panique à Providence",
        lieuDuCrime: "Providence",
        dateDuCrime: "1925-10-30",
        video: "null",
        tag: "horrifique",
        description: "Une série de meurtres inspirés par les écrits de Lovecraft."
    },
    {
        nom: "Cadavres et Canaux",
        lieuDuCrime: "Amsterdam",
        dateDuCrime: "1995-03-18",
        video: "null",
        tag: "fluvial",
        description: "Des corps retrouvés flottant dans les canaux de la ville."
    },
    {
        nom: "Affaires du Désert",
        lieuDuCrime: "Sahara",
        dateDuCrime: "2000-12-01",
        video: "null",
        tag: "isolé",
        description: "Un meurtre dans un campement isolé."
    },
    {
        nom: "Chasse à l'Homme",
        lieuDuCrime: "Chicago",
        dateDuCrime: "2018-05-21",
        video: "null",
        tag: "poursuite",
        description: "Une traque à grande échelle pour attraper un tueur en série."
    },
    {
        nom: "Le Cri des Andes",
        lieuDuCrime: "Cusco",
        dateDuCrime: "1997-04-14",
        video: "null",
        tag: "archéologique",
        description: "Un meurtre sur un site archéologique sacré."
    },
    {
        nom: "La Dernière Clé",
        lieuDuCrime: "Lisbonne",
        dateDuCrime: "2016-08-12",
        video: "null",
        tag: "énigme",
        description: "Un crime basé sur une série de messages codés."
    },
    {
        nom: "Ombres et Flammes",
        lieuDuCrime: "San Francisco",
        dateDuCrime: "1989-10-17",
        video: "null",
        tag: "pyromane",
        description: "Une série d'incendies criminels qui a terrorisé la ville."
    },
    {
        nom: "Les Disparus de la Montagne",
        lieuDuCrime: "Alpes",
        dateDuCrime: "2002-02-09",
        video: "null",
        tag: "montagnard",
        description: "Un groupe de randonneurs qui n'est jamais revenu."
    },
    {
        nom: "Souvenirs Mortels",
        lieuDuCrime: "Hanoi",
        dateDuCrime: "1992-12-27",
        video: "null",
        tag: "rancune",
        description: "Un crime impliquant un ancien soldat et un acte de vengeance."
    },
    {
        nom: "Enquête Maritime",
        lieuDuCrime: "Pacifique Sud",
        dateDuCrime: "2020-11-07",
        tag: "naval",
        video: "null",
        description: "Un meurtre mystérieux sur un cargo en haute mer."
    },
    {
        nom: "Trahison en Famille",
        lieuDuCrime: "New Delhi",
        dateDuCrime: "2014-03-15",
        video: "null",
        tag: "famille",
        description: "Une affaire complexe de meurtre au sein d'une famille influente."
    },
    {
        nom: "Rivière Sanglante",
        lieuDuCrime: "Belgrade",
        dateDuCrime: "1996-07-02",
        video: "null",
        tag: "guerre",
        description: "Un crime de guerre qui a bouleversé la région."
    },
    {
        nom: "Les Yeux de l'Énigme",
        lieuDuCrime: "Copenhague",
        dateDuCrime: "2013-10-05",
        video: "null",
        tag: "visionnaire",
        description: "Un meurtre basé sur des visions prophétiques."
    },
    {
        nom: "Fantômes de l'Histoire",
        lieuDuCrime: "Athènes",
        dateDuCrime: "1975-06-08",
        video: "null",
        tag: "historique",
        description: "Un crime lié à des secrets de la Grèce antique."
    },
    {
        nom: "Sous le Voile Noir",
        lieuDuCrime: "Istanbul",
        dateDuCrime: "2011-09-30",
        video: "null",
        tag: "culturel",
        description: "Un meurtre au cœur du Grand Bazar."
    }
];

let scrollCoor = [0, 0]

function displayPodcastModal (index) {
    scrollCoor = [window.scrollY, window.scrollX]
    document.getElementById("podcastModal" +index ).style.display = "block"
    document.getElementById("main").style.display = "none"

    window.scrollTo({
        top: 0,
        behavior: "instant",
    });
}

function hidePodcastModal (index) {
    document.getElementById("podcastModal" +index ).style.display = "none"
    document.getElementById("main").style.display = "block"
    window.scrollTo({
        top: scrollCoor[0],
        left: scrollCoor[1],
        behavior: "instant",
    });
}

let swiperContainer = document.getElementById("swiper-wrapper")
let section;
let div;
podcastsDataset.forEach((e, idx) => {
    if ((idx)%8 === 0) {
        section = document.createElement("section")
        section.classList.add("swiper-slide")
        div = document.createElement("div")
        div.classList.add("row")
        section.appendChild(div)
        swiperContainer.appendChild(section)
    }
    let podcast = document.createElement("div")
    podcast.classList.add("podcast")
    podcast.classList.add("col-6")
    podcast.classList.add("col-md-3")
    let vignette = document.createElement("div")
    vignette.classList.add("vignette")
    podcast.appendChild(vignette)
    let h6 = document.createElement("h6")
    h6.textContent = e.nom
    let ville = document.createElement("p")
    ville.textContent = e.lieuDuCrime
    let date = document.createElement("p")
    date.textContent = e.dateDuCrime

    podcast.appendChild(h6)
    podcast.appendChild(ville)
    podcast.appendChild(date)
    podcast.addEventListener("click", function (e) {
        displayPodcastModal(idx)
    })
    podcast.modalIndex = "podcastModal" + idx
    div.appendChild(podcast)

    let modal = document.createElement("div")
    modal.classList.add("podcatsModal")
    modal.classList.add("z-3")
    modal.id = "podcastModal" + idx


    let cross = document.createElement("img")
    cross.src = "img/close.png"
    cross.classList.add("cross")
    cross.classList.add("z-3")
    cross.addEventListener("click",function (e) {
        hidePodcastModal(idx)
    })
    modal.appendChild(cross)

    if (e.video !== "null") {
        let video = document.createElement("div")
        video.classList.add("video-container")
        video.classList.add("z-1")
        modal.appendChild(video)
    }

    let info = document.createElement("div")
    info.classList.add("z-2")
    info.classList.add("modalInfo")
    if (e.video !== "null") {
        info.style.marginTop = "100vh"
        info.style.borderTopLeftRadius = "25px"
        info.style.borderTopRightRadius = "25px"
    }

    let title = document.createElement("h1")
    title.innerText = e.nom
    info.appendChild(title)


    let city = document.createElement("h6")
    city.innerText = e.lieuDuCrime
    info.appendChild(city)

    let description = document.createElement("p")
    description.innerText = e.description
    info.appendChild(description)

    let btnA = document.createElement("div")
    btnA.classList.add("podcastLink")

    let a = document.createElement("a")
    a.innerText = "Ecouter le podcast"
    btnA.appendChild(a)

    info.appendChild(btnA)

    const svgNamespace = "http://www.w3.org/2000/svg";

// Créer l'élément <svg>
    const svg1 = document.createElementNS(svgNamespace, "svg");
    svg1.setAttribute("width", "156");
    svg1.setAttribute("height", "521");
    svg1.setAttribute("viewBox", "0 0 156 521");
    svg1.setAttribute("fill", "none");
    svg1.setAttribute("xmlns", svgNamespace);

// Ajouter le chemin principal <path>
    const path1 = document.createElementNS(svgNamespace, "path");
    path1.setAttribute("d", "M144.001 25V326.5C144.834 353.333 144.001 393.5 121.501 407C108.327 414.904 57.0005 422.764 19.0005 447C-15.111 468.756 3.39419 504.422 33.5002 515C89.0005 534.5 114.022 493.597 98.0001 470C70.5001 429.5 41.5001 476.5 13.5004 411.5");
    path1.setAttribute("stroke", "#E2000B");
    svg1.appendChild(path1);

// Ajouter le premier rectangle <rect>
    const rect1 = document.createElementNS(svgNamespace, "rect");
    rect1.setAttribute("x", "11");
    rect1.setAttribute("y", "409");
    rect1.setAttribute("width", "4.51389");
    rect1.setAttribute("height", "4.51389");
    rect1.setAttribute("fill", "#E2000B");
    svg1.appendChild(rect1);

// Ajouter le deuxième rectangle <rect>
    const rect2 = document.createElementNS(svgNamespace, "rect");
    rect2.setAttribute("x", "142");
    rect2.setAttribute("y", "22");
    rect2.setAttribute("width", "4.51389");
    rect2.setAttribute("height", "4.51389");
    rect2.setAttribute("fill", "#E2000B");
    svg1.appendChild(rect2);

// Ajouter le groupe <g> avec le chemin noir
    const group = document.createElementNS(svgNamespace, "g");
    group.setAttribute("clip-path", "url(#clip0_0_1)");

    const path2 = document.createElementNS(svgNamespace, "path");
    path2.setAttribute("d", "M154.468 8.03178C154.08 9.47726 153.145 10.6293 151.947 11.3235C150.962 11.8937 149.799 12.1548 148.615 12.0151L144.221 25.392L147.103 11.6098C144.676 10.566 143.321 7.86738 144.026 5.23401C144.414 3.78854 145.348 2.63681 146.547 1.94266C147.746 1.24871 149.208 1.0126 150.65 1.39892C152.091 1.78524 153.239 2.72073 153.93 3.92099C154.621 5.12144 154.855 6.58631 154.468 8.03178Z");
    path2.setAttribute("fill", "black");
    group.appendChild(path2);
    svg1.appendChild(group);

// Ajouter les définitions <defs> et clipPath
    const defs = document.createElementNS(svgNamespace, "defs");

    const clipPath = document.createElementNS(svgNamespace, "clipPath");
    clipPath.setAttribute("id", "clip0_0_1");

    const clipRect = document.createElementNS(svgNamespace, "rect");
    clipRect.setAttribute("width", "10.8098");
    clipRect.setAttribute("height", "24.8394");
    clipRect.setAttribute("fill", "white");
    clipRect.setAttribute("transform", "translate(145.429) rotate(15)");

    clipPath.appendChild(clipRect);
    defs.appendChild(clipPath);
    svg1.appendChild(defs);

    svg1.classList.add("svg1")


    info.appendChild(svg1)

    // Créer l'élément <svg>
    const svg2 = document.createElementNS(svgNamespace, "svg");
    svg2.setAttribute("width", "134");
    svg2.setAttribute("height", "191");
    svg2.setAttribute("viewBox", "0 0 134 191");
    svg2.setAttribute("fill", "none");
    svg2.setAttribute("xmlns", svgNamespace);

// Ajouter le premier rectangle <rect>
    const rect1_2 = document.createElementNS(svgNamespace, "rect");
    rect1_2.setAttribute("x", "1.1084");
    rect1_2.setAttribute("width", "4.51389");
    rect1_2.setAttribute("height", "4.51389");
    rect1_2.setAttribute("fill", "#E2000B");
    svg2.appendChild(rect1_2);

// Ajouter le chemin <path>
    const path_2 = document.createElementNS(svgNamespace, "path");
    path_2.setAttribute(
        "d",
        "M3.10886 2.5C-0.224475 31 -1.02938 69 11.6087 96C20.2682 114.5 33.315 122.301 50.109 125.5C81.6089 131.5 106.609 118.5 122.609 140.5C135.409 158.1 130.109 180.333 130.609 188"
    );
    path_2.setAttribute("stroke", "#E2000B");
    svg2.appendChild(path_2);

// Ajouter le deuxième rectangle <rect>
    const rect2_2 = document.createElementNS(svgNamespace, "rect");
    rect2_2.setAttribute("x", "129");
    rect2_2.setAttribute("y", "186");
    rect2_2.setAttribute("width", "4.51389");
    rect2_2.setAttribute("height", "4.51389");
    rect2_2.setAttribute("fill", "#E2000B");
    svg2.appendChild(rect2_2);

    svg2.classList.add("svg2")

    info.appendChild(svg2)

    let otherCase = document.createElement("h6")
    otherCase.innerText = "Affaires similaires"
    info.appendChild(otherCase)

    modal.appendChild(info)

    document.getElementById("modals").appendChild(modal)
})



