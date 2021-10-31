import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={30000}
      >
        <div>
          <img
            loading="lazy"
            src="https://st2.depositphotos.com/5547208/8113/v/950/depositphotos_81139896-stock-illustration-online-shopping-banner.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src=""
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
