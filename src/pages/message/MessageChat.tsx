import {
    CallIcon,
    EmojiIcon,
    InfoIcon,
    LikeActiveIcon,
    PaperPlaneRoundedIcon,
    SendImageIcon,
    VideoCallIcon
} from '@/assets/icons';
import Link from 'next/link';
import React from 'react';
import style from './Message.module.css';
import MessageChatItem from './MessageChatItem';
import Picker, { EmojiStyle } from 'emoji-picker-react';
import { useRouter } from 'next/router';
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    serverTimestamp,
    setDoc
} from 'firebase/firestore';
import { db } from '../../../firebase';

type MessageChatProps = {
    user: any;
    receiver: DocumentData | undefined;
    conversation: DocumentData[];
};

const MessageChat: React.FunctionComponent<MessageChatProps> = ({
    user,
    receiver,
    conversation
}) => {
    const [message, setMessage] = React.useState<string>('');
    const [showPicker, setShowPicker] = React.useState(false);

    const router = useRouter();

    const onEmojiClick = (emojiObject: any) => {
        setMessage((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        if (!receiver) return;
        if (!user.username) return;
        const messageToSend = message;
        setMessage('');
        const data = {
            sender: user.username,
            senderImg: user.image,
            senderName: user.name,
            receiver: receiver.username,
            receiverImg: receiver.profileImg,
            receiverName: receiver.name,
            content: messageToSend,
            timestamp: serverTimestamp()
        };
        await addDoc(
            collection(
                db,
                'users',
                user.username,
                'messages',
                receiver.username,
                'conversation'
            ),
            data
        );
        await setDoc(
            doc(db, 'users', user.username, 'messages', receiver.username),
            {
                username: receiver.username
            }
        );
        await addDoc(
            collection(
                db,
                'users',
                receiver.username,
                'messages',
                user.username,
                'conversation'
            ),
            data
        );
        await setDoc(
            doc(db, 'users', receiver.username, 'messages', user.username),
            {
                username: user.username
            }
        );
    };

    return router.query.sender ? (
        <div
            className={`${style.chatWrapper} lg:w-[70%] flex flex-col justify-between`}
        >
            <div
                className={`${style.chatHeader} flex justify-between h-[60px] px-5 w-full`}
            >
                <div className={`${style.headerUser} flex items-center gap-3`}>
                    <img
                        src={receiver?.profileImg}
                        alt={receiver?.name}
                        className='w-[24px] h-6 rounded-full'
                    />
                    <Link
                        href={`/user/${receiver?.username}`}
                        className='text-[16px] font-semibold hover:text-slate-500'
                    >
                        {receiver?.name}
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
                {conversation.map((item, index) => (
                    <MessageChatItem
                        key={index}
                        conversationItem={item}
                        user={user}
                    />
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
                    {!message && (
                        <div className={`${style.right} flex`}>
                            <button type='button' className='p-2'>
                                <SendImageIcon />
                            </button>
                            <button type='button' className='p-2'>
                                <LikeActiveIcon />
                            </button>
                        </div>
                    )}
                    {message && (
                        <div className={`${style.right} flex`}>
                            <button
                                type='button'
                                className={`${style.sendMessBtn} py-2 px-4 font-medium text-[14px]`}
                                onClick={handleSendMessage}
                            >
                                Gửi
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div
            className={`${style.chatWrapper} lg:w-[70%] flex justify-center items-center`}
        >
            <div
                className={`${style.noMessage} flex flex-col justify-center items-center`}
            >
                <PaperPlaneRoundedIcon width='96' height='96' />
                <div
                    className={`${style.yourMessageText} font-normal text-[20px] mt-1`}
                >
                    Tin nhắn của bạn
                </div>
                <span
                    className={`${style.noMessageCaption} font-normal text-[14px] mt-1`}
                >
                    Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm.
                </span>
                <button
                    type='button'
                    className={`${style.sendMessageBtn} mt-6`}
                >
                    Gửi tin nhắn
                </button>
            </div>
        </div>
    );
};

export default MessageChat;
