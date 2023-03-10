import Link from 'next/link';
import React from 'react';
import style from './Message.module.css';

const MessageUserItem = () => {
    return (
        <Link href={'/message/id'}>
            <div
                className={`${style.UserItemWrapper} flex items-center px-5 py-2`}
            >
                <div className={`${style.userAvatar} w-[25%]`}>
                    <Link href={'/nhiempc'}>
                        <img
                            src='https://lh3.googleusercontent.com/a/AGNmyxbc7sbPkrEFeX-duKUJoJ0LqcxK9sDxtVRWl9oHxw=s96-c'
                            alt='Avatar'
                            className='rounded-full w-[56px] h-[56px]'
                        />
                    </Link>
                </div>
                <div className={`${style.userInfo} w-[75%]`}>
                    <p>Nguyễn Văn Nhiệm</p>
                    <span>Đã gửi tin nhắn cho bạn</span>
                </div>
            </div>
        </Link>
    );
};

export default MessageUserItem;
