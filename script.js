document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      item.classList.toggle("active");
    });
  });

  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", runSearch);
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") runSearch();
    });
  }

  function runSearch() {
    const term = searchInput.value.trim();
    const contentBlocks = document.querySelectorAll(".searchable");

    contentBlocks.forEach(block => {
      block.innerHTML = block.innerHTML.replace(/<mark>(.*?)<\/mark>/g, "\$1");
    });

    if (!term) return;

    contentBlocks.forEach(block => {
      const regex = new RegExp(`(${term})`, "gi");
      block.innerHTML = block.innerHTML.replace(regex, "<mark>\$1</mark>");
    });
  }
});
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const massButtons = document.querySelectorAll(".mass-tab-btn");
  const massPanels = document.querySelectorAll(".mass-panel");

  massButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetMass = button.dataset.mass;

      massButtons.forEach(btn => btn.classList.remove("active"));
      massPanels.forEach(panel => panel.classList.remove("active"));

      button.classList.add("active");
      const activePanel = document.getElementById(targetMass);
      activePanel.classList.add("active");
    });
  });

  const allMassPanels = document.querySelectorAll(".mass-panel");

  allMassPanels.forEach(panel => {
    const doctrineButtons = panel.querySelectorAll(".doctrine-tab-btn");
    const doctrineContents = panel.querySelectorAll(".doctrine-content");

    doctrineButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.target;

        doctrineButtons.forEach(b => b.classList.remove("active"));
        doctrineContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        panel.querySelector(`#${target}`).classList.add("active");
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const allDoctrineSections = document.querySelectorAll(".doctrine-content");

  allDoctrineSections.forEach(section => {
    const sourceButtons = section.querySelectorAll(".source-btn");
    const sourceBoxes = section.querySelectorAll(".lit-text-box");

    sourceButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.source;

        sourceButtons.forEach(b => b.classList.remove("active"));
        sourceBoxes.forEach(box => box.classList.remove("active"));

        btn.classList.add("active");
        section.querySelector(`#${target}`).classList.add("active");
      });
    });
  });
});