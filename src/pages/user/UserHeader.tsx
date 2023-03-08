import React from 'react';
import { DocumentData } from 'firebase/firestore';
import style from './[username].module.css';
import { AddFollowIcon } from '@/assets/icons';

type UserHeaderProps = {
    user: DocumentData;
    usernameLogin: string;
    isFollow: boolean;
    postCount: number;
    followerCount: number;
    followCount: number;
    handleAddFollow: () => void;
    handleUnfollow: () => void;
};

const UserHeader: React.FunctionComponent<UserHeaderProps> = ({
    user,
    usernameLogin,
    isFollow,
    postCount,
    followerCount,
    followCount,
    handleAddFollow,
    handleUnfollow
}) => {
    const [userPost, setUserPost] = React.useState<DocumentData>();

    React.useEffect(() => {
        if (!user) return;
        setUserPost(user);
    }, [user]);

    return (
        <>
            <div className={`${style.headerWrapper} mb-11 flex w-full pt-8`}>
                <div
                    className={`${style.userAvatar} flex justify-center items-center w-1/3`}
                >
                    <img
                        src={userPost?.profileImg}
                        alt={userPost?.name}
                        className='rounded-full md:w-[150px] lg:w-[150px] sm:w-[77px]'
                    />
                </div>
                <div className={`${style.userInfo} flex flex-col w-2/3`}>
                    <div
                        className={`${style.header} flex items-center gap-5 mb-5`}
                    >
                        <div className={`${style.userName} text-[20px]`}>
                            {userPost?.username}
                        </div>
                        {userPost?.username === usernameLogin && (
                            <button
                                type='button'
                                className={`${style.secondaryBtn}`}
                            >
                                Chỉnh sửa trang cá nhân
                            </button>
                        )}
                        {userPost?.username !== usernameLogin && isFollow && (
                            <button
                                type='button'
                                className={`${style.secondaryBtn}`}
                                onClick={handleUnfollow}
                            >
                                <div className='flex items-center gap-[6px] text-[14px]'>
                                    Bỏ theo dõi
                                </div>
                            </button>
                        )}
                        {userPost?.username !== usernameLogin && !isFollow && (
                            <button
                                type='button'
                                className={`${style.primaryBtn}`}
                                onClick={handleAddFollow}
                            >
                                <div className='flex items-center gap-[6px]'>
                                    <AddFollowIcon
                                        width='20'
                                        height='20'
                                        color={'white'}
                                        fill={'white'}
                                    />{' '}
                                    Theo dõi
                                </div>
                            </button>
                        )}
                    </div>
                    <div
                        className={`${style.content} flex items-center gap-10 mb-5`}
                    >
                        <div
                            className={`${style.postCount} flex items-center gap-1 text-[16px]`}
                        >
                            <div className={`${style.value} font-semibold`}>
                                {postCount}
                            </div>
                            <div className={`${style.label}`}>bài viết</div>
                        </div>
                        <div
                            className={`${style.followerCount} flex items-center gap-1 text-[16px]`}
                        >
                            <div className={`${style.value} font-semibold`}>
                                {followerCount}
                            </div>
                            <div className={`${style.label}`}>
                                người theo dõi
                            </div>
                        </div>
                        <div
                            className={`${style.followCount} flex items-center gap-1 text-[16px]`}
                        >
                            <div className={`${style.label}`}>
                                Đang theo dõi
                            </div>
                            <div className={`${style.value} font-semibold`}>
                                {followCount}
                            </div>
                            <div className={`${style.label}`}>người dùng</div>
                        </div>
                    </div>
                    <div className={`${style.footer} font-medium`}>
                        {userPost?.name}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHeader;
