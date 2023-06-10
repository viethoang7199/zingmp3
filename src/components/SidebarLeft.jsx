import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { sidebarMenuBot, sidebarMenuTop } from '../utils/menu';

const SidebarLeft = ({ className }) => {
    return (
        <aside className={`1280:w-[240px] w-[70px] bg-sideBarPopupBg 1280:bg-sideBarBg pb-[55px] transition-[width] duration-300 ease-out ${className}`}>
            <div className="w-full 1280:w-[240px] h-[70px] 1280:pr-[25px] 1280:pl-[28px] flex 1280:justify-start justify-center items-center">
                <Link to='/'>
                    <div
                        className="w-[120px] hidden 1280:inline-block h-10 bg-no-repeat bg-[50%] bg-contain"
                        style={{ backgroundImage: `url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg)` }}>
                    </div>
                    <div
                        className="w-[45px] h-[45px] 1280:hidden inline-block bg-no-repeat bg-[50%] bg-contain"
                        style={{ backgroundImage: `url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.37/static/media/icon_zing_mp3_60.f6b51045.svg)` }}>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col h-full">
                <nav className="relative w-full mb-4">
                    <ul>
                        {sidebarMenuTop.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => isActive ? "text-navigationText bg-alphaBg flex justify-center 1280:justify-start items-center text-sm leading-[20px] font-medium py-3 px-0 1280:px-[21px] 1280:border-l-[3px] border-purplePrimary" : "text-navigationText flex items-center justify-center 1280:justify-start text-sm leading-[20px] font-medium py-3 px-0 1280:px-[21px] border-l-[3px] border-transparent hover:text-white"}
                                >
                                    <span className="1280:mr-3">{item.icons}</span>
                                    <span className="hidden 1280:inline">{item.text}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="px-[25px]">
                    <hr className="border-alphaBg" />
                </div>
                <nav className="relative w-full mt-4 grow">
                    <ul>
                        {sidebarMenuBot.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => isActive ? "text-navigationText bg-alphaBg flex items-center justify-center 1280:justify-start text-sm leading-[20px] font-medium py-3 px-0 1280:px-[21px] 1280:border-l-[3px] border-purplePrimary" : "text-navigationText flex items-center justify-center 1280:justify-start text-sm leading-[20px] font-medium py-3 px-0 1280:px-[21px] border-l-[3px] border-transparent hover:text-white"}
                                >
                                    <span className="1280:mr-3">{item.icons}</span>
                                    <span className="hidden 1280:inline">{item.text}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default SidebarLeft