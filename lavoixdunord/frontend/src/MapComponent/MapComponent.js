import React, { useEffect, useRef, useState } from 'react';
import yaml from 'js-yaml';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import './MapComponent.css';

const MAPTILER_KEY = 'JyM6ywnS0MKSWylOVlCe';
const STYLE_ID = "0fba3e67-41a7-41ef-9765-2ff7b085fbaf";

const MapComponent = ({ difficulty, level_id, currentQuestionIndex, onClose, isVisible = true }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const popup = useRef(null);
    const [questionData, setQuestionData] = useState(null);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const basename = process.env.REACT_APP_BASENAME || "/";
    const previousIsVisible = useRef(isVisible);

    // Effet pour initialiser la carte une seule fois
    useEffect(() => {
        if (!mapContainer.current) return;

        maptilersdk.config.apiKey = MAPTILER_KEY;

        const initMap = async () => {
            try {
                map.current = new maptilersdk.Map({
                    container: mapContainer.current,
                    style: `https://api.maptiler.com/maps/${STYLE_ID}/style.json?key=${MAPTILER_KEY}`,
                    // style: STYLE_ID,
                    zoom: 13,
                    interactive: true,
                    navigationControl: true,
                    geolocateControl: false
                });

                // Attendre que la carte soit chargée
                await new Promise((resolve, reject) => {
                    map.current.on('load', resolve);
                    map.current.on('error', reject);
                });

            } catch (error) {
                console.error('Map initialization error:', error);
                // Fallback au style par défaut si nécessaire
                if (map.current) {
                    map.current.setStyle(maptilersdk.MapStyle.STREETS);
                }
            }
        };

        initMap();

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

    // Effet pour animer la carte quand isVisible passe à true
    useEffect(() => {
        if (!map.current || !questionData || !geoJsonData) return;

        // Déclencher l'animation uniquement lors du passage de false à true
        if (isVisible && !previousIsVisible.current) {
            const animateMap = async () => {
                // Nettoyer les anciens éléments
                if (popup.current) popup.current.remove();
                if (marker.current) marker.current.remove();

                // Remove existing layers and source if they exist
                if (map.current.getLayer('route-glow')) {
                    map.current.removeLayer('route-glow');
                }
                if (map.current.getLayer('route')) {
                    map.current.removeLayer('route');
                }
                if (map.current.getSource('route')) {
                    map.current.removeSource('route');
                }

                // Add the new source and layers
                map.current.addSource('route', {
                    type: 'geojson',
                    data: geoJsonData
                });

                map.current.addLayer({
                    id: 'route-glow',
                    type: 'line',
                    source: 'route',
                    paint: {
                        'line-color': '#C1121F', // Couleur de surbrillance
                        'line-width': 7, // Largeur de la surbrillance
                        'line-opacity': 0.5, // Légère transparence
                        'line-blur': 3 // Ajout d’un effet flou pour l’éclat
                    }
                });

                map.current.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    paint: {
                        'line-color': '#4B9CBA', // Couleur principale
                        'line-width': 5, // Largeur de la ligne principale
                        'line-opacity': 0.7
                    }
                });


                // Séquence d'animation
                if (currentQuestionIndex === 0) {
                    // Vue initiale large de la région
                    map.current.flyTo({
                        center: [3.0573, 50.6292],
                        zoom: 8,
                        duration: 1500
                    });
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Zoom sur le tracé GeoJSON
                    const bounds = new maptilersdk.LngLatBounds();
                    geoJsonData.features[0].geometry.coordinates.forEach(coord => {
                        bounds.extend(coord);
                    });

                    map.current.fitBounds(bounds, {
                        padding: 50,
                        duration: 2000
                    });
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }

                // Animation vers le point de la question
                map.current.flyTo({
                    center: [questionData.map.longitude, questionData.map.latitude],
                    zoom: 13,
                    duration: currentQuestionIndex === 0 ? 1500 : 3500
                });
                await new Promise(resolve => setTimeout(resolve, 3500));

                // Ajouter le marqueur et le popup
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

                popup.current.addTo(map.current)
                    .setLngLat([questionData.map.longitude, questionData.map.latitude])
                    .addTo(map.current);
            };

            // Exécuter l'animation quand la carte est prête
            if (map.current.isStyleLoaded()) {
                animateMap();
            } else {
                map.current.on('load', animateMap);
            }
        }

        // Mettre à jour la référence
        previousIsVisible.current = isVisible;

    }, [isVisible, questionData, geoJsonData, currentQuestionIndex, basename]);

    return (
        <div className={`map-overlay ${!isVisible ? 'hidden' : ''}`}
        >
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
