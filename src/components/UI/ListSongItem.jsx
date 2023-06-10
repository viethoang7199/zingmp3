import moment from 'moment';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { Link } from 'react-router-dom';
import icons from '../../utils/icons';

const ListSongItem = ({ songData, isHideAlbum, isHideNode, order, textEllipsis, style }) => {
    const { FiMusic, BsPlayCircle } = icons;
    const dispatch = useDispatch();

    return (
        <div className={`flex group items-center justify-between gap-5 py-[10px] px-3 rounded-md border-b border-alphaBg hover:bg-alphaBg ${style}`}>
            <div className={`flex items-center w-2/4 gap-3 ${isHideAlbum && 'grow'}`}>
                {order && <span className='text-[32px] text-[rgba(74,144,226,0)] mr-[5px] w-[60px] text-center' style={{ WebkitTextStroke: `1.5px ${order === 1 ? '#4a90e2' : order === 2 ? '#50e3c2' : order === 3 ? '#e35050' : '#fff'}`, fontFamily: 'Roboto, sans-serif', fontWeight: '900' }}>{order}</span>}
                {!isHideNode && <span className="text-textSecondary"><FiMusic size={14} /></span>}
                <div className='relative'>
                    <img
                        src={songData?.thumbnail}
                        alt='thumbnail'
                        className="object-contain w-10 h-10 rounded-md cursor-pointer"
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 z-20 items-center justify-center hidden w-full gap-8 rounded-lg cursor-pointer bg-overlayBg group-hover:flex"
                    >
                        <span
                            onClick={() => {
                                dispatch(actions.setCurSongId(songData?.encodeId))
                                dispatch(actions.play(true))
                                dispatch(actions.playALbum(true))
                                dispatch(actions.setRecentSongs({ thumbnail: songData?.thumbnail, title: songData?.title, sId: songData?.encodeId, artists: songData?.artists }))
                            }}
                        >
                            <BsPlayCircle size={22} />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className={`text-sm font-medium ${textEllipsis ? "truncate w-[200px] 1024:text-clip 1024:w-full" : ""}`}>
                        {songData?.title}
                    </span>
                    <span className={`text-xs text-textSecondary ${textEllipsis ? "truncate w-[200px] 1024:text-clip 1024:w-full" : ""}`}>
                        {songData?.artists?.map((item, index) => (
                            <Link to={item?.link} key={item.id} className='hover:underline hover:text-purplePrimary'>
                                <span>{(index ? ', ' : '') + item.name}</span>
                            </Link>
                        ))}
                    </span>
                </div>
            </div>
            {!isHideAlbum && <div className="grow">
                <span className="text-xs text-textSecondary">{songData?.album?.title}</span>
            </div>}
            <span className="text-xs text-textSecondary">{moment.utc(songData?.duration * 1000).format('mm:ss')}</span>
        </div>
    )
}

export default memo(ListSongItem)