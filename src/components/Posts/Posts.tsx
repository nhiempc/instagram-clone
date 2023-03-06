'use client';
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import style from './Posts.module.css';
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    DocumentData
} from 'firebase/firestore';
import { db } from '../../../firebase';

const Posts: React.FunctionComponent = () => {
    const [posts, setPosts] = useState<DocumentData[]>();

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            ),
        [db]
    );

    return (
        <div className={`${style.post_wrapper}`}>
            {posts?.map((post: DocumentData) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Posts;
