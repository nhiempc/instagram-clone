'use client';
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import StoryItem from './StoryItem';
import style from './Stories.module.css';

type Suggestion = {
    userId: string;
    username: string;
    email: string;
    avatar: string;
    password: string;
    birthdate: Date;
};

const Stories: React.FunctionComponent = () => {
    const [suggestion, setSuggestion] = useState<Suggestion[] | null>(null);
    useEffect(() => {
        const suggestion: Suggestion[] = [...Array(20)].map((_, i) => ({
            userId: faker.datatype.uuid(),
            username: faker.internet.userName().slice(0, 9),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate()
        }));
        setSuggestion(suggestion);
    }, []);
    return (
        <div
            className={`${style.story_wrapper} flex p-6 lg:mt-2 xs:mt-0 overflow-x-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100`}
        >
            {suggestion?.map((profile) => (
                <StoryItem
                    key={profile.userId}
                    img={profile.avatar}
                    username={profile.username}
                />
            ))}
        </div>
    );
};

export default Stories;
