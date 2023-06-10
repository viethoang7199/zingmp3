import 'moment/locale/vi';
import moment from 'moment/moment';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions';
import icons from '../../utils/icons';

const SongItems = ({ thumbnail, title, artistsNames, releaseDate, sId, order, percent, style, artists, size, isSearchPage, textEllipsis }) => {

    const { BsPlayCircle, BsThreeDots } = icons;
    const dispatch = useDispatch();

    return (
        <div
            className={`w-full p-[10px] group flex items-center hover:bg-alphaBg rounded-md ${style}`}>
            {order &&
                <span className={`text-[40px] text-transparent mr-4`}
                    style={{ WebkitTextStroke: `1px ${order === 1 ? '#4a90e2' : order === 2 ? '#50e3c2' : '#e35050'}`, fontFamily: 'Roboto, sans-serif', fontWeight: '900' }}
                >
                    {order}
                </span>}
            <div className="relative mr-[10px]">
                <img
                    src={thumbnail}
                    alt='thumbnail'
                    className={`${size || 'w-[40px] h-[40px]'} object-cover rounded-md`}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 z-20 items-center justify-center hidden w-full gap-8 rounded-lg cursor-pointer bg-overlayBg group-hover:flex"
                >
                    <span
                        onClick={() => {
                            dispatch(actions.setCurSongId(sId))
                            dispatch(actions.play(true))
                            dispatch(actions.setRecentSongs({ thumbnail, title, sId, artists }))
                        }}
                    >
                        <BsPlayCircle size={22} />
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-[3px] grow">
                {isSearchPage && <span className='text-xs text-textSecondary mb-[6px]'>Bài hát</span>}
                <p className={`text-sm ${isSearchPage && 'font-bold'} ${textEllipsis ? "w-[200px] truncate 1024:text-clip 1024:w-full" : ""}`}>
                    {title}
                </p>
                <span className={`${textEllipsis ? "whitespace-nowrap w-[200px] text-ellipsis overflow-hidden" : ""}`}>
                    {
                        artists?.map((item, index) => (
                            <Link
                                to={item.link}
                                key={item.id}
                                className='text-xs text-textSecondary hover:underline hover:text-purplePrimary'>
                                <span>{(index ? ', ' : '') + item.name}</span>
                            </Link>
                        ))
                    }
                </span>
                {releaseDate && <span className="text-xs text-textSecondary">{moment(releaseDate * 1000).fromNow()}</span>}
            </div>
            {percent && <span className='text-base font-bold'>{percent}%</span>}
            <div className="hidden p-2 rounded-full cursor-pointer group-hover:block hover:bg-alphaBg">
                <BsThreeDots size={16} />
            </div>

        </div>
    )
}

export default memo(SongItems)