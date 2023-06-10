import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const LoadingPlayerButton = () => {
    return (
        <RotatingLines
            height="20"
            width="20"
            color="#ffffff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
}

export default LoadingPlayerButton