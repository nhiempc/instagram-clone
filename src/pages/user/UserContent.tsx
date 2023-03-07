import React from 'react';
import style from './UserHeader.module.css';
import { Tab } from '@headlessui/react';
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';
import { db } from '../../../firebase';
import Link from 'next/link';

type UserContentProps = {
    user: DocumentData;
};

const UserContent: React.FunctionComponent<UserContentProps> = ({ user }) => {
    const [postByUser, setPostByUser] = React.useState<
        DocumentData[] | undefined
    >();
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ');
    }

    React.useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, 'posts'),
                    where('username', '==', user.username)
                ),
                (snapshot) => {
                    setPostByUser(snapshot.docs);
                }
            ),
        [db, user]
    );

    let tabs = {
        'Bài viết': postByUser,
        'Đã lưu': [],
        'Được gắn thẻ': []
    };
    return (
        <div className={`${style.contentWrapper} w-full`}>
            <div className='w-full px-2 sm:px-0'>
                <Tab.Group>
                    <Tab.List className='flex gap-12 justify-center'>
                        {Object.keys(tabs).map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'py-2 text-[14px] outline-none uppercase',
                                        selected
                                            ? 'border-t-[1px] text-black font-semibold border-black'
                                            : 'text-slate-400'
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className='mt-2'>
                        {Object.values(tabs).map((tab, idx) => (
                            <Tab.Panel key={idx} className={'a'}>
                                <div className='flex'>
                                    {tab?.map((post, key) => (
                                        <Link
                                            key={key}
                                            href={`/post/${post.id}`}
                                            className='lg:w-1/3 md:w-1/3 sm:w-full'
                                        >
                                            <img
                                                className='p-3'
                                                src={post.data().image}
                                                alt={post.data().username}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default UserContent;
