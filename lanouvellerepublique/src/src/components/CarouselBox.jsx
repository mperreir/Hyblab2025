import './CarouselBox.css'

function CarouselBox({ mapRef, boxRef, point, setSelectedText, setSelectedPOI }) {
    const targetElement = (event) => {
        // Scroll to selected carousel box
        event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    function showDialogue() {
        setSelectedText(point.text);
        setSelectedPOI([point.id, point.img_name]);
    }

    const AnimalIllustration = (imageName) => {
        //pour tester en local, changer "https://hyblab.polytech.univ-nantes.fr/lanouvellerepublique/assets/" par "/src/assets/"
        return (
            <div className="illustration">
                <img src={`https://hyblab.polytech.univ-nantes.fr/lanouvellerepublique/assets/${imageName.imageName}`} alt="POI" /> 
            </div>
        )
    }

    return (
        <div className='carousel-box' ref={boxRef} style={{minWidth: `${0.65* mapRef.current.offsetWidth}px`}} onClick={targetElement}>
            <div className='box-background'>
            </div>
            <AnimalIllustration imageName={point.img_name} />
            <div className='box-main-container'>
                <h3 className='box-title'>{point.id.toString().padStart(2,"0") + ". " + point.title}</h3>
                <p className='box-description'>{point.description}</p>
                <div className='box-button'>
                    <span className='box-button-text' onClick={showDialogue}>Lire</span>
                </div>
            </div>
        </div>
    )
}

export default CarouselBox;
