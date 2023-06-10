import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ListSong from '../components/UI/ListSong';
import * as actions from '../store/actions'

const SearchSongs = () => {

    const { searchData } = useSelector(state => state.music);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getSearchSongs(searchData?.songs))
    }, [dispatch, searchData])

    return (
        <div>
            <h3 className="mb-[10px] text-xl font-bold capitalize">Bài hát</h3>
            <ListSong isHideTitle />
        </div>
    )
}

export default SearchSongs