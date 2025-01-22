export const scrollToSection = (to) => {
  const target = document.getElementById(to);
  console.log(to)
  console.log(target);
  console.log("scrollToSection");
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
    });
  }
};
