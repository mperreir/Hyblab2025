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


function interpolate(x, start_time, end_time, start_pos, end_pos)
{
    let slope = (end_pos - start_pos)/(end_time - start_time);
    return (slope)*(x-start_time) + start_pos
}

// Désactiver le scroll pour toute la page
document.body.style.overflow = "hidden";


