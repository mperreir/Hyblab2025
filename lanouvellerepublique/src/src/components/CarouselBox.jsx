import './CarouselBox.css'
import { useState, useEffect } from "react";

const images = import.meta.glob("../assets/POI_images/*.svg");
async function getImage(fileName) {
    const matchedPath = Object.keys(images).find((path) => path.endsWith(fileName));
    return matchedPath ? (await images[matchedPath]()).default : null;
}

const AnimalIllustration = ({ imageName }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        let isMounted = true; // Prevent state updates if the component unmounts
        if (imageName) {
            getImage(imageName).then((src) => {
                if (isMounted) setImageSrc(src);
            });
        }
        return () => {
            isMounted = false; // Cleanup function
        };
    }, [imageName]);  // Only runs when imageName changes

    return (
        <div className="illustration">
            {imageSrc ? <img src={imageSrc} alt="POI" /> : <p>Loading...</p>}
        </div>
    );
};


// Carousel menu on the bottom of the scrollable map
function CarouselBox({ mapRef, boxRef, point, setSelectedText, setSelectedPOI, setclickedPOI, clickedPOI }) {
    const targetElement = (event) => {
        // Scroll to selected carousel box
        event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    function showDialogue() {
        setSelectedText(point.text);
        setSelectedPOI([point.id, point.img_name, point.title, point.pos_img, point.icon_pos]);
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
                    <span className='box-button-text' onClick={() => {
                        setclickedPOI(clickedPOI.map((element, idx) => {
                            if (idx == point.id-1) return true;
                            return element;
                        }));
                        showDialogue()
                        }}>Explorer</span>
                </div>
            </div>
        </div>
    )
}

export default CarouselBox;
