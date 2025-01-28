"use strict";

const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let activeModal = -1;

let podcastsDataset = [];

let scrollCoor = [0, 0]

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
            iframe.src = iframe.src
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
                let podcast = document.createElement("div")
                podcast.classList.add("podcast")
                podcast.classList.add("col-6")
                podcast.classList.add("col-md-3")
                let vignette = document.createElement("div")
                vignette.classList.add("vignette")
                if (idx + 1 < 34) {
                    vignette.style.backgroundImage = "url('" + "img/thumbnails/" + (idx + 1) + ".png')"
                }
                podcast.appendChild(vignette)
                let h6 = document.createElement("h6")
                h6.textContent = e.ShortTitle
                let ville = document.createElement("p")
                ville.textContent = e.City
                let date = document.createElement("p")
                date.textContent = e.Date

                podcast.appendChild(h6)
                podcast.appendChild(ville)
                podcast.appendChild(date)
                podcast.addEventListener("click", function (e) {
                    displayPodcastModal(idx)
                })
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

                if (e.VideoLink !== "") {
                    let video = document.createElement("div")
                    video.classList.add("video-container")
                    video.classList.add("z-1")

                    let videoIframe = document.createElement("iframe")

                    videoIframe.id = "video" + idx
                    videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                    videoIframe.classList.add("w-100")
                    videoIframe.style = "height: calc(100% - 46px)"
                    videoIframe.src = "https://player.vimeo.com/video/" + e.VideoLink + "?t=0&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1&loop=1&controls=0";



                    video.appendChild(videoIframe)

                    let overlay = document.createElement("div")
                    overlay.classList.add("overlay")
                    overlay.classList.add("z-2")

                    overlay.addEventListener("click", function () {
                        pauseResume(idx)
                    })

                    modal.appendChild(video)
                    modal.appendChild(overlay)
                }

                let info = document.createElement("div")
                info.classList.add("z-2")
                info.classList.add("modalInfo")
                if (e.VideoLink !== "") {
                    info.style.marginTop = "100vh"
                    info.style.borderTopLeftRadius = "25px"
                    info.style.borderTopRightRadius = "25px"
                }

                let title = document.createElement("h1")
                title.innerText = e.Title
                info.appendChild(title)


                let city = document.createElement("h6")
                city.innerText = e.City
                info.appendChild(city)

                let description = document.createElement("p")
                description.innerText = e.Description
                info.appendChild(description)

                let btnA = document.createElement("div")
                btnA.classList.add("podcastLink")

                let a = document.createElement("a")
                a.innerText = "Ecouter le podcast"
                a.href = "https://c.estrepublicain.fr/faits-divers-justice/" + e.PodcastLink
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
                svg1.classList.add("z-0")


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

                let filtersDiv = document.createElement("div")
                filtersDiv.classList.add("d-inline-flex")
                filtersDiv.classList.add("filters")

                let btnDate = document.createElement("button")
                btnDate.classList.add("filterBtn")
                btnDate.innerText = (Math.trunc(e.Date/10)).toString() + "0 - " + (Math.trunc(e.Date/10) +1 ).toString() + "0"
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
                btnDep.innerText = "En " + e.Department
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
                relatedByTagsDiv.id = "recommendedByTags" + idx

                let relatedByDateDiv = document.createElement("div")
                relatedByDateDiv.classList.add("row")
                relatedByDateDiv.id = "recommendedByDate" + idx

                let relatedByDepDiv = document.createElement("div")
                relatedByDepDiv.classList.add("row")
                relatedByDepDiv.id = "recommendedByDep" + idx

                fetch('api/related/' + (idx + 1) + '/' + 4 )
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
                            relatedPodcasts.forEach((p) => {
                                let relatedP = document.createElement("div")
                                relatedP.classList.add("podcast")
                                relatedP.classList.add("col-6")
                                relatedP.classList.add("col-md-3")

                                relatedP.addEventListener("click", function (e) {
                                    displayPodcastModal(p.podcast.id - 1)
                                })


                                let relatedVignette = document.createElement("div")
                                relatedVignette.classList.add("vignette")
                                if (p.podcast.id < 34) {
                                    relatedVignette.style.backgroundImage = "url('" + "img/thumbnails/" + (p.podcast.id) + ".png')"
                                }
                                relatedP.appendChild(relatedVignette)

                                let relatedH6 = document.createElement("h6")
                                relatedH6.textContent = p.podcast.ShortTitle
                                relatedP.appendChild(relatedH6)

                                let tagsDiv = document.createElement("div")
                                tagsDiv.classList.add("d-inline-flex")
                                tagsDiv.classList.add("tags")

                                p.commonTags.forEach((t) => {
                                    let span = document.createElement("span")
                                    span.innerText = t
                                    tagsDiv.appendChild(span)
                                })
                                relatedP.appendChild(tagsDiv)

                                let relatedVille = document.createElement("p")
                                relatedVille.textContent = p.podcast.City
                                relatedP.appendChild(relatedVille)

                                let relatedDate = document.createElement("p")
                                relatedDate.textContent = p.podcast.Date
                                relatedP.appendChild(relatedDate)

                                relatedByTagsDiv.appendChild(relatedP)
                            })
                        })
                    })

                fetch('api/decade/' + (idx + 1))
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
                            relatedPodcasts.forEach((p) => {
                                let relatedP = document.createElement("div")
                                relatedP.classList.add("podcast")
                                relatedP.classList.add("col-6")
                                relatedP.classList.add("col-md-3")

                                relatedP.addEventListener("click", function (e) {
                                    displayPodcastModal(p.id - 1)
                                })


                                let relatedVignette = document.createElement("div")
                                relatedVignette.classList.add("vignette")
                                if (p.id < 34) {
                                    relatedVignette.style.backgroundImage = "url('" + "img/thumbnails/" + (p.id) + ".png')"
                                }
                                relatedP.appendChild(relatedVignette)

                                let relatedH6 = document.createElement("h6")
                                relatedH6.textContent = p.ShortTitle
                                relatedP.appendChild(relatedH6)

                                let tagsDiv = document.createElement("div")
                                tagsDiv.classList.add("d-inline-flex")
                                tagsDiv.classList.add("tags")

                                let relatedVille = document.createElement("p")
                                relatedVille.textContent = p.City
                                relatedP.appendChild(relatedVille)

                                let relatedDate = document.createElement("p")
                                relatedDate.textContent = p.Date
                                relatedP.appendChild(relatedDate)

                                relatedByDateDiv.appendChild(relatedP)
                            })
                        })
                    })

                fetch('api/department/' + (idx + 1))
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
                            relatedPodcasts.forEach((p) => {
                                let relatedP = document.createElement("div")
                                relatedP.classList.add("podcast")
                                relatedP.classList.add("col-6")
                                relatedP.classList.add("col-md-3")

                                relatedP.addEventListener("click", function (e) {
                                    displayPodcastModal(p.id - 1)
                                })


                                let relatedVignette = document.createElement("div")
                                relatedVignette.classList.add("vignette")
                                relatedP.appendChild(relatedVignette)

                                let relatedH6 = document.createElement("h6")
                                relatedH6.textContent = p.ShortTitle
                                relatedP.appendChild(relatedH6)

                                let tagsDiv = document.createElement("div")
                                tagsDiv.classList.add("d-inline-flex")
                                tagsDiv.classList.add("tags")

                                let relatedVille = document.createElement("p")
                                relatedVille.textContent = p.City
                                relatedP.appendChild(relatedVille)

                                let relatedDate = document.createElement("p")
                                relatedDate.textContent = p.Date
                                relatedP.appendChild(relatedDate)

                                relatedByDepDiv.appendChild(relatedP)
                            })
                        })
                    })

                info.appendChild(relatedByTagsDiv)

                info.appendChild(relatedByDateDiv)
                relatedByDateDiv.style.display = "none"

                info.appendChild(relatedByDepDiv)
                relatedByDepDiv.style.display = "none"

                modal.appendChild(info)

                document.getElementById("modals").appendChild(modal)
            })
        })
    })

function displayPlateformModal () {
    document.getElementById("links").style.display = "block"
}

function hidePlateformModal () {
    document.getElementById("links").style.display = "none"
}