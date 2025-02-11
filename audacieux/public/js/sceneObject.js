class SceneObject {
  constructor(type, src, id, script = null, onload = null) {
      this.type = type;
      this.id = id;
      if (type === "svg") {
          this.html_el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          this.html_el.setAttribute("id", id);

          fetch(src)
              .then(response => response.text())
              .then(svgContent => {
                  this.html_el.innerHTML = svgContent;

                  const prefixStyles = (svgElement, prefix) => {
                      const styleElements = svgElement.querySelectorAll("style");
                      styleElements.forEach(style => {
                          style.textContent = style.textContent.replaceAll(
                              "cls",
                              `${prefix}-cls`
                          );
                      });
                  };

                  const prefixClasses = (svgElement, prefix) => {
                      const elementsWithClass = svgElement.querySelectorAll('[class]');
                      elementsWithClass.forEach((element) => {
                          const currentClass = element.getAttribute('class');
                          const newClass = currentClass
                              .split(' ')
                              .map(cls => `${prefix}-${cls}`)
                              .join(' ');
                          element.setAttribute('class', newClass);
                      });
                  };

                  prefixStyles(this.html_el, `${id}`);
                  prefixClasses(this.html_el, `${id}`);

                  this.html_el.style.pointerEvents = "none";
                  Array.from(this.html_el.children).forEach(element => {
                      element.style.pointerEvents = "all";
                  });

                  if (script) {
                      if (this.html_el && typeof window[script.func] === "function") {
                          this.html_el.addEventListener("click", (event) => {
                              window[script.func](event, ...script.args);
                          });
                      } else {
                          console.error(
                              "Erreur : l'objet HTML n'existe pas ou la fonction spécifiée n'est pas définie."
                          );
                      }
                  }

                  if (onload) {
                      window[onload.func](this.html_el, ...onload.args);
                  }
              })
              .catch(error => {
                  console.error("Erreur lors du chargement du SVG :", error);
              });
      } else if (type === "lottie") {
          this.html_el = document.createElement("div");
          this.html_el.setAttribute("id", id);
          this.lottieAnim = lottie.loadAnimation({
              container: this.html_el,
              renderer: 'svg',
              loop: false,
              autoplay: false,
              path: src
          });

          this.html_el.style.width = "100px";
          this.html_el.style.height = "100px";
      } else if (type === "group") {
          this.html_el = document.createElement("div");
          this.html_el.setAttribute("id", id);
          this.childs = [];
      }

      this.html_el.classList.add('scene-object');
      this.position = { x: 0, y: 0 };
      this.rotation = 0;
      this.scale = { x: 1, y: 1 };
      
  }

  update_transform() {
      const { x, y } = this.position;
      const angle = this.rotation;
      const { x: scaleX, y: scaleY } = this.scale;

      this.html_el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
  }

  set_position(x, y) {
      this.position = { x, y };
      this.update_transform();
  }

  set_rotation(angle) {
      this.rotation = angle;
      this.update_transform();
  }

  set_scale(scale) {
      this.scale = { x: scale, y: scale };
      this.update_transform();
  }

}
