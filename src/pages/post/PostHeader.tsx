import React from 'react';
import style from './[postID].module.css';
import Tippy from '@tippyjs/react/headless';
import Popper from '@/components/Popper';
import UserPreview from '@/components/UserPreview';
import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { removeVietnameseTones } from '@/common';
import { MoreOptionIcon } from '@/assets/icons';
import PersonalModal from '@/components/Modal/Personal/PersonalModal';
import PublicModal from '@/components/Modal/Public/PublicModal';
import { useTypedDispatch } from '@/redux/store';
import { deletePost } from '@/redux/slices/post.slice';

type PostHeaderProps = {
    postData: DocumentData;
};

const PostHeader: React.FunctionComponent<PostHeaderProps> = ({ postData }) => {
    const { data: session } = useSession();
    const [isOpenPersonalModal, setIsOpenPersonalModal] = React.useState(false);
    const [isOpenPublicModal, setIsOpenPublicModal] = React.useState(false);
    const [isOpenEditPostModal, setIsOpenEditPostModal] = React.useState(false);

    const username = removeVietnameseTones(session?.user?.name as string)
        .split(' ')
        .join('')
        .toLowerCase();
    const renderPreview = (props: any) => {
        return (
            <div tabIndex='-1' {...props}>
                <Popper>
                    <UserPreview username={postData.username} />
                </Popper>
            </div>
        );
    };

    const handleViewMoreBtnClick = () => {
        postData.username === username
            ? setIsOpenPersonalModal(!isOpenPersonalModal)
            : setIsOpenPublicModal(!isOpenPublicModal);
    };
    const handleClosePersonalModal = () => {
        setIsOpenPersonalModal(!isOpenPersonalModal);
    };
    const handleDeletePost = async () => {
        // useTypedDispatch(deletePost());
        setIsOpenPersonalModal(!isOpenPersonalModal);
    };
    const handleEditPost = () => {
        setIsOpenEditPostModal(!isOpenEditPostModal);
    };
    const handleHideLike = async () => {
        // await updateDoc(doc(db, 'posts', post.id), {
        //     showLike: !post.data().showLike
        // });
        // setShowLike(!showLike);
        // setIsOpenPersonalModal(!isOpenPersonalModal);
    };
    const handleHideComment = async () => {
        // await updateDoc(doc(db, 'posts', post.id), {
        //     showComment: !post.data().showComment
        // });
        // setShowComment(!showComment);
        // setIsOpenPersonalModal(!isOpenPersonalModal);
    };
    const handleClosePublicModal = () => {
        setIsOpenPublicModal(!isOpenPublicModal);
    };
    return (
        <div
            className={`${style.post_header} flex items-center justify-between px-4`}
        >
            <div>
                <Tippy
                    interactive
                    delay={[800, 0]}
                    offset={[-50, 0]}
                    placement='bottom'
                    render={renderPreview}
                >
                    <div className={`${style.post_header_left} my-3 mx-1`}>
                        <div className={`${style.user} flex items-center`}>
                            <Link
                                href={{
                                    pathname: `user/${postData.username}`,
                                    query: {
                                        username: postData.username
                                    }
                                }}
                            >
                                <img
                                    src={postData.profileImg}
                                    alt={postData.username}
                                    className='rounded-full w-[32px] h-[32px]'
                                />
                            </Link>
                            <div className={`${style.username}`}>
                                <Link href={`user/${postData.username}`}>
                                    {postData.username}
                                </Link>
                            </div>
                        </div>
                    </div>
                </Tippy>
            </div>
            <div className={`${style.post_header_right}`}>
                <button type='button' onClick={handleViewMoreBtnClick}>
                    <MoreOptionIcon />
                    {postData.username === username ? (
                        <PersonalModal
                            isOpen={isOpenPersonalModal}
                            handleCancel={handleClosePersonalModal}
                            handleDelete={handleDeletePost}
                            handleEdit={handleEditPost}
                            handleHideLike={handleHideLike}
                            handleHideComment={handleHideComment}
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
    );
};

export default PostHeader;
