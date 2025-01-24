import './RegionMap.css';

function RegionMap({ selectedAnimal, setSelectedAnimal, animals }) {
    const handleAnimalClick = (animalId) => {
        if (selectedAnimal !== animalId) {
          setSelectedAnimal(animalId); // Show info for the selected animal
        }
    };

    return (
        <div className='map_container'>
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
