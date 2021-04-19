import React from "react";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { API_HOST } from '../../constants/config';
const SimpleSlider = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  // const imgStyle = {
  // height: '480px',
  // width: '100%',
  // objectFit: 'cover',
  // }
  const listSlide = [
    {
      banner: 'image-1617096602892.jpg',
      link: `/book/46`
    },
    {
      banner: 'image-1617097920388.jpg',
      link: `/book/47`
    }
  ]
  return (
    <Slider {...settings} style={{ width: '754px' }}>
      {
        listSlide.map((item, index) => <div key={index}>
          <Link to={`${item.link}`}>
            <img src={`${API_HOST}/images/${item.banner}`} alt={'banner'} />
          </Link>
        </div>)
      }
    </Slider>
  );
}

export default SimpleSlider