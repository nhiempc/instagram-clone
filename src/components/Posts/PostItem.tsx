import React, { useState } from 'react';
import style from './Posts.module.css';
import {
    CommentActiveIcon,
    LikeActiveIcon,
    MoreOptionIcon,
    SaveActiveIcon,
    ShareActiveIcon
} from '@/assets/icons';
import Link from 'next/link';

type PostItemProps = {
    id: string;
    username: string;
    avatar: string;
    image: string;
    content: string;
    createdAt: string;
};

const PostItem: React.FunctionComponent<PostItemProps> = ({
    id,
    username,
    avatar,
    image,
    content,
    createdAt
}) => {
    const [comment, setComment] = useState('');
    const handleChange = (e: any) => {
        setComment(e.target.value);
    };
    return (
        <div className={`${style.post_item} flex flex-col`}>
            <div className={`${style.post_header} flex items-center`}>
                <div className={`${style.post_header_left} my-3 mx-1`}>
                    <div className={`${style.user} flex items-center`}>
                        <Link href={`/${username}`}>
                            <img
                                src={avatar}
                                alt={username}
                                className='rounded-full w-[32px] h-[32px]'
                            />
                        </Link>
                        <div className={`${style.username}`}>
                            <Link href={`/${username}`}>{username}</Link>
                        </div>
                        <span>•</span>
                        <div className={`${style.time}`}>{createdAt}</div>
                    </div>
                </div>
                <div className={`${style.post_header_right}`}>
                    <MoreOptionIcon />
                </div>
            </div>
            <div className={`${style.post_img}`}>
                <img src={image} alt={content} />
            </div>
            <div className={`${style.post_content}`}>
                <div className={`${style.interact} flex items-center`}>
                    <div
                        className={`${style.interact_left} flex items-center my-1`}
                    >
                        <button className={`${style.btn_like} ${style.btn}`}>
                            <LikeActiveIcon />
                        </button>
                        <button className={`${style.btn_comment} ${style.btn}`}>
                            <CommentActiveIcon />
                        </button>
                        <button className={`${style.btn_share} ${style.btn}`}>
                            <ShareActiveIcon />
                        </button>
                    </div>
                    <div className={`${style.interact_right}`}>
                        <button className={`${style.btn_save} ${style.btn}`}>
                            <SaveActiveIcon />
                        </button>
                    </div>
                </div>
                <div className={`${style.like_count} mx-2`}>
                    3.906 lượt thích
                </div>
                <div className={`${style.post_caption} mx-2`}>
                    <span className={`${style.username_2}`}>
                        <Link href={`/${username}`}>{username}</Link>
                    </span>
                    {content}
                </div>
            </div>
            <div className={`${style.add_comment} w-full mt-2 mx-2`}>
                <form action='' className='flex items-center gap-2'>
                    <textarea
                        name='add_comment'
                        id='add_comment'
                        placeholder='Thêm bình luận...'
                        value={comment}
                        onChange={handleChange}
                    ></textarea>
                    {comment && (
                        <button className={`${style.post_comment}`}>
                            Đăng
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostItem;
