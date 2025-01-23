"use strict";

const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

swiper.on("slideChange", function () {
    switch( swiper.activeIndex ) {
        case 0:
            initSlide1();
            break;
        case 1:
            initSlide2();
            break;
    }
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
        tag: "mystère",
        description: "Une disparition inexplicable dans les rues sombres de Montmartre."
    },
    {
        nom: "Chroniques Macabres",
        lieuDuCrime: "New York",
        dateDuCrime: "1998-05-22",
        tag: "historique",
        description: "Le meurtre non résolu d'un célèbre avocat dans son penthouse."
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
        tag: "technologie",
        description: "Une enquête sur un crime cybernétique qui a mal tourné."
    },
    {
        nom: "Secrets Sombres",
        lieuDuCrime: "Sydney",
        dateDuCrime: "2010-09-18",
        tag: "intrigue",
        description: "La disparition mystérieuse d'un yacht au large de la côte."
    },
    {
        nom: "Enigmes de Minuit",
        lieuDuCrime: "Londres",
        dateDuCrime: "1888-08-31",
        tag: "classique",
        description: "Un retour sur les crimes de Jack l'Éventreur."
    },
    {
        nom: "Piste Rouge",
        lieuDuCrime: "Montréal",
        dateDuCrime: "2021-03-10",
        tag: "sanglant",
        description: "Une série de meurtres étranges qui ont ébranlé la ville."
    },
    {
        nom: "Enquête Oubliée",
        lieuDuCrime: "Rome",
        dateDuCrime: "1984-02-14",
        tag: "catholique",
        description: "Un mystère impliquant le Vatican et une disparition choquante."
    },
    {
        nom: "Frissons et Faits Divers",
        lieuDuCrime: "Bangkok",
        dateDuCrime: "2005-06-28",
        tag: "étranger",
        description: "Un touriste américain disparaît dans des circonstances suspectes."
    },
    {
        nom: "Meurtres Rituels",
        lieuDuCrime: "Lagos",
        dateDuCrime: "1993-11-15",
        tag: "occultisme",
        description: "Un tueur en série s'attaque à des membres de sectes locales."
    },
    {
        nom: "Justice Retardée",
        lieuDuCrime: "Moscou",
        dateDuCrime: "1990-04-01",
        tag: "judiciaire",
        description: "Un crime politique qui a défié les tribunaux pendant des décennies."
    },
    {
        nom: "Affaires Glaciales",
        lieuDuCrime: "Reykjavik",
        dateDuCrime: "2017-01-23",
        tag: "glacial",
        description: "Une enquête sur une disparition dans la neige."
    },
    {
        nom: "Crime et Forêts",
        lieuDuCrime: "Amazonie",
        dateDuCrime: "2019-08-10",
        tag: "environnement",
        description: "Un meurtre lié à la déforestation illégale."
    },
    {
        nom: "Mystères Subaquatiques",
        lieuDuCrime: "Lac Baïkal",
        dateDuCrime: "2012-06-19",
        tag: "aquatique",
        description: "Une disparition dans les profondeurs mystérieuses du lac."
    },
    {
        nom: "Traque de l'Inconnu",
        lieuDuCrime: "Johannesburg",
        dateDuCrime: "2008-09-04",
        tag: "inconnu",
        description: "Un criminel insaisissable dans les rues de Johannesburg."
    },
    {
        nom: "Panique à Providence",
        lieuDuCrime: "Providence",
        dateDuCrime: "1925-10-30",
        tag: "horrifique",
        description: "Une série de meurtres inspirés par les écrits de Lovecraft."
    },
    {
        nom: "Cadavres et Canaux",
        lieuDuCrime: "Amsterdam",
        dateDuCrime: "1995-03-18",
        tag: "fluvial",
        description: "Des corps retrouvés flottant dans les canaux de la ville."
    },
    {
        nom: "Affaires du Désert",
        lieuDuCrime: "Sahara",
        dateDuCrime: "2000-12-01",
        tag: "isolé",
        description: "Un meurtre dans un campement isolé."
    },
    {
        nom: "Chasse à l'Homme",
        lieuDuCrime: "Chicago",
        dateDuCrime: "2018-05-21",
        tag: "poursuite",
        description: "Une traque à grande échelle pour attraper un tueur en série."
    },
    {
        nom: "Le Cri des Andes",
        lieuDuCrime: "Cusco",
        dateDuCrime: "1997-04-14",
        tag: "archéologique",
        description: "Un meurtre sur un site archéologique sacré."
    },
    {
        nom: "La Dernière Clé",
        lieuDuCrime: "Lisbonne",
        dateDuCrime: "2016-08-12",
        tag: "énigme",
        description: "Un crime basé sur une série de messages codés."
    },
    {
        nom: "Ombres et Flammes",
        lieuDuCrime: "San Francisco",
        dateDuCrime: "1989-10-17",
        tag: "pyromane",
        description: "Une série d'incendies criminels qui a terrorisé la ville."
    },
    {
        nom: "Les Disparus de la Montagne",
        lieuDuCrime: "Alpes",
        dateDuCrime: "2002-02-09",
        tag: "montagnard",
        description: "Un groupe de randonneurs qui n'est jamais revenu."
    },
    {
        nom: "Souvenirs Mortels",
        lieuDuCrime: "Hanoi",
        dateDuCrime: "1992-12-27",
        tag: "rancune",
        description: "Un crime impliquant un ancien soldat et un acte de vengeance."
    },
    {
        nom: "Enquête Maritime",
        lieuDuCrime: "Pacifique Sud",
        dateDuCrime: "2020-11-07",
        tag: "naval",
        description: "Un meurtre mystérieux sur un cargo en haute mer."
    },
    {
        nom: "Trahison en Famille",
        lieuDuCrime: "New Delhi",
        dateDuCrime: "2014-03-15",
        tag: "famille",
        description: "Une affaire complexe de meurtre au sein d'une famille influente."
    },
    {
        nom: "Rivière Sanglante",
        lieuDuCrime: "Belgrade",
        dateDuCrime: "1996-07-02",
        tag: "guerre",
        description: "Un crime de guerre qui a bouleversé la région."
    },
    {
        nom: "Les Yeux de l'Énigme",
        lieuDuCrime: "Copenhague",
        dateDuCrime: "2013-10-05",
        tag: "visionnaire",
        description: "Un meurtre basé sur des visions prophétiques."
    },
    {
        nom: "Fantômes de l'Histoire",
        lieuDuCrime: "Athènes",
        dateDuCrime: "1975-06-08",
        tag: "historique",
        description: "Un crime lié à des secrets de la Grèce antique."
    },
    {
        nom: "Sous le Voile Noir",
        lieuDuCrime: "Istanbul",
        dateDuCrime: "2011-09-30",
        tag: "culturel",
        description: "Un meurtre au cœur du Grand Bazar."
    }
];

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

    div.appendChild(podcast)
})