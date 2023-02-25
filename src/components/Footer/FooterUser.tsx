import Link from 'next/link';
import React from 'react';
import style from './Footer.module.css';
import { useSession, signOut } from 'next-auth/react';
import { removeVietnameseTones } from '@/common';

type FooterUserProps = {
    id: string;
    username: string;
    fullName: string;
    avatar: string;
};

const FooterUser: React.FunctionComponent = ({}) => {
    const { data: session } = useSession();

    const username = removeVietnameseTones(session?.user?.name as string)
        .split(' ')
        .join('')
        .toLowerCase();

    return (
        <div
            className={`${style.footer_user} flex w-full items-center mt-8 pt-6 mb-3`}
        >
            <Link href={`/${username}`} className={`${style.user_avatar}`}>
                <img
                    src={session?.user?.image || undefined}
                    alt={session?.user?.name || undefined}
                    className='rounded-full'
                />
            </Link>
            <div className={`${style.user_info} flex flex-col ml-5`}>
                <Link href={username}>{username}</Link>
                <div className={`${style.full_name}`}>
                    {session?.user?.name}
                </div>
            </div>
            <div className={`${style.switch_acc}`}>
                <button
                    onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                    className={`${style.btn}`}
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default FooterUser;
