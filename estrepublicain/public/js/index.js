"use strict";

// Initialisation de Swiper pour le carrousel des podcasts
const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Initialisation de Swiper pour le carrousel de l'équipe
const swiper2 = new Swiper("#mySwiper2", {
    direction: "horizontal",
    mousewheel: false,
    spaceBetween: 10,
    slidesPerView: 1.8,
    breakpoints: {
        // when window width is >= 320px
        992: {
            slidesPerView: 3.5,
        },
        // when window width is >= 480px
        1200: {
            slidesPerView: 5.5,
        },
    },
    pagination: false
});

// Événement pour afficher plus de texte
document.getElementById("readMore").addEventListener("click", function () {
    document.getElementById("moreText").style.display = "block";
    document.getElementById("threeDots").style.display = "none";
});

// Événement pour afficher moins de texte
document.getElementById("readLess").addEventListener("click", function () {
    document.getElementById("moreText").style.display = "none";
    document.getElementById("threeDots").style.display = "block";
});

let activeModal = -1; // Index du modal actif
let podcastsDataset = []; // Dataset des podcasts
let scrollCoor = [0, 0]; // Coordonnées de scroll
const svgNamespace = "http://www.w3.org/2000/svg"; // Namespace SVG

/**
 * Affiche ou masque un modal de podcast.
 *
 * @param {number} index - Index du podcast.
 * @param {boolean} show - Indique si le modal doit être affiché ou masqué.
 */
function togglePodcastModal(index, show = true) {
    const modalElement = document.getElementById(`podcastModal${index}`);
    const mainElement = document.getElementById("main");

    if (!show) {
        pauseVideo(index); // Pause la vidéo du podcast
        activeModal = -1; // Réinitialise l'index du modal actif
        modalElement.style.display = "none"; // Masque le modal
        mainElement.style.display = "block"; // Affiche le contenu principal
        window.scrollTo({ top: scrollCoor[0], left: scrollCoor[1], behavior: "instant" }); // Restaure les coordonnées de scroll
    } else {
        if (activeModal > -1) {
            document.getElementById(`podcastModal${activeModal}`).style.display = "none"; // Masque le modal précédent
            pauseVideo(activeModal); // Pause la vidéo du podcast précédent
        } else {
            scrollCoor = [window.scrollY, window.scrollX]; // Sauvegarde les coordonnées de scroll
        }
        activeModal = index; // Met à jour l'index du modal actif
        modalElement.style.display = "block"; // Affiche le modal
        mainElement.style.display = "none"; // Masque le contenu principal
        window.scrollTo({ top: 0, behavior: "instant" }); // Scroll en haut de la page
        resumeVideo(index, true); // Reprend la vidéo du podcast
    }
}

/**
 * Affiche un modal de podcast.
 *
 * @param {number} index - Index du podcast.
 */
function showPodcastModal(index) {
    togglePodcastModal(index, true);
}

/**
 * Masque un modal de podcast.
 *
 * @param {number} index - Index du podcast.
 */
function hidePodcastModal(index) {
    togglePodcastModal(index, false);
}

/**
 * Affiche les recommandations en fonction du type sélectionné.
 *
 * @param {string} type - Type de recommandation (tags, dep, date).
 */
function displayRecommended(type) {
    const sections = ["Tags", "Dep", "Date"];
    sections.forEach(section => {
        document.getElementById(`recommendedBy${section}${activeModal}`).style.display =
            type.toLowerCase() === section.toLowerCase() ? "flex" : "none";
    });
    if (type === "tags") {
        document.querySelectorAll(".depBtn").forEach(btn => btn.classList.remove("active"));
    }
}

/**
 * Pause une vidéo Vimeo.
 *
 * @param {number} id - ID de la vidéo.
 */
function pauseVideo(id) {
    const iframe = document.getElementById(`video${id}`);
    if (iframe) {
        const player = new Vimeo.Player(iframe);
        player.pause();
    }
}

/**
 * Reprend une vidéo Vimeo.
 *
 * @param {number} id - ID de la vidéo.
 * @param {boolean} reset - Indique si la vidéo doit être réinitialisée.
 */
function resumeVideo(id, reset = false) {
    const iframe = document.getElementById(`video${id}`);
    if (iframe) {
        const player = new Vimeo.Player(iframe);
        if (reset) {
            iframe.src = iframe.src + "&autoplay=1";
        }
        player.play();
    }
}

