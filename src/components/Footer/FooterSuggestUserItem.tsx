import { IUser } from '@/models/IUser';
import React from 'react';
import style from './Footer.module.css';
import Link from 'next/link';

type FooterSuggestUserItemProps = {
    suggestUser: IUser;
};

const FooterSuggestUserItem: React.FunctionComponent<
    FooterSuggestUserItemProps
> = ({ suggestUser }) => {
    return (
        <div
            className={`${style.suggest_user_item} flex w-full items-center py-1`}
        >
            <Link
                href={`/${suggestUser.username}`}
                className={`${style.suggest_user_avatar}`}
            >
                <img
                    src={suggestUser.avatar}
                    alt={suggestUser.fullName}
                    className='rounded-full'
                />
            </Link>
            <div className={`${style.user_info} flex flex-col ml-5`}>
                <Link
                    href={`/${suggestUser.username}`}
                    className={`${style.username}`}
                >
                    {suggestUser.username}
                </Link>
                <div className={`${style.suggest_full_name}`}>
                    {suggestUser.fullName}
                </div>
            </div>
            <div className={`${style.follow}`}>
                <button className={`${style.btn}`}>Theo dõi</button>
            </div>
        </div>
    );
};

export default FooterSuggestUserItem;
