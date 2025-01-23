import './RegionMap.css';

function RegionMap() {
    return (
        <div className='map_container'>
            <div className={['background_square', 'tilted', 'dark'].join(' ')}></div>
            <div className={['background_square', 'bright'].join(' ')}></div>
            <div className="reg_map"></div>
        </div>
    )
}

export default RegionMap;
