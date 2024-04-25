import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import bannerServices from "../../services/banner.services";

export default function HomeSlider() {

  const [banners, setBanners] = useState(); // Initialize users as an object


  useEffect(() => {
    fetchBannerData();

  }, []);

  const fetchBannerData = async () => {
    const response = await bannerServices.getListBanner();
    setBanners(response.data.data);

  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={15}
      slidesPerView={3}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ dynamicBullets: true }}
    >
      {banners?.map(banner => (
        <SwiperSlide>
          <img src={banner?.image} style={{ width: '100%', height: '300px' }} />
        </SwiperSlide>

      ))}

      {/* <SwiperSlide>
        <img src="https://thegapdecaders.com/wp-content/uploads/2023/09/BeautifulSwedenFI.jpg" style={{ width: '100%', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://media.vietravel.com/images/news/da-lat_1.jpg" style={{ width: '100%', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://as1.ftcdn.net/v2/jpg/05/31/52/38/1000_F_531523803_8xWSasg2v4LrQUeEkMshkiSHWq2CDh3n.jpg" style={{ width: '100%', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://cdn.openart.ai/stable_diffusion/8a41e3e40da9895b43bb77d39949c0c47cdee3e6_2000x2000.webp" style={{ width: '100%', height: '300px' }} />
      </SwiperSlide> */}
    </Swiper>
  );
}
