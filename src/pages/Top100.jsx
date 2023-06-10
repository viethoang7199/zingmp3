import React, { useEffect, useState } from 'react'
import { apiGetTop100 } from '../apis'
import SectionItem from '../components/UI/SectionItem'
import Helmet from '../components/Helmet'

const Top100 = () => {

    const [top100, setTop100] = useState(null)

    useEffect(() => {
        const fetchChartData = async () => {
            const response = await apiGetTop100()
            if (response.data.err === 0) {
                setTop100(response.data.data);
            }
        }
        fetchChartData()
    }, [])

    return (
        <Helmet title="Top 100 | Tuyển tập nhạc hay chọn lọc">
            <div className="px-[60px]">
                <div className="min-h-[calc(100%-158px)] mt-[70px] mb-[50px]">
                    <div className="flex flex-col h-full pt-10 overflow-hidden">
                        <div className="mb-6">
                            <h3
                                className="flex items-center justify-center text-transparent text-[120px] font-extrabold capitalize"
                                style={{ WebkitTextStroke: `1px #9b4de0`, fontFamily: 'Roboto, sans-serif', fontWeight: '900' }}
                            >
                                Top 100
                            </h3>
                        </div>
                        <div>
                            {top100?.map((item, index) => (
                                <div key={index} className="mb-12">
                                    <h3 className="mb-5 text-xl font-bold capitalize">
                                        {item.title}
                                    </h3>
                                    <div className="grid grid-cols-5 gap-6">
                                        {item?.items?.map(item => (
                                            <SectionItem
                                                key={item.encodeId}
                                                title={item.title}
                                                link={item.link}
                                                sortDescription={item.sortDescription}
                                                thumbnailM={item.thumbnailM}
                                                artistsNames={item.artistsNames}
                                                artists={item.artists}
                                                isTextDescription
                                                textEllipsis
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Top100