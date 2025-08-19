$(document).ready(function () {
  const $slider = $(".about-slider-main");
  const autoplaySpeed = 4000;
  const $progressBar = $(".about-slider-progress");
  let slideCount = $slider.children().length;
  let currentIndex = 0;
  let isPaused = false;
  let animationFrame;
  let progressStartTime = null;
  let progressElapsed = 0;

  // Generate progress segments
  if ($progressBar.find(".progress-segment").length === 0) {
    let html = "";
    for (let i = 0; i < slideCount; i++) {
      html += `<div class="progress-segment" data-index="${i}"><span></span></div>`;
    }
    $progressBar.html(html);
  }

  // Slick init
  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed,
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
  });

  function updateProgress() {
    const now = Date.now();
    const elapsed = now - progressStartTime + progressElapsed;
    const progress = Math.min((elapsed / autoplaySpeed) * 100, 100);

    $progressBar
      .find(`.progress-segment[data-index="${currentIndex}"] span`)
      .css("width", `${progress}%`);

    if (progress < 100) {
      animationFrame = requestAnimationFrame(updateProgress);
    }
  }

  function startProgress() {
    progressStartTime = Date.now();
    animationFrame = requestAnimationFrame(updateProgress);
  }

  function pauseProgress() {
    cancelAnimationFrame(animationFrame);
    progressElapsed += Date.now() - progressStartTime;
  }

  function resetProgress(index) {
    $(".progress-segment span").css("width", "0%");
    $(".progress-segment").each(function () {
      if ($(this).data("index") < index) {
        $(this).find("span").css("width", "100%");
      }
    });
  }

  $slider.on("init", function () {
    resetProgress(0);
    startProgress();
  });

  $slider.on("beforeChange", function (e, slick, current, next) {
    currentIndex = next;
    cancelAnimationFrame(animationFrame);
    progressElapsed = 0;
    resetProgress(next);
  });

  $slider.on("afterChange", function () {
    if (!isPaused) {
      startProgress();
    }
  });

  // Pause/resume on click
  $slider.on("click", function () {
    if (isPaused) {
      isPaused = false;
      progressStartTime = Date.now();
      $slider.slick("slickPlay");
      animationFrame = requestAnimationFrame(updateProgress);
    } else {
      isPaused = true;
      $slider.slick("slickPause");
      pauseProgress();
    }
  });

  $slider.trigger("init");
});
