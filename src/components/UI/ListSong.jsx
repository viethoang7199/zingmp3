import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';
import ListSongItem from './ListSongItem';

const ListSong = ({ totalDuration, isHideTitle, style, songsLength, releaseDate, distributor }) => {

    const { BiSortAlt2, BsDot } = icons

    const { songs } = useSelector(state => state.music);
    return (
        <div>
            {!isHideTitle && <div className="flex items-center justify-between py-[10px] px-3 text-xs font-semibold text-textSecondary">
                <span className="flex items-center w-2/4 gap-2">
                    <span><BiSortAlt2 size={14} /></span>
                    <span>BÀI HÁT</span>
                </span>
                <span className='grow'>ALBUM</span>
                <span className="pr-3">THỜI GIAN</span>
            </div>}
            <div className='border-b border-alphaBg'>
                {songs?.map(item => (
                    <ListSongItem
                        key={item.encodeId}
                        songData={item}
                        style={style}
                    />
                )) || songs?.items?.map(item => (
                    <ListSongItem
                        key={item.encodeId}
                        songData={item}
                        isHideAlbum
                    />
                ))}
            </div>
            {songs?.length > 20
                ?
                totalDuration && <div className="my-6 text-[13px] text-textSecondary flex items-center">
                    <span>{`${songs?.length} bài hát`}</span>
                    <BsDot />
                    <span>{moment.utc(totalDuration * 1000).format('hh:mm:ss')}</span>
                </div>
                :
                <div className="bottom-info">
                    <h3 className="font-bold mt-5 mb-2 text-sm leading-[20px]">Thông tin</h3>
                    <div className="flex">
                        <div className="mr-4 text-textSecondary flex flex-col gap-2 leading-[18px] text-[13px]">
                            <span>Số bài hát</span>
                            <span>Ngày phát hành</span>
                            {distributor && <span>Cung cấp bởi</span>}
                        </div>
                        <div className="font-bold flex flex-col gap-2 leading-[18px] text-[13px]">
                            <span>{songsLength}</span>
                            <span>{releaseDate}</span>
                            <span>{distributor}</span>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ListSong