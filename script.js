/* =========================================
   MAIN JAVASCRIPT
   العقيدة في الليتورجية القبطية
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     FAQ
  ========================================= */

  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

      const currentItem = this.parentElement;

      // قفل باقي الأسئلة
      document.querySelectorAll(".faq-item").forEach(function (item) {
        if (item !== currentItem) {
          item.classList.remove("open");
        }
      });

      // فتح / قفل السؤال الحالي
      currentItem.classList.toggle("open");

    });

  });


  /* =========================================
     SEARCH
  ========================================= */

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  // كل العناصر اللي ينفع نبحث جواها
  const searchableElements = document.querySelectorAll(".searchable");


  function searchPage() {

    const searchValue = searchInput.value.trim().toLowerCase();

    // إزالة التحديد القديم
    document.querySelectorAll(".search-highlight").forEach(function (element) {

      const parent = element.parentNode;

      parent.replaceChild(
        document.createTextNode(element.textContent),
        element
      );

      parent.normalize();

    });


    // لو مربع البحث فاضي
    if (searchValue === "") {

      searchableElements.forEach(function (section) {
        section.style.display = "";
      });

      return;
    }


    let foundSomething = false;


    searchableElements.forEach(function (section) {

      const text = section.textContent.toLowerCase();

      if (text.includes(searchValue)) {

        section.style.display = "";
        foundSomething = true;

        highlightText(section, searchValue);

      } else {

        section.style.display = "none";

      }

    });


    // لو مفيش نتائج
    let noResult = document.getElementById("noSearchResult");

    if (!foundSomething) {

      if (!noResult) {

        noResult = document.createElement("div");
        noResult.id = "noSearchResult";

        noResult.style.textAlign = "center";
        noResult.style.padding = "25px";
        noResult.style.marginTop = "20px";
        noResult.style.background = "#f1eaf5";
        noResult.style.borderRadius = "12px";
        noResult.style.color = "#4c2c62";
        noResult.style.fontWeight = "700";

        noResult.textContent =
          "لم يتم العثور على نتائج لهذه الكلمة.";

        searchInput.parentElement.parentElement.appendChild(noResult);

      }

      noResult.style.display = "block";

    } else {

      if (noResult) {
        noResult.style.display = "none";
      }

    }

  }


  /* =========================================
     HIGHLIGHT SEARCH RESULTS
  ========================================= */

  function highlightText(element, searchValue) {

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {

          // تجاهل النصوص داخل عناصر غير مناسبة
          if (
            node.parentElement &&
            (
              node.parentElement.tagName === "SCRIPT" ||
              node.parentElement.tagName === "STYLE" ||
              node.parentElement.classList.contains("search-highlight")
            )
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );


    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }


    textNodes.forEach(function (node) {

      const text = node.nodeValue;

      const lowerText = text.toLowerCase();

      const index = lowerText.indexOf(searchValue);

      if (index === -1) {
        return;
      }


      const fragment = document.createDocumentFragment();

      let currentPosition = 0;


      while (true) {

        const matchIndex =
          lowerText.indexOf(searchValue, currentPosition);

        if (matchIndex === -1) {

          fragment.appendChild(
            document.createTextNode(
              text.substring(currentPosition)
            )
          );

          break;
        }


        // النص قبل الكلمة
        fragment.appendChild(
          document.createTextNode(
            text.substring(
              currentPosition,
              matchIndex
            )
          )
        );


        // الكلمة نفسها
        const highlight = document.createElement("span");

        highlight.className = "search-highlight";

        highlight.textContent =
          text.substring(
            matchIndex,
            matchIndex + searchValue.length
          );

        fragment.appendChild(highlight);


        currentPosition =
          matchIndex + searchValue.length;

      }


      node.parentNode.replaceChild(fragment, node);

    });

  }


  /* =========================================
     SEARCH BUTTON
  ========================================= */

  if (searchBtn) {

    searchBtn.addEventListener("click", function () {

      searchPage();

    });

  }


  /* =========================================
     SEARCH WITH ENTER
  ========================================= */

  if (searchInput) {

    searchInput.addEventListener("keydown", function (event) {

      if (event.key === "Enter") {

        searchPage();

      }

    });


    /* =========================================
       LIVE SEARCH
    ========================================= */

    searchInput.addEventListener("input", function () {

      if (this.value.trim() === "") {

        searchPage();

      }

    });

  }


  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const navLinks =
    document.querySelectorAll(".nav nav a");


  navLinks.forEach(function (link) {

    const linkPage =
      link.getAttribute("href");

    if (linkPage === currentPage) {

      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");

    }

  });


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =========================================
     FADE IN SECTIONS WHEN SCROLLING
  ========================================= */

  const sections =
    document.querySelectorAll(".section");


  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

          }

        });

      },
      {
        threshold: 0.08
      }
    );


  sections.forEach(function (section) {

    observer.observe(section);

  });

});