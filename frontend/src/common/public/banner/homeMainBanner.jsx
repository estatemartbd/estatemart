/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import errorSlide from "../../../assets/images/ad-sample-900x225.jpg";
import defaultSlide from "../../../assets/images/property/pc3.jpeg";
import defaultSlide2 from "../../../assets/images/property/pc2.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./sliderStyle.css";

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper";
const defultImage = [
  {
    image: defaultSlide
  },
  {
    image: defaultSlide2
  }
]
function HomeMainBanner({ bannerData, bannerImgPath }) {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = errorSlide;    
  };
  // console.log('bannner', bannerData.length);
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
      loop={true}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      navigation={{
        clickable: true,
      }}
    >
      {(bannerData?.length >= 1) ? (
        <>
          {bannerData?.map((e,index) => (
            <SwiperSlide>
              {/* {" "} */}
              <img
                className="slide-one"
                src={bannerImgPath + "/" + e?.image}
                style={{
                  height: "500px",
                  width: "100%",
                  objectFit: "cover",
                  objectRepeat: "no-repeat",
                  // filter: 'opacity(0.5)',
                }}
                onError={handleImageError}
              />
            </SwiperSlide>
          ))}
        </>
      ) : (
        <>
          {defultImage?.map((e,index) => (
            <SwiperSlide>
              {/* {" "} */}
              <img
                className="slide-one"
                src={ e?.image}
                style={{
                  //   backgroundImage: `url(images/home/5.jpg)`,
                  height: "500px",
                  width: "100%",
                  objectFit: "cover",
                  objectRepeat: "no-repeat",
                  // filter: 'opacity(0.5)',
                }}
              />
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>
  );
}

export default HomeMainBanner;
