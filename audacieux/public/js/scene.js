class Scene {
  constructor(file_name, scene_container){
    let init_keyframe;

    this.scene_container = document.getElementById(scene_container);
    this.objects = {};
    this.time = 0;

    fetch(file_name)
    .then(response => response.json())
    .then(data => {
      let new_element;
      console.log(data);
      data.elements.forEach(element => {
        new_element = new SceneObject(element.type, element.src, element.id)

        this.objects[new_element.id] = new_element;
        this.objects[new_element.id].keyframes = element.keyframes;

        init_keyframe = this.objects[new_element.id].keyframes[0];

        this.objects[new_element.id].set_position(init_keyframe.x, init_keyframe.y)
        this.objects[new_element.id].set_rotation(init_keyframe.rotation)
        this.objects[new_element.id].set_scale(init_keyframe.scale)

        this.scene_container.appendChild(new_element.html_el);
      });
      console.log(this.objects);  
    })
  }

  set_frame(time){
    let init_o;
    let end_o;
    for (const [key, value] of Object.entries(this.objects)) {
      for (let i = 0; i < value.keyframes.length-1; i++) {
        if(time >= value.keyframes[i].time && time < value.keyframes[i+1].time){
          init_o = value.keyframes[i];
          end_o = value.keyframes[i+1];

          value.set_position(interpolate(time, init_o.time, end_o.time, init_o.x, end_o.x),interpolate(time, init_o.time, end_o.time, init_o.y, end_o.y));
          value.set_rotation(interpolate(time, init_o.time, end_o.time, init_o.rotation, end_o.rotation));
          value.set_scale(interpolate(time, init_o.time, end_o.time, init_o.scale, end_o.scale));

          if(value.type == "lottie")
          {
            //Lottie behaviour
          }
        }
      }
    }
  }
}

class SceneObject{
  constructor(type, src, id){
      this.type = type;
      this.id = id;

      if(type == "svg")
      {
        this.html_el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.html_el.setAttribute("id", id);
        fetch(src)
        .then(response => response.text())
        .then(svgContent => {
          this.html_el.innerHTML = svgContent;
        })
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
      }

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

function interpolate(x, start_time, end_time, start_pos, end_pos)
{
    let slope = (end_pos - start_pos)/(end_time - start_time);
    return (slope)*(x-start_time) + start_pos
}

// Désactiver le scroll pour toute la page
document.body.style.overflow = "hidden";


const sceneManager = new Scene("sceneData.json", "scene-container")

// Gérer l'événement du scroll
const sceneContainer = document.getElementById("scene-container"); // Récupérer le conteneur de la scène

let isAnimating = false;
sceneContainer.addEventListener("wheel", function (event) {
  event.preventDefault();
  console.log(event.deltaY);
  timeDelta = event.deltaY/1000;
  maxTime = 4;

  sceneManager.time = Math.max(0, Math.min(sceneManager.time+timeDelta, maxTime));

  if (!isAnimating) {
    isAnimating = true;
    requestAnimationFrame(() => {
      sceneManager.set_frame(sceneManager.time);
      isAnimating = false;
    });
  }
}, { passive: false });


// Sélection de l'élément de la boîte
const mouseBox = document.getElementById('mouse-box');

// Écoute de l'événement de mouvement de la souris
document.addEventListener('mousemove', (event) => {
  // Met à jour la position de la boîte
  mouseBox.style.left = `${event.pageX + 10}px`; // Décalage pour ne pas être sous le curseur
  mouseBox.style.top = `${event.pageY + 10}px`;

  // Met à jour le texte de la boîte avec les coordonnées
  mouseBox.textContent = `X: ${event.pageX}, Y: ${event.pageY}`;
});