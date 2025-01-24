class Scene {
  constructor(file_name, scene_container, sceneAudio){
    this.scene_container = document.getElementById(scene_container);
    this.objects = [];
    this.sceneAudio = sceneAudio;
    this.time = 0;

    fetch(file_name)
    .then(response => response.json())
    .then(data => {
      data.elements.forEach(element => {
        this.objects.push(addData(element, this.scene_container))
      }); 

      this.triggers = data.triggers;
    })
  }

  set_frame(time){
    this.sceneAudio.updateAudio(time);
    for (const value of this.objects) {
      updateKeyframes(value, time); // Appel de la fonction récursive
    }
  }

  loadTriggers()
  {
    this.triggers.forEach(triggers => {
      const html_object = document.getElementById(triggers.id);
      console.log(html_object)
      // Ajouter un gestionnaire d'événements si nécessaire
      if (triggers.script) {
        if (html_object && typeof window[triggers.script.func] === "function") {
          html_object.addEventListener("click", (event) => {
                // Appeler la fonction spécifiée avec les arguments
                window[triggers.script.func](event, ...triggers.script.args);
            });
        } 
    }

    // Exécuter la fonction onload si elle est définie
    if (triggers.onload) {
        console.log(triggers.onload.func)
        window[triggers.onload.func](html_object, ...triggers.onload.args);
        console.log("test")
    }
    }); 
  }
}


function interpolate(x, start_time, end_time, start_pos, end_pos)
{
    let slope = (end_pos - start_pos)/(end_time - start_time);
    return (slope)*(x-start_time) + start_pos
}

function addData(element, container){

  let new_element = new SceneObject(
    element.type,
    element.src,
    element.id,
    element.script || null,
    element.onload || null
  );
  
  new_element.keyframes = element.keyframes;

  init_keyframe = new_element.keyframes[0];

  new_element.set_position(init_keyframe.x, init_keyframe.y)
  new_element.set_rotation(init_keyframe.rotation)
  new_element.set_scale(init_keyframe.scale)

  new_element.html_el.style.zIndex = element.z;
  container.appendChild(new_element.html_el);
  
  if(element.type == "group")
  {
    element.subElement.forEach((sub_element) => {
      let new_sub_element = addData(sub_element, new_element.html_el);
      new_element.childs.push(new_sub_element)  
    })
    
  }

  return new_element;
}

function updateKeyframes(value, time) {
  for (let i = 0; i < value.keyframes.length - 1; i++) {
    if (time >= value.keyframes[i].time && time < value.keyframes[i + 1].time) {
      const init_o = value.keyframes[i];
      const end_o = value.keyframes[i + 1];

      value.set_position(
        interpolate(time, init_o.time, end_o.time, init_o.x, end_o.x),
        interpolate(time, init_o.time, end_o.time, init_o.y, end_o.y)
      );
      value.set_rotation(
        interpolate(time, init_o.time, end_o.time, init_o.rotation, end_o.rotation)
      );
      value.set_scale(
        interpolate(time, init_o.time, end_o.time, init_o.scale, end_o.scale)
      );
    }
  }

  // Si l'objet est un groupe, traiter ses sous-éléments
  if (value.type === "group" && value.childs) {
    for (const child of value.childs) {
      updateKeyframes(child, time); // Appel récursif
    }
  }
}


function test(event, text){
  console.log("MAGASIN !!");
  zoomOutScene();
}

function loadSceneScript(event, id)
{
  loadImageScene("image_holder.json", id);
}

function loadImageScene(file_name, id) {
  const imageScene = document.getElementById("image-scene");
  const container = document.getElementById("box-container");
  
  // Clear previous clickable divs
  container.querySelectorAll('.clickable-div').forEach(div => div.remove());

  // Smooth transition effect
  imageScene.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  imageScene.style.transform = 'scale(1.1)';
  imageScene.style.opacity = '0';

  fetch(file_name)
    .then(response => response.json())
    .then(data => {
      for(let i = 0; i < data.scenes.length; i +=1) {
        if(data.scenes[i].id == id) {
          // Delay to allow previous image to fade out
          setTimeout(() => {
            imageScene.src = data.scenes[i].url;
            
            // Smooth fade-in and zoom-in effect
            imageScene.style.transform = 'scale(1)';
            imageScene.style.opacity = '1';
            imageScene.style.zIndex = 999;
            
            data.scenes[i].box.forEach(div => {
              const clickableDiv = document.createElement('div');
              clickableDiv.classList.add('clickable-div');
              clickableDiv.style.left = div.left;
              clickableDiv.style.top = div.top;
              clickableDiv.style.width = div.width;
              clickableDiv.style.height = div.height;
              
              if(div.script) {
                if (typeof window[div.script.func] === "function") {
                  clickableDiv.addEventListener("click", (event) => {
                    window[div.script.func](event, ...div.script.args);
                  });
                } else {
                  console.error("Fonction non définie :", div.script.func);
                }
              }
        
              container.appendChild(clickableDiv);
            });
          }, 500); // Match this to transition duration
        }
      }
    })
}

function zoomOutScene() {
  const imageScene = document.getElementById("image-scene");
  
  // Zoom-out and fade-out effect
  imageScene.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  imageScene.style.transform = 'scale(1.1)';
  imageScene.style.opacity = '0';
  
  
  // Optional: Clear clickable divs after transition
  setTimeout(() => {
    const container = document.getElementById("box-container");
    container.querySelectorAll('.clickable-div').forEach(div => div.remove());
    imageScene.src = "";
    imageScene.style = "";
  }, 500);
}