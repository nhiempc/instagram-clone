import React from 'react';
import style from './[username].module.css';
import { Tab } from '@headlessui/react';
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';
import { db } from '../../../firebase';
import PostDetailModal from '../post/[postID]';
import { useRouter } from 'next/router';

type UserContentProps = {
    user: DocumentData;
};

const UserContent: React.FunctionComponent<UserContentProps> = ({ user }) => {
    const [postByUser, setPostByUser] = React.useState<
        DocumentData[] | undefined
    >();
    const [postByID, setPostByID] = React.useState<DocumentData>([]);
    const [isOpenPostDetailModal, setIsOpenPostDetailModal] =
        React.useState<boolean>(false);

    const router = useRouter();
    // const postID = router.query.postID;

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

    const handleClosePostDetailModal = () => {
        router.push(`/user/${user.username}`);
        setIsOpenPostDetailModal(!isOpenPostDetailModal);
    };

    const handleClickPost = async (postID: string) => {
        if (!postID) return;
        if (typeof postID === 'object') return;

        router.push(`/user?postId=${postID}`, undefined, {
            shallow: true
        });
        setIsOpenPostDetailModal(!isOpenPostDetailModal);
        const postRef = doc(db, 'posts', postID);
        const docSnap = await getDoc(postRef);
        if (docSnap.exists()) {
            setPostByID(docSnap.data());
        } else {
            setPostByID([]);
        }
    };

    let tabs = {
        'Bài viết': postByUser,
        'Đã lưu': [],
        'Được gắn thẻ': []
    };

    return (
        <>
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
                                            <div
                                                key={key}
                                                onClick={() =>
                                                    handleClickPost(post.id)
                                                }
                                                className='lg:w-1/3 md:w-1/3 sm:w-full cursor-pointer'
                                            >
                                                <img
                                                    className='p-3'
                                                    src={post.data().image}
                                                    alt={post.data().username}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
            <PostDetailModal
                isOpen={isOpenPostDetailModal}
                handleClose={handleClosePostDetailModal}
                postData={postByID}
            />
        </>
    );
};

export default UserContent;
