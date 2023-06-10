import axiosClient from './axiosClient'

export const apiGetSong = (sId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/song',
            method: 'get',
            params: { id: sId }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDetailSong = (sId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/infosong',
            method: 'get',
            params: { id: sId }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDetailPlaylist = (pId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/detailplaylist',
            method: 'get',
            params: { id: pId }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetArtist = (singer) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/artist',
            method: 'get',
            params: { name: singer }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetArtistOA = (singerId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/artist',
            method: 'get',
            params: {
                id: singerId,
                page: 1,
                count: 100
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiSearch = (keyword) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/search',
            method: 'get',
            params: { keyword }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetArtistSongs = (singerId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/artistsong',
            method: 'get',
            params: {
                id: singerId,
                page: 1,
                count: 100000
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetChartHome = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/charthome',
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetNewRelease = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/newreleasechart',
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetTop100 = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/top100',
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


