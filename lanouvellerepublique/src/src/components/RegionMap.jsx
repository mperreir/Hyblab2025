import './RegionMap.css';
import { useState, useEffect } from 'react';

function RegionMap({ selectedAnimal, setSelectedAnimal, animals }) {
    const [animateBackground, setAnimateBackground] = useState(false);

    // Trigger the animation when the component mounts
    useEffect(() => {
        // This ensures that the state updates after the component is mounted
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
            <div className={['background_square', 'bright', animateBackground ? 'animate' : ''].join(' ')}></div>
            <div className='animals_list'>
                {animals.map((animal) => {
                    return <div 
                        className='animal'
                        key={animal.id}
                        onClick={() => handleAnimalClick(animal.id)}
                    >
                        <img src={animal.svg} alt={animal.name} />
                        <h3>{animal.fullname}</h3>
                    </div>
                })}
            </div>
        </div>
    )
}

export default RegionMap;
