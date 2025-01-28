import React, { useEffect, useRef, useState } from 'react';
import yaml from 'js-yaml';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import './MapComponent.css';

const MapComponent = ({ difficulty, level_id, currentQuestionIndex, onClose, isVisible = true }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const popup = useRef(null);
    const [questionData, setQuestionData] = useState(null);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const basename = process.env.REACT_APP_BASENAME || "/";

    // Effet pour initialiser la carte une seule fois
    useEffect(() => {
        if (!mapContainer.current) return;

        maptilersdk.config.apiKey = 'JyM6ywnS0MKSWylOVlCe';
        
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            // style: maptilersdk.MapStyle.STREETS,
            style: "0fba3e67-41a7-41ef-9765-2ff7b085fbaf",
            zoom: 13,
            interactive: false,
            navigationControl: false,
            geolocateControl: false
        });

        return () => {
            if (popup.current) popup.current.remove();
            if (marker.current) marker.current.remove();
            if (map.current) map.current.remove();
        };
    }, []);

    // Effet pour charger les données
    useEffect(() => {
        Promise.all([
            fetch(basename + 'data/questions.yaml').then(response => response.text()),
            fetch(basename + `data/geoJsonLevels${level_id}.json`).then(response => response.json())
        ]).then(([yamlText, geoJson]) => {
            const data = yaml.load(yamlText);
            const currentQuestion = data.game.levels[parseInt(difficulty) - 1]
                .stages[parseInt(level_id) - 1]
                .questions[currentQuestionIndex];
            setQuestionData(currentQuestion);
            setGeoJsonData(geoJson);
        });
    }, [basename, difficulty, level_id, currentQuestionIndex]);

    // Effet pour mettre à jour la carte quand les données changent
    useEffect(() => {
        if (!map.current || !questionData || !geoJsonData) return;

        const updateMap = () => {
            // Nettoyer les anciens éléments
            if (popup.current) popup.current.remove();
            if (marker.current) marker.current.remove();
            if (map.current.getSource('route')) {
                map.current.removeLayer('route');
                map.current.removeSource('route');
            }

            // Mettre à jour la position de la carte
            map.current.setCenter([questionData.map.longitude, questionData.map.latitude]);

            // Ajouter le GeoJSON
            map.current.addSource('route', {
                type: 'geojson',
                data: geoJsonData
            });
            
            map.current.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                paint: {
                    'line-color': '#4B9CBA',
                    'line-width': 5,
                    'line-opacity': 0.7
                }
            });

            // Ajouter le marqueur et la popup
            popup.current = new maptilersdk.Popup()
                .setHTML(`
                    <div class="custom-popup">
                        <h3>${questionData.map.label}</h3>
                        <img
                            src="${basename}${questionData.map.image}"
                            alt="${questionData.map.label}"
                            class="popup-image"
                        />
                    </div>
                `);

            marker.current = new maptilersdk.Marker()
                .setLngLat([questionData.map.longitude, questionData.map.latitude])
                .setPopup(popup.current)
                .addTo(map.current);
            
            // Ouvrir le popup immédiatement
            popup.current.addTo(map.current)
                .setLngLat([questionData.map.longitude, questionData.map.latitude])
                .addTo(map.current);
        };

        // Vérifier si la carte est chargée
        if (map.current.isStyleLoaded()) {
            updateMap();
        } else {
            // Attendre que le style soit chargé
            map.current.on('load', updateMap);
        }

        // Cleanup
        return () => {
            if (map.current) {
                map.current.off('load', updateMap);
            }
        };

    }, [questionData, geoJsonData, basename]);

    return (
        <div className={`mobile-container map-overlay ${!isVisible ? 'hidden' : ''}`}>
            <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
            <button 
                className="btn btn-light close-map-btn my-1 text-uppercase fw-bold" 
                onClick={onClose}
                style={{ display: isVisible ? 'block' : 'none' }}
            >
                Suivant
            </button>
        </div>
    );
};

export default MapComponent;
