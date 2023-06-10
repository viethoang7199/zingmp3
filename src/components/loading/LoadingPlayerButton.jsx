import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const LoadingPlayerButton = () => {
    return (
        // <RotatingLines
        //     height="20"
        //     width="20"
        //     color="#c273ed"
        //     ariaLabel="audio-loading"
        //     wrapperStyle={{}}
        //     wrapperClass="wrapper-class"
        //     visible={true}
        // />
        <RotatingLines
            height="28"
            width="28"
            strokeColor="#c273ed"
            strokeWidth="5"
            animationDuration="0.75"
            visible={true}
        />
    )
}

export default LoadingPlayerButton