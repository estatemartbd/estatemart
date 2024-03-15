/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Slider from "react-slick";
import defaultSlide from "../../../assets/images/ad-sample-900x225.jpg";
import { Link } from 'react-router-dom'

function TopBanner({ bannerData, bannerImgPath }) {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultSlide;
  };
  return (
    <Slider
      dots={true}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={3500}
      style={{ marginBottom: -10 }}
    >
      {bannerData?.map((e) => (
        <a href={e.details}>
          <div
            className="banner-style-one owl-theme"
            style={{ backgroundColor: "black" }}
            key={e?.id}
          >
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
            {/* </div> */}
          </div>
        </a>
      ))}
    </Slider>
  );
}

export default TopBanner;
