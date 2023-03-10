import Link from 'next/link';
import React from 'react';
import style from './Message.module.css';

type ChatItem = {
    content: string;
    float: string;
};

type MessageChatItemProps = {
    content: ChatItem;
};

const MessageChatItem: React.FunctionComponent<MessageChatItemProps> = ({
    content
}) => {
    return (
        <div className={`${style.chatItemWrapper} w-full`}>
            <div
                className={`${style.chatItem} ${
                    content && content.float
                } px-5 py-2 flex items-center`}
            >
                <Link href={'/message'} className='pr-2 mt-4'>
                    <img
                        className='w-6 h-6 rounded-full'
                        src='https://avatars.githubusercontent.com/u/62824306?v=4'
                        alt='Avatar'
                    />
                </Link>
                <p
                    className={`${style.chatContent} font-normal text-[14px] px-4 py-[12px] rounded-full`}
                >
                    {content && content.content}
                </p>
            </div>
        </div>
    );
};

export default MessageChatItem;
