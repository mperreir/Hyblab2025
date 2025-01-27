import './CarouselBox.css'

function CarouselBox({ mapRef, title, description, pointPosition, boxRef }) {
    const targetElement = (event) => {
        // Scroll to selected carousel box
        event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    return (
        <div className='carousel-box' ref={boxRef} style={{minWidth: `${0.65* mapRef.current.offsetWidth}px`}} onClick={targetElement}>
            <div className='box-background'></div>
            <div className='box-main-container'>
                <h3 className='box-title'>{title}</h3>
                <p className='box-description'>{description}</p>
                <div className='box-button'>
                    <span className='box-button-text'>Lire</span>
                </div>
            </div>
        </div>
    )
}

export default CarouselBox;
