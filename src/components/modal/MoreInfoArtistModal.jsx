import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as apis from '../../apis'
import Scrollbars from 'react-custom-scrollbars-2';

const MoreInfoArtistModal = () => {
    const { singer } = useParams();
    const [artistData, setArtistData] = useState({});
    useEffect(() => {
        const fetchArtist = async () => {
            const res = await apis.apiGetArtist(singer);
            setArtistData(res.data.data)
        }
        singer && fetchArtist()
    }, [singer])

    return (
        <div className="max-h-full rounded-lg bg-primaryBg">
            <div className="w-[480px]">
                <div className="relative overflow-hidden rounded-t-lg">
                    <div
                        className="bg-no-repeat bg-[50%] bg-cover blur-[50px] absolute top-0 left-0 right-0 bottom-0"
                        style={{ backgroundImage: `url(${artistData?.thumbnailM})` }}
                    >
                    </div>
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover opacity-60 bg-primaryBg"></div>
                    <div
                        className="relative flex flex-col items-center px-6 pt-6"
                        style={{ backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,0),#34224f' }}
                    >
                        <img
                            src={artistData?.thumbnail}
                            alt=""
                            className="w-[110px] h-[110px] overflow-hidden rounded-full mb-3"
                        />
                        <h3 className="block w-full text-2xl font-bold text-center text-white">{artistData?.name}</h3>
                    </div>
                </div>
                <div className="p-6 overflow-hidden">
                    <Scrollbars
                        autoHide
                        style={{ width: '100%', height: 218 }}
                    >
                        <div
                            className="leading-[1.43] text-textSecondary max-h-[218px] pr-4"
                            dangerouslySetInnerHTML={{ __html: artistData?.biography }}
                        >
                        </div>
                    </Scrollbars>
                </div>
            </div>
        </div>
    )
}

export default MoreInfoArtistModal