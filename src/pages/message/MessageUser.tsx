import { NewMessageIcon } from '@/assets/icons';
import { db } from '../../../firebase';
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    onSnapshot
} from 'firebase/firestore';
import React from 'react';
import style from './Message.module.css';
import MessageUserItem from './MessageUserItem';

type MessageUserProps = {
    user: any;
};

const MessageUser: React.FunctionComponent<MessageUserProps> = ({ user }) => {
    const [listChat, setListChat] = React.useState<DocumentData[]>();
    const [userLogin, setUserLogin] = React.useState<string>('');

    React.useEffect(() => {
        if (!user) return;
        if (!user.username) return;
        setUserLogin(user.username);
    }, [user]);

    React.useEffect(() => {
        if (!user.username) return;
        const getUserListChat = (username: string) => {
            onSnapshot(
                collection(db, 'users', username, 'messages'),
                (snapshot) => {
                    const result = snapshot.docs.map(async (snap) => {
                        const username = snap.data().username;
                        const userRef = doc(db, 'users', username);
                        const res = await getDoc(userRef);
                        return res;
                    });
                    Promise.all(result).then((value) => setListChat(value));
                }
            );
        };
        getUserListChat(user.username);
    }, [user, db]);

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
                        {userLogin}
                    </div>
                    <button type='button'>
                        <NewMessageIcon />
                    </button>
                </div>
            </div>
            <div className={`${style.userWrapper}`}>
                {listChat?.map((item, index) => (
                    <MessageUserItem key={index} userChatItem={item} />
                ))}
            </div>
        </div>
    );
};

export default MessageUser;
