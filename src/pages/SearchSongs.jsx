import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ListSong from '../components/UI/ListSong';
import * as actions from '../store/actions'
import icons from '../utils/icons';

const SearchSongs = () => {
    const { TbBrandNeteaseMusic } = icons

    const { searchData } = useSelector(state => state.music);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getSearchSongs(searchData?.top?.id))
    }, [dispatch, searchData])

    return (
        <>
            {searchData ?
                <div>
                    <h3 className="mb-[10px] text-xl font-bold capitalize">Bài hát</h3>
                    <ListSong isHideTitle />
                </div>
                :
                <div className="flex flex-col text-textSecondary items-center justify-center w-full h-full bg-alphaBg py-[30px]">
                    <span className="mb-5"><TbBrandNeteaseMusic size={80} /></span>
                    <span className="text-base">Không có kết quả được tìm thấy</span>
                </div>
            }
        </>
    )
}

export default SearchSongs