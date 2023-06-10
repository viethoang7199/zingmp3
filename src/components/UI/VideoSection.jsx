import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

const VideoSection = ({ thumbnailM, duration, title, artist, artists }) => {
    return (
        <div className='flex flex-col w-1/3'>
            <div className='relative'>
                <img
                    src={thumbnailM}
                    alt="thumbnail"
                    className='object-contain w-full'
                />
                <span className='absolute py-[3px] px-[5px] rounded text-xs bottom-[5px] right-[5px] bg-[rgba(0,0,0,.7)]'>{moment.utc(duration * 1000).format('mm:ss')}</span>
            </div>
            <div className='py-[10px] flex gap-3'>
                <img
                    src={artist?.thumbnail}
                    alt=""
                    className='object-cover w-10 h-10 rounded-full'
                />
                <div className='flex flex-col'>
                    <span className='text-sm'>{title}</span>
                    <span className='text-xs text-textSecondary'>
                        {artists?.map((item, index) => (
                            <Link to={item.link} key={item.id} className='hover:underline hover:text-purple'>
                                {(index ? ', ' : '') + item.name}
                            </Link>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoSection