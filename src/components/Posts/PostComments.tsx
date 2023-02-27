import { DocumentData } from 'firebase/firestore';
import { type } from 'os';
import React from 'react';
import PostCommentItem from './PostCommentItem';
import style from './Posts.module.css';

type PostCommentsProps = {
    comments: DocumentData[] | undefined;
};

const PostComments: React.FunctionComponent<PostCommentsProps> = ({
    comments
}) => {
    return (
        <div
            className={`${style.postCommentWrapper} m-2 max-h-28 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100`}
        >
            {comments?.map((comment) => (
                <PostCommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default PostComments;
