import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as actions from '../../store/actions'

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const Slider = () => {

    const dispatch = useDispatch();

    const { banner } = useSelector(state => state.app);

    const navigate = useNavigate()

    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.play(true))
            dispatch(actions.setPlayList(null))
        } else if (item?.type === 4) {
            const albumPath = item?.link?.split('.')[0]
            navigate(albumPath)
        } else {
            dispatch(actions.setPlayList(null))
        }
    }

    return (
        <div className='w-full pt-8 overflow-hidden group'>
            <Swiper
                spaceBetween={20}
                loop={true}
                slidesPerView={3}
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
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                <div className='flex w-full gap-3 pt-8'>
                    {banner?.map(item => (
                        <SwiperSlide key={item.encodeId}>
                            <img
                                src={item.banner}
                                alt='banner'
                                className="object-contain w-full cursor-pointer rounded-xl"
                                onClick={() => handleClickBanner(item)}
                            />
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

export default Slider