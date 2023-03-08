import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import style from './[postID].module.css';
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    onSnapshot,
    orderBy,
    query
} from 'firebase/firestore';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostComment from './PostComment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';

type PostModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    postData: DocumentData;
};

type LikeData = {
    isLike: boolean;
    listUserLike: DocumentData[];
};

const PostDetailModal: React.FunctionComponent<PostModalProps> = ({
    isOpen = false,
    handleClose,
    postData
}) => {
    const { data: session } = useSession();
    const [post, setPost] = React.useState<DocumentData>();
    const [comments, setComments] = React.useState<DocumentData[]>([]);
    const [postId, setPostId] = React.useState<string>('');
    const [timestamp, setTimestamp] = React.useState<number>(0);
    const router = useRouter();

    const [likeData, setLikedata] = React.useState<LikeData>({
        isLike: false,
        listUserLike: []
    });

    React.useEffect(() => {
        const getPostInfo = async (postID: string | string[] | undefined) => {
            if (!postID) return;
            if (typeof postID === 'object') return;
            const userRef = doc(db, 'posts', postID);
            const res = await getDoc(userRef);
            setPost(res.data());
        };
        getPostInfo(postId);
    }, [session]);

    React.useEffect(() => {
        if (!postData || postData.username === undefined) return;
        if (!postId) return;
        if (typeof postId === 'object') return;
        const likeRef = doc(db, 'posts', postId, 'likes', postData.username);
        const checkLike = async () => {
            const docSnap = await getDoc(likeRef);
            if (docSnap.exists()) {
                setLikedata({ ...likeData, isLike: true });
            } else {
                setLikedata({ ...likeData, isLike: false });
            }
        };
        checkLike();
    }, [likeData.listUserLike.length, db, postId]);

    React.useEffect(() => {
        if (!postId) return;
        if (typeof postId === 'object') return;
        const unsubscribe = onSnapshot(
            collection(db, 'posts', postId, 'likes'),
            (snapshot) => {
                setLikedata({ ...likeData, listUserLike: snapshot.docs });
            }
        );
        return () => unsubscribe();
    }, [db, likeData.isLike, postId]);

    React.useEffect(() => {
        const postID = router.query.postId;
        if (!postID) return;
        if (typeof postID === 'object') return;
        setPostId(postID);
    }, [router]);

    React.useEffect(() => {
        if (!postData) return;
        if (!postData.timestamp) return;
        setTimestamp(postData.timestamp.seconds);
    }, [postData]);

    React.useEffect(() => {
        if (!postId) return;
        if (typeof postId === 'object') return;
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'posts', postId, 'comments'),
                orderBy('timestamp', 'desc')
            ),
            (snapshot) => {
                setComments(snapshot.docs);
            }
        );
        return () => unsubscribe();
    }, [postId, db]);

    return (
        (postData || post) && (
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
                                    <Dialog.Panel className='w-full max-w-6xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all'>
                                        <Dialog.Title
                                            as='h3'
                                            className={`${style.header} flex justify-between items-center text-md font-medium leading-6 text-black`}
                                        >
                                            <button
                                                type='button'
                                                className={`${style.btnCancel} outline-none`}
                                                onClick={handleClose}
                                            ></button>
                                            Chi tiết bài viết
                                            <button
                                                type='button'
                                                className={`${style.btnCancel}`}
                                                onClick={handleClose}
                                            >
                                                Đóng
                                            </button>
                                        </Dialog.Title>
                                        <div className=''>
                                            <div
                                                className={`${style.contentWrapper} flex md:flex-row xs:flex-col xs:overflow-y-scroll w-full scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100`}
                                            >
                                                <div
                                                    className={`${style.uploadImageArea} flex justify-center items-center sm:w-full xs:w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100 lg:w-3/5`}
                                                >
                                                    <img
                                                        src={
                                                            postData ===
                                                            undefined
                                                                ? post?.image
                                                                : postData.image
                                                        }
                                                        alt=''
                                                    />
                                                </div>
                                                <div
                                                    className={`${style.captionArea} flex flex-col justify-between sm:w-full xs:w-full lg:w-2/5`}
                                                >
                                                    <PostHeader
                                                        postData={postData}
                                                    />
                                                    <div
                                                        className={`${style.wrapContent} scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100 relative`}
                                                    >
                                                        <PostContent
                                                            postData={postData}
                                                        />
                                                        <PostComment
                                                            commentData={
                                                                comments
                                                            }
                                                            postId={postId}
                                                        />
                                                    </div>
                                                    <PostFooter
                                                        likeData={likeData}
                                                        postId={postId}
                                                        timestamp={timestamp}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        )
    );
};

export default PostDetailModal;
