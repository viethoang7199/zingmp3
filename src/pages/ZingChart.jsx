import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { BsCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { apiGetChartHome } from '../apis';
import RankList from '../components/UI/RankList';
import PageLoading from '../components/loading/PageLoading';
import Helmet from '../components/Helmet';

const ZingChart = () => {

    const [chartData, setChartData] = useState(null);
    const [data, setData] = useState(null);
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
    }
    useEffect(() => {
        const fetchChartData = async () => {
            const response = await apiGetChartHome()
            if (response.data.err === 0) {
                setChartData(response.data.data);
            }
        }
        fetchChartData()
    }, [])

    useEffect(() => {
        const labels = chartData?.RTChart?.chart?.times?.filter(item => +item.hour % 2 === 1)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chartData?.RTChart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 6,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 2
                })
            }
            setData({ labels, datasets })
        }
    }, [chartData])

    return (
        <Helmet title="#zingchart | Xem bài hát, album, MV đang hot nhất hiện tại">
            {chartData
                ?
                <>
                    <div className='px-[60px]'>
                        <div className="min-h-[calc(100%-158px)] mt-[70px] mb-[50px]">
                            <div className="flex items-center gap-3 pt-[40px] mb-10">
                                <h2 className="text-white text-[40px] font-bold inline-block py-1"
                                    style={{ background: 'radial-gradient(50% 124.93% at 95.86% -10%,#3efad9 0,hsla(0,0%,100%,0) 100%),linear-gradient(91.56deg,#ff9357 1.54%,#9100ff 98.71%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
                                    }
                                > #zingchart</h2>
                                <button className="text-white" type='button'>
                                    <BsCircleFill size={24} />
                                </button>
                            </div>
                            <div className="h-[300px]">
                                {data && <Line
                                    options={options}
                                    data={data}
                                />}
                            </div>
                            <div className='my-5'>
                                <RankList data={chartData?.RTChart?.items} number={10} showButton />
                            </div>
                        </div>
                    </div>
                    <div className='relative w-full pt-10 mx-auto mt-7'>
                        <div
                            className="absolute top-0 left-0 right-0 bottom-0 z-1 grayscale-[1] bg-no-repeat h-full bg-top bg-cover"
                            style={{ backgroundImage: `url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.34/static/media/week-chart-bg.edf332e5.jpg)` }}
                        ></div>
                        <div className='absolute top-0 bottom-0 left-0 right-0 bg-[rgba(32,19,53,0.9)]'></div>
                        <div className='relative px-[60px]'>
                            <h3 className='mb-5 w-fit text-[40px] font-extrabold capitalize'>
                                <Link to=''>
                                    Bảng xếp hạng tuần
                                </Link>
                            </h3>
                        </div>
                        <div className='flex flex-col 1280:flex-row gap-7 w-full h-full px-[60px] py-10 relative'>
                            {chartData?.weekChart && Object.entries(chartData?.weekChart)?.map((item, index) => (
                                <div className='flex flex-col w-full 1280:w-1/3 bg-[hsla(0,0%,100%,0.05)] rounded-lg py-4 px-[10px]' key={index}>
                                    <h3 className='text-2xl font-bold pl-10 pb-[10px]'>{item[0] === 'vn' ? "Việt Nam" : item[0] === 'us' ? "US-UK" : item[0] === 'korea' ? "K-Pop" : ""}</h3>
                                    <RankList
                                        data={item[1]?.items}
                                        number={5}
                                        link={item[1]?.link}
                                        isShowFullSongWeek
                                        isHideAlbum
                                        textEllipsis
                                        showButton
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                :
                <div className="flex items-center justify-center w-full h-full">
                    <PageLoading />
                </div>
            }
        </Helmet>
    )
}

export default ZingChart