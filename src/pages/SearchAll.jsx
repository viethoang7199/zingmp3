import React from 'react'
import { useSelector } from 'react-redux';
import { handleNumber } from '../utils/fn';
import SongItems from '../components/UI/SongItems';
import ListSongItem from '../components/UI/ListSongItem';
import SectionItem from '../components/UI/SectionItem';
import ArtistSection from '../components/UI/ArtistSection';
import VideoSection from '../components/UI/VideoSection';
import { Link } from 'react-router-dom';
import albumDisk from '../assets/images/album-disk.png'

const SearchAll = () => {

    const { searchData } = useSelector(state => state.music);

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col">
                <div className='mb-[30px] flex flex-col w-full'>
                    <h3 className="mb-5 text-xl font-bold capitalize">Nổi bật</h3>
                    <div className="flex w-full gap-7">
                        {
                            searchData?.top && <div className="flex p-[10px] group hover:bg-alphaBg items-center bg-sideBarBg w-1/3 rounded-md">
                                <div className="mr-4">
                                    <div className={`relative ${searchData?.top.objectType === "playlist" ? "ml-5" : ""}`}>
                                        <div className={`relative z-[2] ${searchData?.top.objectType === "playlist" ? "-translate-x-[10px] group-hover:-translate-x-[20px] hover:transition-all hover:duration-500 hover:ease-in-out transition-all duration-500 ease-in-out" : ""}`}>
                                            <img
                                                src={searchData?.top.thumbnail}
                                                alt='avatar'
                                                className={`w-[84px] h-[84px] object-cover ${searchData?.top.objectType === "artist" ? "rounded-full" : "rounded-md"}`}
                                            />
                                        </div>
                                        {searchData?.top.objectType === "playlist" &&
                                            <img
                                                src={albumDisk}
                                                alt=""
                                                className="absolute top-0 right-0 w-[84px] h-[84px] object-cover group-hover:animate-rotate-album-disk"
                                            />}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 grow'>
                                    <span className="text-xs text-textSecondary mb-[6px]">
                                        {searchData?.top.objectType === "artist" ? "Nghệ sĩ" : "Album"}
                                    </span>
                                    <span className="text-sm font-bold">{searchData?.top.title || searchData?.top.name}</span>
                                    <span className="text-xs text-secondText">
                                        {searchData?.top.objectType === "artist" && searchData?.top.objectType === "playlist" ? <span>{handleNumber(searchData?.artists[0]?.totalFollow)}</span> :
                                            searchData?.top.objectType === "playlist" && searchData?.top?.artists?.map((item, index) => (
                                                <Link
                                                    to={item.link}
                                                    key={item.id}
                                                    className='text-xs text-textSecondary hover:underline hover:text-purplePrimary'>
                                                    <span>{(index ? ', ' : '') + item.name}</span>
                                                </Link>
                                            ))}
                                    </span>
                                </div>
                            </div>
                        }
                        {searchData?.songs?.slice(0, 2).map(item => (
                            <div key={item.encodeId} className='items-center flex-1 rounded-md bg-sideBarBg'>
                                <SongItems
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    artistsNames={item.artistsNames}
                                    artists={item.artists}
                                    sId={item.encodeId}
                                    size={`w-[84px] h-[84px]`}
                                    isSearchPage
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col w-full mb-[30px]'>
                    <h3 className="mb-5 text-xl font-bold capitalize">Bài hát</h3>
                    <div className='flex flex-wrap justify-between w-full'>
                        {searchData?.songs?.slice(0, 6).map((item, index) => (
                            <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 !== 0 ? "pl-5" : "pr-5"}`}>
                                <ListSongItem songData={item} isHideNode isHideAlbum />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col w-full mb-[30px]'>
                    <h3 className="mb-5 text-xl font-bold capitalize">Playlist/Album</h3>
                    <div className='grid grid-cols-5 gap-7'>
                        {searchData?.playlists?.slice(0, 5).map((item) => (
                            <SectionItem
                                key={item.encodeId}
                                title={item.title}
                                link={item.link}
                                sortDescription={item.sortDescription}
                                thumbnailM={item.thumbnailM}
                                artistsNames={item.artistsNames}
                                artists={item.artists}
                                isTextDescription
                            />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col w-full mb-[30px]'>
                    <h3 className="mb-5 text-xl font-bold capitalize">MV</h3>
                    <div className='flex gap-7'>
                        {searchData?.videos?.slice(0, 3).map((item) => (
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
                    <h3 className="mb-5 text-xl font-bold capitalize">Nghệ Sĩ/OA</h3>
                    <div className='flex gap-7'>
                        {searchData?.artists?.slice(0, 5).map((item) => (
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
            </div>
        </div>
    )
}

export default SearchAll