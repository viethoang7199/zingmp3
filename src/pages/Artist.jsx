import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as apis from '../apis';
import ArtistSection from '../components/UI/ArtistSection';
import ListSongItem from '../components/UI/ListSongItem';
import Section from '../components/UI/Section';
import VideoSection from '../components/UI/VideoSection';
import MoreInfoArtistModal from '../components/modal/MoreInfoArtistModal';
import icons from '../utils/icons';
import Helmet from '../components/Helmet';
import PageLoading from '../components/loading/PageLoading';

const Artist = () => {

    const { RiUserAddLine, BsFillPlayFill, AiOutlineHeart, BsPlayCircle, BsThreeDots } = icons

    const { singer } = useParams();

    const [artistData, setArtistData] = useState({});
    const [moreInfo, setMoreInfo] = useState(false)

    const [isHover, setIsHover] = useState(false)

    const imgRef = useRef();
    const navigate = useNavigate()

    const handleHover = () => {
        setIsHover(true)
        imgRef.current.classList?.remove('animate-scale-down')
        imgRef.current.classList?.add('animate-scale-up')
    }

    const handleLeaveHover = () => {
        setIsHover(false)
        imgRef.current.classList?.remove('animate-scale-up')
        imgRef.current.classList?.add('animate-scale-down')
    }

    useEffect(() => {
        const fetchArtist = async () => {
            const res = await apis.apiGetArtist(singer);
            setArtistData(res.data.data)
        }
        singer && fetchArtist()
    }, [singer])


    return (
        <Helmet title={`${artistData?.name} - Zing MP3 Official Account`}>
            {artistData
                ?
                <div className="px-[60px]">
                    <div className="min-h-[calc(100%-158px)] mt-[70px] mb-[50px]">
                        <div className='relative'>
                            <div className='relative mb-[30px] flex items-end pt-[135px]'>
                                {
                                    artistData?.cover === 'https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/default_cover.png'
                                        ?
                                        <div className="-mt-[70px] mb-[30px] pt-[135px] flex items-end">
                                            <div className="absolute top-0 -left-[118px] -right-[118px] bottom-0 overflow-hidden">
                                                <div
                                                    className="h-full w-full bg-no-repeat bg-[50%] bg-cover blur-[50px] absolute top-0 right-0 left-0 bottom-0 block"
                                                    style={{ backgroundImage: `url(${artistData?.thumbnailM})` }}
                                                >
                                                </div>
                                                <div className="bg-artistBg h-full z-[1] absolute top-0 right-0 left-0 bottom-0 block">
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="-mt-[70px] h-[410px] mb-[30px] pt-[135px] flex items-end">
                                            <div className="absolute top-0 -left-[118px] -right-[118px] bottom-0 ">
                                                <div
                                                    className="h-full w-full bg-no-repeat bg-[50%] bg-cover absolute top-0 right-0 left-0 bottom-0 block"
                                                    style={{ backgroundImage: `url(${artistData?.cover})` }}
                                                >
                                                </div>
                                                <div className='absolute top-0 bottom-0 left-0 right-0 opacity-40 bg-gradient-to-t from-black to-transparent'>
                                                </div>
                                            </div>
                                        </div>
                                }
                                <div className='absolute z-10 flex flex-col justify-end w-full h-full pb-6'>
                                    <div className="flex">
                                        <div className="flex mb-4">
                                            {artistData?.hasOA ? <img src={artistData?.thumbnail} alt="thumbnail" className="w-[140px] h-[140px] object-cover rounded-full mr-[30px]" /> : ""}
                                        </div>
                                        <div className='flex flex-col gap-6'>
                                            <div className="flex items-center">
                                                <h3 className='text-[60px] drop-shadow-lg shadow-black font-bold leading-[normal]'>{artistData.name}</h3>
                                                <button type="button" className="w-[52px] h-[52px] ml-5 bg-white rounded-full flex items-center justify-center hover:opacity-80">
                                                    <span className="text-purplePrimary"><BsFillPlayFill size={38} /></span>
                                                </button>
                                            </div>
                                            <div className="flex items-center text-[rgba(254,255,255,.8)]">
                                                <span className='mr-6 text-sm'>{`${Number(artistData?.totalFollow?.toFixed(1)).toLocaleString("de-DE")} người quan tâm`}</span>
                                                <button type='button' className='px-6 py-1 border border-solid rounded-full hover:opacity-80 border-[rgba(254,255,255,.2)] bg-[rgba(254,255,255,.1)] flex items-center gap-[5px]'>
                                                    <span><RiUserAddLine size={16} /></span>
                                                    <span className='text-xs uppercase'>Quan tâm</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex w-full mb-[30px]'>
                                {artistData?.topAlbum && <div className='w-[35%] relative mr-7'>
                                    <h3 className="mb-5 text-xl font-bold capitalize">Mới phát hành</h3>
                                    <div className="relative z-10 flex p-4 cursor-pointer"
                                        onMouseEnter={handleHover}
                                        onMouseLeave={handleLeaveHover}
                                        onClick={() => navigate(artistData?.topAlbum?.link, { state: { playAlbum: false } })}
                                    >
                                        <div className="relative overflow-hidden rounded-lg">
                                            <img
                                                ref={imgRef}
                                                src={artistData?.topAlbum?.thumbnail}
                                                alt=""
                                                className="w-[150px] h-[150px] object-cover rounded-lg"
                                            />
                                            {isHover && <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center w-full gap-5 rounded-lg cursor-pointer bg-overlayBg"
                                                onClick={() => {
                                                    navigate(artistData?.topAlbum?.link, { state: { playAlbum: false } })
                                                }}
                                            >
                                                <span><AiOutlineHeart size={20} /></span>
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        navigate(artistData?.topAlbum?.link, { state: { playAlbum: true } })
                                                    }}
                                                ><BsPlayCircle size={42} /></span>
                                                <span><BsThreeDots size={20} /></span>
                                            </div>}
                                        </div>
                                        <div className='flex flex-col ml-4 my-[6px] grow'>
                                            <span className='text-xs text-textSecondary'>{artistData?.topAlbum?.textType}</span>
                                            <h3 className='text-sm font-semibold mt-3 mb-[2px]'>{artistData?.topAlbum?.title}</h3>
                                            <span className='mb-3'>
                                                {
                                                    artistData?.topAlbum?.artists?.map((item, index) => (
                                                        <Link to={item.link} key={item.id} className="text-xs text-textSecondary hover:underline hover:text-purplePrimary" onClick={() => window.scroll(0, 0)}>
                                                            <span>{(index ? ', ' : '') + item.name}</span>
                                                        </Link>
                                                    ))
                                                }
                                            </span>
                                            <span className='text-xs text-textSecondary'>{artistData?.topAlbum?.releaseDate}</span>
                                        </div>
                                    </div>
                                    <div className='absolute left-0 right-0 bottom-0 h-[183px] overflow-hidden rounded-2xl'>
                                        <div style={{ backgroundImage: `url(${artistData?.topAlbum?.thumbnailM})` }}
                                            className='bg-no-repeat bg-[50%] bg-cover rounded-2xl absolute left-0 right-0 bottom-0 h-[183px]'
                                        ></div>
                                        <div className='absolute left-0 right-0 bottom-0 h-[183px]' style={{ backgroundImage: 'linear-gradient(286.07deg,rgba(23,15,35,0.95) 55.21%,rgba(23,15,35,0.6))' }}></div>
                                        <div className='bg-white/10 absolute left-0 right-0 bottom-0 h-[183px] backdrop-blur-[25px]'></div>
                                    </div>
                                </div>}

                                <div className={`${artistData?.topAlbum ? "w-[65%]" : "w-full"}`}>
                                    <h3 className="mb-5 text-xl font-bold capitalize">
                                        {artistData?.sections?.find(item => item.sectionType === "song")?.title}
                                    </h3>
                                    <div className='flex-wrap justify-between hidden w-full 1280:flex'>
                                        {artistData?.sections?.find(item => item.sectionType === "song")?.items?.slice(0, 6).map((item, index) => (
                                            <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 !== 0 ? "pl-5" : "pr-5"}`}>
                                                <ListSongItem songData={item} isHideAlbum isHideNode />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='flex flex-col justify-between w-full 1280:hidden'>
                                        {artistData?.sections?.find(item => item.sectionType === "song")?.items?.slice(0, 3).map((item, index) => (
                                            <div key={item.encodeId} className="w-full">
                                                <ListSongItem songData={item} isHideAlbum isHideNode />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full mb-[30px]'>
                                {
                                    artistData?.sections?.filter(item => item.sectionType === "playlist")?.map((item, index) => (
                                        <Section key={index} data={item} isTextDescription isTextAll />
                                    ))
                                }
                            </div>
                            <div className='flex flex-col w-full mb-[30px]'>
                                <h3 className="mb-5 text-xl font-bold capitalize">
                                    {artistData?.sections?.find(item => item.sectionType === "video")?.title}
                                </h3>
                                <div className='flex gap-7'>
                                    {artistData?.sections?.find(item => item.sectionType === "video")?.items?.slice(0, 3).map((item) => (
                                        <VideoSection
                                            key={item.encodeId}
                                            thumbnailM={item.thumbnailM}
                                            duration={item.duration}
                                            title={item.title}
                                            artist={item.artist}
                                            artists={item.artists}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col w-full mb-[30px]'>
                                <h3 className="mb-5 text-xl font-bold capitalize">
                                    {artistData?.sections?.find(item => item.sectionType === "artist")?.title}
                                </h3>
                                <div className='flex w-full gap-7'>
                                    {artistData?.sections?.find(item => item.sectionType === "artist")?.items?.slice(0, 5).map((item) => (
                                        <ArtistSection
                                            key={item.id}
                                            thumbnail={item.thumbnail}
                                            name={item.name}
                                            totalFollow={item.totalFollow}
                                            link={item.link}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                {artistData?.biography
                                    &&
                                    <div className='flex flex-col max-w-[1167px] mb-[30px] relative'>
                                        {
                                            moreInfo && <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[1080] bg-[rgba(0,0,0,0.8)] flex justify-center items-center"
                                                onClick={() => setMoreInfo(false)}
                                            >
                                                <MoreInfoArtistModal />
                                            </div>
                                        }

                                        <h3 className="mb-5 text-xl font-bold capitalize">
                                            {`Về ${artistData?.name}`}
                                        </h3>
                                        <div className='flex'>
                                            <img
                                                src={artistData?.thumbnailM}
                                                alt="avatar"
                                                className='object-cover object-50-20 rounded-lg w-1/2 flex-none h-[375px] mr-[30px]'
                                            />
                                            <div>
                                                <div className="mb-12">
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: artistData?.biography }}
                                                        className='overflow-hidden text-sm leading-6 whitespace-normal text-textSecondary text-ellipsis'
                                                        style={{ WebkitBoxOrient: 'vertical', display: '-webkit-box', WebkitLineClamp: '7' }}
                                                    >
                                                    </div>
                                                    <span onClick={() => setMoreInfo(true)} className="text-sm font-bold uppercase cursor-pointer text-navigationText">Xem thêm</span>
                                                </div>
                                                <div>
                                                    <h3 className='text-xl font-bold'>{`${Number(artistData?.follow?.toFixed(1)).toLocaleString("de-DE")}`}</h3>
                                                    <span className='text-sm text-textSecondary'>Người quan tâm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="flex items-center justify-center w-full h-full">
                    <PageLoading />
                </div>
            }
        </Helmet>
    )
}

export default Artist