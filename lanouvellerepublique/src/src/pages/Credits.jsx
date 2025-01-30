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
        <Header textColor={"black"} isHome={true} />
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
            <path d="M6.97861 6.63559L82.5802 0L87 27H0L6.97861 6.63559Z" fill="url(#paint0_radial_852_11290)"/>
            <path d="M13 18L32.5 18.5V17H11L15.5 23L16.5 21.5L13 18Z" fill="black"/>
            <path d="M13 16L32.5 15.5V17H11L15.5 11L16.5 12.5L13 16Z" fill="black"/>
            <path d="M46.2393 20.7808H43.8081L40.9771 17.3467V20.7808H38.7681V10.8975H42.2529C43.3574 10.8975 44.1974 11.1704 44.7729 11.7163C45.3527 12.2622 45.6426 13.0557 45.6426 14.0967C45.6426 14.9261 45.4479 15.6074 45.0586 16.1406C44.6735 16.6696 44.1191 17.0208 43.3955 17.1943L46.2393 20.7808ZM43.4336 14.2173C43.4336 13.409 43.0168 13.0049 42.1831 13.0049H40.9771V15.4233H42.1831C43.0168 15.4233 43.4336 15.0213 43.4336 14.2173ZM53.3804 16.604H48.6641V17.3086C48.6641 18.3242 49.0957 18.832 49.959 18.832C50.3779 18.832 50.6826 18.7241 50.873 18.5083C51.0677 18.2882 51.1883 17.9412 51.2349 17.4673H53.3804C53.2365 19.6763 52.0918 20.7808 49.9463 20.7808C48.8883 20.7808 48.0526 20.474 47.439 19.8604C46.8254 19.2467 46.5186 18.4089 46.5186 17.3467V14.979C46.5186 13.9168 46.8254 13.0811 47.439 12.4717C48.0526 11.8581 48.8883 11.5513 49.9463 11.5513C51.0212 11.5513 51.8612 11.8433 52.4663 12.4272C53.0757 13.0112 53.3804 13.8237 53.3804 14.8647V16.604ZM49.959 13.354C49.0957 13.354 48.6641 13.8618 48.6641 14.8774V15.0234H51.2349V14.7505C51.2349 14.2977 51.1248 13.9528 50.9048 13.7158C50.6847 13.4746 50.3695 13.354 49.959 13.354ZM59.2012 14.6934H57.4429V17.5688C57.4429 18.009 57.5339 18.3306 57.7158 18.5337C57.8978 18.7326 58.1877 18.832 58.5854 18.832H59.2012V20.7808H58.3569C57.2694 20.7808 56.4844 20.5269 56.002 20.019C55.5238 19.5112 55.2847 18.7072 55.2847 17.6069V14.6934H54.2881V12.6558H55.2847V10.8975H57.4429V12.6558H59.2012V14.6934ZM66.0566 19.0859C65.4388 19.6953 64.6051 20 63.5557 20C62.5062 20 61.6725 19.6953 61.0547 19.0859C60.4368 18.4766 60.1279 17.6366 60.1279 16.5659V15.7598C60.1279 14.6891 60.4368 13.8512 61.0547 13.2461C61.6725 12.6367 62.5062 12.332 63.5557 12.332C64.6051 12.332 65.4388 12.6367 66.0566 13.2461C66.6787 13.8512 66.9897 14.6891 66.9897 15.7598V16.5659C66.9897 17.6366 66.6787 18.4766 66.0566 19.0859ZM63.5557 18.0513C63.9704 18.0513 64.2878 17.9243 64.5078 17.6704C64.7321 17.4123 64.8442 17.0314 64.8442 16.5278V15.9058C64.8442 15.4022 64.7321 15.0213 64.5078 14.7632C64.2878 14.5008 63.9704 14.3696 63.5557 14.3696C63.1367 14.3696 62.8172 14.5008 62.5972 14.7632C62.3813 15.0213 62.2734 15.4022 62.2734 15.9058V16.5278C62.2734 17.0314 62.3813 17.4123 62.5972 17.6704C62.8172 17.9243 63.1367 18.0513 63.5557 18.0513ZM72.3408 12.332H74.4863V20.7808H72.3408V19.5557C71.8669 19.8519 71.3781 20 70.8745 20C69.9985 20 69.3172 19.7355 68.8306 19.2065C68.3439 18.6776 68.1006 17.9285 68.1006 16.9595V12.332H70.2588V16.8643C70.2588 17.6556 70.5973 18.0513 71.2744 18.0513C71.613 18.0513 71.8753 17.9497 72.0615 17.7466C72.2477 17.5435 72.3408 17.2536 72.3408 16.877V12.332ZM79.7993 12.332C80.0786 12.332 80.3177 12.349 80.5166 12.3828V14.4331H80.0342C79.4163 14.4331 78.9297 14.6003 78.5742 14.9346C78.223 15.2689 78.0474 15.783 78.0474 16.4771V20H75.8892V11.5513H78.0474V13.043C78.4832 12.569 79.0672 12.332 79.7993 12.332Z" fill="black"/>
            <defs>
            <radialGradient id="paint0_radial_852_11290" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(43.5 13.5) scale(158.787 49.2787)">
            <stop offset="0.266423" stopColor="#EFD8B8"/>
            <stop offset="1" stopColor="#897C69"/>
            </radialGradient>
            </defs>
            </svg>
            </div>
        </div>
        </>
    )
}

export default Credits;