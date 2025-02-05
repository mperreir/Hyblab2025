"use strict";

const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

$(document).ready(function() {
    var isMobile  = isVisible('#bp_mobile'),
        isTablet  = isVisible('#bp_tablet'),
        isDesktop = isVisible('#bp_desktop');

    if( isMobile ) {
        const swiper2 = new Swiper("#mySwiper2", {
            direction: "horizontal",
            mousewheel: false,
            spaceBetween: 10,
            slidesPerView: 1.8,
            pagination: false
        });
    } else if (isTablet) {
        const swiper2 = new Swiper("#mySwiper2", {
            direction: "horizontal",
            mousewheel: false,
            spaceBetween: 10,
            slidesPerView: 3.5,
            pagination: false
        });
    } else {
        const swiper2 = new Swiper("#mySwiper2", {
            direction: "horizontal",
            mousewheel: false,
            spaceBetween: 10,
            slidesPerView: 5.5,
            pagination: false
        });
    }
});

document.getElementById("readMore").addEventListener("click", function () {
    document.getElementById("moreText").style.display = "block"
    document.getElementById("threeDots").style.display = "none"
})

document.getElementById("readLess").addEventListener("click", function () {
    document.getElementById("moreText").style.display = "none"
    document.getElementById("threeDots").style.display = "block"
})

let activeModal = -1;

let podcastsDataset = [];

let scrollCoor = [0, 0]

const svgNamespace = "http://www.w3.org/2000/svg";

function displayPodcastModal (index) {
    if (activeModal > -1) {
        document.getElementById("podcastModal" +activeModal ).style.display = "none"
        pause(activeModal)
    }
    else {
        scrollCoor = [window.scrollY, window.scrollX]
    }
    activeModal = index
    document.getElementById("podcastModal" +index ).style.display = "block"
    document.getElementById("main").style.display = "none"

    window.scrollTo({
        top: 0,
        behavior: "instant",
    });
    resume(index, true)
}

function hidePodcastModal (index) {
    pause(index)

    activeModal = -1
    document.getElementById("podcastModal" +index ).style.display = "none"
    document.getElementById("main").style.display = "block"
    window.scrollTo({
        top: scrollCoor[0],
        left: scrollCoor[1],
        behavior: "instant",
    });
}

function displayRecommended(type) {
    switch (type) {
        case "date":
            Array.from(document.getElementsByClassName("depBtn")).forEach((e) => e.classList.remove("active"))
            document.getElementById("recommendedByTags" + activeModal).style.display = "none"
            document.getElementById("recommendedByDep" + activeModal).style.display = "none"
            document.getElementById("recommendedByDate" + activeModal).style.display = "flex"
            break
        case "dep":
            document.getElementById("recommendedByTags" + activeModal).style.display = "none"
            document.getElementById("recommendedByDep" + activeModal).style.display = "flex"
            document.getElementById("recommendedByDate" + activeModal).style.display = "none"
            break
        case "tags":
            Array.from(document.getElementsByClassName("depBtn")).forEach((e) => e.classList.remove("active"))
            document.getElementById("recommendedByTags" + activeModal).style.display = "flex"
            document.getElementById("recommendedByDep" + activeModal).style.display = "none"
            document.getElementById("recommendedByDate" + activeModal).style.display = "none"
            break
    }
}

function pause (id) {
    var iframe = document.getElementById('video' + id.toString());
    if (iframe) {
        var player = new Vimeo.Player(iframe);
        player.pause()
    }
}

function resume (id, reset = false) {
    var iframe = document.getElementById('video' + id.toString());
    if (iframe) {
        var player = new Vimeo.Player(iframe);
        if (reset) {
            iframe.src = iframe.src + "&autoplay=1"
        }
        player.play()
    }
}

function pauseResume (id, reset = false) {
    var iframe = document.getElementById('video' + id.toString());
    if (iframe) {
        var player = new Vimeo.Player(iframe);
        player.getPaused().then(function (paused) {
            if (paused) {
                resume(id, reset)
            } else {
                pause(id)
            }
        });
    }
}

let swiperContainer = document.getElementById("swiper-wrapper")
let section;
let div;

