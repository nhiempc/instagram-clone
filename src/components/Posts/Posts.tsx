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

type Post = {
    username: string;
    caption: string;
    image: string;
    profileImg: string;
    timestamp: string;
};

const Posts: React.FunctionComponent = () => {
    const [posts, setPosts] = useState<any>();
    // useEffect(() => {
    //     const posts: Post[] = [...Array(20)].map((_, i) => ({
    //         id: faker.datatype.uuid(),
    //         username: faker.internet.userName().slice(0, 9).toLowerCase(),
    //         avatar: faker.image.avatar(),
    //         image: faker.image.people(640, 480, true),
    //         content: faker.lorem.paragraphs(),
    //         createdAt: faker.date.past().toLocaleDateString()
    //     }));
    //     setPosts(posts);
    // }, []);

    useEffect(() => {
        const getPosts = async () => {
            const q = query(
                collection(db, 'posts'),
                orderBy('timestamp', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const chartData = querySnapshot.docs.map((doc) => doc.data());
            console.log(chartData);
            setPosts(chartData);
            // querySnapshot.forEach((doc) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, ' => ', doc.data(), typeof doc.data());
            // });
        };
        getPosts();
    }, []);
    console.log('Posst', posts);

    return (
        <div className={`${style.post_wrapper}`}>
            {posts?.map((post: any, index: number) => (
                <PostItem
                    key={index}
                    username={post.username}
                    caption={post.caption}
                    image={post.image}
                    profileImg={post.profileImg}
                    timestamp={post.timestamp.seconds}
                />
            ))}
        </div>
    );
};

export default Posts;
