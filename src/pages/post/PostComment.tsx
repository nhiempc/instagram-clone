import React from 'react';
import style from './[postID].module.css';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';

type PostCommentProps = {
    postData: DocumentData | undefined;
};

const PostComment: React.FunctionComponent<any> = ({ postData }) => {
    return (
        postData && (
            <div className={`${style.commentWrapper} flex p-4`}>
                <div className={`${style.userImg}`}>
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
                </div>
                <div className={`${style.userCaption} pl-3`}>
                    <span className={`${style.username}`}>
                        <Link href={`user/${postData.username}`}>
                            {postData.username}
                        </Link>
                    </span>
                    <span className={`${style.caption} text-[14px]`}>
                        {postData.caption}
                    </span>
                </div>
                <div
                    className={`${style.noComment} flex flex-col w-full absolute top-1/2 left-0 text-center`}
                >
                    <h1 className='text-[24px] font-bold'>
                        Chưa có bình luận nào
                    </h1>
                    <p>Bắt đầu trò chuyện</p>
                </div>
            </div>
        )
    );
};

export default PostComment;
