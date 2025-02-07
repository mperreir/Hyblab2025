import './AnimalInfo.css';
import { useNavigate } from "react-router-dom";

// Small popup that appears beneath the regions map when an animal is clicked
function AnimalInfo({ animal }) {
    const navigate = useNavigate();

    const displayedAnimal = animal ?? {}; // Set to none by default
    
    const goToMap = () => {
        const param = displayedAnimal.name;
        navigate(`/map?animal=${param}`);
    };

    return (
        <div className={`animal-info-parent-container ${animal ? 'visible' : ''}`}>
            <div className='image_container'>
                {animal && <img src={animal.svg}></img>}
            </div>
            <div 
                className={`animal-info-container ${animal ? 'visible' : ''} animal_presentation`} 
            >
                <div className='top_section'>
                    <div className='image_offset'>
                    </div>
                    <div className='text_container'>
                        <h3>{displayedAnimal.fullname}</h3>
                        <h4>{displayedAnimal.departement}</h4>
                    </div>
                </div>
                <div className='bottom_section'>
                    <a onClick={goToMap}>Découvrir</a>
                </div>
            </div>
        </div>
        
    )
}

export default AnimalInfo;
