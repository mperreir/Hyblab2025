import React, { useState, useRef } from 'react';
import backgroundMusic from './test1.mp3';
import { MdMusicOff, MdMusicNote } from 'react-icons/md';

const LayoutWithMusic = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                // audioRef.current.play();
                // TODO: Uncomment the line above to enable music
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
        color: '#1A3347',
        padding: '10px'
    };

    const containerStyle = {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
    }

    return (
        <div>
            <audio ref={audioRef}
                // autoPlay
                loop style={{ display: 'none' }}>
                <source src={backgroundMusic} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div style={containerStyle}>
                <button onClick={togglePlay} style={buttonStyle}>
                    {isPlaying ? <MdMusicNote /> : <MdMusicOff />}
                </button>
            </div>
            {children}
        </div>
    );
};

export default LayoutWithMusic;
