import React, { useRef, useState } from 'react'
import { handleNumber } from '../../utils/fn'
import { CiShuffle } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import icons from '../../utils/icons';

const ArtistSection = ({ name, thumbnail, totalFollow, link }) => {

    const { RiUserAddLine } = icons

    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    const imgRef = useRef();
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
        <div
            className='flex flex-col w-1/5 overflow-hidden mb-[30px]'
        >
            <div
                className='relative flex flex-col overflow-hidden rounded-full'
                onMouseEnter={handleHover}
                onMouseLeave={handleLeaveHover}
                onClick={() => {
                    navigate(link)
                    window.scroll(0, 0)
                }}
            >
                {isHover && <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center rounded-full cursor-pointer bg-[rgba(0,0,0,0.1)]">
                    <span className='p-2 border border-white rounded-full hover:opacity-80'><CiShuffle size={36} /></span>
                </div>}
                <img ref={imgRef} src={thumbnail} alt="" className='object-contain w-full rounded-full' />
            </div>

            <div className='mt-[15px] flex flex-col items-center'>
                <Link to={link} onClick={() => window.scroll(0, 0)}>
                    <span className='text-sm font-medium hover:text-purplePrimary hover:underline'>{name}</span>
                </Link>
                <span className='mt-1 text-xs text-textSecondary'>{`${handleNumber(totalFollow)} quan tâm`}</span>
            </div>
            <div className='mx-auto mt-5'>
                <button type='button' className='flex items-center px-6 py-1 text-xs uppercase border border-solid rounded-full bg-alphaBg border-alphaBg hover:opacity-80'>
                    <span className="mr-[5px]"><RiUserAddLine size={16} /></span>
                    Quan tâm
                </button>
            </div>
        </div>
    )
}

export default ArtistSection