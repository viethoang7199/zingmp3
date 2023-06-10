import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import user_img from '../assets/images/user.png';
import * as actions from '../store/actions';
import icons from '../utils/icons';

const Header = ({ className }) => {

    const { HiOutlineArrowLeft, HiOutlineArrowRight, AiOutlineSearch, GoDesktopDownload, AiOutlineSetting } = icons;

    const [keyword, setKeyword] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword))
            navigate({
                pathname: '/tim-kiem/tat-ca',
                search: createSearchParams({
                    q: keyword
                }).toString()
            })
        }
        dispatch(actions.setRecentSearch(keyword))
    }

    const [hasSearchModal, setHasSearchModal] = useState(false);

    return (
        <header className={`fixed z-[99] top-0 left-[70px] 1280:left-[240px] bg-transparent right-0 before:content-[''] before:absolute before:h-[70px] before:left-0 before:right-0 before:bottom-0 before:z-[1] before:bg-headerBg before:w-full before:backdrop-blur-[50px] before:shadow min-w-[660px] ${className}`}>
            <div className="flex items-center h-[70px] px-[30px] 1280:px-[60px] relative z-[99]">
                <div className="grow mr-[10px] flex items-center justify-start">
                    <button
                        type="button" className="mr-5 text-textSecondary"
                        onClick={() => navigate(-1)}
                    >
                        <HiOutlineArrowLeft size={24} />
                    </button>
                    <button
                        type="button" className="mr-5 text-textSecondary"
                        onClick={() => navigate(1)}
                    >
                        <HiOutlineArrowRight size={24} />
                    </button>
                    <div className="w-full max-w-[440px] relative">
                        <div className={`relative h-[40px] bg-alphaBg ${hasSearchModal ? "rounded-t-[20px] shadow-md bg-primaryBg" : "rounded-[20px]"}`}>
                            <button type="button">
                                <AiOutlineSearch size={28} className="absolute top-2/4 -translate-y-2/4 left-[6px] text-navigationText" />
                            </button>
                            <div className="absolute top-0 left-[38px] right-[10px] bottom-0">
                                <input
                                    className="m-0 inline-block w-[95%] text-sm text-white bg-clip-padding border-0 relative top-[2px] h-[34px] py-[5px] leading-[34px]"
                                    type="text"
                                    placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát,..."
                                    onFocus={() => setHasSearchModal(true)}
                                    onBlur={() => setHasSearchModal(false)}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyUp={handleSearch}
                                />
                            </div>
                            {/* <SearchModal /> */}
                            {/* {hasSearchModal && <SearchModal />} */}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center text-[14px] font-bold">
                    <button className="flex items-center gap-2 justify-center mr-3 py-[10px] px-6 hover:brightness-90 bg-alphaBg rounded-3xl text-purpleSecondary">
                        <GoDesktopDownload size={18} />
                        Tải bản Windows
                    </button>
                    <button className="h-[40px] w-[40px] mr-[10px] hover:brightness-90 flex items-center justify-center bg-alphaBg rounded-3xl">
                        <span className="relative group">
                            <AiOutlineSetting size={20} />
                            <span className="invisible w-max bg-alphaBg text-[13px] text-white rounded-md p-2 absolute z-1 top-10 -left-5 group-hover:visible">Cài đặt</span>
                        </span>
                    </button>
                    <button className="text-white hover:brightness-90">
                        <img src={user_img} alt="user" className="w-[38px] h-[38px] rounded-full object-cover" />
                    </button>
                </div>
            </div>
        </header>

    )
}

export default Header