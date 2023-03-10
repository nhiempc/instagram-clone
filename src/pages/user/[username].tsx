import Content from '@/components/Content';
import Layout from '@/components/Layout';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import UserHeader from './UserHeader';
import { removeVietnameseTones } from '@/common';
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';
import { db } from '../../../firebase';
import UserContent from './UserContent';
import { useTypedDispatch } from '@/redux/store';
import { addFollow, unFollow } from '@/redux/slices/user.slice';

export default function UserPage() {
    const { data: session, status } = useSession();

    const [usernameLogin, setUsernameLogin] = React.useState<string>('');
    const [user, setUser] = React.useState<DocumentData | undefined>();
    const [isFollow, setIsFollow] = React.useState<boolean>(false);
    const [postCount, setPostCount] = React.useState<number>(0);
    const [followerCount, setFollowerCount] = React.useState<number>(0);
    const [followCount, setFollowCount] = React.useState<number>(0);
    const [savedPost, setSavedPost] = React.useState<
        (DocumentData | undefined)[]
    >([]);

    const router = useRouter();
    const username = router.query.username;
    const typedDispatch = useTypedDispatch();

    React.useEffect(() => {
        if (!username) return;
        if (typeof username === 'object') return;
        if (!usernameLogin) return;
        if (!session) return;

        const followRef = doc(db, 'users', usernameLogin, 'follow', username);

        const checkFollow = async () => {
            const docSnap = await getDoc(followRef);
            if (docSnap.exists()) {
                setIsFollow(true);
            } else {
                setIsFollow(false);
            }
        };
        checkFollow();
    }, [db, session, usernameLogin]);

    React.useEffect(() => {
        if (!username) return;
        if (typeof username === 'object') return;
        if (!usernameLogin) return;
        if (!session) return;

        const unsub = onSnapshot(
            collection(db, 'users', username, 'save'),
            (snapshot) => {
                const result = snapshot.docs.map(async (d) => {
                    const postId = d.data().postId;
                    const postRef = doc(db, 'posts', postId);
                    const res = await getDoc(postRef);
                    return res;
                });
                Promise.all(result).then((value) => {
                    if (username === usernameLogin) {
                        setSavedPost(value);
                    } else {
                        setSavedPost([]);
                    }
                });
            }
        );
        return () => unsub();
    }, [usernameLogin, username, db]);

    React.useEffect(() => {
        if (!username) return;
        if (typeof username === 'object') return;
        onSnapshot(
            collection(db, 'users', username, 'follower'),
            (snapshot) => {
                setFollowerCount(snapshot.docs.length);
            }
        );
    }, [db, session, usernameLogin]);

    React.useEffect(() => {
        if (!username) return;
        if (typeof username === 'object') return;
        onSnapshot(collection(db, 'users', username, 'follow'), (snapshot) => {
            setFollowCount(snapshot.docs.length);
        });
    }, [db, session, usernameLogin]);

    React.useEffect(() => {
        if (!username) return;
        if (typeof username === 'object') return;
        onSnapshot(
            query(collection(db, 'posts'), where('username', '==', username)),
            (snapshot) => {
                setPostCount(snapshot.docs.length);
            }
        );
    }, [db, session, usernameLogin]);

    React.useEffect(() => {
        if (session) {
            const usernameSession = removeVietnameseTones(
                session?.user?.name as string
            )
                .split(' ')
                .join('')
                .toLowerCase();
            setUsernameLogin(usernameSession);
        }
    }, [session]);

    React.useEffect(() => {
        const getuserInfo = async (username: string | string[] | undefined) => {
            if (!username) return;
            if (typeof username === 'object') return;
            const userRef = doc(db, 'users', username);
            const res = await getDoc(userRef);
            setUser(res.data());
        };

        getuserInfo(username);
    }, [session]);

    const handleAddFollow = () => {
        typedDispatch(addFollow(usernameLogin, username));
        setIsFollow(!isFollow);
    };

    const handleUnfollow = () => {
        typedDispatch(unFollow(usernameLogin, username));
        setIsFollow(!isFollow);
    };

    const loading = status === 'loading';

    if (loading) return <p>Loading...</p>;
    if (session === null) {
        router.push('/auth/signin');
    }

    return (
        session && (
            <Layout>
                <Content>
                    <div className='main_content w-full'>
                        {user && (
                            <>
                                <UserHeader
                                    user={user}
                                    usernameLogin={usernameLogin}
                                    isFollow={isFollow}
                                    postCount={postCount}
                                    followerCount={followerCount}
                                    followCount={followCount}
                                    handleAddFollow={handleAddFollow}
                                    handleUnfollow={handleUnfollow}
                                />
                                <UserContent
                                    user={user}
                                    savedPost={savedPost}
                                />
                            </>
                        )}
                    </div>
                </Content>
            </Layout>
        )
    );
}
