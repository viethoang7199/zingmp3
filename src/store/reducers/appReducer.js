import actionTypes from "../actions/actionTypes";

const initState = {
    banner: null,
    chill: null,
    positiveEnergy: null,
    rendingArtist: null,
    top100: null,
    albumHot: null,
    isLoading: false,
    newRelease: null,
    weekChart: null,
    newSongRank: null,
    chart: null,
    rank: null,
    liveRadio: null
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                positiveEnergy: action.homeData?.find(item => item.sectionId === 'hEditorTheme2') || {},
                rendingArtist: action.homeData?.find(item => item.sectionId === 'hArtistTheme') || {},
                top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                albumHot: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
                newSongRank: action.homeData?.find(item => item.sectionId === 'hNewrelease') || [],
                chart: action.homeData?.find(item => item.sectionId === 'hZC')?.chart || {},
                rank: action.homeData?.find(item => item.sectionId === 'hZC')?.items || [],
                liveRadio: action.homeData?.find(item => item.sectionId === 'hLiveRadio') || {},
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag
            }

        default:
            return state
    }
}

export default appReducer