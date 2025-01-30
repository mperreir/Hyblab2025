import { useEffect, useRef, useState } from 'react';
import CarouselBox from './CarouselBox';
import './MapCarousel.css'

function MapCarousel({ mapRef, points, setSelectedText, setSelectedPOI, setclickedPOI, clickedPOI }) {
    const mapCarouselRef = useRef(null);
    const firstCarouselBoxRef = useRef(null);
    const [activeSnapIndex, setActiveSnapIndex] = useState(0);

    function updateTargetOnScroll() {
        if (firstCarouselBoxRef.current) {
            // Detect scroll snapping on carousel boxes
            const snapIndex = Math.round((mapCarouselRef.current.scrollLeft + (mapCarouselRef.current.offsetWidth / 2)) / (firstCarouselBoxRef.current.offsetWidth)) - 1;
            setActiveSnapIndex(snapIndex);

            // Move the map view to seleted POI
            mapRef.current.scroll({
                left: points[activeSnapIndex].pos[0] - (mapRef.current.offsetWidth / 2),
                top: points[activeSnapIndex].pos[1] - (mapRef.current.offsetHeight / 2),
                behavior: 'smooth'
            });
        }
    }

    return (
        <div className='carousel' ref={mapCarouselRef} onScroll={updateTargetOnScroll}>
            {points.map((point, index) => {
                if (index == 0) {
                    return <CarouselBox key={index} boxRef={firstCarouselBoxRef} mapRef={mapRef} point={point} setSelectedText={setSelectedText} setSelectedPOI={setSelectedPOI} clickedPOI={clickedPOI} setclickedPOI={setclickedPOI}/>;
                } else {
                    return <CarouselBox key={index} mapRef={mapRef} point={point} setSelectedText={setSelectedText} setSelectedPOI={setSelectedPOI} clickedPOI={clickedPOI} setclickedPOI={setclickedPOI} />;
                }
            })}
        </div>
    );
}

export default MapCarousel;
