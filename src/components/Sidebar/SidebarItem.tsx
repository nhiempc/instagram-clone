import Link from 'next/link';
import React from 'react';
import CreatePostModal from '../Modal/CreatePost';
import style from './Sidebar.module.css';

interface SidebarItemProps {
    icon: React.ReactNode;
    content: string;
    to?: string | undefined;
    type: string;
    btnAction?: string;
}

const SidebarItem: React.FunctionComponent<SidebarItemProps> = ({
    icon,
    content,
    to,
    type,
    btnAction
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClick = (e: any) => {
        if (e.currentTarget.id === 'create') {
            setIsOpen(!isOpen);
        }
    };
    const handleCloseCreatePostModal = () => {
        setIsOpen(!isOpen);
    };

    if (type === 'link' && to !== undefined) {
        return (
            <Link
                href={to}
                className={`${style.nav_item} flex items-center p-3`}
            >
                <div className={style.sidebar_icon}>{icon}</div>
                <div
                    className={`${style.sidebar_content} pl-4 lg:visible md:invisible sm:invisible`}
                >
                    {content}
                </div>
            </Link>
        );
    } else {
        return (
            <>
                <button
                    type='button'
                    id={btnAction}
                    onClick={handleClick}
                    className={`${style.nav_item} flex items-center p-3`}
                >
                    <div className={style.sidebar_icon}>{icon}</div>
                    <div
                        className={`${style.sidebar_content} pl-4 lg:visible md:invisible sm:invisible`}
                    >
                        {content}
                    </div>
                </button>
                <CreatePostModal
                    isOpen={isOpen}
                    handleClose={handleCloseCreatePostModal}
                    handleFinishUpload={handleCloseCreatePostModal}
                />
            </>
        );
    }
};

export default SidebarItem;
