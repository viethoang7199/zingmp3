import React, { useEffect, useState } from 'react'
import { apiGetNewRelease } from '../apis';
import RankList from '../components/UI/RankList';

const RankNewRelease = () => {
    const [rankNewRelease, setRankNewRelease] = useState(null)

    useEffect(() => {
        const fetchChartData = async () => {
            const response = await apiGetNewRelease()
            if (response.data.err === 0) {
                setRankNewRelease(response.data.data);
            }
        }
        fetchChartData()
    }, [])

    return (
        <div className="px-[60px]">
            <div className="min-h-[calc(100%-158px)] mt-[70px] mb-[50px]">
                <div className="flex flex-col h-full pt-10 overflow-hidden">
                    <div className="mb-6">
                        <h3 className="flex items-center text-[40px] font-extrabold capitalize">BXH nhạc mới</h3>
                    </div>
                    <RankList
                        data={rankNewRelease?.items}
                        number={100}
                        textEllipsis
                    />
                </div>
            </div>
        </div>
    )
}

export default RankNewRelease