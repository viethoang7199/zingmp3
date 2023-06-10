import React, { useEffect, useState } from 'react';
import icons from '../utils/icons';
import { apiGetDetailPlaylist } from '../apis/music';
import { useSelector } from 'react-redux';
import SongItems from './UI/SongItems';
import Scrollbars from 'react-custom-scrollbars-2';

const SidebarRight = ({ className }) => {
    const { BsTrash } = icons
    const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector(state => state.music);

    const [isRecent, setIsRecent] = useState(false);
    const [playlist, setPlaylist] = useState();
    const fetchDetailPlaylist = async () => {
        const res = await apiGetDetailPlaylist(curAlbumId)
        if (res.data?.err === 0) setPlaylist(res.data.data?.song?.items)
    }
    useEffect(() => {
        curAlbumId && fetchDetailPlaylist()
    }, [])

    useEffect(() => {
        if (curAlbumId && isPlaying) fetchDetailPlaylist()
    }, [curAlbumId, isPlaying])

    useEffect(() => {
        isPlaying && setIsRecent(false)
    }, [isPlaying, curSongId])
    return (
        <aside className={`w-[330px] border-l border-alphaBg bg-sideBarRightBg z-[120] fixed top-0 right-0 h-full ${className}`}>
            <div className="h-[70px] py-[14px] px-2 flex-none flex justify-between items-center gap-4">
                <div className='flex items-center text-xs bg-alphaBg p-[3px] rounded-full flex-none'>
                    <h6
                        className={`py-[6px] px-4 cursor-pointer ${!isRecent && `bg-[hsla(0,0%,100%,0.3)] rounded-full`}`}
                        onClick={() => setIsRecent(prev => !prev)}
                    >
                        Danh sách phát
                    </h6>
                    <h6
                        className={`py-[6px] px-4 cursor-pointer ${isRecent && `bg-[hsla(0,0%,100%,0.3)] rounded-full`}`}
                        onClick={() => setIsRecent(prev => !prev)}
                    >
                        Nghe gần đây
                    </h6>
                </div>
                <div className='p-2 rounded-full bg-alphaBg'>
                    <BsTrash size={16} />
                </div>
            </div>
            <Scrollbars
                renderThumbVertical={props => <div {...props} className="!bg-[rgba(255,255,255,0.2)] rounded-full" />}
                autoHide
                style={{ width: '100%', height: '100%' }}
            >
                {
                    isRecent
                        ?
                        <div className='flex flex-col w-full px-2 mb-[90px]'>
                            {recentSongs && <div className='flex flex-col'>
                                {recentSongs?.map(item => (
                                    <SongItems
                                        key={item?.sId}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artistsNames={item?.artistsNames}
                                        artists={item?.artists}
                                        sId={item?.encodeId}
                                        sm
                                        textEllipsis
                                    />
                                ))}
                            </div>}
                        </div>
                        :
                        <div className='flex flex-col w-full px-2'>
                            <SongItems
                                thumbnail={curSongData?.thumbnail}
                                title={curSongData?.title}
                                artistsNames={curSongData?.artistsNames}
                                artists={curSongData?.artists}
                                sId={curSongData?.encodeId}
                                style={`bg-purplePrimary hover:bg-purplePrimary`}
                                textEllipsis
                            />
                            <div className='flex flex-col px-2 pt-[15px] pb-[5px]'>
                                <h3 className='text-sm font-bold'>Tiếp theo</h3>
                                <h3>
                                    <span className='text-sm text-secondText'>Từ playlist</span>
                                    <span className='text-sm font-bold text-purple ml-[5px]'>
                                        {curSongData?.album?.title?.length > 25 ? `${curSongData?.album?.title?.slice(0, 25)}...` : curSongData?.album?.title}
                                    </span>
                                </h3>
                            </div>
                            {playlist && <div className='flex flex-col mb-[90px]'>
                                {playlist?.map(item => (
                                    <SongItems
                                        key={item?.encodeId}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artistsNames={item?.artistsNames}
                                        artists={item?.artists}
                                        sId={item?.encodeId}
                                        textEllipsis
                                    />
                                ))}
                            </div>}
                        </div>
                }
            </Scrollbars>

        </aside>
    )
}

export default SidebarRight