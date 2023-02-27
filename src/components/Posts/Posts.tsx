'use client';
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import PostItem from './PostItem';
import style from './Posts.module.css';
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    doc,
    getDoc,
    getDocs,
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
                    const postData: DocumentData[] = snapshot.docs.map((doc) =>
                        doc.data()
                    );
                    setPosts(postData);
                }
            ),
        [db]
    );

    return (
        <div className={`${style.post_wrapper}`}>
            {posts?.map((post: any, index: number) => (
                <PostItem key={index} post={post} />
            ))}
        </div>
    );
};

export default Posts;
