class SceneObject{
    constructor(type, src, id, script=null, onload=null){
        this.type = type;
        this.id = id;
        if (type == "svg") {
          this.html_el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          this.html_el.setAttribute("id", id);
      
          fetch(src)
          .then(response => response.text())
          .then(svgContent => {
              this.html_el.innerHTML = svgContent;
      
              // Ajouter un préfixe aux styles pour rendre les sélecteurs uniques
              const prefixStyles = (svgElement, prefix) => {
                  const styleElements = svgElement.querySelectorAll("style");
                  styleElements.forEach(style => {
                      style.textContent = style.textContent.replaceAll(
                          "cls",
                          `${prefix}-cls`
                      );
                  });
              };

              // Function to add a prefix to all class attributes in SVG sub-elements
            const prefixClasses = (svgElement, prefix) => {
              // Find all elements with a class attribute within the SVG
              const elementsWithClass = svgElement.querySelectorAll('[class]');
              
              elementsWithClass.forEach((element) => {
                  // Get the current class name(s)
                  const currentClass = element.getAttribute('class');
                  // Add the prefix to each class name
                  const newClass = currentClass
                      .split(' ') // Split multiple class names
                      .map(cls => `${prefix}-${cls}`) // Add prefix to each class name
                      .join(' '); // Join them back
                  // Update the class attribute with the new class names
                  element.setAttribute('class', newClass);
              });
            };
      
              // Appliquer le préfixe aux styles de l'élément SVG
              prefixStyles(this.html_el, `${id}`);
              prefixClasses(this.html_el, `${id}`);
      
      
              // Appliquer pointer-events
              this.html_el.style.pointerEvents = "none";
              Array.from(this.html_el.children).forEach(element => {
                  element.style.pointerEvents = "all";
              });
      
              // Ajouter un gestionnaire d'événements si nécessaire
              if (script) {
                  if (this.html_el && typeof window[script.func] === "function") {
                      this.html_el.addEventListener("click", (event) => {
                          // Appeler la fonction spécifiée avec les arguments
                          window[script.func](event, ...script.args);
                      });
                  } else {
                      console.error(
                          "Erreur : l'objet HTML n'existe pas ou la fonction spécifiée n'est pas définie."
                      );
                  }
              }
      
              // Exécuter la fonction onload si elle est définie
              if (onload) {
                  window[onload.func](this.html_el, ...onload.args);
              }
          })
          .catch(error => {
              console.error("Erreur lors du chargement du SVG :", error);
          });
      }
      else{
          if(script)
            {
                if (this.html_el && typeof window[script.func] === "function") {
                    this.html_el.addEventListener("click", (event) => {
                      // Appeler la fonction spécifiée avec les arguments
                      window[script.func](event, ...script.args);
                    });
                  } else {
                    console.error(
                      "Erreur : l'objet HTML n'existe pas ou la fonction spécifiée n'est pas définie."
                    );
                  }
            }
            if(onload){
              window[onload.func](this.html_el, ...onload.args);
            }
        }
  
        if(type == "lottie")
        {
          this.html_el = document.createElement("div");
          this.html_el.setAttribute("id", id);
          this.lottieAnim = lottie.loadAnimation({
            container: this.html_el,
            renderer: 'svg',
            loop: false,
            autoplay: false, // Disable autoplay for manual control
            path: src
          });
          
          this.html_el.style.width = "100px"; // ou toute autre largeur nécessaire
          this.html_el.style.height = "100px"; // ou toute autre hauteur nécessaire
        }


        if(type == "group")
        {
            this.html_el = document.createElement("div");
            this.html_el.setAttribute("id", id);
            this.childs = [];
        }
  
       
        this.html_el.classList.add('scene-object');

        // Transformation state
        this.position = { x: 0, y: 0 };
        this.rotation = 0; // in degrees
        this.scale = { x: 1, y: 1 };
  
        
    }
  
    // Method to update transformations
    update_transform() {
      const { x, y } = this.position;
      const angle = this.rotation;
      const { x: scaleX, y: scaleY } = this.scale;
      
      //this.html_el.style.transformOrigin = "center";
      this.html_el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
    }
  
     // Method to set position
     set_position(x, y) {
      this.position = { x, y };
      this.update_transform();
    }
  
    // Method to set rotation
    set_rotation(angle) {
      this.rotation = angle;
      this.update_transform();
    }
  
    // Method to set scale
    set_scale(scale) {
      this.scale = { x: scale, y: scale };
      this.update_transform();
    }
  }