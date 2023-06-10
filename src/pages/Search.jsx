import React from 'react'
import { searchMenu } from '../utils/menu'
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Helmet from '../components/Helmet'

const Search = () => {
    const { keyword } = useSelector(state => state.music)

    return (
        <Helmet title="Zing MP3 - Nghe tải nhạc chất lượng cao trên desktop, mobile và TV">
            <div className="min-h-[calc(100%-158px)] mt-[70px] mb-[50px]">
                <div className="border-b mb-7 border-alphaBg">
                    <div className="flex items-center px-[60px]">
                        <h3 className='text-2xl font-bold text-white capitalize border-r border-[hsla(0,0%,100%,0.1)] pr-5'>Kết quả tìm kiếm</h3>
                        <ul className='flex text-sm font-medium'>
                            {
                                searchMenu?.map(item => (
                                    <li key={item.path} className='relative mx-5 text-white uppercase opacity-90 hover:opacity-100 hover:text-white'>
                                        <NavLink
                                            to={`${item.path}?q=${keyword.replace(' ', '+')}`}
                                            className={({ isActive }) => isActive ? 'after:border-b-2 after:border-purplePrimary after:absolute after:content-[""] after:left-0 after:w-full after:top-full py-[15px] inline-block' : 'py-[15px] inline-block'}
                                        >
                                            {item.text}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="px-[60px] h-full">
                    <Outlet />
                </div>
            </div>
        </Helmet>
    )
}

export default Search