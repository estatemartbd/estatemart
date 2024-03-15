/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Slider from 'react-slick'

function RightBanner({ bannerData, bannerImgPath }) {
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = 'https://via.placeholder.com/300'
  }
  return (
    <Slider
      dots={true}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={2500}
    >
      {bannerData?.map((e) => (
        <a href={e.details}>
          <div className="feat_property home7 agent">
            <img
              className="slide-one"
              src={bannerImgPath + '/' + e?.image}
              style={{
                //   backgroundImage: `url(images/home/5.jpg)`,
                height: '320px',
                width: '100%',
                objectFit: 'cover',
                objectRepeat: 'no-repeat',
                // filter: 'opacity(0.5)',
              }}
              onError={handleImageError}
            />
          </div>
        </a>
      ))}
    </Slider>
  )
}

export default RightBanner
