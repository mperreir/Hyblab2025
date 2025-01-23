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