function createPodcastCard(podcast, id, commonTags = null) {
    let card = document.createElement("div")
    card.classList.add("podcast")
    card.classList.add("col-6")
    card.classList.add("col-md-3")

    let thumbnail = document.createElement("div")
    thumbnail.classList.add("vignette")
    thumbnail.style.backgroundImage = "url('" + "img/thumbnails/" + (id + 1) + ".png')"

    card.appendChild(thumbnail)

    let cardTitle = document.createElement("h6")
    cardTitle.innerHTML = podcast.ShortTitle.replace(/\n/g,"<br>")

    if (commonTags) {
        let tagsDiv = document.createElement("div")
        tagsDiv.classList.add("d-inline-flex")
        tagsDiv.classList.add("tags")

        commonTags.forEach((t) => {
            let span = document.createElement("span")
            span.innerText = t
            tagsDiv.appendChild(span)
        })
        card.appendChild(tagsDiv)
    }

    let city = document.createElement("p")
    city.textContent = podcast.City

    let date = document.createElement("p")
    date.textContent = podcast.Date

    card.appendChild(cardTitle)
    card.appendChild(city)
    card.appendChild(date)
    card.addEventListener("click", function (e) {
        displayPodcastModal(id)
    })

    return card
}

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
        if (stroke) {path.setAttribute("stroke", stroke);}
        if(fill) {path.setAttribute("fill", fill);}
        return path
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

        return rect
    }

    svg.appendChild(drawRect(rect1X, rect1Y, rect1W, rect1H))
    svg.appendChild(drawRect(rect2X, rect2Y, rect2W, rect2H))


    if (clipPathValue) {
        const group = document.createElementNS(svgNamespace, "g");
        group.setAttribute("clip-path", "url(#"+clipPathValue+")");


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

    return svg
}

function createPodcastModal(podcast, id) {
    let modal = document.createElement("div")
    modal.classList.add("podcatsModal")
    modal.classList.add("z-3")
    modal.id = "podcastModal" + id

    let cross = document.createElement("img")
    cross.src = "img/close.png"
    cross.classList.add("cross")
    cross.classList.add("z-3")
    cross.addEventListener("click",function (e) {
        hidePodcastModal(id)
    })
    modal.appendChild(cross)

    if (podcast.VideoLink !== "") {
        let video = document.createElement("div")
        video.classList.add("video-container")
        video.classList.add("z-1")

        let videoIframe = document.createElement("iframe")

        videoIframe.id = "video" + id
        videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
        videoIframe.classList.add("w-100")
        videoIframe.style = "height: calc(100% - 46px)"
        videoIframe.src = "https://player.vimeo.com/video/" + podcast.VideoLink + "?t=0&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&loop=1&controls=0";

        video.appendChild(videoIframe)

        let overlay = document.createElement("div")
        overlay.classList.add("overlay")
        overlay.classList.add("z-2")

        overlay.addEventListener("click", function () {
            pauseResume(id)
        })

        modal.appendChild(video)
        modal.appendChild(overlay)
    }

    let info = document.createElement("div")
    info.classList.add("z-2")
    info.classList.add("modalInfo")
    if (podcast.VideoLink !== "") {
        info.style.marginTop = "100vh"
        info.style.borderTopLeftRadius = "25px"
        info.style.borderTopRightRadius = "25px"
    }

    let title = document.createElement("h1")
    title.innerText = podcast.Title
    info.appendChild(title)


    let city = document.createElement("h6")
    city.innerText = podcast.City
    info.appendChild(city)

    let description = document.createElement("p")
    description.innerText = podcast.Description
    info.appendChild(description)

    let btnA = document.createElement("div")
    btnA.classList.add("podcastLink")

    let a = document.createElement("a")
    a.innerText = "Ecouter le podcast"
    a.target = "_blank"
    a.href = "https://c.estrepublicain.fr/faits-divers-justice/" + podcast.PodcastLink
    btnA.appendChild(a)

    info.appendChild(btnA)

    let svg1 = createSvg("156",
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
        "translate(145.429) rotate(15)")


    svg1.classList.add("svg1")
    svg1.classList.add("z-0")

    info.appendChild(svg1)

    let svg2 = createSvg(
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
        null)

    svg2.classList.add("svg2")
    info.appendChild(svg2)

    let otherCase = document.createElement("h6")
    otherCase.innerText = "Affaires similaires"
    info.appendChild(otherCase)

    let filtersDiv = document.createElement("div")
    filtersDiv.classList.add("d-inline-flex")
    filtersDiv.classList.add("filters")

    let btnDate = document.createElement("button")
    btnDate.classList.add("filterBtn")
    btnDate.innerText = (Math.trunc(podcast.Date/10)).toString() + "0 - " + (Math.trunc(podcast.Date/10) +1 ).toString() + "0"
    btnDate.addEventListener("click", function (e) {
        if (btnDate.classList.contains("active")) {
            btnDate.classList.remove("active")
            displayRecommended("tags")
        } else {
            btnDate.classList.add("active")
            displayRecommended("date")
        }
    })
    filtersDiv.appendChild(btnDate)


    let btnDep = document.createElement("button")
    btnDep.classList.add("filterBtn")
    btnDep.classList.add("depBtn")
    btnDep.innerText = "En " + podcast.Department
    btnDep.addEventListener("click", function (e) {
        if (btnDep.classList.contains("active")) {
            btnDep.classList.remove("active")
            displayRecommended("tags")
        } else {
            btnDep.classList.add("active")
            btnDate.classList.remove("active")
            displayRecommended("dep")
        }
    })
    filtersDiv.appendChild(btnDep)

    info.appendChild(filtersDiv)

    let relatedByTagsDiv = document.createElement("div")
    relatedByTagsDiv.classList.add("row")
    relatedByTagsDiv.id = "recommendedByTags" + id

    let relatedByDateDiv = document.createElement("div")
    relatedByDateDiv.classList.add("row")
    relatedByDateDiv.id = "recommendedByDate" + id

    let relatedByDepDiv = document.createElement("div")
    relatedByDepDiv.classList.add("row")
    relatedByDepDiv.id = "recommendedByDep" + id

    fetch('api/related/' + (id + 1) + '/' + 4 )
        .then(response => {
            // Retourne une erreur s'il y en a une
            if (!response.ok) {
                throw new Error('Erreur d\'import des données');
            }

            // Conversion des données JSON en objet (avec une promesse)
            response.json().then(data => {
                let relatedPodcasts = data.relatedPodcasts
                if (relatedPodcasts.length === 0) {
                    let p = document.createElement("p")
                    p.innerText = "Pas de vidéos."
                    relatedByTagsDiv.appendChild(p)
                }
                relatedPodcasts.forEach((p, idx) => {
                    relatedByTagsDiv.appendChild(createPodcastCard(p.podcast, p.podcast.id - 1, p.commonTags))
                })
            })
        })

    fetch('api/decade/' + (id + 1))
        .then(response => {
            // Retourne une erreur s'il y en a une
            if (!response.ok) {
                throw new Error('Erreur d\'import des données');
            }

            // Conversion des données JSON en objet (avec une promesse)
            response.json().then(data => {
                let relatedPodcasts = data.videos
                if (relatedPodcasts.length === 0) {
                    let p = document.createElement("p")
                    p.innerText = "Pas de vidéos."
                    relatedByDateDiv.appendChild(p)
                }
                relatedPodcasts.forEach((p, idx) => {
                    relatedByDateDiv.appendChild(createPodcastCard(p, p.id - 1))
                })
            })
        })

    fetch('api/department/' + (id + 1))
        .then(response => {
            // Retourne une erreur s'il y en a une
            if (!response.ok) {
                throw new Error('Erreur d\'import des données');
            }

            // Conversion des données JSON en objet (avec une promesse)
            response.json().then(data => {
                let relatedPodcasts = Array.from(data.videos)
                if (relatedPodcasts.length === 0) {
                    let p = document.createElement("p")
                    p.innerText = "Pas de vidéos."
                    relatedByDepDiv.appendChild(p)
                }
                relatedPodcasts.forEach((p, idx) => {
                    relatedByDepDiv.appendChild(createPodcastCard(p, p.id - 1))
                })
            })
        })

    info.appendChild(relatedByTagsDiv)

    info.appendChild(relatedByDateDiv)
    relatedByDateDiv.style.display = "none"

    info.appendChild(relatedByDepDiv)
    relatedByDepDiv.style.display = "none"

    modal.appendChild(info)

    return modal
}

