import AnimalInfo from '../components/AnimalInfo';
import RegionMap from '../components/RegionMap';
import './RegionSelection.css';
import Header from "../components/Header";
import { useState } from "react";

import loutre from '../assets/loutre.svg';
import tortue from '../assets/tortue.svg';
import crapaud from '../assets/crapaud.svg';
import papillon from '../assets/papillon.svg';
import anguille from '../assets/anguille.svg';

function RegionSelection() {
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    const animals = [
        { id: 1, name: 'Loutre', fullname: 'Loutre d\'Europe', svg: loutre, departement: 'Indre-et-Loire'},
        { id: 2, name: 'Tortue', fullname: 'Tortue Cistude', svg: tortue, departement: 'Indre'},
        { id: 3, name: 'Crapaud', fullname: 'Sonneur à ventre jaune', svg: crapaud, departement: 'Loir-et-Cher'},
        { id: 4, name: 'Papillon', fullname: 'Azuré de la pulmonaire', svg: papillon, departement: 'Vienne'},
        { id: 5, name: 'Anguille', fullname: 'Anguille argentée', svg: anguille, departement: 'Deux-Sèvres'},
    ];

    return (
        <>
        <Header textColor={"black"}/>
        <div className='region_page'>
            <div className='content'>
                <h2>5 espèces en voie de disparition en France</h2>
                <RegionMap selectedAnimal={selectedAnimal} setSelectedAnimal={setSelectedAnimal} animals={animals}/>
                <AnimalInfo 
                    animal={animals.find(animal => animal.id === selectedAnimal)} 
                />
            </div>
        </div>
        </>
    );
}

export default RegionSelection;