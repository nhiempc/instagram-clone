import React from 'react';
import style from './[postID].module.css';
import { deleteDoc, doc, DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { removeVietnameseTones } from '@/common';
import { db } from '../../../firebase';

type PostCommentProps = {
    commentData: DocumentData[] | [];
    postId: string;
};

const PostComment: React.FunctionComponent<PostCommentProps> = ({
    commentData,
    postId
}) => {
    const [usernameLogin, setUsernameLogin] = React.useState<string>('');
    const { data: session } = useSession();

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

    const handleDeleteComment = async (commentId: string) => {
        await deleteDoc(doc(db, 'posts', postId, 'comments', commentId));
    };

    return (
        <>
            {commentData &&
                commentData.map((comment) => (
                    <div
                        className={`${style.commentWrapper} flex gap-4 px-4 py-2`}
                        key={comment.id}
                    >
                        <div className={`${style.userImg}`}>
                            <Link
                                href={{
                                    pathname: `user/${comment.data().username}`
                                }}
                            >
                                <img
                                    src={comment.data().userImage}
                                    alt={comment.data().username}
                                    className='rounded-full w-[32px] h-[32px]'
                                />
                            </Link>
                        </div>
                        <div
                            className={`${style.userComment} flex justify-between items-center w-full cursor-pointer px-2 pb-1`}
                        >
                            <div className='contentComment'>
                                <span
                                    className={`${style.username} pr-2 text-[14px] font-semibold`}
                                >
                                    <Link
                                        href={`user/${comment.data().username}`}
                                    >
                                        {comment.data().username}
                                    </Link>
                                </span>
                                <span
                                    className={`${style.caption} text-[14px]`}
                                >
                                    {comment.data().comment}
                                </span>
                            </div>
                            {usernameLogin === comment.data().username && (
                                <button
                                    type='button'
                                    className={`${style.deleteBtn} text-[14px] font-semibold`}
                                    onClick={() =>
                                        handleDeleteComment(comment.id)
                                    }
                                >
                                    Xóa
                                </button>
                            )}
                            {usernameLogin !== comment.data().username && (
                                <button
                                    type='button'
                                    className={`${style.reportBtn} text-[14px] font-semibold`}
                                >
                                    Báo cáo
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            {commentData && commentData.length === 0 && (
                <div
                    className={`${style.noComment} flex flex-col w-full absolute top-1/2 left-0 text-center`}
                >
                    <h1 className='text-[24px] font-bold'>
                        Chưa có bình luận nào
                    </h1>
                    <p>Bắt đầu trò chuyện</p>
                </div>
            )}
        </>
    );
};

export default PostComment;
