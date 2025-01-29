import "./Credits.css"; // Import the CSS file
import Header from "../components/Header";

import image1 from "../assets/parts/logo_polytech.png";
import image2 from "../assets/parts/logo_agr.png";
import image3 from "../assets/parts/logo_sciencespo.svg";
import image4 from "../assets/parts/logo_nantesmetropole.png";
import image5 from "../assets/parts/logo_nantesuniversite.png";
import image6 from "../assets/parts/logo_oml.png";
import image7 from "../assets/parts/hyblab_2025.png";
import image8 from "../assets/parts/logo_opensource.png";
import image9 from "../assets/parts/logo_cc.png";


const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9]

function Credits() {
    
    function goBigBack() {
        history.back();
    }

    return (
        <>
        <Header titre={"Dans leur peau"} textColor={"black"} isHome={true} />
        <div className="credits-menu">
            <div className="texts">
                <div className="presentation-and-ai">
                    <h2>Notre projet & IA</h2>
                    <p className="ai-text">
                    Cette édition 2025 du Hyblab a été pensée autour de l’intelligence artificielle. Le but : essayer de mobiliser les outils qui existent aujourd’hui à bon escient, pour faciliter notre travail, à la fois dans le design, le code, et l’écriture journalistique. En collaboration avec La Nouvelle République, nous avons pensé un projet qui s’inscrit dans la continuité d’un dossier paru le 14 janvier 2025, sur les espèces menacées en Indre, Indre-et-Loire, Loir-et-Cher, Vienne et Deux-Sèvres. Dans chaque département, nous vous proposons de suivre le quotidien d’un animal totem, classé “espèce menacée” sur la liste rouge de l’UICN, l’Union Internationale de Conservation de la Nature. En vous promenant sur une carte interactive, vous découvrirez les milieux de ces espèces, les menaces auxquelles ils sont confrontés, avant d’atteindre leur havre de paix.Cette édition 2025 du Hyblab a été pensée autour de l’intelligence artificielle. Le but : essayer de mobiliser les outils qui existent aujourd’hui à bon escient, pour faciliter notre travail, à la fois dans le design, le code, et l’écriture journalistique. En collaboration avec La Nouvelle République, nous avons pensé un projet qui s’inscrit dans la continuité d’un dossier paru le 14 janvier 2025, sur les espèces menacées en Indre, Indre-et-Loire, Loir-et-Cher, Vienne et Deux-Sèvres. Dans chaque département, nous vous proposons de suivre le quotidien d’un animal totem, classé “espèce menacée” sur la liste rouge de l’UICN, l’Union Internationale de Conservation de la Nature. En vous promenant sur une carte interactive, vous découvrirez les milieux de ces espèces, les menaces auxquelles ils sont confrontés, avant d’atteindre leur havre de paix.
                    </p>
                </div>
                <div className="authors">
                    <h2>Les auteurs</h2>
                    <div className="row">
                        <div className="porteurs">
                            <h3>Porteurs du projet</h3>
                            <ul className="rows">
                                <li>Delphine Noyon</li>
                                <li>Laurent Gaudens</li>
                            </ul>
                        </div>
                        <div className="journalists">
                            <h3>Journalistes</h3>
                            <ul className="rows">
                                <li>Juliette Rigaud</li>
                                <li>Zoé Diraison</li>
                            </ul>
                        </div>
                        <div className="graphist">
                            <h3>Graphiste</h3>
                            <ul className="rows">
                                <li>Antoine Clavier</li>
                            </ul>
                        </div>
                    </div>
                    <div className="devs">
                        <h3 className="h3d">Développeurs</h3>
                        <ul className="devs-grid">
                            <li>Baptiste Josso</li>
                            <li>Christian Soh</li>
                            <li>Evan Josso</li>
                            <li>Julien Chatry</li>
                            <li>Ulysse Lopez</li>
                        </ul>
                    </div>
                </div>
                <div className="sponsors">
                    <div className="allimages">
                    {images.map((image, index) => (
                        <img className="image" key={index} src={image} alt={`Image ${index + 1}`} />
                    ))}
                    </div>
                </div>
            </div>
            <div className='big-back-button' onClick={goBigBack}>
                <svg width="87" height="27" viewBox="0 0 87 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.97861 6.63559L82.5802 0L87 27H0L6.97861 6.63559Z" fill="url(#paint0_radial_286_1430)" />
                    <path d="M13 18L32.5 18.5V17H11L15.5 23L16.5 21.5L13 18Z" fill="black" />
                    <path d="M13 16L32.5 15.5V17H11L15.5 11L16.5 12.5L13 16Z" fill="black" />
                    <path d="M43.054 20.28L40.226 17.13L39.078 20.28L37.286 19.51L40.156 12.188L39.904 11.208C41.5 10.536 43.572 10.27 45.266 10.2L46.344 12.37C45.854 14.19 44.454 15.856 42.284 16.752L44.398 18.964L43.054 20.28ZM40.716 15.786C42.83 15.198 44.272 13.84 44.776 11.726L41.99 12.356L40.716 15.786ZM50.633 19.16L47.161 20.294L45.607 19.384C45.439 16.192 47.077 13.616 49.261 13.196L51.529 14.106L50.633 17.06L47.637 17.648C47.525 18.012 47.455 18.39 47.441 18.768L50.367 17.998L50.633 19.16ZM47.931 16.85L49.415 16.5L49.863 14.414H49.849C49.051 14.96 48.365 15.814 47.931 16.85ZM55.669 19.384L52.869 20.294L51.329 19.384L53.177 14.666H52.393L52.617 13.616H53.597L54.367 11.67L56.019 12.314L55.529 13.616H57.083L56.747 14.666H55.123L53.625 18.684L55.361 18.18L55.669 19.384ZM56.6819 19.342C56.5139 16.164 58.0959 13.588 60.1679 13.196L62.9399 14.316C63.0099 17.466 61.4279 19.888 59.3979 20.28L56.6819 19.342ZM59.1319 19.062C60.1959 18.054 60.9239 16.444 61.1479 14.848L60.3639 14.498C59.2859 15.562 58.5299 17.27 58.3759 18.768L59.1319 19.062ZM68.4934 20.28L66.8974 19.566L67.8914 16.178C66.9534 17.802 65.8194 19.454 64.6994 20.28L63.0614 19.342L64.9934 13.21L66.7574 13.966C66.5754 15.142 65.9874 16.654 65.0774 18.208L65.6514 18.502L68.9414 13.294L70.5094 13.812L68.4934 20.28ZM75.0659 20.28L73.1759 19.622C73.3859 18.404 73.9879 16.738 74.7719 15.366H73.4839L71.2299 20.28L69.9139 19.762L72.2379 15.338L71.6499 14.484L72.6439 12.594L73.9039 12.874L73.7079 14.624C74.3519 13.98 75.0239 13.49 75.6539 13.196L76.8999 14.372C76.0599 16.374 75.4859 18.292 75.0659 20.28Z" fill="black" />
                    <defs>
                        <radialGradient id="paint0_radial_286_1430" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(43.5 13.5) scale(158.787 49.2787)">
                            <stop offset="0.266423" stopColor="#EFD8B8" />
                            <stop offset="1" stopColor="#897C69" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </div>
        </>
    )
}

export default Credits;