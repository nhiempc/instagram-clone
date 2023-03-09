import React from 'react';
import style from './[postID].module.css';
import { DocumentData, serverTimestamp } from 'firebase/firestore';
import {
    CommentActiveIcon,
    EmojiIcon,
    LikeActiveIcon,
    LikedIcon,
    SaveActiveIcon,
    ShareActiveIcon
} from '@/assets/icons';
import { removeVietnameseTones, timestampToDate } from '@/common';
import { useSession } from 'next-auth/react';
import { useTypedDispatch } from '@/redux/store';
import {
    addCommentToPost,
    likePost,
    unLikePost,
    savePost,
    unSavePost
} from '@/redux/slices/post.slice';
import Picker, { EmojiStyle } from 'emoji-picker-react';

type PostFooterProps = {
    postId: string;
    isLike: boolean;
    isSave: boolean;
    listUserLike: DocumentData[];
    timestamp: number;
};

const PostFooter: React.FunctionComponent<PostFooterProps> = ({
    postId,
    isLike,
    isSave,
    listUserLike,
    timestamp
}) => {
    const [comment, setComment] = React.useState<string>('');
    const [usernameLogin, setUsernameLogin] = React.useState<string>('');
    const { data: session } = useSession();
    const typedDispatch = useTypedDispatch();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [showPicker, setShowPicker] = React.useState(false);

    const onEmojiClick = (emojiObject: any) => {
        setComment((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    React.useEffect(() => {
        if (session) {
            const usernameSession = removeVietnameseTones(
                session?.user?.name as string
            )
                .split(' ')
                .join('')
                .toLowerCase();
            setUsernameLogin(usernameSession);
        }
    }, [session]);

    const handleAddComment = async (e: any) => {
        e.preventDefault();
        const commentToSend = comment;
        if (!commentToSend) return;
        setComment('');
        const data = {
            comment: commentToSend,
            username: usernameLogin,
            userImage: session?.user?.image,
            timestamp: serverTimestamp()
        };
        typedDispatch(addCommentToPost(postId, data));
    };

    const handleClickLike = async () => {
        if (isLike) {
            typedDispatch(unLikePost(postId, usernameLogin));
        } else {
            typedDispatch(likePost(postId, usernameLogin));
        }
    };

    const handleClickSave = async () => {
        if (isSave) {
            typedDispatch(unSavePost(postId, usernameLogin));
        } else {
            typedDispatch(savePost(postId, usernameLogin));
        }
    };

    const handleClickCommentIcon = () => {
        if (inputRef.current !== null) {
            inputRef?.current.focus();
        }
    };

    return (
        <>
            <div className={`${style.footerWrapper} flex flex-col pt-4 pb-2`}>
                <div className={`${style.interact} flex items-center px-4`}>
                    <div
                        className={`${style.interact_left} flex items-center my-1`}
                    >
                        <button
                            className={`${style.btn_like} ${style.btn}`}
                            onClick={handleClickLike}
                        >
                            {isLike ? <LikedIcon /> : <LikeActiveIcon />}
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
                        <button
                            className={`${style.btn_save} ${style.btn}`}
                            onClick={handleClickSave}
                        >
                            {isSave ? (
                                <SaveActiveIcon polygonFill='black' />
                            ) : (
                                <SaveActiveIcon />
                            )}
                        </button>
                    </div>
                </div>
                {listUserLike && listUserLike.length === 0 ? (
                    <div className='likeCount py-2 px-4'>
                        <p className='text-[14px]'>
                            Hãy là người đầu tiên{' '}
                            <span
                                onClick={handleClickLike}
                                className='font-semibold cursor-pointer'
                            >
                                thích bài viết này
                            </span>
                        </p>
                    </div>
                ) : (
                    <div className='likeCount py-2 px-4'>
                        <p className='text-[14px]'>
                            <span className='font-semibold cursor-pointer'>
                                {listUserLike && listUserLike.length} lượt thích
                            </span>
                        </p>
                    </div>
                )}
                <div
                    className={`${style.timeAgo} text-[10px] uppercase pb-3 px-4`}
                >
                    {timestampToDate(timestamp * 1000)}
                </div>
                <div className='addComment flex justify-between px-4 pt-4 pb-2'>
                    <div className='emojiIcon cursor-pointer pr-3'>
                        <button
                            type='button'
                            className='addEmojiBtn'
                            onClick={() => setShowPicker((val) => !val)}
                        >
                            <EmojiIcon width='24' height='24' />
                        </button>
                        {showPicker && (
                            <div className='emojiPiker'>
                                <Picker
                                    emojiStyle={EmojiStyle.FACEBOOK}
                                    width={'100%'}
                                    onEmojiClick={onEmojiClick}
                                />
                            </div>
                        )}
                    </div>
                    <div className={`${style.inputCmt}`}>
                        <input
                            type='text'
                            placeholder='Thêm bình luận...'
                            value={comment}
                            ref={inputRef}
                            onChange={(e) => setComment(e.target.value)}
                            className='focus:outline-none focus:border-none text-[14px] font-medium'
                        />
                    </div>
                    <div
                        className={`${style.addCmtBtn} text-[14px] font-medium`}
                    >
                        <button
                            type='button'
                            onClick={(e) => handleAddComment(e)}
                        >
                            Đăng
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostFooter;
