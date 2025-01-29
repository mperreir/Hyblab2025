class audioScene {
    constructor(file_name) {
        this.objects = [];
        this.time = 0;

        // Load audio configuration
        fetch(file_name)
            .then(response => response.json())
            .then(data => {
                this.objects = data.audios.map(audio => {
                    const audioElement = new Audio(audio.src);
                    return {
                        id: audio.id,
                        element: audioElement,
                        keyframes: audio.keyframes,
                        isLooping: false,
                    };
                });
            })
            .catch(err => console.error("Error loading audio configuration:", err));
    }

    updateAudio(time) {
        this.time = time;

        this.objects.forEach(audioObject => {
            const { element, keyframes, isLooping } = audioObject;

            if (keyframes.length > 0) {
                keyframes.forEach(keyframe => {
                    if (Math.floor(keyframe.time) === Math.floor(this.time)) {
                        switch (keyframe.type) {
                            case "play_once":
                                if (!isLooping) {
                                    element.currentTime = 0; // Reset to start for play_once
                                    element.play();
                                }
                                break;
    
                            case "pause":
                                element.pause();
                                break;
    
                            case "loop":
                                if (!isLooping) {
                                    audioObject.isLooping = true;
                                    element.loop = true;
                                    element.play();
                                }
                                break;
    
                            default:
                                console.warn(`Unknown keyframe loop: ${keyframe.type}`);
                        }
                    }
                });
            }

            // Stop looping if the current keyframe is no longer "loop"
            if (isLooping && !keyframes.some(kf => kf.time <= this.time && kf.loop === "loop")) {
                audioObject.isLooping = false;
                element.loop = false;
            }
        });
    }
}

const audioElements = {}; // Définir globalement pour pouvoir arrêter tous les éléments audio

// Fonction pour jouer un audio à partir d'un événement
function playAudioTrigger(file_name, id) {
    fetch(file_name)
        .then(response => response.json())
        .then(data => {
            const audioData = data.audios.find(audio => audio.id === id);
            if (audioData) {
                if (!audioElements[id]) {
                    audioElements[id] = new Audio(audioData.src);
                    audioElements[id].volume = audioData.volume;
                }
                const audioElement = audioElements[id];
                console.log(`Playing audio: ${id}`); // Log audio ID

                // Utiliser une structure switch pour gérer différents types de lecture audio
                switch (audioData.type) {
                    case "play_once":
                        audioElement.play();
                        break;
                    case "loop":
                        audioElement.loop = true;
                        audioElement.play();
                        break;
                    case "pause":
                        audioElement.pause();
                        break;
                    default:
                        console.warn(`Unknown audio type: ${audioData.type}`);
                        audioElement.play();
                        break;
                }
            } else {
                console.error(`Audio with id ${id} not found in ${file_name}.`);
            }
        })
        .catch(err => console.error("Error loading audio configuration:", err));
}


function playAudioAmbiance(shouldPlay) {
    if (shouldPlay) {
        // Charger et jouer l'audio d'ambiance en boucle
        fetch("data/audio_scene.json")
            .then(response => response.json())
            .then(data => {
                const audioData = data.audios.find(audio => audio.id === "ambiance");
                if (audioData) {
                    ambianceAudio = new Audio(audioData.src);
                    ambianceAudio.volume = audioData.volume;
                    ambianceAudio.loop = true;
                    ambianceAudio.play();
                    console.log("Playing ambiance audio in loop.");
                } else {
                    console.error("Ambiance audio not found in data/audio_scene.json.");
                }
            })
            .catch(err => console.error("Error loading audio configuration:", err));
    } else {
        if (ambianceAudio) {
            ambianceAudio.pause();
            console.log("Stopping ambiance audio.");
        }
    }
}

function stopAllAudio() {
    for (const id in audioElements) {
        if (audioElements[id]) {
            audioElements[id].pause();
            audioElements[id].currentTime = 0; // Reset to start
            console.log(`Stopping audio: ${id}`);
        }
    }
}