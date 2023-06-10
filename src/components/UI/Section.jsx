import React, { memo } from 'react'

import SectionItem from './SectionItem';

const Section = ({ data, isTextArtist, isTextDescription, isTextAll, textEllipsis }) => {

    return (
        <div className='mt-12'>
            <div className="relative w-full mx-auto">
                <h3 className="flex items-center justify-between mb-5 text-xl font-bold">
                    {data?.title}
                    {!isTextAll && <span className="text-xs font-medium uppercase text-textSecondary">Tất cả</span>}
                </h3>

                <div className="grid grid-cols-5 gap-5">
                    {data?.items?.slice(0, 5).map(item => (
                        <SectionItem
                            key={item.encodeId}
                            data={data}
                            title={item.title}
                            link={item.link}
                            sortDescription={item.sortDescription}
                            thumbnailM={item.thumbnailM}
                            artists={item.artists}
                            isTextArtist={isTextArtist}
                            isTextDescription={isTextDescription}
                            textEllipsis={textEllipsis}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(Section)