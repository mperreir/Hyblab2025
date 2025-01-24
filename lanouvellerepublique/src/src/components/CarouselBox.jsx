import './CarouselBox.css'

function CarouselBox({ title, description, pointPosition }) {
    const targetElement = (event) => {
        event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        console.log(`Moving to point: (${pointPosition[0]},${pointPosition[1]})`);
    }

    return (
        <div className='carousel-box' onClick={targetElement}>
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
