function openPage(pageName, event) {
  var i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.height = "0"
    tabcontent[i].style.overflow = "hidden"
  }

  // Remove active from all buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show selected tab content
  document.getElementById(pageName).style.height = "auto";
  document.getElementById(pageName).style.overflow = "visible";
  event.currentTarget.classList.add("active");

  // Change background color of .just-tabs
  var tabColor = event.currentTarget.getAttribute("data-color");
  if (tabColor) {
    document.querySelector(".just-tabs").style.backgroundColor = tabColor;
  }
}

// Open first tab by default & set background instantly
document.addEventListener("DOMContentLoaded", function(){
  var defaultBtn = document.getElementById("defaultOpen");
  if (defaultBtn) {
    // Set color immediately before click to avoid delay
    var firstColor = defaultBtn.getAttribute("data-color");
    if (firstColor) {
      document.querySelector(".just-tabs").style.backgroundColor = firstColor;
    }
    defaultBtn.click();
  }
});


// Show/hide search bar on clicking Search button
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".blog-search-btn");
  const searchBar = document.querySelector(".blog-search-bar");
  const searchInput = document.getElementById("blogSearchInput");
  const searchGo = document.getElementById("blogSearchGo");

  if (searchBtn && searchBar) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault(); // stop redirect

      if (searchBar.style.display === "none" || searchBar.style.display === "") {
        searchBar.style.display = "flex"; // show
        searchInput.focus();
      } else {
        searchBar.style.display = "none"; // hide
      }
    });
  }

  // Live filter while typing
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const filter = searchInput.value.toLowerCase();
      const articles = document.querySelectorAll(".blog-item");

      articles.forEach(function (item) {
        const title = item.querySelector("h4").textContent.toLowerCase();
        if (title.includes(filter)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  // Scroll to first matching article when clicking Go
  if (searchGo) {
    searchGo.addEventListener("click", function () {
      const filter = searchInput.value.toLowerCase();
      if (!filter) return;

      const articles = document.querySelectorAll(".blog-item");
      for (let item of articles) {
        const title = item.querySelector("h4").textContent.toLowerCase();
        if (title.includes(filter)) {
          item.scrollIntoView({ behavior: "smooth", block: "start" });
          item.style.outline = "2px solid red"; // highlight
          setTimeout(() => (item.style.outline = ""), 2000); // remove after 2s
          break; // stop at first match
        }
      }
    });
  }
});

