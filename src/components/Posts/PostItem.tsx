import React, { useState } from 'react';
import style from './Posts.module.css';
import {
    CommentActiveIcon,
    EmojiIcon,
    LikeActiveIcon,
    LikedIcon,
    MoreOptionIcon,
    SaveActiveIcon,
    ShareActiveIcon
} from '@/assets/icons';
import Link from 'next/link';
import { removeVietnameseTones, TimeAgo } from '@/common';
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp
} from 'firebase/firestore';
import PostComments from './PostComments';
import { db } from '../../../firebase';
import { useSession } from 'next-auth/react';
import PersonalModal from '../Modal/Personal/PersonalModal';
import PublicModal from '../Modal/Public/PublicModal';
import Picker, { EmojiStyle } from 'emoji-picker-react';
import LikeCountModal from '../Modal/LikeCount/LikeCountModal';
import { useTypedDispatch } from '@/redux/store';
import {
    addCommentToPost,
    deletePost,
    likePost,
    unLikePost
} from '@/redux/slices/post.slice';
import EditPostModal from '../Modal/EditPost/EditPostModal';

type PostItemProps = {
    post: DocumentData;
};

const PostItem: React.FunctionComponent<PostItemProps> = ({ post }) => {
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<DocumentData[] | undefined>();
    const [likeCount, setLikeCount] = useState<number>(0);
    const [isOpenLikeCountModal, setIsOpenLikeCountModal] =
        React.useState(false);
    const [isOpenEditPostModal, setIsOpenEditPostModal] = React.useState(false);
    const [isOpenPersonalModal, setIsOpenPersonalModal] = React.useState(false);
    const [isOpenPublicModal, setIsOpenPublicModal] = React.useState(false);
    const [hasLike, setHasLike] = useState<boolean>();
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (emojiObject: any) => {
        setComment((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const typedDispatch = useTypedDispatch();
    const { data: session } = useSession();
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const username = removeVietnameseTones(session?.user?.name as string)
        .split(' ')
        .join('')
        .toLowerCase();

    const handleChange = (e: any) => {
        setComment(e.target.value);
    };

    const handleClickCommentIcon = () => {
        if (inputRef.current !== null) {
            inputRef?.current.focus();
        }
    };

    const handleAddComment = async (e: any) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment('');
        const data = {
            comment: commentToSend,
            username: username,
            userImage: session?.user?.image,
            timestamp: serverTimestamp()
        };
        typedDispatch(addCommentToPost(post.id, data));
    };

    const handleViewMoreBtnClick = () => {
        post.data().username === username
            ? setIsOpenPersonalModal(!isOpenPersonalModal)
            : setIsOpenPublicModal(!isOpenPublicModal);
    };

    const handleClosePersonalModal = () => {
        setIsOpenPersonalModal(!isOpenPersonalModal);
    };
    const handleClosePublicModal = () => {
        setIsOpenPublicModal(!isOpenPublicModal);
    };
    const handleCloseEditPostModal = () => {
        setIsOpenEditPostModal(!isOpenEditPostModal);
        setIsOpenPersonalModal(!isOpenPersonalModal);
    };
    const handleShowLikeCount = () => {
        setIsOpenLikeCountModal(!isOpenLikeCountModal);
    };

    const handleCloseLikeCount = () => {
        setIsOpenLikeCountModal(!isOpenLikeCountModal);
    };

    const handleDeletePost = async () => {
        typedDispatch(deletePost(post.id));
        setIsOpenPersonalModal(!isOpenPersonalModal);
    };

    const handleEditPost = () => {
        setIsOpenEditPostModal(!isOpenEditPostModal);
    };

    React.useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, 'posts', post.id, 'comments'),
                    orderBy('timestamp', 'desc')
                ),
                (snapshot) => {
                    setComments(snapshot.docs);
                }
            ),
        [db]
    );

    React.useEffect(
        () =>
            onSnapshot(
                collection(db, 'posts', post.id, 'likes'),
                (snapshot) => {
                    setLikeCount(snapshot.docs.length);
                }
            ),
        [db, post.id]
    );

    React.useEffect(() => {
        const likeRef = doc(db, 'posts', post.id, 'likes', username);
        const checkLike = async () => {
            const docSnap = await getDoc(likeRef);
            if (docSnap.exists()) {
                setHasLike(true);
            } else {
                setHasLike(false);
            }
        };
        checkLike();
    }, [likeCount, db]);

    const handleClickLike = async () => {
        if (hasLike) {
            typedDispatch(unLikePost(post.id, username));
        } else {
            typedDispatch(likePost(post.id, username));
        }
    };

    const ago = TimeAgo.inWords(
        post.data().timestamp !== null
            ? Number(post.data().timestamp.seconds) * 1000
            : new Date().getTime()
    );

    return (
        <div className={`${style.post_item} flex flex-col`}>
            <div className={`${style.post_header} flex items-center`}>
                <div className={`${style.post_header_left} my-3 mx-1`}>
                    <div className={`${style.user} flex items-center`}>
                        <Link href={`/${post.data().username}`}>
                            <img
                                src={post.data().profileImg}
                                alt={post.data().username}
                                className='rounded-full w-[32px] h-[32px]'
                            />
                        </Link>
                        <div className={`${style.username}`}>
                            <Link href={`/${post.data().username}`}>
                                {post.data().username}
                            </Link>
                        </div>
                        <span>•</span>
                        <div className={`${style.time}`}>{ago}</div>
                    </div>
                </div>
                <div className={`${style.post_header_right}`}>
                    <button type='button' onClick={handleViewMoreBtnClick}>
                        <MoreOptionIcon />
                        {post.data().username === username ? (
                            <PersonalModal
                                isOpen={isOpenPersonalModal}
                                handleCancel={handleClosePersonalModal}
                                handleDelete={handleDeletePost}
                                handleEdit={handleEditPost}
                            />
                        ) : (
                            <PublicModal
                                isOpen={isOpenPublicModal}
                                handleCancel={handleClosePublicModal}
                            />
                        )}
                    </button>
                </div>
            </div>
            <div className={`${style.post_img}`}>
                <img src={post.data().image} alt={post.data().caption} />
            </div>
            <div className={`${style.post_content}`}>
                <div className={`${style.interact} flex items-center`}>
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
                <div
                    className={`${style.like_count} mx-2 my-1 cursor-pointer`}
                    onClick={handleShowLikeCount}
                >
                    {likeCount} lượt thích
                </div>
                <LikeCountModal
                    isOpen={isOpenLikeCountModal}
                    handleClose={handleCloseLikeCount}
                    postId={post.id}
                />
                <EditPostModal
                    isOpen={isOpenEditPostModal}
                    handleClose={handleCloseEditPostModal}
                    postId={post.id}
                />
                <div className={`${style.comment_count} mx-2`}>
                    {comments?.length} lượt bình luận
                </div>
                <div className={`${style.post_caption} mx-2`}>
                    <span className={`${style.username_2}`}>
                        <Link href={`/${post.data().username}`}>
                            {post.data().username}
                        </Link>
                    </span>
                    {post.data().caption}
                </div>
                <PostComments comments={comments} />
            </div>
            <div className={`${style.add_comment} w-full mt-2 mx-2`}>
                <form action='' className='flex items-center gap-2'>
                    <textarea
                        ref={inputRef}
                        name='add_comment'
                        id='add_comment'
                        placeholder='Thêm bình luận...'
                        value={comment}
                        onChange={handleChange}
                    ></textarea>

                    <div className='flex gap-2 items-center cursor-pointer'>
                        {comment && (
                            <button
                                onClick={handleAddComment}
                                className={`${style.post_comment_btn}`}
                            >
                                Đăng
                            </button>
                        )}
                        <div className='addEmojiWrapper relative'>
                            <button
                                type='button'
                                className='addEmojiBtn align-middle'
                                onClick={() => setShowPicker((val) => !val)}
                            >
                                <EmojiIcon width='16' height='16' />
                            </button>
                            {showPicker && (
                                <div className='emojiPiker absolute top-[-450px] left-0 z-10'>
                                    <Picker
                                        emojiStyle={EmojiStyle.FACEBOOK}
                                        width={'100%'}
                                        onEmojiClick={onEmojiClick}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostItem;
