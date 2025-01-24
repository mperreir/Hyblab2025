import CarouselBox from './CarouselBox';
import './MapCarousel.css'

function MapCarousel() {
    const carouselBoxes = ['box1', 'box2', 'box3'];

    function moveToPoint() {
        // TODO
    }

    return (
        <div className='carousel'>
            {carouselBoxes.map((box, index) =>
                <CarouselBox key={index} title={box} />
            )}
        </div>
    );
}

export default MapCarousel;
