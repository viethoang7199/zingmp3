import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import moment from 'moment';

const NewSongRankSection = ({ data }) => {
    return (
        <div className="mt-12">
            <h3 className="flex items-center justify-between mb-5 text-xl font-bold">
                {data?.title}
                <span className="text-xs font-medium uppercase text-textSecondary">Tất cả</span>
                {/* {!isTextAll && <div className="text-xs font-medium uppercase text-textSecondary">Tất cả</div>} */}
            </h3>
            <div className='flex items-center gap-5 group'>
                <Swiper
                    spaceBetween={20}
                    loop={true}
                    slidesPerView={2}
                    modules={[Navigation]}
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
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                        1224: {
                            slidesPerView: 3,
                        }
                    }}
                >
                    <div className='flex w-full gap-8 pt-8'>
                        {data?.items?.map((item, index) => (
                            <SwiperSlide key={item.encodeId}>
                                <div className='flex gap-2 p-[10px] bg-alphaBg rounded-lg'>
                                    <img src={item.thumbnail} alt='thumbnail' className='w-[120px] h-[120px] object-cover rounded-md' />
                                    <div className='relative flex flex-col justify-between text-left basis-auto grow shrink'>
                                        <div className='flex flex-col'>
                                            <p className='text-sm font-medium'>{item.title}</p>
                                            <span className='text-xs text-textSecondary mt-[3px]'>{item.artistsNames}</span>
                                        </div>
                                        <div>
                                            <span className='text-[40px] text-transparent opacity-40 leading-[1]'
                                                style={{ WebkitTextStroke: '1px rgba(255,255,255, 0.5)', fontFamily: 'Roboto, sans-serif', fontWeight: '900' }}
                                            >
                                                #{index + 1}
                                            </span>
                                            <span className='absolute bottom-0 right-0 text-sm text-textSecondary leading-[1.8]'>{moment(item.releasedAt * 1000).format('DD-MM-YYYY')}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </div>

                    <div className="slider-controler">
                        <div className="swiper-button-prev group-hover:opacity-50 after:!content-[''] !w-[38px] !h-[38px] bg-textSecondary rounded-full opacity-50 lg:opacity-0 hover:!opacity-100">
                            <AiOutlineLeft size={30} className="text-white" />
                        </div>
                        <div className="swiper-button-next group-hover:opacity-50 after:!content-[''] !w-[38px] !h-[38px] bg-textSecondary rounded-full opacity-50 lg:opacity-0 hover:!opacity-100">
                            <AiOutlineRight size={30} className="text-white" />
                        </div>
                    </div>
                </Swiper>

            </div>
        </div>
    )
}

export default NewSongRankSection