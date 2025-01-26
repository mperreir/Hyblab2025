import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import yaml from 'js-yaml';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import L from 'leaflet';

// Configuration du marqueur personnalisé avec la nouvelle couleur
const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `<svg width="25" height="41" viewBox="0 0 100 100">
        <path fill="#4d95af" d="M50 0C29.9 0 14.7 15.7 14.7 35c0 19.2 32.8 65 35.3 65 2.5 0 35.3-45.8 35.3-65C85.3 15.7 70.1 0 50 0z"/>
        <circle fill="#ffffff" cx="50" cy="35" r="12"/>
    </svg>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Composant pour gérer les animations de la carte
function MapAnimator({ center, questionIndex, geoJsonData }) {
    const map = useMap();

    useEffect(() => {
        if (!geoJsonData) return;

        const animate = async () => {
            if (questionIndex === 0) {
                // Animation initiale pour la première question
                // 1. Vue globale
                map.setView([50.6292, 3.0573], 8);
                await new Promise(r => setTimeout(r, 1000));

                // 2. Zoom sur le tracé GeoJSON
                const bounds = L.geoJSON(geoJsonData).getBounds();
                map.flyToBounds(bounds, {
                    duration: 2,
                    paddingTopLeft: [50, 50],
                    paddingBottomRight: [50, 50]
                });
                await new Promise(r => setTimeout(r, 2000));

                // 3. Finalement, zoom sur le point de la première question
                map.flyTo(center, 13, {
                    duration: 2
                });
            } else {
                // Pour les autres questions, animation directe vers le nouveau point
                map.flyTo(center, 13, {
                    duration: 1.5
                });
            }
        };

        animate();
    }, [map, center, questionIndex, geoJsonData]);

    return null;
}

const MapComponent = ({ difficulty, level_id, currentQuestionIndex, onClose }) => {
    const [questionData, setQuestionData] = useState(null);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const basename = process.env.REACT_APP_BASENAME || "/";

    useEffect(() => {
        // Charger les données
        Promise.all([
            fetch(basename + 'data/questions.yaml').then(response => response.text()),
            fetch(basename + `data/geoJsonLevels${level_id}.json`).then(response => response.json())
        ]).then(([yamlText, geoJson]) => {
            const data = yaml.load(yamlText);
            const currentQuestion = data.game.levels[parseInt(difficulty) - 1]
                .stages[parseInt(level_id) - 1]
                .questions[currentQuestionIndex];
            // console.log("difficulty", "level_id", "currentQuestionIndex", "currentQuestion");
            // console.log(difficulty, level_id, currentQuestionIndex, currentQuestion);
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
                <MapAnimator
                    center={mapCenter}
                    questionIndex={currentQuestionIndex}
                    geoJsonData={geoJsonData}
                />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap contributors'
                    className="map-tiles-blue"
                />
                {geoJsonData && (
                    <GeoJSON
                        data={geoJsonData}
                        style={{
                            color: '#1A3347',
                            weight: 3,
                            opacity: 0.7
                        }}
                    />
                )}
                {questionData && (
                    <Marker 
                        position={mapCenter}
                        icon={customIcon}
                        ref={(markerRef) => {
                            if (markerRef) {
                                markerRef.openPopup();
                            }
                        }}
                    >
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
                )}
            </MapContainer>
            <button className="btn btn-light my-1 text-uppercase fw-bold" onClick={onClose}>
                Suivant
            </button>
        </div>
    );
};

export default MapComponent;