/**
 * Pause ou reprend une vidéo Vimeo.
 *
 * @param {number} id - ID de la vidéo.
 * @param {boolean} reset - Indique si la vidéo doit être réinitialisée.
 */
function toggleVideo(id, reset = false) {
    const iframe = document.getElementById(`video${id}`);
    if (iframe) {
        const player = new Vimeo.Player(iframe);
        player.getPaused().then(function (paused) {
            if (paused) {
                resumeVideo(id, reset);
            } else {
                pauseVideo(id);
            }
        });
    }
}

let swiperContainer = document.getElementById("swiper-wrapper");
let section;
let div;

/**
 * Crée une carte de podcast.
 *
 * @param {Object} podcast - Objet podcast.
 * @param {number} id - ID du podcast.
 * @param {Array} commonTags - Tags communs.
 * @returns {HTMLDivElement} - Élément div de la carte de podcast.
 */
function createPodcastCard(podcast, id, commonTags = null) {
    const card = document.createElement("div");
    card.classList.add("podcast", "z-1", "col-6", "col-md-3");

    const thumbnail = document.createElement("div");
    thumbnail.classList.add("vignette");
    thumbnail.style.backgroundImage = `url('img/thumbnails/${id + 1}.png')`;

    card.appendChild(thumbnail);

    const cardTitle = document.createElement("h6");
    cardTitle.innerHTML = podcast.ShortTitle.replace(/\n/g, "<br>");

    if (commonTags) {
        const tagsDiv = document.createElement("div");
        tagsDiv.classList.add("d-inline-flex", "tags");

        commonTags.forEach((t) => {
            const span = document.createElement("span");
            span.innerText = t;
            tagsDiv.appendChild(span);
        });
        card.appendChild(tagsDiv);
    }

    const city = document.createElement("p");
    city.textContent = podcast.City;

    const date = document.createElement("p");
    date.textContent = podcast.Date;

    card.appendChild(cardTitle);
    card.appendChild(city);
    card.appendChild(date);
    card.addEventListener("click", () => showPodcastModal(id));

    return card;
}

/**
 * Crée un élément SVG.
 *
 * @param {number} w - Largeur du SVG.
 * @param {number} h - Hauteur du SVG.
 * @param {string} vbn - ViewBox du SVG.
 * @param {string} path1Value - Valeur du premier chemin.
 * @param {string} path2Value - Valeur du deuxième chemin.
 * @param {string} fill1 - Couleur de remplissage du premier chemin.
 * @param {string} stroke1 - Couleur de contour du premier chemin.
 * @param {string} fill2 - Couleur de remplissage du deuxième chemin.
 * @param {string} stroke2 - Couleur de contour du deuxième chemin.
 * @param {number} rect1X - Position X du premier rectangle.
 * @param {number} rect1Y - Position Y du premier rectangle.
 * @param {number} rect1W - Largeur du premier rectangle.
 * @param {number} rect1H - Hauteur du premier rectangle.
 * @param {number} rect2X - Position X du deuxième rectangle.
 * @param {number} rect2Y - Position Y du deuxième rectangle.
 * @param {number} rect2W - Largeur du deuxième rectangle.
 * @param {number} rect2H - Hauteur du deuxième rectangle.
 * @param {string} clipPathValue - Valeur du clip-path.
 * @param {number} clipRectW - Largeur du rectangle de clip-path.
 * @param {number} clipRectH - Hauteur du rectangle de clip-path.
 * @param {string} clipRectFill - Couleur de remplissage du rectangle de clip-path.
 * @param {string} clipRectTransform - Transformation du rectangle de clip-path.
 * @returns {SVGSVGElement} - Élément SVG.
 */
