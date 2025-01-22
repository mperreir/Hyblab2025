export const scrollToSection = (to) => {
  const target = document.getElementById(to);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
    });
  }
};
