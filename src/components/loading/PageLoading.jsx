import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const PageLoading = () => {
    return (
        <ThreeCircles
            height="100"
            width="100"
            color="#c273ed"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
        />
    )
}

export default PageLoading