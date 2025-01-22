export const scrollToSection = (to) => {
  const target = document.getElementById(to);
  console.log(to)
  console.log(target);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
    });
  }
};
