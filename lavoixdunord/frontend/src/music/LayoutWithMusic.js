import React, { useState, useRef } from 'react';
import backgroundMusic from './test1.mp3';
import { MdMusicOff, MdMusicNote, MdVolumeOff, MdVolumeUp } from 'react-icons/md';

const LayoutWithMusic = ({ isMuted, setIsMuted, children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
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


    const buttonSoundStyle = {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        color: '#4D95AF',
        position: 'absolute',
        bottom: '60px',
        right: '4px',
        zIndex: 1000
    };

    const buttonMusicStyle = {
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
                <div style={buttonSoundStyle}>
                    <button onClick={() => {
                        setIsMuted(!isMuted);
                    }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        {isMuted ? <MdVolumeOff size="24px" /> : <MdVolumeUp size="24px" />}
                    </button>
                </div>

                <button onClick={togglePlay} style={buttonMusicStyle}>
                    {isPlaying ? <MdMusicNote /> : <MdMusicOff />}
                </button>
            </div>
            {children}
        </div>
    );
};

export default LayoutWithMusic;
