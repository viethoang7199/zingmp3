import actionTypes from "../actions/actionTypes";

const initState = {
    curSongId: null,
    curSongData: null,
    isPlaying: false,
    atAlbum: false,
    songs: null,
    curAlbumId: null,
    recentSongs: [],
    searchData: null,
    keyword: '',
    recentSearch: ''
}

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sId || null
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag
            }
        case actionTypes.SET_ALBUM:
            return {
                ...state,
                atAlbum: action.flag
            }
        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs || null
            }
        case actionTypes.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null
            }
        case actionTypes.SET_CUR_ALBUM_ID:
            return {
                ...state,
                curAlbumId: action.pId || null
            }
        case actionTypes.SET_RECENT_SONGS:
            let songs = state.recentSongs;
            if (action.data) {
                if (state.recentSongs?.some(item => item.sId === action.data.sId)) {
                    songs = songs.filter((item) => item.sId !== action.data.sId)
                }
                // if (state.recentSongs > 20) {
                //     songs = songs.filter((item, index, self) => index !== self.length - 1)
                // }
                songs = [action.data, ...songs]
            }
            return {
                ...state,
                recentSongs: songs
            }
        case actionTypes.SEARCH:
            return {
                ...state,
                searchData: action.data || null,
                keyword: action.keyword || ''
            }
        case actionTypes.SET_RECENT_SEARCH:
            return {
                ...state,
                recentSearch: action.data || null,
                keyword: action.keyword || ''
            }

        default:
            return state
    }
}

export default musicReducer