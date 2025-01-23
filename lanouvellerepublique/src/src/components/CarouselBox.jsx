import './CarouselBox.css'

function CarouselBox({ title, description, buttonText, clickHandler }) {
    const scrollToElement = (event) => {
        event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }

    return (
        <div className='carousel-box' onClick={scrollToElement}>
            <div className='box-background'></div>
            <div className='box-main-container'>
                <h3 className='box-title'>{title}</h3>
                <p className='box-description'>T'as cliqué sur mon profil ? Laisse moi t'en dire un peu plus</p>
                <div className='box-button'>
                    <span className='box-button-text'>Explore</span>
                </div>
            </div>
        </div>
    )
}

export default CarouselBox;
