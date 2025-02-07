"use strict";

// 数据
const data = [
  { category: "Agro", title: "RSE Faible + Exportation", link: "https://agence-api.ouest-france.fr/article/remy-cointreau-accelere-le-deploiement-de-sa-liqueur-aux-etats-unis" },
  { category: "Agro", title: "Laitiers - Produits de la Mer", link: "https://agence-api.ouest-france.fr/article/avec-la-belle-du-large-le-saint-veut-conquerir-en-libre-service-le-rayon-produits-de-la-mer" },
  { category: "Artisanat", title: "Jeune + Laitiers + RSE", link: "https://agence-api.ouest-france.fr/article/cdoudeh-poursuit-le-developpement-de-ses-glaces-exotiques-a-saint-brieuc?security_key=6ccd99085455adb2b343419702ed78d4" },
  { category: "Tech", title: "BANQUE + Pas RSE + Vieux", link: "https://agence-api.ouest-france.fr/article/famileo-et-ses-gazettes-familiales-poursuivent-leur-dynamique-de-croissance" },
  { category: "Random", title: "Un Drakkar Viking", link: "https://agence-api.ouest-france.fr/article/ce-drakkar-viking-voguera-a-louverture-du-vendee-globe" },
  // 更多数据...
];

// 分页参数
const itemsPerPage = 5;
let currentPage = 1;

// 生成卡片
function generateCards(data) {
  const container = document.getElementById("content-container");
  container.innerHTML = ""; // 清空内容

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h2>${item.category}</h2>
      <p>${item.title}</p>
      <a href="${item.link}" target="_blank">Lire plus</a>
    `;
    container.appendChild(card);
  });
}

// 更新分页按钮状态
function updatePaginationButtons(totalPages) {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const currentPageSpan = document.getElementById("current-page");
  const totalPagesSpan = document.getElementById("total-pages");

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  currentPageSpan.textContent = currentPage;
  totalPagesSpan.textContent = totalPages;
}

// 渲染页面
function renderPage() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  generateCards(pageData);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  updatePaginationButtons(totalPages);
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  renderPage();

  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
    }
  });
});
