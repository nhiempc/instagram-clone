import Link from 'next/link';
import React from 'react';
import style from './Sidebar.module.css';
import { useSession } from 'next-auth/react';

interface SidebarUserProps {
    image: string;
    userName: string;
}

const SidebarUser: React.FunctionComponent<SidebarUserProps> = ({
    image,
    userName
}) => {
    const { data: session } = useSession();
    return (
        <Link
            href={`/${userName}`}
            className={`${style.nav_item} flex items-center p-3`}
        >
            <div className={style.sidebar_icon}>
                <img
                    className='rounded-full'
                    src={session?.user?.image || undefined}
                    alt='avatar'
                    width={25}
                    height={25}
                />
            </div>
            <div
                className={`${style.sidebar_content} pl-4 lg:block md:hidden sm:hidden xs:hidden`}
            >
                Trang cá nhân
            </div>
        </Link>
    );
};

export default SidebarUser;
