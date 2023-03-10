import Image from 'next/image';
import React from 'react';
import images from '@/assets/images';
import { menu, removeVietnameseTones, setting } from '@/common';
import SidebarItem from './SidebarItem';
import style from './Sidebar.module.css';
import Link from 'next/link';
import SidebarUser from './SidebarUser';
import { useSession } from 'next-auth/react';

const Sidebar: React.FunctionComponent = () => {
    const { data: session } = useSession();

    const username = removeVietnameseTones(session?.user?.name as string)
        .split(' ')
        .join('')
        .toLowerCase();
    return (
        <div
            className={`${style.sidebar_wrapper} flex flex-col w-fit lg:w-1/6 px-3 pt-2 pb-5`}
        >
            <div
                className={`${style.wrapper} flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100`}
            >
                <Link
                    href={'/'}
                    className={`${style.logo} flex justify-center pt-6 pb-4 px-3`}
                >
                    <picture>
                        <source
                            type='image/svg+xml'
                            media='(min-width: 1024px)'
                            srcSet={images.logo.src}
                            width={images.logo.width}
                            height={images.logo.height}
                        />
                        <source
                            type='image/svg+xml'
                            media='(min-width: 768px)'
                            srcSet={images.logo2.src}
                            width={images.logo2.width}
                            height={images.logo2.height}
                        />
                        <source
                            type='image/svg+xml'
                            media='(min-width: 640px)'
                            srcSet={images.logo2.src}
                            width={images.logo2.width}
                            height={images.logo2.height}
                        />
                        <source
                            type='image/svg+xml'
                            media='(min-width: 0px)'
                            srcSet={images.logo2.src}
                            width={images.logo2.width}
                            height={images.logo2.height}
                        />
                        <Image
                            src={images.logo}
                            alt='logo'
                            priority
                            width={images.logo.width}
                            height={images.logo.height}
                        />
                    </picture>
                </Link>
                {menu.map((item, index) => (
                    <SidebarItem
                        key={index}
                        icon={item.icon}
                        content={item.content}
                        to={item.to}
                        type={item.type}
                        btnAction={item.btnAction}
                    />
                ))}
                <SidebarUser
                    image={images.avatar.default.src}
                    userName={username}
                />
                <div className={`${style.setting_area} w-full`}>
                    <SidebarItem
                        key={'setting'}
                        icon={setting.icon}
                        to={setting.to}
                        content={setting.content}
                        type={setting.type}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
