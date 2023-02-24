'use client';
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import PostItem from './PostItem';
import style from './Posts.module.css';

type Post = {
    id: string;
    username: string;
    avatar: string;
    image: string;
    content: string;
    createdAt: string;
};

const Posts: React.FunctionComponent = () => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    useEffect(() => {
        const posts: Post[] = [...Array(20)].map((_, i) => ({
            id: faker.datatype.uuid(),
            username: faker.internet.userName().slice(0, 9).toLowerCase(),
            avatar: faker.image.avatar(),
            image: faker.image.people(640, 480, true),
            content: faker.lorem.paragraphs(),
            createdAt: faker.date.past().toLocaleDateString()
        }));
        setPosts(posts);
    }, []);
    return (
        <div className={`${style.post_wrapper}`}>
            {posts?.map((post, index) => (
                <PostItem
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    avatar={post.avatar}
                    image={post.image}
                    content={post.content}
                    createdAt={post.createdAt}
                />
            ))}
        </div>
    );
};

export default Posts;
