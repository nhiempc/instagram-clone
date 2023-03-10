import {
    CallIcon,
    EmojiIcon,
    InfoIcon,
    LikeActiveIcon,
    VideoCallIcon
} from '@/assets/icons';
import Link from 'next/link';
import React from 'react';
import style from './Message.module.css';
import MessageChatItem from './MessageChatItem';
import Picker, { EmojiStyle } from 'emoji-picker-react';

const chatContent = [
    {
        content: 'Đây là nội dung chat 1',
        float: 'justify-start'
    },
    {
        content: 'Đây là nội dung chat 2',
        float: 'justify-end'
    },
    {
        content: 'Đây là nội dung chat 3',
        float: 'justify-start'
    },
    {
        content: 'Đây là nội dung chat 4',
        float: 'justify-start'
    },
    {
        content: 'Đây là nội dung chat 5',
        float: 'justify-end'
    },
    {
        content: 'Đây là nội dung chat 6',
        float: 'justify-end'
    },
    {
        content: 'Đây là nội dung chat 7',
        float: 'justify-end'
    },
    {
        content: 'Đây là nội dung chat 8',
        float: 'justify-start'
    },
    {
        content: 'Đây là nội dung chat 9',
        float: 'justify-end'
    },
    {
        content: 'Đây là nội dung chat 10',
        float: 'justify-end'
    }
];

const MessageChat = () => {
    const [message, setMessage] = React.useState<string>('');
    const [showPicker, setShowPicker] = React.useState(false);

    const onEmojiClick = (emojiObject: any) => {
        setMessage((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };
    return (
        <div
            className={`${style.chatWrapper} lg:w-[70%] flex flex-col justify-between`}
        >
            <div
                className={`${style.chatHeader} flex justify-between h-[60px] px-5 w-full`}
            >
                <div className={`${style.headerUser} flex items-center gap-3`}>
                    <img
                        src='https://lh3.googleusercontent.com/a/AGNmyxbc7sbPkrEFeX-duKUJoJ0LqcxK9sDxtVRWl9oHxw=s96-c'
                        alt='Avatar'
                        className='w-[24px] h-6 rounded-full'
                    />
                    <Link
                        href={'/nhiempc'}
                        className='text-[16px] font-semibold hover:text-slate-500'
                    >
                        Nguyễn Văn Nhiệm
                    </Link>
                </div>
                <div className={`${style.headerAction} flex items-center`}>
                    <button type='button' className='p-2'>
                        <CallIcon />
                    </button>
                    <button type='button' className='p-2'>
                        <VideoCallIcon />
                    </button>
                    <button type='button' className='p-2'>
                        <InfoIcon />
                    </button>
                </div>
            </div>
            <div
                className={`${style.chatBody} flex flex-col-reverse p-5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100`}
            >
                {' '}
                {chatContent.map((item) => (
                    <MessageChatItem content={item} />
                ))}
            </div>
            <div className={`${style.chatFooter}`}>
                <div
                    className={`${style.chatInput} m-5 flex justify-between rounded-full`}
                >
                    <div className={`${style.emoji}`}>
                        <button
                            type='button'
                            className='p-2 relative'
                            onClick={() => setShowPicker((val) => !val)}
                        >
                            <EmojiIcon fill='rgb(38, 38, 38)' />
                            {showPicker && (
                                <div className='emojiPiker absolute top-[-450px] left-0 z-10'>
                                    <Picker
                                        emojiStyle={EmojiStyle.FACEBOOK}
                                        width={'100%'}
                                        onEmojiClick={onEmojiClick}
                                    />
                                </div>
                            )}
                        </button>
                    </div>
                    <div className={`${style.input} p-2`}>
                        <input
                            type='text'
                            className='outline-none focus:outline-none w-full text-[14px] font-normal'
                            placeholder='Nhắn tin...'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <div className={`${style.right} flex`}>
                        <button type='button' className='p-2'>
                            <EmojiIcon fill='rgb(38, 38, 38)' />
                        </button>
                        <button type='button' className='p-2'>
                            <LikeActiveIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageChat;
