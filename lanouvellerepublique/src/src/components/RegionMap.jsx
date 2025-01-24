import './RegionMap.css';
import { useState, useEffect } from 'react';

function RegionMap({ selectedAnimal, setSelectedAnimal, animals }) {
    const [animateBackground, setAnimateBackground] = useState(false);

    // Trigger the animation when the component mounts
    useEffect(() => {
        setAnimateBackground(true);
    }, []); // Only runs once when the component is mounted

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
