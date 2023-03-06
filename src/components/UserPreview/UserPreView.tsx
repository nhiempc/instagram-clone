import { AddFollowIcon, MessengerIcon } from '@/assets/icons';
import { removeVietnameseTones } from '@/common';
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDoc,
    onSnapshot,
    query,
    setDoc,
    where
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { db } from '../../../firebase';
import Link from 'next/link';
import React from 'react';
import style from './UserPreview.module.css';

type UserPreviewProps = {
    username: string;
};

const UserPreview: React.FunctionComponent<UserPreviewProps> = ({
    username
}) => {
    const { data: session } = useSession();
    const [user, setUser] = React.useState<DocumentData>();
    const [postCount, setPostCount] = React.useState<number>(0);
    const [followerCount, setFollowerCount] = React.useState<number>(0);
    const [followCount, setFollowCount] = React.useState<number>(0);
    const [isFollow, setIsFollow] = React.useState<boolean>(false);

    const usernamesession = removeVietnameseTones(session?.user?.name as string)
        .split(' ')
        .join('')
        .toLowerCase();

    React.useEffect(() => {
        const getuserInfo = async (username: string) => {
            const userRef = doc(db, 'users', username);
            const res = await getDoc(userRef);
            setUser(res.data());
        };

        getuserInfo(username);
    }, [db]);

    React.useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, 'posts'),
                    where('username', '==', username)
                ),
                (snapshot) => {
                    setPostCount(snapshot.docs.length);
                }
            ),
        [db]
    );

    React.useEffect(() => {
        const followRef = doc(db, 'users', usernamesession, 'follow', username);
        const checkFollow = async () => {
            const docSnap = await getDoc(followRef);
            if (docSnap.exists()) {
                setIsFollow(true);
            } else {
                setIsFollow(false);
            }
        };
        checkFollow();
    }, [db, username, followerCount]);

    React.useEffect(
        () =>
            onSnapshot(
                collection(db, 'users', username, 'follower'),
                (snapshot) => {
                    setFollowerCount(snapshot.docs.length);
                }
            ),
        [db]
    );

    React.useEffect(
        () =>
            onSnapshot(
                collection(db, 'users', username, 'follow'),
                (snapshot) => {
                    setFollowCount(snapshot.docs.length);
                }
            ),
        [db]
    );

    const handleAddFollow = async () => {
        await setDoc(doc(db, 'users', usernamesession, 'follow', username), {
            username: username
        });
        await setDoc(doc(db, 'users', username, 'follower', usernamesession), {
            username: usernamesession
        });
    };

    const handleUnfollow = async () => {
        await deleteDoc(doc(db, 'users', usernamesession, 'follow', username));
        await deleteDoc(
            doc(db, 'users', username, 'follower', usernamesession)
        );
    };

    return (
        <div className={`${style.wrapper}`}>
            <div className={`${style.header}`}>
                <div className={`${style.user} flex w-full items-center`}>
                    <Link
                        href={`/${user?.username}`}
                        className={`${style.user_avatar}`}
                    >
                        <img
                            src={user?.profileImg || undefined}
                            alt={user?.username}
                            className='rounded-full'
                        />
                    </Link>
                    <div className={`${style.user_info} flex flex-col ml-5`}>
                        <Link href={`/${user?.username}`}>
                            {user?.username}
                        </Link>
                        <div className={`${style.full_name}`}>{user?.name}</div>
                    </div>
                </div>
            </div>
            <div className={`${style.body} flex justify-between gap-10`}>
                <div
                    className={`${style.postCount} flex flex-col items-center`}
                >
                    <span className='font-bold text-[16px]'>{postCount}</span>
                    <span className='font-normal text-[14px]'>bài viết</span>
                </div>
                <div
                    className={`${style.followerCount} flex flex-col items-center`}
                >
                    <span className='font-bold text-[16px]'>
                        {followerCount}
                    </span>
                    <span className='font-normal text-[14px]'>
                        người theo dõi
                    </span>
                </div>
                <div
                    className={`${style.followerCount} flex flex-col items-center`}
                >
                    <span className='font-bold text-[16px]'>{followCount}</span>
                    <span className='font-normal text-[14px]'>
                        đang theo dõi
                    </span>
                </div>
            </div>
            <div className='recentPost flex gap-1 pt-4 cursor-pointer'>
                <img src='https://picsum.photos/120' alt='post 1' />
                <img src='https://picsum.photos/120' alt='post 2' />
                <img src='https://picsum.photos/120' alt='post 3' />
            </div>
            <div className={`${style.footer} flex justify-between gap-2 pt-4`}>
                {usernamesession !== username && isFollow === true ? (
                    <>
                        <button
                            type='button'
                            className={`${style.mesageBtn} text-white justify-center flex`}
                        >
                            <Link href={'/message'}>
                                <div className='flex items-center gap-[6px]'>
                                    <MessengerIcon
                                        width='16'
                                        height='16'
                                        color={'white'}
                                        fill={'white'}
                                    />{' '}
                                    Nhắn tin
                                </div>
                            </Link>
                        </button>
                        <button
                            type='button'
                            onClick={handleUnfollow}
                            className={`${style.followingBtn} text-white flex justify-center`}
                        >
                            Đang theo dõi
                        </button>
                    </>
                ) : usernamesession !== username && isFollow === false ? (
                    <button
                        type='button'
                        className={`${style.mesageBtn} text-white justify-center flex`}
                    >
                        <div
                            className='flex items-center gap-[6px]'
                            onClick={handleAddFollow}
                        >
                            <AddFollowIcon
                                width='20'
                                height='20'
                                color={'white'}
                                fill={'white'}
                            />{' '}
                            Theo dõi
                        </div>
                    </button>
                ) : (
                    <button
                        type='button'
                        className={`${style.followingBtn} text-white flex justify-center`}
                    >
                        Chỉnh sửa trang cá nhân
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserPreview;
