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
export function removeVietnameseTones(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' '
    );
    return str;
}
export function isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
}
