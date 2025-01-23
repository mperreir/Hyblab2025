import AnimalInfo from '../components/AnimalInfo';
import RegionMap from '../components/RegionMap';
import './RegionSelection.css';

function RegionSelection() {
    // TODO : Remplacer Header et regionMap par leur components respectifs
    return (
        <div className='page'>
            <div className='header'></div> 
            <h2>Explorez les différentes espèces par département</h2>
            <RegionMap/>
            <AnimalInfo animalName={'Loutre d\'Europe'}/>
        </div>
    );
}

export default RegionSelection;