/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import defaultSlide from "../../../assets/images/ad-sample-900x225.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./sliderStyle.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

function PropertyDetailAd({ bannerData, bannerImgPath }) {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =defaultSlide;
  };
  return (
    <Swiper
    spaceBetween={0}
    centeredSlides={true}
    effect={"fade"}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    // navigation={true}
    loop={true}
      // navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className="mySwiper"

    >
      {bannerData?.map((e) => (
        <SwiperSlide>
          {/* {" "} */}
          <img
            className="slide-one"
            src={bannerImgPath + "/" + e?.image}
            style={{
              //   backgroundImage: `url(images/home/5.jpg)`,
              height: "300px",
              width: "100%",
              objectFit: "cover",
              objectRepeat: "no-repeat",
              // filter: 'opacity(0.5)',
            }}
            onError={handleImageError}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default PropertyDetailAd;
