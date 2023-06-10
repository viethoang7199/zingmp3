import {
    CategoryScale,
    Chart as ChartJS,
    LineElement,
    LinearScale,
    PointElement,
} from 'chart.js';
import React, { memo, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SongItems from './SongItems';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

const ChartSection = () => {
    const [data, setData] = useState(null);
    const { chart, rank } = useSelector(state => state.app);
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        pointRadius: 0,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false, },
                border: { dash: [3, 4], width: 0 },

            },
            x: {
                ticks: { color: 'rgba(255,255,255,0.5)' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,

        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    };
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 1)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 1)?.map(item => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.6,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 7,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 3,
                })
            }
            setData({ labels, datasets })
        }
    }, [chart])

    return (
        <div className="px-4 pt-4 pb-8 mt-12 bg-gradient-to-r from-[#2b273f] to-purplePrimary rounded-md min-h-[300px]">
            <div className="flex items-center gap-3 mb-5 px-[14px]">
                <Link to='/zing-chart' className="text-white text-[28px] font-bold inline-block py-1"
                    style={{ background: 'radial-gradient(50% 124.93% at 95.86% -10%,#3efad9 0,hsla(0,0%,100%,0) 100%), linear-gradient(91.56deg,#ff9357 1.54%,#9100ff 98.71%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
                    }
                >
                    #zingchart
                </Link>
            </div>
            <div className="relative flex flex-col-reverse w-full h-full gap-10 1280:flex-row 1280:gap-0">
                <div className="w-full 1280:w-1/3 px-[14px]">
                    <div className="flex flex-col gap-2">
                        {rank?.slice(0, 3).map((item, index) => (
                            <div key={item.encodeId} className="rounded-md bg-alphaBg">
                                <SongItems
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    artists={item.artists}
                                    sId={item.encodeId}
                                    order={index + 1}
                                    percent={Math.round(parseInt(item.score) * 100 / parseInt(chart?.totalScore))}
                                    size={'w-[60px] h-[60px]'}
                                />
                            </div>
                        ))}
                        <div className="text-center">
                            <Link
                                to='/zing-chart'
                                className={`py-[6px] px-6 rounded-full text-sm hover:bg-alphaBg border border-solid border-alphaBg inline-block`}
                            >
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full 1280:w-2/3 px-[14px]">
                    {data && <Line
                        options={options}
                        data={data}
                    />}
                </div>
            </div>
        </div>
    )
}

export default memo(ChartSection)