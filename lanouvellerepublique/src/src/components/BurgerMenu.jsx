import { useEffect, useRef, useState } from 'react';
import './BurgerMenu.css';
import { useNavigate } from "react-router-dom";
import anime from 'animejs';

function BurgerMenu({ isMenuOpen, setIsMenuOpen }) {
    const [isClosing, setIsClosing] = useState(false);

    const navigate = useNavigate();
    let menuRef = useRef(null);

    function goHome() {
        navigate("/");
        setIsMenuOpen(false);
    }
    function goArticles() {
        window.open("https://www.lanouvellerepublique.fr/environnement/nos-animaux-en-danger", "_blank");
    }
    function goCarte() {
        navigate("/regions");
        setIsMenuOpen(false);
    }
    function goCredits() {
        navigate("/credits");
        setIsMenuOpen(false);
    }

    const animDuration = 250;

    useEffect(() => {
        if (isMenuOpen && menuRef.current && !isClosing) {
            anime({
                targets: menuRef.current,
                translateX: ['100%', '0%'],
                duration: animDuration,
                easing: 'easeOutQuad',
            });
        } else if (isMenuOpen && menuRef.current && isClosing) {
            anime({
                targets: menuRef.current,
                translateX: ['0%', '100%'],
                duration: animDuration,
                easing: 'easeInQuad',
            });
        }
    }, [isMenuOpen, isClosing]);

    function closeMenu(){
        setIsClosing(true);
        setTimeout(() => {
            setIsMenuOpen(false);
            setIsClosing(false);
        }, animDuration);
    }

    return (
        <div ref={menuRef} className={`burger-menu ${isMenuOpen ? 'open' : ''}`}>
            {isMenuOpen ? (
                <div className='button-burger-menu'>
                    <div className="home-button" onClick={goHome}>Accueil</div>
                    <div className="carte-button" onClick={goCarte}>Carte</div>
                    <div className="articles-button" onClick={goArticles}>Article</div>
                    <div className="credits-button" onClick={goCredits}>Crédits</div>
                    <div className='cross-button' onClick={closeMenu}>
                        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5144 50.4363L55.4019 18.5144L59.1262 22.2386L22.948 59.8355L18.5144 50.4363Z" fill="black" />
                            <path d="M14.4388 22.4488L53.0998 57.5629L58.0654 52.5973L27.3849 19.7886L14.4388 22.4488Z" fill="black" />
                        </svg>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default BurgerMenu;
