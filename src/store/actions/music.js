
import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const setCurSongId = (sId) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sId
})
export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})
export const playALbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag
})
export const setPlayList = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})
export const loading = (flag) => ({
    type: actionTypes.LOADING,
    flag
})
export const setCurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data
})
export const setCurAlbumId = (pId) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pId
})
export const setRecentSongs = (data) => ({
    type: actionTypes.SET_RECENT_SONGS,
    data
})
export const setRecentSearch = (data) => ({
    type: actionTypes.SET_RECENT_SEARCH,
    data
})

export const search = (keyword) => async (dispatch) => {
    try {
        const response = await apis.apiSearch(keyword)
        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: response.data.data,
                keyword
            })
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data: null
        })
    }
}
export const getSearchSongs = (singerId) => async (dispatch) => {
    try {
        const response = await apis.apiGetArtistSongs(singerId)
        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: response.data.data.items,
            })
        } else {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: null,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.PLAYLIST,
            songs: null
        })
    }
}