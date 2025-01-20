document.addEventListener("DOMContentLoaded", () => {
    const options = document.querySelectorAll(".option");
    const sizes = document.querySelectorAll(".size");

    options.forEach(option => {
        option.addEventListener("click", () => {
            options.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
        });
    });

    sizes.forEach(size => {
        size.addEventListener("click", () => {
            sizes.forEach(s => s.classList.remove("selected"));
            size.classList.add("selected");
        });
    });
});


