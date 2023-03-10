import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react';
import style from './Message.module.css';

type MessageChatItemProps = {
    conversationItem: DocumentData;
    user: any;
};

const MessageChatItem: React.FunctionComponent<MessageChatItemProps> = ({
    conversationItem,
    user
}) => {
    const [userLogin, setUserLogin] = React.useState<string>('');
    const [userChat, setUserChat] = React.useState<string>('');
    const [conversationItemData, setConversationItemData] =
        React.useState<DocumentData>();

    React.useEffect(() => {
        if (!user) return;
        if (!user.username) return;
        setUserLogin(user.username);
    }, [user]);

    React.useEffect(() => {
        if (!conversationItem) return;
        if (!conversationItem.data()) return;
        setUserChat(conversationItem.data().sender);
        setConversationItemData(conversationItem);
    }, [conversationItem]);

    return (
        <div className={`${style.chatItemWrapper} w-full`}>
            <div
                className={`${style.chatItem} ${
                    userLogin === userChat ? 'justify-end' : 'justify-start'
                } px-5 py-2 flex items-center`}
            >
                <Link href={`user/${userChat}`} className='pr-2 mt-4'>
                    {userLogin !== userChat && (
                        <img
                            className='w-6 h-6 rounded-full'
                            src={conversationItemData?.data().senderImg}
                            alt={conversationItemData?.data.senderName}
                        />
                    )}
                </Link>
                <p
                    className={`${style.chatContent} font-normal text-[14px] px-4 py-[12px] rounded-full`}
                >
                    {conversationItemData?.data().content}
                </p>
            </div>
        </div>
    );
};

export default MessageChatItem;
