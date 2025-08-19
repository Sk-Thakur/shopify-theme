$(document).ready(function () {
  $(".instagram-slider").slick({
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,         // no delay
    speed: 3000,              // control scrolling speed (higher = slower)
    cssEase: "linear",        // linear movement for smooth continuous effect
    pauseOnHover: false,      // keep scrolling even on hover
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  });
});