fetch('api/videos')
    .then(response => {
        // Retourne une erreur s'il y en a une
        if (!response.ok) {
            throw new Error('Erreur d\'import des données');
        }

        // Conversion des données JSON en objet (avec une promesse)
        response.json().then(data => {
            podcastsDataset = Array.from(data.videos)
            podcastsDataset.forEach((e, idx) => {
                if ((idx)%8 === 0) {
                    section = document.createElement("section")
                    section.classList.add("swiper-slide")
                    div = document.createElement("div")
                    div.classList.add("row")
                    section.appendChild(div)
                    swiperContainer.appendChild(section)
                }

                div.appendChild(createPodcastCard(e, idx))

                document.getElementById("modals").appendChild(createPodcastModal(e, idx))
            })
        })
    })

function displayPlateformModal () {
    document.getElementById("links").style.display = "block"
    document.getElementById("main").style.display = "none"
}

function hidePlateformModal () {
    document.getElementById("links").style.display = "none"
    document.getElementById("main").style.display = "block"
}

window.addEventListener('load', function () {

    document.getElementById("loader").style.display = "none"
    document.getElementById("main").style.display = "block"

    setTimeout(() => {
        const cards = Array.from(document.getElementsByClassName("card"));

        const maxHeight = cards.reduce((acc, card) => {
            return Math.max(acc, card.clientHeight);
        }, 0);

        cards.forEach(card => {
            card.style.height = maxHeight + "px";
        });
    }, 50);



})

var isVisible = function(element) {
    return $(element).is(':visible');
};


