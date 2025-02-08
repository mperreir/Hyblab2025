document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    const data = {
        labels: ["Recettes propres", "Financements publics", "Financements privés"],
        datasets: [{
            data: [52.3, 38.5, 9.1],
            backgroundColor: ["#32D2C3", "#D9D9D9", "#999999"],
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2500,
                animateScale: true,
                animateRotate: true
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
});