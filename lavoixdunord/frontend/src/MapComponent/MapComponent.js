import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import yaml from 'js-yaml';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

// Configuration du marqueur par défaut
const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Composant pour gérer le changement de vue
function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 13, {
                duration: 2
            });
        }
    }, [center, map]);
    return null;
}

const MapComponent = ({ questions, difficulty, level_id, currentQuestionIndex, onClose }) => {
    const [questionData, setQuestionData] = useState(null);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const basename = process.env.REACT_APP_BASENAME || "/";

    useEffect(() => {
        // Charger les données
        Promise.all([
            fetch(basename + 'data/questions.yaml').then(response => response.text()),
            fetch(basename + 'data/geoJsonLevels.json').then(response => response.json())
        ]).then(([yamlText, geoJson]) => {
            const data = yaml.load(yamlText);
            const currentQuestion = data.game.levels[parseInt(difficulty) - 1]
                .stages[parseInt(level_id) - 1]
                .questions[currentQuestionIndex];
            setQuestionData(currentQuestion);
            setGeoJsonData(geoJson);
        });
    }, [basename, difficulty, level_id, currentQuestionIndex]);

    if (!questionData || !geoJsonData) {
        return <div>Chargement...</div>;
    }

    const mapCenter = [questionData.map.latitude, questionData.map.longitude];

    return (
        <div className="map-overlay">
            <MapContainer
                center={mapCenter}
                zoom={13}
                className="map-container"
                zoomControl={false}
                dragging={false}
                touchZoom={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                boxZoom={false}
                keyboard={false}
            >
                <ChangeView center={mapCenter} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap contributors'
                    className="map-tiles-blue"
                />
                <GeoJSON
                    data={geoJsonData}
                    style={{
                        color: '#0000FF',
                        weight: 3,
                        opacity: 0.7
                    }}
                />
                <Marker position={mapCenter}>
                    <Popup>
                        <div className="custom-popup">
                            <h3>{questionData.map.label}</h3>
                            <img
                                src={`${basename}${questionData.map.image}`}
                                alt={questionData.map.label}
                                className="popup-image"
                            />
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
            <button className="close-map-btn" onClick={onClose}>
                Fermer la carte
            </button>
        </div>
    );
};

export default MapComponent;
