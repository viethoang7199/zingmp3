import icons from "./icons"

const { TbBrandNeteaseMusic, MdOutlineFeed, MdOutlineMultilineChart, Bs0Circle, FiMusic, BsGrid, AiOutlineStar } = icons
export const sidebarMenuTop = [
    {
        path: '',
        text: 'Khám Phá',
        icons: <Bs0Circle size={24} />
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icons: <MdOutlineMultilineChart size={24} />
    },
    {
        path: 'radio',
        text: 'Radio',
        icons: <TbBrandNeteaseMusic size={24} />
    },
    {
        path: 'library',
        text: 'Thư Viện',
        icons: <MdOutlineFeed size={24} />
    },
]

export const sidebarMenuBot = [
    {
        path: 'moi-phat-hanh',
        text: 'Nhạc Mới',
        icons: <FiMusic size={24} />
    },
    {
        path: 'hub',
        text: 'Chủ Đề & Thể Loại',
        icons: <BsGrid size={24} />
    },
    {
        path: 'top100',
        text: 'Top 100',
        icons: <AiOutlineStar size={24} />
    },
]

export const searchMenu = [
    {
        path: 'tat-ca',
        text: 'Tất cả'
    },
    {
        path: 'bai-hat',
        text: 'Bài hát'
    },
    {
        path: 'playlist',
        text: 'Playlist/Album'
    },
    {
        path: 'artist',
        text: 'NGHỆ SĨ/OA'
    },
    {
        path: 'video',
        text: 'MV'
    },
]