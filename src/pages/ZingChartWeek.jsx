import React from 'react';
import { NavLink, useParams } from 'react-router-dom'
import RankList from '../components/UI/RankList';
const ZingChartWeek = ({ weekChart }) => {

    const { pId } = useParams()

    return (
        <div className="px-[60px]">
            <div className="min-h-[calc(100%-158px)] mt-[70px] mb-[50px]">
                <div className="flex flex-col h-full pt-10 overflow-hidden">
                    <div className="mb-6">
                        <h3 className="flex items-center text-[40px] font-extrabold capitalize">Bảng xếp hạng tuần</h3>
                    </div>
                    <nav className="flex gap-10 mb-6">
                        <div className="flex items-center">
                            <ul className='flex text-2xl font-bold'>
                                {
                                    weekChart?.map(item => (
                                        <li key={item.chartId} className='relative mx-5 text-white uppercase first:ml-0 last:mr-0 opacity-90 hover:opacity-100 hover:text-white'>
                                            <NavLink
                                                to={item.link}
                                                className={({ isActive }) => isActive ? 'border-b-[3px] border-purplePrimary py-[15px] inline-block' : 'py-[15px] inline-block'}
                                            >
                                                {item.country === 'vn' ? "Việt Nam" : item.country === 'us' ? "US-UK" : item.country === 'korea' ? "K-Pop" : ""}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </nav>
                    <RankList
                        data={weekChart?.find(item => item?.link?.includes(pId))?.items}
                        number={40}
                    />
                </div>
            </div>
        </div>
    )
}

export default ZingChartWeek