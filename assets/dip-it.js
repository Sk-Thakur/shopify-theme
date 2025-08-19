document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".hover-heading");
  const mobileBadges = document.querySelectorAll(".badge-mobile");

  // Store first heading content as fallback
  const fallback = {
    img: headings[0]?.dataset.contentImg || "",
    caption: headings[0]?.dataset.caption || "",
    desc: headings[0]?.dataset.desc || "",
  };

  // ✅ Function to update the right-side content
  function updateContent(img, caption, desc) {
    if (img) document.getElementById("dipImage").src = img;
    if (caption !== undefined) document.getElementById("dipCaption").textContent = caption;
    if (desc !== undefined) document.getElementById("dipDesc").innerHTML = desc;
  }

  // ✅ Desktop hover functionality (UNCHANGED)
  const firstHeading = headings[0];
  if (firstHeading) {
    updateContent(fallback.img, fallback.caption, fallback.desc);
  }

  headings.forEach((heading) => {
    heading.addEventListener("mouseenter", () => {
      const img = heading.dataset.contentImg || fallback.img;
      const caption = heading.dataset.caption || fallback.caption;
      const desc = heading.dataset.desc || fallback.desc;
      updateContent(img, caption, desc);
    });
  });

  // ✅ MOBILE ONLY: Badge click to change image + content
  mobileBadges.forEach(function (badge) {
    const defaultImg = badge.src;
    const clickedImg = badge.dataset.clickImg;

    badge.dataset.defaultImg = defaultImg;

    badge.addEventListener("click", function () {
      // Reset all others
      mobileBadges.forEach(function (other) {
        if (other !== badge) {
          other.src = other.dataset.defaultImg;
        }
      });

      // Swap image
      badge.src = badge.src.includes(clickedImg) ? defaultImg : clickedImg;

      // Find related heading in same block
      const wrapper = badge.closest(".hover-toggle-wrapper");
      const heading = wrapper?.querySelector(".hover-heading");

      let img = heading?.dataset.contentImg;
      let caption = heading?.dataset.caption;
      let desc = heading?.dataset.desc;

      const isEmpty = !(img?.trim() || caption?.trim() || desc?.trim());

      // Use fallback if no content
      if (isEmpty) {
        img = fallback.img;
        caption = fallback.caption;
        desc = fallback.desc;
      }

      updateContent(img, caption, desc);
    });
  });
});