function createSvg(w, h, vbn, path1Value, path2Value, fill1, stroke1, fill2, stroke2, rect1X, rect1Y, rect1W, rect1H, rect2X, rect2Y, rect2W, rect2H, clipPathValue, clipRectW, clipRectH, clipRectFill, clipRectTransform) {
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
    svg.setAttribute("viewBox", vbn);
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", svgNamespace);

    function drawPath(pathValue, fill, stroke) {
        const path = document.createElementNS(svgNamespace, "path");
        path.setAttribute("d", pathValue);
        if (stroke) { path.setAttribute("stroke", stroke); }
        if (fill) { path.setAttribute("fill", fill); }
        return path;
    }

    svg.appendChild(drawPath(path1Value, fill1, stroke1));

    function drawRect(rectX, rectY, rectW, rectH) {
        const rect = document.createElementNS(svgNamespace, "rect");
        rect.setAttribute("x", rectX);
        if (rectY) {
            rect.setAttribute("y", rectY);
        }
        rect.setAttribute("width", rectW);
        rect.setAttribute("height", rectH);
        rect.setAttribute("fill", "#E2000B");

        return rect;
    }

    svg.appendChild(drawRect(rect1X, rect1Y, rect1W, rect1H));
    svg.appendChild(drawRect(rect2X, rect2Y, rect2W, rect2H));

    if (clipPathValue) {
        const group = document.createElementNS(svgNamespace, "g");
        group.setAttribute("clip-path", `url(#${clipPathValue})`);

        group.appendChild(drawPath(path2Value, fill2, stroke2));

        svg.appendChild(group);

        const defs = document.createElementNS(svgNamespace, "defs");

        const clipPath = document.createElementNS(svgNamespace, "clipPath");
        clipPath.setAttribute("id", clipPathValue);

        const clipRect = document.createElementNS(svgNamespace, "rect");
        clipRect.setAttribute("width", clipRectW);
        clipRect.setAttribute("height", clipRectH);
        clipRect.setAttribute("fill", clipRectFill);
        clipRect.setAttribute("transform", clipRectTransform);

        clipPath.appendChild(clipRect);
        defs.appendChild(clipPath);
        svg.appendChild(defs);
    }

    return svg;
}

/**
 * Crée un modal de podcast.
 *
 * @param {Object} podcast - Objet podcast.
 * @param {number} id - ID du podcast.
 * @returns {HTMLDivElement} - Élément div du modal de podcast.
 */
