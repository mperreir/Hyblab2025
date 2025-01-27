"use strict"

// Variables pour la barre de progression
const totalQuestions = 6;
let currentQuestion = 1;

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');

    steps.forEach((step, index) => {
        if (index%totalQuestions < currentQuestion - 1) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index%totalQuestions === currentQuestion - 1) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('completed', 'active');
        }
    });

    lines.forEach((line, index) => {
        if (index%totalQuestions < currentQuestion - 2) {
            line.classList.add('completed');
            line.classList.remove('active');
        } else if (index%totalQuestions === currentQuestion - 2) {
            line.classList.add('active');
            line.classList.remove('completed');
        } else {
            line.classList.remove('completed', 'active');
        }
    });
}