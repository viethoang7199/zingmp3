import React, { useEffect, useRef, useState } from 'react'
import icons from '../utils/icons'
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import * as apis from '../apis';
import * as actions from '../store/actions';
import { Link } from 'react-router-dom';
import LoadingPlayerButton from './loading/LoadingPlayerButton';
import moment from 'moment';

var intervalId

const Player = ({ onHandleToggleListSongs, classNameIconListRight }) => {
    const { AiOutlineHeart, BsThreeDots, CiShuffle, MdSkipPrevious, MdSkipNext, BsRepeat, BsPlayCircle, BsCameraVideo, GiMicrophone, VscChromeRestore, RxSpeakerModerate, BsMusicNoteList, BsPauseCircle, BsRepeat1, RxSpeakerLoud, RxSpeakerOff } = icons;

    const { curSongId, isPlaying, songs } = useSelector(state => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const [audio, setAudio] = useState(new Audio());
    const [curSecond, setCurSecond] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0);
    const [isLoadingSource, setIsLoadingSource] = useState(false);
    const [volume, setVolume] = useState(100);
    const dispatch = useDispatch();
    const thumbRef = useRef();
    const trackRef = useRef();
    const volumeRef = useRef()

    const [isHoverVolume, setIsHoverVolume] = useState(false)

    useEffect(() => {
        const fetchDetailSong = async () => {
            setIsLoadingSource(true)
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId),
            ])
            setIsLoadingSource(false)
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
                dispatch(actions.setCurSongData(res1.data.data));
            }
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
            } else {
                audio.pause();
                setAudio(new Audio());
                dispatch(actions.play(false));
                alert(res2.data.msg);
                setCurSecond(0);
                thumbRef.current.style.cssText = `right: 100%`;
            }
        }
        fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.pause();
        audio.load();
        audio.currentTime = 0;
        if (isPlaying) {
            audio.play();
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100;
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                setCurSecond(Math.round(audio.currentTime));
            }, 200);
        }
    }, [audio, isPlaying])

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle) {
                handleShuffle()
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handleNextSong()
            } else {
                audio.pause();
                dispatch(actions.play(false));
            }
        }

        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audio, isShuffle, repeatMode])

    useEffect(() => {
        audio.volume = volume / 100;
    }, [audio, volume])

    useEffect(() => {
        if (volumeRef.current) {
            volumeRef.current.style.cssText = `right:${100 - volume}%`
        }
    }, [volume])


    const handleTogglePlay = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(actions.play(false));
        } else {
            audio.play()
            dispatch(actions.play(true));
        }
    }

    const handleChangeProgressBar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = percent * songInfo.duration / 100;
        setCurSecond(Math.round(percent * songInfo.duration / 100));
    }

    const handlePrevSong = () => {
        if (songs) {
            let currentSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handleShuffle = () => {
        const randomSong = Math.round(Math.random() * songs?.length) - 1;
        dispatch(actions.setCurSongId(songs[randomSong].encodeId));
        dispatch(actions.play(true));
    }

    const handleRepeatOne = () => {
        audio.play();
    }

    return (
        <div className="fixed z-[1100] w-full bottom-0">
            <div className="h-[90px] min-w-[768px] px-5 bg-playerBg border-t border-alphaBg flex items-center justify-between">
                <div className="flex relative w-[30%] z-[999]">
                    <div className="flex items-center w-full">
                        <div className="mr-[10px] basis-[auto] grow-0 shrink-0">
                            <img
                                src={songInfo?.thumbnail}
                                alt=""
                                className="object-cover w-16 h-16 rounded"
                            />
                        </div>
                        <div className="flex flex-col basis-[auto] grow-1 shrink-1">
                            <span className="text-sm font-medium">{songInfo?.title}</span>
                            <span className="text-xs text-textSecondary">
                                {
                                    songInfo?.artists?.map((item, index) => (
                                        <Link
                                            to={item.link}
                                            key={item.id}
                                            className='text-xs text-textSecondary hover:underline hover:text-purplePrimary'>
                                            <span>{(index ? ', ' : '') + item.name}</span>
                                        </Link>
                                    ))
                                }
                            </span>
                        </div>
                        <div className="ml-[23px] basis-[auto] grow-0 shrink-0">
                            <div className="flex items-center justify-between">
                                <span className="p-[3px] mx-[2px]"><AiOutlineHeart size={16} /></span>
                                <span className="p-[3px] mx-[2px]"><BsThreeDots size={16} /></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grow">
                    <div className="flex items-center justify-center shrink-0 mb-[5px]">
                        <button
                            className={`mx-[9px] p-[3px] rounded-full hover:bg-alphaBg ${isShuffle ? "text-purplePrimary" : ""}`}
                            onClick={() => setIsShuffle(!isShuffle)}
                        >
                            <CiShuffle size={20} />
                        </button>
                        <button
                            className={`mx-[9px] p-[3px] rounded-full hover:bg-alphaBg ${!songs ? "text-textSecondary cursor-default" : "text-white"}`}
                            onClick={handlePrevSong}
                        >
                            <MdSkipPrevious size={28} />
                        </button>
                        <button
                            className="mx-[9px] p-[3px]"
                            onClick={handleTogglePlay}
                        >
                            {isLoadingSource ? <LoadingPlayerButton /> : isPlaying ? <BsPauseCircle size={36} /> : <BsPlayCircle size={36} />}
                        </button>
                        <button
                            className={`mx-[9px] p-[3px] rounded-full hover:bg-alphaBg ${!songs ? "text-textSecondary cursor-default" : "text-white"}`}
                            onClick={handleNextSong}
                        >
                            <MdSkipNext size={28} />
                        </button>
                        <button
                            className={`mx-[9px] p-[3px] rounded-full hover:bg-alphaBg ${repeatMode ? "text-purplePrimary" : ""}`}
                            onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}
                        >
                            {repeatMode === 1 ? <BsRepeat1 size={20} /> : <BsRepeat size={20} />}
                        </button>
                    </div>
                    <div className="flex items-center justify-center w-full mb-[5px]">
                        <span className="text-xs opacity-50 mr-[10px] text-right min-w-[45px] font-medium">
                            {moment.utc(curSecond * 1000).format('mm:ss')}
                        </span>
                        <div
                            ref={trackRef}
                            className="w-full relative hover:h-[6px] cursor-pointer rounded-full bg-progressBarBg h-[3px]"
                            onClick={handleChangeProgressBar}
                        >
                            <div ref={thumbRef} className="absolute top-0 bottom-0 left-0 bg-white rounded-full"></div>
                        </div>
                        <span className="text-xs ml-[10px] min-w-[45px] font-medium">
                            {moment.utc(songInfo?.duration * 1000).format('mm:ss')}
                        </span>
                    </div>
                </div>
                <div className='w-[30%] flex items-center justify-end'>
                    <span className="p-2 rounded-full cursor-pointer hover:bg-alphaBg"><BsCameraVideo size={16} /></span>
                    <span className="p-2 rounded-full cursor-pointer hover:bg-alphaBg"><GiMicrophone size={16} /></span>
                    <span className="p-2 rounded-full cursor-pointer hover:bg-alphaBg"><VscChromeRestore size={16} /></span>
                    <div
                        className="flex items-center"
                        onMouseEnter={() => setIsHoverVolume(true)}
                        onMouseLeave={() => setIsHoverVolume(false)}
                    >
                        <span
                            className="p-2 rounded-full cursor-pointer hover:bg-alphaBg"
                            onClick={() => { setVolume(prev => parseInt(prev) === 0 ? 50 : 0) }}
                        >
                            {
                                parseInt(volume) >= 50 ? <RxSpeakerLoud size={16} /> : parseInt(volume) === 0 ? <RxSpeakerOff /> : <RxSpeakerModerate />
                            }
                        </span>
                        <div className={`w-[70px] h-[3px] bg-progressBarBg rounded-full ${isHoverVolume ? "hidden" : "relative"}`}>
                            <div ref={volumeRef} className="absolute top-0 bottom-0 left-0 right-0 bg-white rounded-full"></div>
                        </div>
                        <input
                            type="range"
                            step={1}
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className={`w-[70px] h-[5px] ${isHoverVolume ? "flex" : "hidden"}`}
                        />
                    </div>
                    <span className="w-[1px] h-[33px] bg-alphaBg mx-5"></span>
                    <span
                        className={`p-2 rounded-md cursor-pointer bg-alphaBg hover:bg-textSecondary ${classNameIconListRight}`}
                        onClick={onHandleToggleListSongs}
                    >
                        <BsMusicNoteList size={16} />
                    </span>
                </div>
            </div>
        </div>

    )
}

export default Player