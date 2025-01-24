class Object {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.isBuy = false;
    }
}


class Player {
    constructor(monney=0, shopping_list=[]) {
        this.monney = monney;
        this.shopping_list = shopping_list;
    }

    withdrawMonney(amount) {
        if (amount > 0) {
            this.monney += amount
        }
        else console.error("Montant invalide");
    }

    buyObject(obj) {
        if (obj.value > this.monney) {
            console.error("Solde insuffisant")
        }
        else {
            this.monney -= obj.value;
            this.shopping_list.push(obj);
            obj.isBuy = true;
        }
    }

    displayInventory() {
        console.log("Argent restant: " + this.monney);
        console.log("Liste de courses: ");
        this.shopping_list.forEach(obj => console.log("- " + obj.name + ", " + obj.isBuy));
    }

}

function colorScript(event){
    console.log("color_script")
    console.log(event);
    colorizeImage(event);
}

function colorizeImage(imageElement) {
    console.log(imageElement);

    if (!imageElement) {
        console.error("Aucun élément d'image fourni.");
        return;
    }

    // Add CSS for smooth transition
    imageElement.style.transition = 'filter 0.3s ease';
    imageElement.style.filter = 'grayscale(100%)';
    let isClicked = false;

    imageElement.addEventListener("click", () => {
        imageElement.style.filter = "none";
        isClicked = true;
    });

    imageElement.addEventListener("mouseover", () => {
        if (!isClicked) {
            imageElement.style.filter = "none";
        }
    });

    imageElement.addEventListener("mouseout", () => {
        if (!isClicked) {
            imageElement.style.filter = "grayscale(100%)";
        }
    });
}

/*const pringles = new Object("Pringles", 500);
const sponge = new Object("Éponge", 300);
const glass = new Object("Verre", 200);
const latex_gloves = new Object("Gants en latex", 1000);
const player = new Player(2000, [pringles, sponge, glass, latex_gloves]);


player.buyObject(pringles);
player.displayInventory();
player.buyObject(sponge);
player.buyObject(glass);
player.buyObject(latex_gloves);
player.displayInventory();*/