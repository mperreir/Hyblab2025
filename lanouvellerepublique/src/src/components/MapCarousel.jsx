import CarouselBox from './CarouselBox';
import './MapCarousel.css'

function MapCarousel({ points }) {
    return (
        <div className='carousel'>
            {points.map((point, index) =>
                <CarouselBox key={index} title={point.title} description={point.subtitle} pointPosition={point.pos} />
            )}
        </div>
    );
}

export default MapCarousel;
