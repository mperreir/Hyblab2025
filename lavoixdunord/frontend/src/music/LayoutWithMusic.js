import React, { useState, useRef } from 'react';
import backgroundMusic from './test1.mp3';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const LayoutWithMusic = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            setIsPlaying(!audioRef.current.paused);
        }
    };

    const buttonStyle = {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '24px',
        color: '#666',
        padding: '10px'
    };

    const containerStyle = {
        position: 'absolute',
        bottom: '10px',
        right: '30px'
    };

    return (
        <div>
            <audio ref={audioRef} autoPlay loop style={{ display: 'none' }}>
                <source src={backgroundMusic} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div style={containerStyle}>
                <button onClick={togglePlay} style={buttonStyle}>
                    {isPlaying ? <FaVolumeUp />: <FaVolumeMute /> }
                </button>
            </div>
            {children}
        </div>
    );
};

export default LayoutWithMusic;
