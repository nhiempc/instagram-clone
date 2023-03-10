import Content from '@/components/Content';
import Layout from '@/components/Layout';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MessageUser from './MessageUser';
import MessageChat from './MessageChat';
import style from './Message.module.css';
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    onSnapshot,
    orderBy,
    query
} from 'firebase/firestore';
import { db } from '../../../firebase';

export default function MessagePage() {
    const [user, setUser] = React.useState<any>({ username: '' });
    const [receiver, setReceiver] = React.useState<DocumentData | undefined>(
        undefined
    );
    const [conversation, setConversation] = React.useState<DocumentData[]>([]);
    const { data: session, status } = useSession();
    const router = useRouter();
    const loading = status === 'loading';

    React.useEffect(() => {
        if (session === undefined) {
            setUser({ username: '' });
        } else if (session === null) {
            router.push('/auth/signin');
        } else {
            setUser(session.user);
        }
    }, [router, session]);

    React.useEffect(() => {
        const receiver = router.query.sender;
        if (!receiver) return;
        if (typeof receiver === 'object') return;
        const getPostInfo = async (receiver: string) => {
            const userRef = doc(db, 'users', receiver);
            const res = await getDoc(userRef);
            setReceiver(res.data());
        };
        getPostInfo(receiver);
    }, [router]);

    React.useEffect(() => {
        if (!receiver) return;
        const unsubscribe = onSnapshot(
            query(
                collection(
                    db,
                    'users',
                    user.username,
                    'messages',
                    receiver.username,
                    'conversation'
                ),
                orderBy('timestamp', 'desc')
            ),
            (snapshot) => {
                setConversation(snapshot.docs);
            }
        );
        return () => unsubscribe();
    }, [receiver, db]);

    if (loading) return <p>Loading...</p>;
    if (session === null) {
        router.push('/auth/signin');
    }

    return (
        session && (
            <Layout>
                <Content>
                    <div
                        className={`${style.main_content} md:w-full lg:w-full sm:w-full xs:w-full flex mt-8 mb-5`}
                    >
                        <MessageUser user={user} />
                        <MessageChat
                            user={user}
                            receiver={receiver}
                            conversation={conversation}
                        />
                    </div>
                </Content>
            </Layout>
        )
    );
}
