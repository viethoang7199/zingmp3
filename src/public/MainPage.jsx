import React from 'react';
import Routers from '../routes/Routes';
import { Scrollbars } from 'react-custom-scrollbars-2';

const MainPage = () => {

    const handleScrollTop = () => {
        window.scroll(0, 0)
    }

    return (
        <Scrollbars
            renderThumbVertical={props => <div {...props} className="!bg-[rgba(255,255,255,0.2)] rounded-full" />}
            onScroll={handleScrollTop}
            autoHide
            style={{ width: '100%', height: '100%' }}
        >
            <Routers />
        </Scrollbars>
    )
}

export default MainPage