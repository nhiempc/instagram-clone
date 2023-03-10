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
    icon: React.ReactNode[];
    content: string;
    to?: string | undefined;
    type: string;
    btnAction?: string;
};

export const menu: menuItems[] = [
    {
        icon: [<HomeIcon />, <HomeActiveIcon />],
        content: 'Trang chủ',
        to: '/',
        type: 'link'
    },
    {
        icon: [<SearchIcon />],
        content: 'Tìm kiếm',
        type: 'button',
        btnAction: 'search'
    },
    {
        icon: [<ExploreIcon />],
        content: 'Khám phá',
        to: '',
        type: 'link'
    },
    {
        icon: [<ReelsIcon />],
        content: 'Reels',
        to: '',
        type: 'link'
    },
    {
        icon: [<MessengerIcon />, <MessengerActiveIcon />],
        content: 'Tin nhắn',
        to: '/message',
        type: 'link'
    },
    {
        icon: [<NotificationIcon />],
        content: 'Thông báo',
        type: 'button',
        btnAction: 'notification'
    },
    {
        icon: [<CreateIcon />],
        content: 'Tạo',
        type: 'button',
        btnAction: 'create'
    }
];
export const setting: menuItems = {
    icon: [<ViewMoreIcon />],
    content: 'Xem thêm',
    type: 'button',
    btnAction: 'view-more'
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

export const PublicModalBtn = [
    {
        label: 'Báo cáo',
        danger: true,
        action: 'report'
    },
    {
        label: 'Bỏ theo dõi',
        danger: true,
        action: 'unfollow'
    },
    {
        label: 'Thêm vào mục yêu thích',
        danger: false,
        action: 'add_to_like'
    },
    {
        label: 'Đi tới bài viết',
        danger: false,
        action: 'go_to_post'
    },
    {
        label: 'Chia sẻ lên...',
        danger: false,
        action: 'share'
    },
    {
        label: 'Sao chép liên kết',
        danger: false,
        action: 'copy_link'
    },
    {
        label: 'Nhúng',
        danger: false,
        action: 'embed'
    },
    {
        label: 'Giới thiệu về tài khoản này',
        danger: false,
        action: 'info'
    },
    {
        label: 'Hủy',
        danger: false,
        action: 'cancel'
    }
];
export const PersonalModalBtn = [
    {
        label: 'Xóa',
        danger: true,
        action: 'delete'
    },
    {
        label: 'Chỉnh sửa',
        danger: false,
        action: 'edit'
    },
    {
        label: 'Ẩn/Hiện lượt thích',
        danger: false,
        action: 'hide_like'
    },
    {
        label: 'Tắt/Bật tính năng bình luận',
        danger: false,
        action: 'off_comment'
    },
    {
        label: 'Đi tới bài viết',
        danger: false,
        action: 'go_to_post'
    },
    {
        label: 'Chia sẻ lên...',
        danger: false,
        action: 'share'
    },
    {
        label: 'Sao chép liên kết',
        danger: false,
        action: 'copy_link'
    },
    {
        label: 'Nhúng',
        danger: false,
        action: 'embed'
    },
    {
        label: 'Hủy',
        danger: false,
        action: 'cancel'
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
export const TimeAgo = (function () {
    var self: any = {};

    // Public Methods
    self.locales = {
        prefix: '',
        sufix: '',

        seconds: 'Vừa xong',
        minute: 'Khoảng một phút trước',
        minutes: '%d phút trước',
        hour: 'Khoảng một giờ trước',
        hours: 'Khoảng %d giờ trước',
        day: 'Một ngày trước',
        days: '%d ngày trước',
        month: 'Khoảng một tháng trước',
        months: '%d tháng trước',
        year: 'Khoảng một năm trước',
        years: '%d năm trước'
    };

    self.inWords = function (timeAgo: any) {
        var d: any = new Date();
        var seconds = Math.floor((d - parseInt(timeAgo)) / 1000),
            separator = this.locales.separator || ' ',
            words = this.locales.prefix + separator,
            interval = 0,
            intervals: any = {
                year: seconds / 31536000,
                month: seconds / 2592000,
                day: seconds / 86400,
                hour: seconds / 3600,
                minute: seconds / 60
            };

        var distance = this.locales.seconds;

        for (var key in intervals) {
            interval = Math.floor(intervals[key]);

            if (interval > 1) {
                distance = this.locales[key + 's'];
                break;
            } else if (interval === 1) {
                distance = this.locales[key];
                break;
            }
        }

        distance = distance.replace(/%d/i, interval);
        words += distance + separator + this.locales.sufix;

        return words.trim();
    };

    return self;
})();

export function timestampToDate(timestamp: number) {
    const dateFormat = new Date(timestamp);
    return `Ngày ${dateFormat.getDate()} tháng ${
        dateFormat.getMonth() + 1
    } năm ${dateFormat.getFullYear()}`;
}
