import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import yaml from 'js-yaml';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import L from 'leaflet';

// Configuration du marqueur personnalisé avec la nouvelle couleur
const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `<svg width="45" height="45" viewBox="0 0 2214 1343" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,
    iconSize: [60, 60],
    iconAnchor: [30, 60], 
    popupAnchor: [0, -60]  
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
