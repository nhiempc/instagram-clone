import { NewMessageIcon } from '@/assets/icons';
import React from 'react';
import style from './Message.module.css';
import MessageUserItem from './MessageUserItem';

const MessageUser = () => {
    return (
        <div className={`${style.listUserWrapper} lg:w-[30%]`}>
            <div
                className={`${style.listUserHeader} flex justify-end w-full h-[60px]`}
            >
                <div
                    className={`${style.headerWrapper} flex w-[80%] pr-5 justify-between items-center`}
                >
                    <div
                        className={`${style.headerUsername} font-semibold text-[16px]`}
                    >
                        once.died.no.return
                    </div>
                    <button type='button'>
                        <NewMessageIcon />
                    </button>
                </div>
            </div>
            <div className={`${style.userWrapper}`}>
                <MessageUserItem />
                <MessageUserItem />
                <MessageUserItem />
            </div>
        </div>
    );
};

export default MessageUser;
