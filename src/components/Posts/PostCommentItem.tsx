import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react';
import style from './Posts.module.css';
import { TimeAgo } from '@/common';

type PostCommentItemProps = {
    comment: DocumentData;
};

const PostCommentItem: React.FunctionComponent<PostCommentItemProps> = ({
    comment
}) => {
    const ago = TimeAgo.inWords(
        comment.data().timestamp !== null
            ? Number(comment.data().timestamp.seconds) * 1000
            : new Date().getTime()
    );
    return (
        <div
            className={`${style.commentItem} flex gap-2 items-center justify-between my-2 w-full`}
        >
            <div
                className={`${style.userWrapper} flex gap-2 items-center w-[75%]`}
            >
                <div className={`${style.userCommentImg}`}>
                    <img
                        className='rounded-full'
                        src={comment.data().userImage}
                        alt=''
                    />
                </div>
                <div className={`${style.userCommentText} text-[14px]`}>
                    <Link
                        href={comment.data().username}
                        className='font-medium mr-2'
                    >
                        {comment.data().username}
                    </Link>
                    {comment.data().comment}
                </div>
            </div>
            <div
                className={`${style.userCommentTime} text-[12px] pr-4 text-right text-gray-400 w-[25%]`}
            >
                {ago}
            </div>
        </div>
    );
};

export default PostCommentItem;
