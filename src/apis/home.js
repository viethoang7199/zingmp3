import axiosClient from './axiosClient'

export const getHome = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClient({
            url: '/home',
            method: 'get'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})