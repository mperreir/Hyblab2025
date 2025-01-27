"use strict";

function initMenu(){
    const menuBtns = document.querySelectorAll(`#menu-btn`);
    const menuPopups = document.querySelectorAll(`#menu-popup`);
    const closeMenuBtns = document.querySelectorAll(`#close-menu`);
    const goCharactersLinks = document.querySelectorAll(`#go-secteurs`);
    const quitGameLinks = document.querySelectorAll(`#quit-game`);
    const goResultsLinks = document.querySelectorAll(`#go-results`);

    // 点击「Menu」打开弹窗
    menuBtns.forEach((menuBtn, index) => {
        menuBtn.addEventListener("click", () => {
            menuPopups[index].classList.remove("hidden");
        });
    });
  

    // 点击「×」关闭弹窗
    closeMenuBtns.forEach((closeMenuBtn, index) => {
        closeMenuBtn.addEventListener("click", () => {
            menuPopups[index].classList.add("hidden");
            menuBtns[index] = false;
        });
    });

    // 点击背景(除 .menu-content 以外的区域)也关闭
    menuPopups.forEach((menuPopup, index) => {
        // 点击背景(除 .menu-content 以外的区域)也关闭
        menuPopup.addEventListener("click", (event) => {
            if (event.target === menuPopup) {
            menuPopup.classList.add("hidden");
            menuBtns[index].checked = false;
            }
        });
    });

    goCharactersLinks.forEach((goCharactersLink, index) => {
        goCharactersLink.addEventListener("click", (e) => {
            e.preventDefault();              // 阻止 href 跳转
            menuPopups[index].classList.add("hidden");  // 先关菜单
            menuBtns[index].checked = false;
            switchTheme("theme-default");
            changeApiName("Api");
            // toggleSwiper(true);
            swiper.slideTo(1);
            initSlide2(true);
        });
    });


    quitGameLinks.forEach((quitGameLink, index) => {
        quitGameLink.addEventListener("click", () => {
            choices = []; // reset choices
            window.location.href = "../agence-api/"; // 跳转到首页
        });
    });

    goResultsLinks.forEach((goResultsLink, index) => {
        goResultsLink.addEventListener("click", (e) => {
            e.preventDefault();              // 阻止 href 跳转
            menuPopups[index].classList.add("hidden");  // 先关菜单
            swiper.slideNext();
        });
    });
}

function changeApiName(name){
    document.querySelectorAll(`#ApiName`).forEach((ApiName) => {
        ApiName.textContent = name;
    });
}