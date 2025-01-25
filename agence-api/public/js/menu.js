"use strict";

function initMenu(texts){
    const menuBtn = document.getElementById("menu-btn");
    const menuPopup = document.getElementById("menu-popup");
    const closeMenuBtn = document.getElementById("close-menu");
  
    // 点击「Menu」打开弹窗
    menuBtn.addEventListener("click", () => {
        menuPopup.classList.remove("hidden");
    });

    // 点击「×」关闭弹窗
    closeMenuBtn.addEventListener("click", () => {
        menuPopup.classList.add("hidden");
        menuBtn.checked = false;
    });

    // 点击背景(除 .menu-content 以外的区域)也关闭
    menuPopup.addEventListener("click", (event) => {
        if (event.target === menuPopup) {
        menuPopup.classList.add("hidden");
        }
    });
    const goCharactersLink = document.getElementById("go-secteurs"); // 选择角色按钮
    goCharactersLink.addEventListener("click", (e) => {
        e.preventDefault();              // 阻止 href 跳转
        menuPopup.classList.add("hidden");  // 先关菜单
        initSlide2(true);
    });
    // 点击“结束游戏”跳转到首页
    const quitGameLink = document.getElementById("quit-game"); // 结束游戏按钮
    quitGameLink.addEventListener("click", () => {
    choices = []; // reset choices
    window.location.href = "../agence-api/"; // 跳转到首页
    });

    const goResultsLink = document.getElementById("go-results");
    goResultsLink.addEventListener("click", (e) => {
        e.preventDefault();              // 阻止 href 跳转
        menuPopup.classList.add("hidden");  // 先关菜单
        swiper.slideNext();
    });
}