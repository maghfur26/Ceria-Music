
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useState } from 'react';
import { useEffect } from 'react';

const Service = () => {
  const cards = [
    {
      id: 1,
      icon: (
        <img
          className="w-full h-64  rounded-sm"
          src="https://s3-alpha-sig.figma.com/img/6cbc/cb21/55f6a8acd8dd350402f9f109ac2f2964?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=adNBO5HC3dVLmyeq3xYPKq7r0uigoPPsB3RnmUqq9GJg31fLX~jozlvNgv4nG50U7Nybm6rNHHcapApGlnd8gq68Y9G-zaXuGIrUOAJGKnkFwn9tIKD0oPyBwYQlqZyLO7un4JyvG3THvaZk4Xt2KvFnr-B84UR1XYaOBJrBEULRQJU0kqtPvCkXLT77nSi7Y~GpZ1F4v35zBSeXqEXSECUGi~VwjK3s5L~9JRNV1M5ZrbWRy5sxAmCG-J7REAneFLy2IwHxoj0dteTM6VXP3dTkZRN98RsVE-~vlvYbzBXAf10j4ZfOsd-nSnfQtMTA9A4KVDQCo8iGyRjSt557cA__"
          alt=""
        />
      ),
      name: "Top Notch Facilities",
     
    },
    {
      id: 2,
      icon: (
        <img
          className="w-full h-64  rounded-sm"
          src="https://s3-alpha-sig.figma.com/img/d30d/2972/6ef940ae0353ae9879b5ad00a08218dc?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W5qUH56SgHYN8APDOFWmegST1M9FLvwHuS76cGFj9XHvPwfp8Ta9m2MQva0ostSzfOgN1xSrtSfEkDQsyFAka65MJMUIvkcxWzgWYDYBp1CsH45gipkkX6wzPHO8wNeh21K3iO6efUDtsmjK5Th-GAsaBk2NUJDtgQpeF~8cOpbUc4BVA~WICbQu3sC92yOEB8Qbt7ZZbFwQw284pLF2UuUEDV-mx3DDbQok~J3zpjEh2ehskbkZjT93YVicdyZxosj7QqqNd8QyOsjOWOIzaKfCbU2Foe7S2aAXRuM93YT91xSe254qpBWILzlxqf6~8sWWM~XNRDCftn51IcSTlg__"
          alt=""
        />
      ),
      name: "Quality Residence",
     
    },
    {
      id: 3,
      icon: (
        <img
          className="w-full h-64  rounded-sm"
          src="https://s3-alpha-sig.figma.com/img/6cbc/cb21/55f6a8acd8dd350402f9f109ac2f2964?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=adNBO5HC3dVLmyeq3xYPKq7r0uigoPPsB3RnmUqq9GJg31fLX~jozlvNgv4nG50U7Nybm6rNHHcapApGlnd8gq68Y9G-zaXuGIrUOAJGKnkFwn9tIKD0oPyBwYQlqZyLO7un4JyvG3THvaZk4Xt2KvFnr-B84UR1XYaOBJrBEULRQJU0kqtPvCkXLT77nSi7Y~GpZ1F4v35zBSeXqEXSECUGi~VwjK3s5L~9JRNV1M5ZrbWRy5sxAmCG-J7REAneFLy2IwHxoj0dteTM6VXP3dTkZRN98RsVE-~vlvYbzBXAf10j4ZfOsd-nSnfQtMTA9A4KVDQCo8iGyRjSt557cA__"
          alt=""
        />
      ),
      name: "Top Notch Facilities"
     
    },
   
    {
      id: 5,
      icon: (
        <img
          className="w-full h-64  rounded-sm"
          src="https://s3-alpha-sig.figma.com/img/d30d/2972/6ef940ae0353ae9879b5ad00a08218dc?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W5qUH56SgHYN8APDOFWmegST1M9FLvwHuS76cGFj9XHvPwfp8Ta9m2MQva0ostSzfOgN1xSrtSfEkDQsyFAka65MJMUIvkcxWzgWYDYBp1CsH45gipkkX6wzPHO8wNeh21K3iO6efUDtsmjK5Th-GAsaBk2NUJDtgQpeF~8cOpbUc4BVA~WICbQu3sC92yOEB8Qbt7ZZbFwQw284pLF2UuUEDV-mx3DDbQok~J3zpjEh2ehskbkZjT93YVicdyZxosj7QqqNd8QyOsjOWOIzaKfCbU2Foe7S2aAXRuM93YT91xSe254qpBWILzlxqf6~8sWWM~XNRDCftn51IcSTlg__"
          alt=""
        />
      ),
      name: "Quality Residence",
     
    },
    {
      id: 6,
      name: "Top Notch Facilities",
      icon: (
        <img
          className="w-full h-64  rounded-sm"
          src="https://s3-alpha-sig.figma.com/img/6cbc/cb21/55f6a8acd8dd350402f9f109ac2f2964?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=adNBO5HC3dVLmyeq3xYPKq7r0uigoPPsB3RnmUqq9GJg31fLX~jozlvNgv4nG50U7Nybm6rNHHcapApGlnd8gq68Y9G-zaXuGIrUOAJGKnkFwn9tIKD0oPyBwYQlqZyLO7un4JyvG3THvaZk4Xt2KvFnr-B84UR1XYaOBJrBEULRQJU0kqtPvCkXLT77nSi7Y~GpZ1F4v35zBSeXqEXSECUGi~VwjK3s5L~9JRNV1M5ZrbWRy5sxAmCG-J7REAneFLy2IwHxoj0dteTM6VXP3dTkZRN98RsVE-~vlvYbzBXAf10j4ZfOsd-nSnfQtMTA9A4KVDQCo8iGyRjSt557cA__"
          alt=""
        />
      ),
     
    },
    {
      id: 7,
      icon: (
        <img
          className="w-full h-64  rounded-sm"
          src="https://s3-alpha-sig.figma.com/img/d30d/2972/6ef940ae0353ae9879b5ad00a08218dc?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W5qUH56SgHYN8APDOFWmegST1M9FLvwHuS76cGFj9XHvPwfp8Ta9m2MQva0ostSzfOgN1xSrtSfEkDQsyFAka65MJMUIvkcxWzgWYDYBp1CsH45gipkkX6wzPHO8wNeh21K3iO6efUDtsmjK5Th-GAsaBk2NUJDtgQpeF~8cOpbUc4BVA~WICbQu3sC92yOEB8Qbt7ZZbFwQw284pLF2UuUEDV-mx3DDbQok~J3zpjEh2ehskbkZjT93YVicdyZxosj7QqqNd8QyOsjOWOIzaKfCbU2Foe7S2aAXRuM93YT91xSe254qpBWILzlxqf6~8sWWM~XNRDCftn51IcSTlg__"
          alt=""
        />
      ),
      name: "Quality Residence",
     
    },
    
  ];  
  
  const [sliderSettings, setSliderSettings] = useState(getSliderSettings());

  useEffect(() => {
    function handleResize() {
      setSliderSettings(getSliderSettings());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getSliderSettings() {
    return {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      slidesToShow: window.innerWidth < 768 ? 1 : 3,
      slidesToScroll: 1,
    };
  }
    
  return (
   <div className='bg-[#FFE5DD] py-10 px-10 lg:px-16' id='service'>
     <div className='container mx-auto  '>
    <h2 className='text-4xl pb-5 font-bold flex flex-col items-center'> Our Services</h2>
    <Slider {...sliderSettings}>
      {cards.map(card => (
        <div className='px-5 ' key={card.id}>
          <div className="card">
            <div className="card-image">
              {card.icon}
            </div>
            <div className="flex justify-center font-bold">
              <h3>{card.name}</h3>
             
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
   </div>
  )
}

export default Service