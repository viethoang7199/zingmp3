import React, { memo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots, BsPlayCircle } from 'react-icons/bs';

const SectionItem = ({ link, thumbnailM, title, data, artists, sortDescription, isTextArtist, isTextDescription, releaseDateText, isReleaseDateText, textEllipsis }) => {

    const navigate = useNavigate();

    const [isHover, setIsHover] = useState(false)

    const imgRef = useRef();

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

    return (
        <div className="flex flex-col">
            <div
                className='relative w-full overflow-hidden rounded-lg'
                onMouseEnter={handleHover}
                onMouseLeave={handleLeaveHover}
            >
                {isHover && <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center w-full gap-8 rounded-lg cursor-pointer bg-overlayBg"
                    onClick={() => {
                        navigate(link?.split('.')[0], { state: { playAlbum: false } })
                    }}
                >
                    <span><AiOutlineHeart size={24} /></span>
                    <span
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(link?.split('.')[0], { state: { playAlbum: true } })
                        }}
                    ><BsPlayCircle size={32} /></span>
                    <span><BsThreeDots size={24} /></span>
                </div>}
                <img
                    ref={imgRef}
                    src={thumbnailM}
                    alt={title}
                    className="object-cover w-full rounded-lg"
                />
            </div>
            <h3
                onClick={() => {
                    navigate(link?.split('.')[0], { state: { playAlbum: false } })
                }}
                className={`text-[14px] block mt-4 font-bold cursor-pointer hover:text-darkPurple w-full ${textEllipsis ? "whitespace-nowrap text-ellipsis overflow-hidden" : ""}`}>
                {data?.sectionId === 'hEditorTheme' || data?.sectionId === 'hEditorTheme2' || data?.sectionId === 'hArtistTheme' ? "" : title}
            </h3>
            <h3 className="inline-block mt-1 text-sm text-textSecondary leading-[1.33]">
                {!isTextArtist
                    &&
                    <span
                        style={{ WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', display: '-webkit-box', overflow: 'hidden' }}
                        className={`${textEllipsis ? "text-ellipsis" : ""}`}
                    >
                        {artists?.slice(0, 3).map((item, index) => (
                            <Link to={item.link} key={item.id} className='hover:text-purpleSecondary hover:underline'
                                onClick={() => window.scroll(0, 0)}
                            >
                                <span>
                                    {(index ? ', ' : '') + item.name}
                                </span>
                            </Link>
                        ))}
                    </span>}
                {!isTextDescription && <span style={{ WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', display: '-webkit-box', overflow: 'hidden' }} className={`${textEllipsis ? "text-ellipsis" : ""}`}>{sortDescription}</span>}
                {isReleaseDateText && <span>{releaseDateText}</span>}
                {/* } */}
            </h3>
        </div>
    )
}

export default memo(SectionItem)