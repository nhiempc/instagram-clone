import Link from 'next/link';
import React from 'react';
import style from './Footer.module.css';

type FooterUserProps = {
    id: string;
    username: string;
    fullName: string;
    avatar: string;
};

const FooterUser: React.FunctionComponent<FooterUserProps> = ({
    id,
    username,
    fullName,
    avatar
}) => {
    return (
        <div
            className={`${style.footer_user} flex w-full items-center mt-8 pt-6 mb-3`}
        >
            <Link href={`/${username}`} className={`${style.user_avatar}`}>
                <img src={avatar} alt={fullName} className='rounded-full' />
            </Link>
            <div className={`${style.user_info} flex flex-col ml-5`}>
                <Link href={`/${username}`} className={`${style.username}`}>
                    {username}
                </Link>
                <div className={`${style.full_name}`}>{fullName}</div>
            </div>
            <div className={`${style.switch_acc}`}>
                <button className={`${style.btn}`}>Chuyển</button>
            </div>
        </div>
    );
};

export default FooterUser;