function createPodcastModal(podcast, id) {
    const modal = document.createElement("div");
    modal.classList.add("podcatsModal", "z-3");
    modal.id = `podcastModal${id}`;

    const cross = document.createElement("img");
    cross.src = "img/close.png";
    cross.classList.add("cross", "z-3");
    cross.addEventListener("click", () => hidePodcastModal(id));
    modal.appendChild(cross);

    if (podcast.VideoLink !== "") {
        const video = document.createElement("div");
        video.classList.add("video-container", "z-1");

        const videoIframe = document.createElement("iframe");
        videoIframe.id = `video${id}`;
        videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share";
        videoIframe.classList.add("w-100");
        videoIframe.style = "height: calc(100% - 46px)";
        videoIframe.src = `https://player.vimeo.com/video/${podcast.VideoLink}?t=0&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&loop=1&controls=0`;

        video.appendChild(videoIframe);

        const overlay = document.createElement("div");
        overlay.classList.add("overlay", "z-2");
        overlay.addEventListener("click", () => toggleVideo(id));

        modal.appendChild(video);
        modal.appendChild(overlay);
    } else {
        const thumbnail = document.createElement("div");
        thumbnail.classList.add("thumbnail-container", "z-1");
        thumbnail.style.backgroundImage = `url('img/thumbnails/${podcast.id}.png')`;

        modal.appendChild(thumbnail);
    }

    const info = document.createElement("div");
    info.classList.add("z-2", "modalInfo");
    info.style.marginTop = podcast.VideoLink !== "" ? "100vh" : "88vh";
    info.style.borderTopLeftRadius = "25px";
    info.style.borderTopRightRadius = "25px";

    const title = document.createElement("h1");
    title.innerText = podcast.Title;
    info.appendChild(title);

    const city = document.createElement("h6");
    city.innerText = podcast.City;
    info.appendChild(city);

    const description = document.createElement("p");
    description.innerText = podcast.Description;
    info.appendChild(description);

    const btnA = document.createElement("div");
    btnA.classList.add("podcastLink");

    const a = document.createElement("a");
    a.innerText = "Ecouter le podcast";
    a.target = "_blank";
    a.href = `https://c.estrepublicain.fr/faits-divers-justice/${podcast.PodcastLink}`;
    btnA.appendChild(a);

    info.appendChild(btnA);

    const svg1 = createSvg("156",
        "521",
        "0 0 156 521",
        "M144.001 25V326.5C144.834 353.333 144.001 393.5 121.501 407C108.327 414.904 57.0005 422.764 19.0005 447C-15.111 468.756 3.39419 504.422 33.5002 515C89.0005 534.5 114.022 493.597 98.0001 470C70.5001 429.5 41.5001 476.5 13.5004 411.5",
        "M154.468 8.03178C154.08 9.47726 153.145 10.6293 151.947 11.3235C150.962 11.8937 149.799 12.1548 148.615 12.0151L144.221 25.392L147.103 11.6098C144.676 10.566 143.321 7.86738 144.026 5.23401C144.414 3.78854 145.348 2.63681 146.547 1.94266C147.746 1.24871 149.208 1.0126 150.65 1.39892C152.091 1.78524 153.239 2.72073 153.93 3.92099C154.621 5.12144 154.855 6.58631 154.468 8.03178Z",
        null,
        "#E2000B",
        "black",
        null,
        "11",
        "409",
        "4.51389",
        "4.51389",
        "142",
        "22",
        "4.51389",
        "4.51389",
        "clip0_0_1",
        "10.8098",
        "24.8394",
        "white",
        "translate(145.429) rotate(15)");

    svg1.classList.add("svg1", "z-0");

    info.appendChild(svg1);

    const svg2 = createSvg(
        "134",
        "191",
        "0 0 134 191",
        "M3.10886 2.5C-0.224475 31 -1.02938 69 11.6087 96C20.2682 114.5 33.315 122.301 50.109 125.5C81.6089 131.5 106.609 118.5 122.609 140.5C135.409 158.1 130.109 180.333 130.609 188",
        "none",
        null,
        "#E2000B",
        null,
        null,
        "1.1084",
        null,
        "4.51389",
        "4.51389",
        "129",
        "186",
        "4.51389",
        "4.51389",
        null,
        null,
        null,
        null,
        null);

    svg2.classList.add("svg2");
    info.appendChild(svg2);

    const otherCase = document.createElement("h6");
    otherCase.innerText = "Affaires similaires";
    info.appendChild(otherCase);

    const filtersDiv = document.createElement("div");
    filtersDiv.classList.add("d-inline-flex", "filters");

    const btnDate = document.createElement("button");
    btnDate.classList.add("filterBtn");
    btnDate.innerText = `${Math.trunc(podcast.Date / 10)}0 - ${Math.trunc(podcast.Date / 10) + 1}0`;
    btnDate.addEventListener("click", () => {
        if (btnDate.classList.contains("active")) {
            btnDate.classList.remove("active");
            btnDate.innerHTML = `${Math.trunc(podcast.Date / 10)}0 - ${Math.trunc(podcast.Date / 10) + 1}0`;
            displayRecommended("tags");
        } else {
            btnDate.classList.add("active");
            btnDep.classList.remove("active");
            btnDep.innerHTML = `${departementsEst[podcast.Department]}${podcast.Department}`;
            btnDate.innerHTML = `${Math.trunc(podcast.Date / 10)}0 - ${Math.trunc(podcast.Date / 10) + 1}0<i class="bi bi-x"></i>`;
            displayRecommended("date");
        }
    });
    filtersDiv.appendChild(btnDate);

    const departementsEst = {
        "Bas-Rhin": "Dans le ",
        "Haut-Rhin": "Dans le ",
        "Doubs": "Dans le ",
        "Jura": "Dans le ",
        "Haute-Saône": "Dans la ",
        "Vosges": "Dans les ",
        "Territoire de Belfort": "Dans le ",
        "Moselle": "En ",
        "Meurthe-et-Moselle": "En ",
        "Haute-Marne": "En ",
        "Meuse": "En "
    };
    const btnDep = document.createElement("button");
    btnDep.classList.add("filterBtn", "depBtn");
    btnDep.innerText = `${departementsEst[podcast.Department]}${podcast.Department}`;
    btnDep.addEventListener("click", () => {
        if (btnDep.classList.contains("active")) {
            btnDep.classList.remove("active");
            btnDep.innerHTML = `${departementsEst[podcast.Department]}${podcast.Department}`;
            displayRecommended("tags");
        } else {
            btnDep.classList.add("active");
            btnDate.classList.remove("active");
            btnDate.innerHTML = `${Math.trunc(podcast.Date / 10)}0 - ${Math.trunc(podcast.Date / 10) + 1}0`;
            btnDep.innerHTML = `${departementsEst[podcast.Department]}${podcast.Department}<i class="bi bi-x"></i>`;
            displayRecommended("dep");
        }
    });
    filtersDiv.appendChild(btnDep);

    info.appendChild(filtersDiv);

    const relatedByTagsDiv = document.createElement("div");
    relatedByTagsDiv.classList.add("row");
    relatedByTagsDiv.id = `recommendedByTags${id}`;

    const relatedByDateDiv = document.createElement("div");
    relatedByDateDiv.classList.add("row");
    relatedByDateDiv.id = `recommendedByDate${id}`;

    const relatedByDepDiv = document.createElement("div");
    relatedByDepDiv.classList.add("row");
    relatedByDepDiv.id = `recommendedByDep${id}`;

    fetch(`api/related/${id + 1}/4`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur d\'import des données');
            }
            return response.json();
        })
        .then(data => {
            const relatedPodcasts = data.relatedPodcasts;
            if (relatedPodcasts.length === 0) {
                const p = document.createElement("p");
                p.innerText = "Pas de vidéos.";
                relatedByTagsDiv.appendChild(p);
            }
            relatedPodcasts.forEach(p => {
                relatedByTagsDiv.appendChild(createPodcastCard(p.podcast, p.podcast.id - 1, p.commonTags));
            });
        })
        .catch(error => console.error('Erreur:', error));

    fetch(`api/decade/${id + 1}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur d\'import des données');
            }
            return response.json();
        })
        .then(data => {
            const relatedPodcasts = data.videos;
            if (relatedPodcasts.length === 0) {
                const p = document.createElement("p");
                p.innerText = "Pas de vidéos.";
                relatedByDateDiv.appendChild(p);
            }
            relatedPodcasts.forEach(p => {
                relatedByDateDiv.appendChild(createPodcastCard(p, p.id - 1));
            });
        })
        .catch(error => console.error('Erreur:', error));

    fetch(`api/department/${id + 1}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur d\'import des données');
            }
            return response.json();
        })
        .then(data => {
            const relatedPodcasts = Array.from(data.videos);
            if (relatedPodcasts.length === 0) {
                const p = document.createElement("p");
                p.innerText = "Pas de vidéos.";
                relatedByDepDiv.appendChild(p);
            }
            relatedPodcasts.forEach(p => {
                relatedByDepDiv.appendChild(createPodcastCard(p, p.id - 1));
            });
        })
        .catch(error => console.error('Erreur:', error));

    info.appendChild(relatedByTagsDiv);
    info.appendChild(relatedByDateDiv);
    relatedByDateDiv.style.display = "none";

    info.appendChild(relatedByDepDiv);
    relatedByDepDiv.style.display = "none";

    modal.appendChild(info);

    return modal;
}

