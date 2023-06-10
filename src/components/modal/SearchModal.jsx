import React from 'react';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';
import SongItems from '../UI/SongItems'

const SearchModal = () => {

    const { HiOutlineArrowTrendingUp } = icons

    const { searchData } = useSelector(state => state.music);

    return (
        <ul className="absolute top-10 overflow-hidden w-full h-auto bg-primaryBg z-[5] block rounded-b-[20px] py-[13px] px-[10px] shadow-md text-white">
            <div className="max-h-[calc(100%-180px)] overflow-y-auto">
                <div className="text-sm font-bold px-[10px] pb-2 flex justify-between">
                    Đề xuất cho bạn
                </div>
                <li className="flex items-baseline rounded py-2 px-[10px] relative overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:bg-alphaBg">
                    <HiOutlineArrowTrendingUp size={16} className="text-textSecondary relative top-[3px] mr-[10px]" />
                    <div className="w-full overflow-hidden text-ellipsis">mưa tháng sáu</div>
                </li>
                <li className="flex items-baseline rounded py-2 px-[10px] relative overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:bg-alphaBg">
                    <HiOutlineArrowTrendingUp size={16} className="text-textSecondary relative top-[3px] mr-[10px]" />
                    <div className="w-full overflow-hidden text-ellipsis">cô ấy của anh ấy</div>
                </li>
                <li className="flex items-baseline rounded py-2 px-[10px] relative overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:bg-alphaBg">
                    <HiOutlineArrowTrendingUp size={16} className="text-textSecondary relative top-[3px] mr-[10px]" />
                    <div className="w-full overflow-hidden text-ellipsis">kẻ viết ngôn tình</div>
                </li>
                <li className="flex items-baseline rounded py-2 px-[10px] relative overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:bg-alphaBg">
                    <HiOutlineArrowTrendingUp size={16} className="text-textSecondary relative top-[3px] mr-[10px]" />
                    <div className="w-full overflow-hidden text-ellipsis">mật ngọt</div>
                </li>
                <li className="flex items-baseline rounded py-2 px-[10px] relative overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:bg-alphaBg">
                    <HiOutlineArrowTrendingUp size={16} className="text-textSecondary relative top-[3px] mr-[10px]" />
                    <div className="w-full overflow-hidden text-ellipsis">ngày mai người ta lấy chồng</div>
                </li>
                <li className="flex items-baseline rounded py-2 px-[10px] relative overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:bg-alphaBg">
                    <HiOutlineArrowTrendingUp size={16} className="text-textSecondary relative top-[3px] mr-[10px]" />
                    <div className="w-full overflow-hidden text-ellipsis">một ngày chẳng nắng</div>
                </li>
                {searchData?.songs && <div className="mt-[10px] pt-[10px] border-t border-alphaBg">
                    <div className="text-sm font-bold px-[10px] pb-2 flex justify-between">
                        Đề xuất cho bạn
                    </div>
                    {
                        searchData?.songs?.slice(0, 6).map(item => (
                            <li>
                                <SongItems
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    artists={item.artists}
                                />
                            </li>
                        ))
                    }
                </div>}
            </div>
        </ul>
    )
}

export default SearchModal