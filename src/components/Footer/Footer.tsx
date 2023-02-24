'use client';
import React, { useState, useEffect } from 'react';
import style from './Footer.module.css';
import { IUser, initUser } from '@/models/IUser';
import FooterUser from './FooterUser';
import FooterSuggestUser from './FooterSuggestUser';
import { faker } from '@faker-js/faker';
import FooterContent from './FooterContent';

const Footer: React.FunctionComponent = () => {
    const [user, setUser] = useState<IUser>(initUser());
    const [suggestUserList, setSuggestUserList] = useState<IUser[]>([]);

    useEffect(() => {
        const suggestUserList = [...Array(5)].map((_, i) => ({
            id: faker.datatype.uuid(),
            username: faker.internet.userName().slice(0, 9).toLowerCase(),
            fullName: faker.name.fullName(),
            avatar: faker.image.avatar()
        }));
        setSuggestUserList(suggestUserList);
    }, []);
    return (
        <div className={`${style.footer_wrapper} w-2/5 px-3`}>
            <FooterUser
                id={user.id}
                username={user.username}
                fullName={user.fullName}
                avatar={user.avatar}
            />
            <FooterSuggestUser suggestUserList={suggestUserList} />
            <FooterContent />
        </div>
    );
};

export default Footer;
