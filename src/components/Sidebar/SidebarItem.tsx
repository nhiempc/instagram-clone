import Link from 'next/link';
import React from 'react';
import style from './Sidebar.module.css';

interface SidebarItemProps {
    icon: React.ReactNode;
    content: string;
    to: string;
}

const SidebarItem: React.FunctionComponent<SidebarItemProps> = ({
    icon,
    content,
    to
}) => {
    return (
        <Link href={to} className={`${style.nav_item} flex items-center p-3`}>
            <div className={style.sidebar_icon}>{icon}</div>
            <div
                className={`${style.sidebar_content} pl-4 lg:visible md:invisible sm:invisible`}
            >
                {content}
            </div>
        </Link>
    );
};

export default SidebarItem;
