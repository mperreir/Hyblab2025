import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useBasename from '../hooks/useBasenameHook';
import ImageModal from '../components/ImageModal';

const TransitionPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const basename = useBasename();
    const [showModal, setShowModal] = React.useState(false);

    // Récupérer les valeurs passées via navigate
    const finalScore = parseInt(localStorage.getItem("score")) || 0;
    // const difficulty = location.state?.difficulty || 1;

    let { level_id, difficulty } = useParams();

    const transition_data = [
        {
            id: 1,
            card_image: `${basename}images/Etape 2/map_etape2.png`,
            maillot_image: `${basename}images/illustrations/MAILLOT_BLANC.png`,
            paragraph1: "Félicitations, vous avez terminé la première étape de la 112e édition du Tour de France. Votre performance vous vaut le premier maillot, bravo !",
            paragraph2: "Mais l’aventure ne s’arrête pas là !",
            paragraph3: "Place désormais à la deuxième étape qui vous mènera de Lauwin-Planque à Boulogne-sur-mer.",
            paragraph4: "Bonne chance pour décrocher votre deuxième maillot !",
            button_text: "ÉTAPE SUIVANTE",
            navigate_to: `/start/${difficulty}/2`
        },
        {
            id: 2,
            card_image: `${basename}images/Etape 3/map_etape3.png`,
            maillot_image: `${basename}images/illustrations/maillot_vert.png`,
            paragraph1: "Félicitations, vous avez terminé la première étape de la 112e édition du Tour de France. Votre performance vous vaut le premier maillot, bravo !",
            paragraph2: "Mais l’aventure ne s’arrête pas là !",
            paragraph3: "Place désormais à la troisième étape qui vous mènera de Lauwin-Planque à Boulogne-sur-mer.",
            paragraph4: "Bonne chance pour décrocher votre troisième maillot !",
            button_text: "ÉTAPE SUIVANTE",
            navigate_to: `/start/${difficulty}/3`
        },
        {
            id: 3,
            card_image: null,
            maillot_image: `${basename}images/illustrations/mallot_jaune.png`,
            paragraph1: "Félicitations, vous avez franchi la ligne d’arrivée de cette dernière étape ! Après avoir traversé les paysages et les trésors du Nord-Pas-de-Calais, vous décrochez le troisième maillot et complétez votre collection. Votre parcours a été remarquable, et votre temps final, transformé en chrono fictif",
            paragraph2: "Votre Tour de France s’achève ici !",
            paragraph3: "À Dunkerque, sur une note triomphale. Vous avez prouvé que l’Histoire et la culture de la région n’ont plus de secrets pour vous.",
            paragraph4: null,
            button_text: "TERMINER",
            navigate_to: `/credit`
        }
    ]

    const [currentTransition, setCurrentTransition] = React.useState(transition_data[parseInt(level_id) - 1]);


    // Convertir le score en minutes et secondes
    const minutes = Math.floor(finalScore / 60);
    const seconds = finalScore % 60;

    return (
        <div className="start_page_bg w-100 position-relative"
            style={{ zIndex: 2 }}>
            <div className="mt-84 text-center">
                <h1 className="text-white">FÉLICITATIONS</h1>

                {Boolean(currentTransition.card_image) && (<ImageModal
                    imageSrc={currentTransition.card_image}
                    altText={`Carte étape ${currentTransition.id}`}
                    showModal={showModal}
                    onClose={setShowModal}
                />)}

                <div className="mx-3 p-3 fs-6 position-relative">
                    <img
                        src={currentTransition.maillot_image}
                        className="position-absolute top-50 start-50 translate-middle opacity-25"
                        style={{ objectFit: 'cover', zIndex: -1 }}
                        alt="Maillot en arrière-plan"
                    />

                    <p>
                        {currentTransition.paragraph1}
                    </p>

                    <p className=""><b>Score :</b> {minutes} minute{minutes !== 1 ? "s" : ""} et {seconds} seconde{seconds !== 1 ? "s" : ""}</p>
    
                    <p className="fw-bold">
                        {currentTransition.paragraph2}
                    </p>
                    <p>
                        {currentTransition.paragraph3}
                    </p>
                    <p className="fw-bold">
                        {currentTransition.paragraph4}
                    </p>
                </div>

                <button onClick={() => navigate(currentTransition.navigate_to)}
                    className="btn btn-outline-dark fw-bold mx-5"
                >
                    {currentTransition.button_text}
                </button>

            </div>
        </div>
    );
};


export default TransitionPage;
