import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import style from './Message.module.css';

type MessageUserItemProps = {
    userChatItem: DocumentData;
};

const MessageUserItem: React.FunctionComponent<MessageUserItemProps> = ({
    userChatItem
}) => {
    const router = useRouter();
    const [userItem, setUserItem] = React.useState<DocumentData>();

    React.useEffect(() => {
        if (!userChatItem) return;
        if (!userChatItem.data()) return;
        setUserItem(userChatItem);
    }, [userChatItem]);

    return (
        <Link href={`/message/${userItem?.data().username}`}>
            <div
                className={`${
                    style.UserItemWrapper
                } flex items-center px-5 py-2 ${
                    userItem?.data().username === router.query.sender
                        ? 'bg-zinc-200'
                        : ''
                }`}
            >
                <div className={`${style.userAvatar} w-[25%]`}>
                    <img
                        src={userItem?.data().profileImg}
                        alt={userItem?.data().name}
                        className='rounded-full w-[56px] h-[56px]'
                    />
                </div>
                <div className={`${style.userInfo} w-[75%]`}>
                    <p>{userItem?.data().name}</p>
                    <span>Đã gửi tin nhắn cho bạn</span>
                </div>
            </div>
        </Link>
    );
};

export default MessageUserItem;
