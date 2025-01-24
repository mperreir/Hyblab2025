import AnimalInfo from '../components/AnimalInfo';
import RegionMap from '../components/RegionMap';
import './RegionSelection.css';
import Header from "../components/Header";

function RegionSelection() {
    // TODO : Remplacer Header leur components respectifs
    return (
        <>
        <Header titre={"Dans leur peau"} textColor={"black"}/>
        <div className='region_page'>
            <div className='content'>
                <h2>Explorez les différentes espèces par département</h2>
                <RegionMap/>
                <AnimalInfo animalName={'Loutre d\'Europe'}/>
            </div>
        </div>
        </>
    );
}

export default RegionSelection;