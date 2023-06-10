import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NewReleaseSection from '../components/UI/NewReleaseSection';
import Section from '../components/UI/Section';
import Slider from '../components/UI/Slider';
import NewSongRankSection from '../components/UI/NewSongRankSection';
import ChartSection from '../components/UI/ChartSection';
import RadioSection from '../components/UI/RadioSection';
import PageLoading from '../components/loading/PageLoading';
import Helmet from '../components/Helmet';

const Home = () => {
    const { chill, positiveEnergy, rendingArtist, top100, albumHot, weekChart, newSongRank, liveRadio } = useSelector(state => state.app);
    return (
        <Helmet title="Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV">
            {chill && positiveEnergy && rendingArtist && top100 && albumHot && weekChart && newSongRank && liveRadio
                ?
                <div className="px-[30px] 1024:px-[60px]">
                    <div className="min-h-[calc(100%-158px)] mt-[70px] mb-[20px]">
                        <Slider />
                        <NewReleaseSection />
                        <Section data={chill} isTextArtist textEllipsis />
                        <Section data={positiveEnergy} isTextArtist />
                        <Section data={rendingArtist} isTextArtist />
                        <NewSongRankSection data={newSongRank} />
                        <ChartSection />
                        <div className="flex items-center w-full gap-5 mt-12">
                            {weekChart?.map(item => (
                                <Link to={item?.link?.split('.')[0]} key={item.link} className='flex-1'>
                                    <img src={item.cover} alt='thumbnail' className="object-cover w-full rounded-md" />
                                </Link>
                            ))}
                        </div>
                        <Section data={top100} isTextDescription textEllipsis />
                        <Section data={albumHot} textEllipsis />
                        <RadioSection data={liveRadio} />
                    </div>
                </div>
                :
                <div className="flex items-center justify-center w-full h-full">
                    <PageLoading />
                </div>
            }
        </Helmet>
    )
}

export default Home