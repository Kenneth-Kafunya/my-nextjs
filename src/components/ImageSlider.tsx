"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function ImageSlider({ images }: any) {
  return (
    <div className="my-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        {images.map((img: any, i: number) => (
          <SwiperSlide key={i}>
            <img
              src={`${img.asset.url}?fm=webp&w=1920`}
              alt={img.caption || ""}
              className="rounded-lg"
            />

            {img.caption && (
              <p className="text-sm text-gray-500 mt-2">{img.caption}</p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
