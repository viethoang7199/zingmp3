import axiosClient from './axiosClient'

export const apiGetArtists = (aId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/song',
            method: 'get',
            params: { id: aId }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})