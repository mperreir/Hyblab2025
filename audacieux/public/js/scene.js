class Scene {
  constructor(file_name, scene_container){
    let init_keyframe;

    this.scene_container = document.getElementById(scene_container);
    this.objects = [];
    this.time = 0;

    fetch(file_name)
    .then(response => response.json())
    .then(data => {
      let new_element;
      console.log(data);
      data.elements.forEach(element => {
        this.objects.push(addData(element, this.scene_container))
      });
      console.log(this.objects);  
    })
  }

  set_frame(time){
    let init_o;
    let end_o;
    for (const [key, value] of Object.entries(this.objects)) {
      updateKeyframes(value, time); // Appel de la fonction récursive
    }
  }
}


function interpolate(x, start_time, end_time, start_pos, end_pos)
{
    let slope = (end_pos - start_pos)/(end_time - start_time);
    return (slope)*(x-start_time) + start_pos
}

// Désactiver le scroll pour toute la page
document.body.style.overflow = "hidden";


function addData(element, container){

  let new_element;
  if(element.script){
    new_element = new SceneObject(element.type, element.src, element.id, element.script);
  }else{
    new_element = new SceneObject(element.type, element.src, element.id)
  }
    


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
      //new_element.childs.push()
      console.log(new_element);
      let new_sub_element = addData(sub_element, new_element.html_el);
      console.log( new_sub_element);
      console.log(new_element);
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

      if (value.type === "lottie") {
        // Lottie behaviour
      }
    }
  }

  // Si l'objet est un groupe, traiter ses sous-éléments
  if (value.type === "group" && value.childs) {
    for (const child of value.childs) {
      updateKeyframes(child, time); // Appel récursif
    }
  }
}


function test(text){
  console.log(text);
}