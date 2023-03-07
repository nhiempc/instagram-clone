import Link from 'next/link';
import React from 'react';
import style from './LikeCountModal.module.css';

type UserLikeItemProps = {
    userLike: any;
};

const UserLikeItem: React.FunctionComponent<UserLikeItemProps> = ({
    userLike
}) => {
    return (
        <div
            className={`${style.userLikeWrapper} flex w-full items-center justify-between px-4 py-4`}
        >
            <div className={`${style.user} flex items-center`}>
                <div className={`${style.userLikeImg} w-[44px] h-[44px] mr-3`}>
                    <Link href={`user/${userLike.username}`}>
                        <img
                            className='rounded-full'
                            src={userLike.profileImg}
                            alt={userLike.username}
                        />
                    </Link>
                </div>
                <div className={`${style.userLikeInfo} flex flex-col`}>
                    <Link href={`user/${userLike.username}`}>
                        <span className='font-medium'>{userLike.username}</span>
                    </Link>
                    <p className='text-gray-500'>{userLike.name}</p>
                </div>
            </div>
            <div className={`${style.btnFollow} pr-4`}>
                <button
                    className='rounded-lg py-[5px] px-4 text-[14px]'
                    type='button'
                >
                    Theo dõi
                </button>
            </div>
        </div>
    );
};

export default UserLikeItem;
