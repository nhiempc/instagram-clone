import {
    HomeActiveIcon,
    HomeIcon,
    SearchIcon,
    SearchActiveIcon,
    ExploreIcon,
    ExploreActiveIcon,
    ReelsIcon,
    ReelsActiveIcon,
    MessengerIcon,
    MessengerActiveIcon,
    NotificationIcon,
    NotificationActiveIcon,
    CreateIcon,
    CreateActiveIcon,
    ViewMoreIcon
} from '@/assets/icons';

type menuItems = {
    icon: React.ReactNode;
    content: string;
    to: string;
};

export const menu: menuItems[] = [
    {
        icon: <HomeActiveIcon />,
        content: 'Trang chủ',
        to: '/'
    },
    {
        icon: <SearchIcon />,
        content: 'Tìm kiếm',
        to: '/'
    },
    {
        icon: <ExploreIcon />,
        content: 'Khám phá',
        to: '/'
    },
    {
        icon: <ReelsIcon />,
        content: 'Reels',
        to: '/'
    },
    {
        icon: <MessengerIcon />,
        content: 'Tin nhắn',
        to: '/'
    },
    {
        icon: <NotificationIcon />,
        content: 'Thông báo',
        to: '/'
    },
    {
        icon: <CreateIcon />,
        content: 'Tạo',
        to: '/'
    }
];
export const setting: menuItems = {
    icon: <ViewMoreIcon />,
    content: 'Xem thêm',
    to: '/'
};
export const footerMenu = [
    {
        to: '/',
        content: 'Giới thiệu'
    },
    {
        to: '/',
        content: 'Trợ giúp'
    },
    {
        to: '/',
        content: 'Báo chí'
    },
    {
        to: '/',
        content: 'API'
    },
    {
        to: '/',
        content: 'Việc làm'
    },
    {
        to: '/',
        content: 'Quyền riêng tư'
    },
    {
        to: '/',
        content: 'Điều khoản'
    },
    {
        to: '/',
        content: 'Vị trí'
    },
    {
        to: '/',
        content: 'Ngôn ngữ'
    },
    {
        to: '/',
        content: 'Meta đã xác minh'
    }
];
