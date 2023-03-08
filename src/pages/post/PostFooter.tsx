import React from 'react';
import style from './[postID].module.css';
import { DocumentData } from 'firebase/firestore';
import {
    CommentActiveIcon,
    EmojiIcon,
    LikeActiveIcon,
    LikedIcon,
    SaveActiveIcon,
    ShareActiveIcon
} from '@/assets/icons';

type PostFooterProps = {
    postData: DocumentData | undefined;
};

const PostFooter: React.FunctionComponent<any> = ({ postData }) => {
    const [hasLike, setHasLike] = React.useState<boolean>(false);
    const [likeCount, setLikeCount] = React.useState<number>(0);

    const handleClickLike = () => {};

    const handleClickCommentIcon = () => {};

    return (
        postData && (
            <div className={`${style.footerWrapper} flex flex-col pt-4 pb-2`}>
                <div className={`${style.interact} flex items-center px-4`}>
                    <div
                        className={`${style.interact_left} flex items-center my-1`}
                    >
                        <button
                            className={`${style.btn_like} ${style.btn}`}
                            onClick={handleClickLike}
                        >
                            {hasLike ? <LikedIcon /> : <LikeActiveIcon />}
                        </button>
                        <button
                            className={`${style.btn_comment} ${style.btn}`}
                            onClick={handleClickCommentIcon}
                        >
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
                {likeCount === 0 ? (
                    <div className='likeCount py-2 px-4'>
                        <p className='text-[14px]'>
                            Hãy là người đầu tiên{' '}
                            <span className='font-semibold cursor-pointer'>
                                thích bài viết này
                            </span>
                        </p>
                    </div>
                ) : (
                    <div className='likeCount py-2 px-4'>
                        <p className='text-[14px]'>
                            Hãy là người đầu tiên{' '}
                            <span className='font-semibold cursor-pointer'>
                                thích bài viết này
                            </span>
                        </p>
                    </div>
                )}
                <div
                    className={`${style.timeAgo} text-[10px] uppercase pb-3 px-4`}
                >
                    Tháng 9 30, 2019
                </div>
                <div className='addComment flex justify-between px-4 pt-4 pb-2'>
                    <div className='emojiIcon cursor-pointer pr-3'>
                        <EmojiIcon />
                    </div>
                    <div className={`${style.inputCmt}`}>
                        <input
                            type='text'
                            placeholder='Thêm bình luận...'
                            className='focus:outline-none focus:border-none text-[14px] font-medium'
                        />
                    </div>
                    <div
                        className={`${style.addCmtBtn} text-[14px] font-medium`}
                    >
                        <button type='button'>Đăng</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default PostFooter;