/**
 * Affiche le modal des plateformes.
 */
function showPlatformModal() {
    document.getElementById("links").style.display = "block";
    document.getElementById("main").style.display = "none";
}

/**
 * Masque le modal des plateformes.
 */
function hidePlatformModal() {
    document.getElementById("links").style.display = "none";
    document.getElementById("main").style.display = "block";
}

/**
 * Initialise le carrousel des profils.
 */
function initProfileSwiper() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "block";

    setTimeout(() => {
        const cards = Array.from(document.getElementsByClassName("card"));

        const maxHeight = cards.reduce((acc, card) => {
            return Math.max(acc, card.clientHeight);
        }, 0);

        cards.forEach(card => {
            card.style.height = `${maxHeight}px`;
        });
    }, 50);
}

// Événement pour initialiser le carrousel des profils au chargement de la page
window.addEventListener('load', initProfileSwiper);

// Événement pour initialiser le carrousel des profils lors du redimensionnement de la fenêtre
window.addEventListener('resize', initProfileSwiper);

// Récupération des données des podcasts et création des cartes et modals
fetch('api/videos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur d\'import des données');
        }
        return response.json();
    })
    .then(data => {
        podcastsDataset = Array.from(data.videos);
        podcastsDataset.forEach((e, idx) => {
            if (idx % 8 === 0) {
                section = document.createElement("section");
                section.classList.add("swiper-slide");
                div = document.createElement("div");
                div.classList.add("row");
                section.appendChild(div);
                swiperContainer.appendChild(section);
            }

            div.appendChild(createPodcastCard(e, idx));

            document.getElementById("modals").appendChild(createPodcastModal(e, idx));
        });
    })
    .catch(error => console.error('Erreur:', error));
