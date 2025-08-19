$(document).ready(function () {
  var menuItems = $(".header__inline-menu > ul > li");

  menuItems.each(function (index) {
    var nthChild = index + 1;
    var hasMegaMenu = $(".menu-" + nthChild).length > 0;

    if (hasMegaMenu) {
      $(document).on(
        "mouseenter",
        ".header__inline-menu > ul > li:nth-child(" + nthChild + ")",
        function () {
          $(".main-menu-item .main-menu-dropdown").removeClass("show-menu closing");
          $(".menu-" + nthChild).addClass("show-menu");
          $(".header-wrapper").addClass("bg-red-hover");
        }
      );
    }
  });

  // Close with animation
  $(document).on("mouseleave", ".header-wrapper", function () {
    const $dropdowns = $(".main-menu-item .main-menu-dropdown");

    $dropdowns.each(function () {
      const $menu = $(this);
      if ($menu.hasClass("show-menu")) {
        $menu.removeClass("show-menu").addClass("closing");

        // Wait for CSS transition to finish before hiding
        setTimeout(function () {
          $menu.removeClass("closing");
        }, 300); // match CSS transition duration
      }
    });

    $(".header-wrapper").removeClass("bg-red-hover");
  });

  // Tab logic
  $(".tab-sub-menus li:first-child").addClass("active");
  $(".main-menu-dropdown .tab-content").hide();
  $(".main-menu-dropdown").each(function () {
    $(this).find(".tab-content:first").show();
  });

  $(".tab-sub-menus li").mouseenter(function () {
    var $parent = $(this).closest(".main-menu-dropdown");
    $parent.find(".tab-sub-menus li").removeClass("active");
    $parent.find(".tab-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab)?.show();
    return false;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  function activateTab(id) {
    buttons.forEach((btn) => btn.classList.remove("active"));
    contents.forEach((content) => content.classList.remove("active"));

    document
      .querySelector(`.tab-button[data-tab="${id}"]`)
      ?.classList.add("active");
    document.getElementById(id)?.classList.add("active");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      activateTab(tabId);
    });
  });

  if (buttons.length) {
    activateTab(buttons[0].getAttribute("data-tab"));
  }
});
