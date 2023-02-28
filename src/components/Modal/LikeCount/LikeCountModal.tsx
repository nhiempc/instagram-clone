import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import style from './LikeCountModal.module.css';
import { CloseIcon } from '@/assets/icons';
import UserLikeItem from './UserLikeItem';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';

type LikeCountModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    postId: string;
};

const LikeCountModal: React.FunctionComponent<LikeCountModalProps> = ({
    isOpen,
    handleClose,
    postId
}) => {
    const [listUserLike, setListUserLike] = React.useState<any>([]);

    React.useEffect(() => {
        const getUserLikeData = (postId: string) => {
            onSnapshot(collection(db, 'posts', postId, 'likes'), (snapshot) => {
                const result = snapshot.docs.map(async (snap) => {
                    const username = snap.data().username;
                    const userRef = doc(db, 'users', username);
                    const res = await getDoc(userRef);
                    return res.data();
                });
                Promise.all(result).then((value) => setListUserLike(value));
            });
        };

        if (isOpen) {
            getUserLikeData(postId);
        }
    }, [isOpen]);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={handleClose}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full max-w-sm transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className={`${style.header} flex justify-between items-center text-md font-medium leading-6 text-black`}
                                    >
                                        <button
                                            type='button'
                                            className={`${style.btnNone}`}
                                        ></button>
                                        Lượt thích
                                        <button
                                            type='button'
                                            className={`${style.btnCancel}`}
                                            onClick={handleClose}
                                        >
                                            <CloseIcon width='18' height='18' />
                                        </button>
                                    </Dialog.Title>
                                    <div
                                        className={`${style.likeArea} overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100`}
                                    >
                                        {listUserLike?.map(
                                            (item: any, index: any) => (
                                                <UserLikeItem
                                                    key={index}
                                                    userLike={item}
                                                />
                                            )
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default LikeCountModal;
