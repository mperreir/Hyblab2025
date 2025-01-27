import './RegionMap.css';
import { useState, useEffect } from 'react';
import regionMapSVG from '../assets/regionsMap.svg';

function RegionMap({ selectedAnimal, setSelectedAnimal, animals }) {
    const [animateBackground, setAnimateBackground] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateBackground(true);
        }, 100); // Add a small delay before triggering the animation

        // Clean up the timeout on unmount
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this runs only on mount

    const handleAnimalClick = (animalId) => {
        if (selectedAnimal !== animalId) {
          setSelectedAnimal(animalId); // Show info for the selected animal
        }
    };

    return (
        <div className='map_container'>
            <div className={['background_square', 'dark', 'tilted', animateBackground ? 'animate' : ''].join(' ')}></div>
            <div className={['background_square', 'bright', animateBackground ? 'animate' : ''].join(' ')}>
                <img src={regionMapSVG} alt='Carte des régions' className='regions_map'></img>
                <div className='animals_list'>
                    {animals.map((animal) => {
                        return <div 
                            className={['animal', animal.name, selectedAnimal === animal.id ? 'selected' : ''].join(' ')}
                            key={animal.id}
                            onClick={(evt) => handleAnimalClick(animal.id)}
                        >
                            <img src={animal.svg} alt={animal.name} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default RegionMap;
