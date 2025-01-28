import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useBasename from '../hooks/useBasenameHook';
import './TransitionPage.css';
import ImageModal from '../components/ImageModal';

const TransitionPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const basename = useBasename();
    const [showModal, setShowModal] = React.useState(false);

    // Récupérer les valeurs passées via navigate
    const finalScore = parseInt(localStorage.getItem("score")) || 0;
    // const difficulty = location.state?.difficulty || 1;

    // Convertir le score en minutes et secondes
    const minutes = Math.floor(finalScore / 60);
    const seconds = finalScore % 60;

    let { level_id, difficulty } = useParams();

    const transition_data = [
        {
            id: 1,
            card_image: `${basename}images/Etape 2/map_etape2.png`,
            maillot_image_bg: `${basename}images/illustrations/bg_transition_blanc.png`,
            maillot_image_icon: `${basename}images/illustrations/bg_transition_blanc_horloge.png`,
            maillot_image: `${basename}images/illustrations/maillot_blanc2.png`,
            paragraph1: `Félicitations, vous avez terminé la première étape de la 112e édition du Tour de France en ${minutes} minute${minutes !== 1 ? 's' : ''} et ${seconds} seconde${seconds !== 1 ? 's' : ''}. Votre performance vous vaut le premier maillot, bravo !`,
            paragraph2: "Mais l’aventure ne s’arrête pas là !",
            paragraph3: "Place désormais à la deuxième étape qui vous mènera de Lauwin-Planque à Boulogne-sur-mer.",
            paragraph4: "Bonne chance pour décrocher votre deuxième maillot !",
            button_text: "ÉTAPE SUIVANTE",
            navigate_to: `/start/${difficulty}/2`,
            color: "#1A3347"
        },
        {
            id: 2,
            card_image: `${basename}images/Etape 3/map_etape3.png`,
            maillot_image_bg: `${basename}images/illustrations/bg_transition_vert.png`,
            maillot_image_icon: `${basename}images/illustrations/bg_transition_vert_horloge.png`,
            maillot_image: `${basename}images/illustrations/maillot_vert.png`,
            paragraph1: `Vous l’avez fait ! En franchissant la ligne d’arrivée de la deuxième étape, vous décrochez un deuxième maillot et poursuivez votre quête avec brio. Vous avez couru la deuxième étape en ${minutes} minute${minutes !== 1 ? 's' : ''} et ${seconds} seconde${seconds !== 1 ? 's' : ''}.`,
            paragraph2: "Mais l’aventure ne s’arrête pas là !",
            paragraph3: "Il reste un dernier défi à relever : le gain du troisième et dernier maillot.",
            paragraph4: "À vous d’écrire la dernière page de votre épopée.",
            button_text: "ÉTAPE SUIVANTE",
            navigate_to: `/start/${difficulty}/3`,
            color: "#607F00"
        },
        {
            id: 3,
            card_image: null,
            maillot_image_bg: `${basename}images/illustrations/bg_transition_jaune.png`,
            maillot_image: `${basename}images/illustrations/mallot_jaune.png`,
            maillot_image_icon: `${basename}images/illustrations/bg_transition_jaune_horloge.png`,
            paragraph1: `Félicitations, vous avez franchi la ligne d’arrivée de cette dernière étape ! Vous décrochez le troisième maillot. Votre parcours a été remarquable, et votre temps final, transformé en chrono fictif, est de ${minutes} minute${minutes !== 1 ? 's' : ''} et ${seconds} seconde${seconds !== 1 ? 's' : ''}.`,
            paragraph2: "Votre Tour de France s’achève ici !",
            paragraph3: "À Dunkerque, sur une note triomphale. Vous avez prouvé que l’Histoire et la culture de la région n’ont plus de secrets pour vous.",
            paragraph4: null,
            button_text: "TERMINER",
            navigate_to: `/credit`,
            color: "#ED8422"
        }
    ];

    const [currentTransition, setCurrentTransition] = React.useState(transition_data[parseInt(level_id) - 1]);


    return (
        <div className="transition_bg"
            style={{
                backgroundImage: `url(${currentTransition.maillot_image_bg})`
            }}
            >
            <div className="arbre"></div>
            <div className="mt-76 text-center">
                <h1 className="text-white">FÉLICITATIONS</h1>
                <img src={currentTransition.maillot_image_icon}
                    alt="maillot"
                    className="maillot_icon"
                    style={{
                        height: '70px', objectFit: 'scale-down',
                        marginTop: '40px',
                        color: currentTransition.color
                    }} />

                <div className="p-5 pt-1 mt-2 fs-6 position-relative" style={{}}>
                    <p style={{ color: currentTransition.color }}><b>{minutes} minute{minutes !== 1 ? "s" : ""} et {seconds} seconde{seconds !== 1 ? "s" : ""} !</b></p>

                    <p style={{}}>
                        {currentTransition.paragraph1}
                    </p>

                    <img src={currentTransition.maillot_image}
                        alt="maillot"
                        className="maillot_icon"
                        style={{
                            height: '150px', objectFit: 'scale-down',
                            color: currentTransition.color
                        }} />

                    <p className="fw-bold mt-2" style={{ color: currentTransition.color }}>
                        {currentTransition.paragraph2}
                    </p>
                    <p style={{}}>
                        {currentTransition.paragraph3}
                    </p>
                    <p className="fw-bold" style={{ color: currentTransition.color }}>
                        {currentTransition.paragraph4}
                    </p>


                    <button onClick={() => navigate(currentTransition.navigate_to)}
                        className="btn btn-outline-light fw-bold mx-2"
                        style={{
                            borderColor: currentTransition.color,
                            color: currentTransition.color
                        }}
                    >
                        {currentTransition.button_text}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default TransitionPage;
