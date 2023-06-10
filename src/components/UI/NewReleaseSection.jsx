import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SongItems from './SongItems';


const NewReleaseSection = () => {
    const { newRelease } = useSelector(state => state.app);
    const [isActive, setIsActive] = useState(0);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        isActive === 0 ? setSongs(newRelease?.items?.all) : isActive === 1 ? setSongs(newRelease?.items?.vPop) : setSongs(newRelease?.items?.others)
    }, [isActive, newRelease])


    return (
        <div className="flex flex-col gap-4 mt-12">
            <h3 className="flex items-center justify-between mb-5 text-xl font-bold">
                {newRelease?.title}
                <span className="text-xs font-medium uppercase text-textSecondary">Tất cả</span>
                {/* {!isTextAll && <div className="text-xs font-medium uppercase text-textSecondary">Tất cả</div>} */}
            </h3>
            <div className='flex gap-5 text-xs'>
                <button type='button' className={`py-1 px-4 rounded-l-full uppercase border border-solid border-alphaBg rounded-r-full ${isActive === 0 && 'bg-purplePrimary text-white'}`}
                    onClick={() => setIsActive(0)}
                >
                    Tất cả
                </button>
                <button type='button' className={`py-1 px-4 rounded-l-full uppercase border border-solid border-alphaBg rounded-r-full ${isActive === 1 && 'bg-purplePrimary text-white'}`}
                    onClick={() => setIsActive(1)}
                >
                    Việt Nam
                </button>
                <button type='button' className={`py-1 px-4 rounded-l-full uppercase border border-solid border-alphaBg rounded-r-full ${isActive === 2 && 'bg-purplePrimary text-white'}`}
                    onClick={() => setIsActive(2)}
                >
                    Quốc Tế
                </button>
            </div>

            <div className="flex flex-wrap">
                {songs?.slice(0, 12).map(item => (
                    <div key={item.encodeId} className="w-1/2 1280:w-1/3">
                        <SongItems
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artistsNames={item.artistsNames}
                            releaseDate={item.releaseDate}
                            sId={item.encodeId}
                            artists={item.artists}
                            size={`w-[60px] h-[60px]`}
                            textEllipsis
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewReleaseSection