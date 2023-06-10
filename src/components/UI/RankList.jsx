import React, { useEffect, useState } from 'react'
import ListSongItem from './ListSongItem'
import { useNavigate } from 'react-router-dom';

const RankList = ({ data, isHideAlbum, number, link, isShowFullSongWeek, textEllipsis, showButton }) => {

    const [isShowFullSong, setIsShowFullSong] = useState(false);
    const [songs, setSongs] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (!isShowFullSong) {
            setSongs(data?.filter((item, index) => index < number))
        } else {
            setSongs(data)
        }
    }, [isShowFullSong, data, number])

    return (
        <div className='w-full'>
            {songs?.map((item, index) => (
                <ListSongItem
                    key={item.encodeId}
                    songData={item}
                    isHideNode
                    isHideAlbum={isHideAlbum}
                    order={index + 1}
                    number={number}
                    textEllipsis={textEllipsis}
                />
            ))}
            {showButton && <div className='mt-5 text-center'>
                <button
                    type='button'
                    className='px-6 py-2 border border-white border-solid rounded-full hover:bg-[#2c2436]'
                    onClick={() => link ? navigate(link.split('.')[0]) : setIsShowFullSong(!isShowFullSong)}
                >
                    {isShowFullSong ? "Ẩn bớt" : isShowFullSongWeek ? 'Xem tất cả' : "Xem top 100"}
                </button>
            </div>}
        </div>
    )
}

export default RankList