"use strict"

// Variables pour la barre de progression
const totalQuestions = 6;
let currentQuestion = 1;

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');

    steps.forEach((step, index) => {
        if(index%totalQuestions === currentQuestion - 1){
                step.classList.add('active');
                step.classList.remove('hidden');
            } else {
                step.classList.remove('active');
                step.classList.add('hidden');
                
            }
    });

    lines.forEach((line, index) => {
        if (index%(totalQuestions-1) === currentQuestion - 2) {
            line.classList.add('active');
        }
    });
}

function resetProgress() {
    currentQuestion = 1;
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');

    steps.forEach((step, index) => {
        step.classList.remove('active');
        step.classList.add('hidden');
    });

    lines.forEach((line, index) => {
        line.classList.remove('active');
    });
}