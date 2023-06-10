import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom';
import * as actions from '../store/actions'
import * as apis from '../apis'
import icons from '../utils/icons';
import moment from 'moment';
import { handleNumber } from '../utils/fn';
import ListSong from '../components/UI/ListSong';
import AudioLoading from '../components/loading/AudioLoading';
import ListSongItem from '../components/UI/ListSongItem';

const Album = () => {

    const { BsThreeDots, AiOutlineHeart, BsFillPlayFill, BsPlayCircle } = icons

    const { pId } = useParams();
    const { isPlaying } = useSelector(state => state.music);
    const [playlistData, setPlaylistData] = useState({});
    const dispatch = useDispatch();
    const location = useLocation();
    const [isHover, setIsHover] = useState(false)
    const imgRef = useRef();

    useEffect(() => {
        dispatch(actions.setCurAlbumId(pId))
        const fetchDetailPlaylist = async () => {
            dispatch(actions.loading(true))
            const response = await apis.apiGetDetailPlaylist(pId);
            dispatch(actions.loading(false))
            if (response?.data.err === 0) {
                setPlaylistData(response.data?.data)
            }
            dispatch(actions.setPlayList(response?.data?.data?.song.items))
        }
        fetchDetailPlaylist()
    }, [])

    useEffect(() => {
        if (location.state?.playAlbum) {
            const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1
            dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId))
            dispatch(actions.play(true))
        }
    }, [pId, playlistData]);

    const handleHover = () => {
        setIsHover(true)
        imgRef.current?.classList?.remove('animate-scale-down')
        imgRef.current?.classList?.add('animate-scale-up')
    }

    const handleLeaveHover = () => {
        setIsHover(false)
        imgRef.current?.classList?.remove('animate-scale-up')
        imgRef.current?.classList?.add('animate-scale-down')
    }


    return (
        <div className="px-[30px] w-full 1024:px-[60px]">
            <div className="min-h-[calc(100%-158px)] mt-[70px] mb-[50px] pt-5">
                <div className="relative pt-5 mx-auto">
                    <div className="mb-[30px] after:clear-both after:content-[''] after:block flex 1280:block flex-col">
                        <div className="static 1280:sticky top-[93px] 1280:block w-full 1280:w-[300px] float-left pb-[30px] text-left rounded-md flex">
                            <div className="relative w-1/3 mr-5 overflow-hidden rounded-lg 1280:w-full 1280:mr-0"
                                onMouseEnter={handleHover}
                                onMouseLeave={handleLeaveHover}
                            >
                                {
                                    isPlaying
                                        ?
                                        <div
                                            className="absolute z-20 flex items-center justify-center w-full h-full cursor-pointer"
                                            onClick={() => dispatch(actions.play(false))}
                                        >
                                            <span className="p-2 border border-white rounded-full">
                                                <AudioLoading />
                                            </span>
                                        </div>
                                        :
                                        isHover &&
                                        <div
                                            className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center w-full gap-8 rounded-lg cursor-pointer bg-overlayBg"
                                            onClick={() => dispatch(actions.play(true))}
                                        >
                                            <span>
                                                <BsPlayCircle size={48} />
                                            </span>
                                        </div>
                                }
                                <img
                                    ref={imgRef}
                                    src={playlistData?.thumbnailM}
                                    alt='thumbnail'
                                    className={`object-cover w-full h-full`}
                                />
                            </div>

                            <div className="flex flex-col justify-between w-full mt-0 leading-6 text-left 1280:mt-3 1280:text-center self-[normal] items-start basis-auto grow shrink">
                                <div className="w-full">
                                    <h3 className="text-white font-bold text-[20px]">{playlistData?.title}</h3>
                                    <span className="text-xs text-textSecondary leading-[1.75]">
                                        <span>Cập nhật: </span>
                                        <span>{moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}</span>
                                    </span>
                                    <p className="text-xs text-textSecondary leading-[1.75]">
                                        {
                                            playlistData?.artists?.map((item, index) => (
                                                <Link
                                                    to={item.link}
                                                    key={item.id}
                                                    className='text-xs text-textSecondary hover:underline hover:text-purplePrimary'>
                                                    <span>{(index ? ', ' : '') + item.name}</span>
                                                </Link>
                                            ))
                                        }
                                    </p>
                                    <span className="text-xs text-textSecondary leading-[1.75]">{`${handleNumber(playlistData?.like)} người yêu thích`}</span>
                                    <div className="block mb-3 text-sm 1280:hidden">
                                        <span className="text-textSecondary">Lời tựa </span>
                                        <span
                                            style={{ WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', display: '-webkit-box', overflow: 'hidden' }}
                                            className="text-ellipsis"
                                        >{playlistData?.description}</span>
                                    </div>
                                </div>

                                <div className="flex w-full mt-4 1280:flex-col">
                                    <button className="flex items-center py-[9px] px-6 1280:mx-auto text-sm rounded-full bg-purplePrimary hover:brightness-90 mr-[10px]">
                                        <span><BsFillPlayFill size={24} /></span>
                                        <span>PHÁT NGẪU NHIÊN</span>
                                    </button>

                                    <div className="flex items-center justify-center gap-5 mt-0 1280:mt-4">
                                        <button className="w-[35px] h-[35px] flex justify-center items-center rounded-full cursor-pointer bg-alphaBg hover:brightness-90">
                                            <AiOutlineHeart size={20} />
                                        </button>
                                        <button className="w-[35px] h-[35px] flex justify-center items-center rounded-full cursor-pointer bg-alphaBg hover:brightness-90">
                                            <BsThreeDots size={20} />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="ml-0 1280:ml-[330px]">
                            <div className="w-full">
                                <div className="hidden mb-3 text-sm 1280:block">
                                    <span className="text-textSecondary">Lời tựa </span>
                                    <span>{playlistData?.description}</span>
                                </div>
                                <ListSong
                                    totalDuration={playlistData?.song?.totalDuration}
                                    songsLength={playlistData?.song?.items?.length}
                                    releaseDate={playlistData?.releaseDate}
                                    distributor={playlistData?.distributor}
                                />
                            </div>
                            {playlistData?.sections && <div>
                                <h3 className="mt-12 mb-5 text-xl font-bold capitalize">{playlistData?.sections[0]?.title}</h3>
                                <div>
                                    {playlistData?.sections[0]?.items?.map(item => (
                                        <ListSongItem songData={item} />
                                    ))}
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Album