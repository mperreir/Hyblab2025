// Load Lottie Animations
const lottie1 = lottie.loadAnimation({
  container: document.getElementById('animated-object1'), // Lottie container
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/animation1.json', // Path to JSON file
});

const lottie2 = lottie.loadAnimation({
  container: document.getElementById('animated-object2'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/animation2.json',
});

// Define positions and keyframes using GSAP
gsap.timeline({ repeat: -1 }) // Loop animations
  .to("#animated-object1", { x: 200, y: 150, rotation: 360, duration: 2, ease: "power1.inOut" })
  .to("#animated-object1", { scale: 1.5, duration: 1, ease: "bounce.out" })
  .to("#animated-object1", { x: 0, y: 0, scale: 1, duration: 2, ease: "power1.inOut" });

gsap.timeline({ repeat: -1 })
  .to("#animated-object2", { x: -300, y: 200, rotation: -360, duration: 3, ease: "elastic.inOut" })
  .to("#animated-object2", { scale: 0.5, duration: 1, ease: "power1.inOut" })
  .to("#animated-object2", { x: 0, y: 0, scale: 1, duration: 2, ease: "power1.inOut" });
