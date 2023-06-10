import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const RadioSection = ({ data }) => {

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold">{data?.title}</h3>
                <div className="text-xs uppercase">Tất cả</div>
            </div>
            <Swiper
                spaceBetween={20}
                loop={true}
                slidesPerView={7}
                modules={[Navigation, Autoplay]}
                speed={1500}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
            >
                <div className="flex items-center gap-4">
                    {data?.items?.map(item => (
                        <SwiperSlide key={item.encodeId}>
                            <div className="flex flex-col gap-4">
                                <div className="relative">
                                    <img
                                        src={item.program?.thumbnail}
                                        alt="thumbnail"
                                        className="object-cover w-full h-full mx-auto border-4 border-red-500 rounded-full"
                                    />
                                    <img
                                        src={item.host?.thumbnail}
                                        alt="thumbnail"
                                        className="absolute bottom-0 right-0 object-cover w-1/3 border-2 border-black rounded-full h-1/3"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className='text-base font-bold'>{item.host.name}</p>
                                    <p className='mt-[6px] text-xs text-textSecondary'>{`${item.activeUsers} đang nghe`}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
                <div className="slider-controler">
                    <div className="swiper-button-prev group-hover:opacity-50 after:!content-[''] !w-14 !h-14 bg-textSecondary rounded-full opacity-50 lg:opacity-0 hover:!opacity-100">
                        <AiOutlineLeft size={30} className="text-white" />
                    </div>
                    <div className="swiper-button-next  group-hover:opacity-50 after:!content-[''] !w-14 !h-14 bg-textSecondary rounded-full opacity-50 lg:opacity-0 hover:!opacity-100">
                        <AiOutlineRight size={30} className="text-white" />
                    </div>
                </div>
            </Swiper>
        </div>
    )
}

export default RadioSection