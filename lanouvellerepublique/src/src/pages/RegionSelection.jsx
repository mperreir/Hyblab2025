import AnimalInfo from '../components/AnimalInfo';
import RegionMap from '../components/RegionMap';
import './RegionSelection.css';
import Header from "../components/Header";
import { useState } from "react";

import loutre from '../../public/loutre.svg';

function RegionSelection() {
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    const animals = [
        { id: 1, name: 'Loutre', fullname: 'Loutre d\'Europe', svg: loutre},
    ];

    return (
        <>
        <Header titre={"Dans leur peau"} textColor={"black"}/>
        <div className='region_page'>
            <div className='content'>
                <h2>5 espèces en voie de disparition en France</h2>
                <RegionMap selectedAnimal={selectedAnimal} setSelectedAnimal={setSelectedAnimal} animals={animals}/>
                <div className={`animal-info-container ${selectedAnimal ? 'visible' : ''}`}>
                    <AnimalInfo 
                        animal={animals.find(animal => animal.id === selectedAnimal)} 
                    />
                </div>
            </div>
        </div>
        </>
    );
}

export default RegionSelection;