

setTimeout(() => {
    const groups = document.querySelectorAll('g[id^="HÉLICES-"]');
    const exception = {
        6:5,
        10:9,
        16:15,
        14:13,
        4:3,
        12:11,
        8:7,
        2:""
    }
    console.log(groups)
    groups.forEach(group => {
        const number = parseInt(group.id.split('-')[1], 10);
        const randomDuration = (Math.random() * 3) + 1; // Random between 1s and 5s
        group.style.animationDuration = `${randomDuration}s`
        if (number % 2 === 0 || Object.values(exception).includes(number)) {
            console.log(number)
            if(!Object.keys(exception).map(Number).includes(number)){
                group.classList.add('eolienne');
            }
                


        }
    });

    const drones = document.querySelectorAll('g[id^="DRONE_"]');

    drones.forEach(group => {
        const number = parseInt(group.id.split('-')[1], 10);
        const randomDuration = (Math.random() * 8) + 3; // Random between 1s and 5s
        group.style.animationDuration = `${randomDuration}s`
        if (number % 2 === 0) {
            group.classList.add('drone');

        }
    });

    const arbres = document.querySelectorAll('g[id^="ARBRE-"]');

    arbres.forEach(group => {
        const number = parseInt(group.id.split('-')[1], 10);
        const randomDuration = (Math.random() * 8) + 3; // Random between 1s and 5s
        group.style.animationDuration = `${randomDuration}s`
        if (number % 2 === 0) {
            group.classList.add('drone');

        }
    });

}, 2000);