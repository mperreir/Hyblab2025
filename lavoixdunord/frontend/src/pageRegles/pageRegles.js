import React from 'react';
import './pageRegles.css';
import { useNavigate } from "react-router-dom";
import useBasename from '../hooks/useBasenameHook';


const RulesPage = () => {
    const navigate = useNavigate(); // Initialisation de navigate
    const basename = useBasename(); // Initialisation de basename

    const [treePosition, setTreePosition] = React.useState(0);

    // Calculer la position de l'arbre par rapport au bord gauche
    React.useEffect(() => {
        const calculatePosition = () => {
            const button = document.querySelector('.btn-outline-dark');
            if (button) {
                const buttonRect = button.getBoundingClientRect();
                const leftPosition = buttonRect.left;
                setTreePosition(-leftPosition);
            }
        };

        calculatePosition();
        window.addEventListener('resize', calculatePosition);
        return () => window.removeEventListener('resize', calculatePosition);
    }, []);

    return (
        <>
            <div className="background_rules">
                <div className="text-center p-4 mt-5">
                    <h1 className="text-white mb-4">LES RÈGLES</h1>
                    <div className="my-4">&nbsp;</div>
                    <div className="">
                        <p className='pt-2 position-relative'>
                            <img src={`${basename}images/illustrations/bgreglevelo.png`} alt="velo" className="regle_velo" />

                            <i><b>Dans le Défi des 3 maillots, chaque étape est jalonnée de questions sur les lieux marquants traversés par le parcours du Tour de France. </b></i></p>

                        <p>Votre objectif est simple : récolter les trois maillots en répondant aux questions sur l’histoire et le patrimoine de la région.
                            Une bonne réponse vous permet de continuer sans pénalité, tandis qu’une mauvaise réponse vous fait progresser, mais avec une pénalité de temps.</p>
                        <p>Si vous avez besoin d’aide, des indices sont à votre disposition. L’utilisation de l’indice 1 vous ralentit de 5 secondes, l’indice 2 vous fait perdre 10 secondes.</p>

                        <p><i><b>L’objectif final est de récolter les trois maillots en réussissant les trois étapes. Vous débloquez un maillot à la fin de chaque étape.</b></i></p>
                    </div>

                    <button className="btn btn-outline-dark  mt-4 position-relative" onClick={() => navigate("/difficulty")}>
                        <img src={`${basename}images/illustrations/arbre2.gif`}
                            alt="arbre_orange"
                            style={{
                                position: 'absolute',
                                left: `${treePosition}px`,
                                width: `${Math.min(80, -treePosition)}px`,
                                transform: 'translateY(-50%)',
                                top: '50%',
                                objectFit: 'scale-down'
                            }} />
                        <b>SUIVANT</b></button>
                    <div className="my-4">&nbsp;</div>
                </div>

            </div>
        </>
    );
};

export default RulesPage;
