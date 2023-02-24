import Image from 'next/image';
import React from 'react';
import images from '@/assets/images';
import { menu, setting } from '@/common';
import SidebarItem from './SidebarItem';
import style from './Sidebar.module.css';
import Link from 'next/link';
import SidebarUser from './SidebarUser';

const Sidebar: React.FunctionComponent = () => {
    return (
        <div
            className={`${style.sidebar_wrapper} flex flex-col w-1/6 px-3 pt-2 pb-5`}
        >
            <Link href={'/'} className='logo pt-6 pb-4 px-3'>
                <Image src={images.logo} alt='logo' priority />
            </Link>
            {menu.map((item, index) => (
                <SidebarItem
                    key={index}
                    icon={item.icon}
                    content={item.content}
                    to={item.to}
                />
            ))}
            <SidebarUser image={images.avatar.default.src} userName='nhiempc' />
            <div className={`${style.setting_area} w-full px-3`}>
                <SidebarItem
                    key={'setting'}
                    icon={setting.icon}
                    to={setting.to}
                    content={setting.content}
                />
            </div>
        </div>
    );
};

export default Sidebar;
