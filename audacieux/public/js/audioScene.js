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
                            console.warn(`Unknown keyframe type: ${keyframe.type}`);
                    }
                }
            });

            // Stop looping if the current keyframe is no longer "loop"
            if (isLooping && !keyframes.some(kf => kf.time <= this.time && kf.type === "loop")) {
                audioObject.isLooping = false;
                element.loop = false;
            }
        });
    }
}

// Fonction pour jouer un audio à partir d'un événement
function playAudioTrigger(file_name, id, loop = false) {
    fetch(file_name)
        .then(response => response.json())
        .then(data => {
            const audioData = data.audios.find(audio => audio.id === id);
            if (audioData) {
                const audioElement = new Audio(audioData.src);
                audioElement.volume = audioData.volume;
                audioElement.loop = audioData.type;
                ambianceAudio = audioElement;
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