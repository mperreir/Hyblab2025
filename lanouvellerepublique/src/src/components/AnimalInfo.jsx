import './AnimalInfo.css';

function AnimalInfo({ animalName, animalImage }) {
    return (
        <div className='animal_presentation'>
            <div className='top_section'>
                <div className='image_container'>
                    <img/>
                </div>
                <div className='text_container'>
                    <h3>{animalName}</h3>
                    <p>T'as cliqué sur mon profil ? Laisse moi t'en dire un peu plus.</p>
                </div>
            </div>
            <div className='bottom_section'>
                <a>Découvrir</a>
            </div>
        </div>
    )
}

export default AnimalInfo;
