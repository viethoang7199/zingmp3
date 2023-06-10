import { Route, Routes } from 'react-router-dom';
import Album from '../pages/Album';
import Artist from '../pages/Artist';
import Home from '../pages/Home';
import Hub from '../pages/Hub';
import NewRelease from '../pages/NewRelease';
import Radio from '../pages/Radio';
import RankNewRelease from '../pages/RankNewRelease';
import Search from '../pages/Search';
import SearchAll from '../pages/SearchAll';
import SearchArtist from '../pages/SearchArtist';
import SearchPlaylist from '../pages/SearchPlaylist';
import SearchSongs from '../pages/SearchSongs';
import SearchVideo from '../pages/SearchVideo';
import Top100 from '../pages/Top100';
import ZingChart from '../pages/ZingChart';
import ZingChartWeek from '../pages/ZingChartWeek';
import { useEffect, useState } from 'react';
import { apiGetChartHome } from '../apis';
import Library from '../pages/Library';

const Routers = () => {
    const [weekChart, setWeekChart] = useState(null)

    useEffect(() => {
        const fetchChartData = async () => {
            const response = await apiGetChartHome()
            if (response.data.err === 0) {
                setWeekChart(response.data.data.weekChart);
            }
        }
        fetchChartData()
    }, [])

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/zing-chart' element={<ZingChart />} />
            <Route path='/radio' element={<Radio />} />
            <Route path='/album/:title/:pId' element={<Album />} />
            <Route path='/playlist/:title/:pId' element={<Album />} />
            <Route path='/zing-chart-tuan/:title/:pId' element={<ZingChartWeek weekChart={weekChart && Object.values(weekChart)} />} />
            <Route path='/zing-chart' element={<ZingChart />} />
            <Route path='/nghe-si/:singer' element={<Artist />} />
            <Route path='/:singer' element={<Artist />} />
            <Route path='/top100' element={<Top100 />} />
            <Route path='/moi-phat-hanh' element={<RankNewRelease />} />
            <Route path='/new-release' element={<NewRelease />} />
            <Route path='/library' element={<Library />} />
            <Route path='/hub' element={<Hub />} />
            <Route path='/tim-kiem' element={<Search />}>
                <Route path='/tim-kiem/tat-ca' element={<SearchAll />} />
                <Route path='/tim-kiem/bai-hat' element={<SearchSongs />} />
                <Route path='/tim-kiem/playlist' element={<SearchPlaylist />} />
                <Route path='/tim-kiem/artist' element={<SearchArtist />} />
                <Route path='/tim-kiem/video' element={<SearchVideo />} />
            </Route>
        </Routes>
    )
}

export default Routers