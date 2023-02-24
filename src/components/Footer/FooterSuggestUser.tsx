import React from 'react';
import { IUser } from '@/models/IUser';
import style from './Footer.module.css';
import FooterSuggestUserItem from './FooterSuggestUserItem';
import Link from 'next/link';

type FooterSuggestUserProps = {
    suggestUserList: IUser[];
};

const FooterSuggestUser: React.FunctionComponent<FooterSuggestUserProps> = ({
    suggestUserList
}) => {
    return (
        <div className={`${style.suggest_user_wrapper} mb-3`}>
            <div
                className={`${style.header} flex justify-between items-center w-full py-1`}
            >
                <p className={`${style.suggest_for_you}`}>Gợi ý cho bạn</p>
                <Link href={'/'} className={`${style.view_all}`}>
                    Xem tất cả
                </Link>
            </div>
            {suggestUserList.map((user) => (
                <FooterSuggestUserItem suggestUser={user} />
            ))}
        </div>
    );
};

export default FooterSuggestUser;
