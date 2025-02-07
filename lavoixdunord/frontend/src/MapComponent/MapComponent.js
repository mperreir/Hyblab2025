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
    const previousCoords = useRef(null);
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
                    geolocateControl: false,
                });


                // Attendre que la carte soit chargée
                await new Promise((resolve, reject) => {
                    map.current.on('load', () => {
                        // Puis on applique la langue
                        map.current.setLanguage(maptilersdk.Language.FRENCH);
                    });
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
                .questions[(currentQuestionIndex)];

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

                // Définition du marqueur personnalisé
                const customMarkerHtml = document.createElement('div');
                customMarkerHtml.style.width = '70px';
                customMarkerHtml.style.height = 'auto';
                customMarkerHtml.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 2214 1343" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1819.52 520.635C1602.16 520.635 1425.9 697.952 1425.9 916.556C1425.9 1135.16 1602.16 1312.48 1819.52 1312.48C2036.89 1312.48 2213.15 1135.16 2213.15 916.556C2213.15 697.952 2036.89 520.635 1819.52 520.635ZM1819.52 1244.73C1639.4 1244.73 1493.35 1097.84 1493.35 916.644C1493.35 735.445 1639.4 588.562 1819.52 588.562C1999.65 588.562 2145.7 735.445 2145.7 916.644C2145.7 1097.84 1999.65 1244.73 1819.52 1244.73Z" fill="#2D3849"/>
                    <path d="M393.624 551.07C176.261 551.07 0 728.387 0 947.079C0 1165.77 176.261 1343 393.624 1343C610.987 1343 787.248 1165.68 787.248 947.079C787.248 728.476 610.987 551.158 393.624 551.158V551.07ZM393.624 1275.16C213.498 1275.16 67.4483 1128.28 67.4483 947.079C67.4483 765.88 213.498 618.997 393.624 618.997C573.75 618.997 719.8 765.88 719.8 947.079C719.8 1128.28 573.75 1275.16 393.624 1275.16Z" fill="#2D3849"/>
                    <path d="M899.986 54.5642C894.98 56.2404 816.114 45.3896 794.071 47.5068C766.406 49.9769 742.255 55.4464 721.704 72.3842C719.158 74.5014 717.138 77.1479 715.205 79.8827L721.704 72.3842L759.029 193.772L761.225 200.829L736.283 209.033L734.175 202.417L700.539 97.1733C664.356 118.081 575.127 111.024 555.718 67.0029C539.998 31.1865 549.483 11.2493 585.754 4.89767C616.141 -0.483608 854.757 -2.68905 878.82 4.89767C897.79 10.8083 925.191 46.0953 899.986 54.6524V54.5642Z" fill="#2D3849"/>
                    <path d="M931.631 923.349L942.96 1005.83L473.369 967.987C473.369 967.987 490.144 914.262 460.898 888.238L931.543 923.349H931.631Z" fill="#E9B633"/>
                    <path d="M1804.68 1337.44C1801.87 1337 1799.59 1334.97 1794.06 1333.91L1804.68 1337.44Z" fill="#1A2436"/>
                    <path d="M393.624 551.07C176.261 551.07 0 728.387 0 947.079C0 1165.77 176.261 1343 393.624 1343C610.987 1343 787.248 1165.68 787.248 947.079C787.248 728.476 610.987 551.158 393.624 551.158V551.07ZM393.624 1275.16C213.498 1275.16 67.4483 1128.28 67.4483 947.079C67.4483 765.88 213.498 618.997 393.624 618.997C573.75 618.997 719.8 765.88 719.8 947.079C719.8 1128.28 573.75 1275.16 393.624 1275.16Z" fill="#2D3849"/>
                    <path d="M931.631 923.349L942.96 1005.83L473.369 967.987C473.369 967.987 490.144 914.262 460.898 888.238L931.543 923.349H931.631Z" fill="#ED8422"/>
                    <path d="M1804.68 1337.44C1801.87 1337 1799.59 1334.97 1794.06 1333.91L1804.68 1337.44Z" fill="#1A2436"/>
                    <path d="M782.441 172L825.123 293.3L1529.47 299.122L1476.42 140.418L1679.56 126.745L1681.4 170.501L1636.43 242.133L1609.12 223.431L1641.35 175.882C1605.52 178.528 1558.45 182.234 1549.4 183.38L1825.08 864.332L1786.61 898.826L1587.78 413.099L1109.93 950.521C1087.54 919.998 1063.12 885.681 1026.33 885.505L1461.75 379.488L856.74 377.9L1028.08 875.977C1014.56 877.653 970.91 901.296 959.229 903.413L823.806 513.579L466.453 905.354L392.418 874.919L791.136 427.038L712.007 198.377L782.441 172Z" fill="#ED8422" stroke="#4D95AF" stroke-miterlimit="10"/>
                    <path d="M1018.84 839.718C964.562 839.718 920.65 883.915 920.65 938.522C920.65 993.129 964.65 1037.33 1018.84 1037.33C1073.02 1037.33 1117.02 993.129 1117.02 938.522C1117.02 883.915 1073.02 839.718 1018.84 839.718ZM1018.84 976.809C997.759 976.809 980.721 959.606 980.721 938.434C980.721 917.262 997.759 900.059 1018.84 900.059C1039.91 900.059 1056.95 917.262 1056.95 938.434C1056.95 959.606 1039.91 976.809 1018.84 976.809Z" fill="#2D3849"/>
                    <path d="M1828.04 839.718C1773.77 839.718 1729.85 883.915 1729.85 938.522C1729.85 993.129 1773.85 1037.33 1828.04 1037.33C1882.23 1037.33 1926.23 993.129 1926.23 938.522C1926.23 883.915 1882.23 839.718 1828.04 839.718ZM1828.04 976.809C1806.96 976.809 1789.92 959.606 1789.92 938.434C1789.92 917.262 1806.96 900.059 1828.04 900.059C1849.12 900.059 1866.16 917.262 1866.16 938.434C1866.16 959.606 1849.12 976.809 1828.04 976.809Z" fill="#2D3849"/>
                    <path d="M394.239 847.923C339.964 847.923 296.053 892.12 296.053 946.727C296.053 1001.33 340.052 1045.53 394.239 1045.53C448.426 1045.53 492.426 1001.33 492.426 946.727C492.426 892.12 448.426 847.923 394.239 847.923ZM394.239 985.013C373.162 985.013 356.124 967.811 356.124 946.638C356.124 925.466 373.162 908.264 394.239 908.264C415.317 908.264 432.354 925.466 432.354 946.638C432.354 967.811 415.317 985.013 394.239 985.013Z" fill="#2D3849"/>
                </svg>`;
                customMarkerHtml.className = 'custom-marker';

                // Ajouter le marqueur personnalisé
                marker.current = new maptilersdk.Marker({ element: customMarkerHtml })
                    .setLngLat([questionData.map.longitude, questionData.map.latitude])
                    .addTo(map.current);

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
                    if (
                        geoJsonData &&
                        geoJsonData.features &&
                        geoJsonData.features.length > 0 &&
                        geoJsonData.features[0].geometry &&
                        geoJsonData.features[0].geometry.coordinates &&
                        geoJsonData.features[0].geometry.coordinates.length > 0
                    ) {
                        geoJsonData.features[0].geometry.coordinates.forEach(coord => {
                            bounds.extend(coord);
                        });
                    }

                    map.current.fitBounds(bounds, {
                        padding: 50,
                        duration: 2000
                    });
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }

                const { longitude, latitude } = questionData.map;
                const newCoords = [longitude, latitude];
                const previous = previousCoords.current;

                if (!previous || previous[0] !== newCoords[0] || previous[1] !== newCoords[1]) {
                    previousCoords.current = newCoords;

                    // Animation vers le point de la question
                    map.current.flyTo({
                        center: [questionData.map.longitude, questionData.map.latitude],
                        zoom: 13,
                        duration: currentQuestionIndex === 0 ? 1500 : 3500
                    });
                    await new Promise(resolve => setTimeout(resolve, 3500));
                } else {
                    map.current.flyTo({
                        center: [longitude + 0.002, latitude + 0.002],
                        zoom: 11,
                        duration: 500
                    });

                    setTimeout(() => {
                        map.current.flyTo({
                            center: [longitude - 0.002, latitude - 0.002],
                            zoom: 12,
                            duration: 500
                        });
                    }, 500);

                    setTimeout(() => {
                        map.current.flyTo({
                            center: newCoords,
                            zoom: 13,
                            duration: 1000
                        });
                    }, 1000);
                }

                // Ajouter le marqueur et le popup
                popup.current = new maptilersdk.Popup()
                    .setHTML(`
                        <div class="custom-popup">
                            <h3>${questionData.map.label}</h3>
                            <img
                                src="/${questionData.map.image}"
                                alt="${questionData.map.label}"
                                class="popup-image"
                            />
                        </div>
                    `);


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
                VOIR LA QUESTION
            </button>
        </div>
    );
};

export default MapComponent;
