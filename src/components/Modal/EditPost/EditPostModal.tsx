import React from 'react';
import { EmojiIcon, LocationIcon, UploadImageIcon } from '@/assets/icons';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { Fragment } from 'react';
import style from './EditPostModal.module.css';
import { useSession } from 'next-auth/react';
import { removeVietnameseTones } from '@/common';
import {
    ChevronDownIcon,
    XCircleIcon,
    XMarkIcon
} from '@heroicons/react/20/solid';
import Picker, { EmojiStyle } from 'emoji-picker-react';
import { db, storage } from '../../../../firebase';
import {
    doc,
    DocumentData,
    getDoc,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

type EditPostModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    postId: string;
};

const EditPostModal: React.FunctionComponent<EditPostModalProps> = ({
    isOpen,
    handleClose,
    postId
}) => {
    const [selectedFile, setSelectedFile] = React.useState<any>(null);
    const [caption, setCaption] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showPicker, setShowPicker] = React.useState(false);
    const [postInfo, setPostInfo] = React.useState<DocumentData | undefined>(
        undefined
    );

    const { data: session } = useSession();

    const filePikerRef = React.useRef<any>(null);
    const captionRef = React.useRef<any>(null);

    const username = removeVietnameseTones(session?.user?.name as string)
        .split(' ')
        .join('')
        .toLowerCase();

    React.useEffect(() => {
        const getPostInfo = async (postId: string) => {
            const userRef = doc(db, 'posts', postId);
            const res = await getDoc(userRef);
            setPostInfo(res.data());
        };

        getPostInfo(postId);
    }, [isOpen]);

    const addImageToPost = (e: any) => {
        if (!postInfo || selectedFile === null) {
            const reader = new FileReader();
            if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            }
            reader.onload = (readerEvent) => {
                setSelectedFile(readerEvent.target?.result);
            };
        }
    };

    const handleClickChooseImageButton = () => {
        if (filePikerRef.current !== null) {
            filePikerRef.current.click();
        }
    };

    const onEmojiClick = (emojiObject: any) => {
        setCaption((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const uploadPost = async () => {
        if (loading) return;
        setLoading(true);
        // 1. Create a post and add to firestore 'posts' collection
        // 2. Get the post ID for the newly created post
        // 3. Upload the image to firebase storage with the post ID
        // 4. Get a download URL from firebase storage and update the original post with image

        const imgRef = ref(storage, `post/${postId}/image`);
        if (postInfo?.image !== selectedFile) {
            await uploadString(imgRef, selectedFile, 'data_url').then(
                async (snapshot) => {
                    const downloadURL = await getDownloadURL(imgRef);
                    await updateDoc(doc(db, 'posts', postId), {
                        image: downloadURL,
                        caption: captionRef.current.value,
                        timestamp: serverTimestamp()
                    });
                }
            );
        } else {
            await updateDoc(doc(db, 'posts', postId), {
                caption: captionRef.current.value,
                timestamp: serverTimestamp()
            });
        }
        setLoading(false);
        handleClose();
        setSelectedFile(null);
    };

    React.useEffect(() => {
        if (isOpen === false) {
            setSelectedFile(null);
            setCaption('');
        } else if (postInfo && isOpen) {
            setSelectedFile(postInfo.image);
            setCaption(postInfo.caption);
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
                                <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className={`${style.header} flex justify-between items-center text-md font-medium leading-6 text-black`}
                                    >
                                        <button
                                            type='button'
                                            className={`${style.btnCancel} outline-none`}
                                            onClick={handleClose}
                                        >
                                            Hủy bỏ
                                        </button>
                                        Chỉnh sửa
                                        <button
                                            type='button'
                                            className={`${style.btnShare}`}
                                            onClick={uploadPost}
                                            disabled={loading}
                                        >
                                            {loading ? 'Đang cập nhật' : 'Lưu'}
                                        </button>
                                    </Dialog.Title>
                                    <div className=''>
                                        <div
                                            className={`${style.contentWrapper} flex md:flex-row xs:flex-col xs:overflow-y-scroll w-full scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100`}
                                        >
                                            <div
                                                className={`${style.uploadImageArea} relative flex justify-center items-center sm:w-full xs:w-full overflow-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100 lg:w-3/5`}
                                            >
                                                {!selectedFile && (
                                                    <div
                                                        className={`${style.Wrapper} flex flex-col justify-center items-center w-full`}
                                                    >
                                                        <UploadImageIcon
                                                            width='96'
                                                            height='77'
                                                        />
                                                        <span className='text-[20px] mt-4'>
                                                            Kéo ảnh và video vào
                                                            đây
                                                        </span>
                                                        <input
                                                            type='file'
                                                            hidden
                                                            ref={filePikerRef}
                                                            onChange={
                                                                addImageToPost
                                                            }
                                                        />
                                                        <button
                                                            className={`${style.btnUpload} mt-6`}
                                                            type='button'
                                                            onClick={
                                                                handleClickChooseImageButton
                                                            }
                                                        >
                                                            Chọn từ máy tính
                                                        </button>
                                                    </div>
                                                )}
                                                {selectedFile && (
                                                    <div
                                                        className={`${style.imgWrapper} flex xs:w-full`}
                                                    >
                                                        <img
                                                            src={selectedFile.toString()}
                                                            alt=''
                                                        />
                                                        <XMarkIcon
                                                            onClick={() =>
                                                                setSelectedFile(
                                                                    null
                                                                )
                                                            }
                                                            className={`${style.resetImg} absolute top-0 right-0 w-10 h-10 cursor-pointer text-slate-400`}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className={`${style.captionArea} flex flex-col sm:w-full xs:w-full lg:w-2/5`}
                                            >
                                                <div
                                                    className={`${style.captionHeader} flex gap-2 mt-[18px] mb-[14px] mx-4 text-[14px] font-medium items-center`}
                                                >
                                                    <img
                                                        className='w-[32px] h-[32px] rounded-full'
                                                        src={
                                                            session?.user
                                                                ?.image ||
                                                            undefined
                                                        }
                                                        alt={
                                                            session?.user
                                                                ?.name ||
                                                            undefined
                                                        }
                                                    />
                                                    <span>{username}</span>
                                                </div>
                                                <div
                                                    className={`${style.captionInput}`}
                                                >
                                                    <textarea
                                                        value={caption}
                                                        onChange={(e) => {
                                                            setCaption(
                                                                e.target.value
                                                            );
                                                        }}
                                                        ref={captionRef}
                                                        className={`${style.inputCaption} px-4 w-full`}
                                                        placeholder='Viết chú thích...'
                                                    ></textarea>

                                                    <button
                                                        className={`${style.emoji} px-4`}
                                                        type='button'
                                                        onClick={() =>
                                                            setShowPicker(
                                                                (
                                                                    val: boolean
                                                                ) => !val
                                                            )
                                                        }
                                                    >
                                                        <EmojiIcon
                                                            width='20'
                                                            height='20'
                                                        />
                                                    </button>
                                                    {showPicker && (
                                                        <div className='emojiPiker top-[450px]'>
                                                            <Picker
                                                                emojiStyle={
                                                                    EmojiStyle.FACEBOOK
                                                                }
                                                                width={'100%'}
                                                                onEmojiClick={
                                                                    onEmojiClick
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div
                                                    className={`${style.captionLocation} flex justify-between items-center pr-4`}
                                                >
                                                    <input
                                                        type='text'
                                                        className='w-full px-4'
                                                        placeholder='Thêm vị trí'
                                                    />
                                                    <LocationIcon
                                                        width='16'
                                                        height='16'
                                                    />
                                                </div>

                                                <div className='w-full'>
                                                    <div className='mx-auto w-full max-w-md rounded-2xl bg-white'>
                                                        <Disclosure>
                                                            {({ open }) => (
                                                                <>
                                                                    <Disclosure.Button
                                                                        className={`${style.btn} flex w-full justify-between py-2 px-4 text-left text-[16px] font-normal`}
                                                                    >
                                                                        <span>
                                                                            Trợ
                                                                            năng
                                                                        </span>
                                                                        <ChevronDownIcon
                                                                            className={`${
                                                                                open
                                                                                    ? 'rotate-180 transform'
                                                                                    : ''
                                                                            } h-5 w-5`}
                                                                        />
                                                                    </Disclosure.Button>
                                                                    <Disclosure.Panel className='px-4 pt-4 pb-2 font-light text-[12px]'>
                                                                        Văn bản
                                                                        thay thế
                                                                        mô tả
                                                                        ảnh cho
                                                                        những
                                                                        người
                                                                        suy giảm
                                                                        thị lực.
                                                                        Văn bản
                                                                        thay thế
                                                                        sẽ được
                                                                        tạo tự
                                                                        động cho
                                                                        ảnh của
                                                                        bạn hoặc
                                                                        bạn có
                                                                        thể tự
                                                                        viết.
                                                                    </Disclosure.Panel>
                                                                </>
                                                            )}
                                                        </Disclosure>
                                                        <Disclosure
                                                            as='div'
                                                            className='mt-2'
                                                        >
                                                            {({ open }) => (
                                                                <>
                                                                    <Disclosure.Button
                                                                        className={`${style.btn} flex w-full justify-between py-2 px-4 text-left text-[16px] font-normal`}
                                                                    >
                                                                        <span>
                                                                            Cài
                                                                            đặt
                                                                            nâng
                                                                            cao
                                                                        </span>
                                                                        <ChevronDownIcon
                                                                            className={`${
                                                                                open
                                                                                    ? 'rotate-180 transform'
                                                                                    : ''
                                                                            } h-5 w-5`}
                                                                        />
                                                                    </Disclosure.Button>
                                                                    <Disclosure.Panel className='px-4 pt-4 pb-2 font-light text-[12px]'>
                                                                        Chỉ bạn
                                                                        mới nhìn
                                                                        thấy
                                                                        tổng số
                                                                        lượt
                                                                        thích và
                                                                        lượt xem
                                                                        bài viết
                                                                        này. Về
                                                                        sau, bạn
                                                                        có thể
                                                                        thay đổi
                                                                        tùy chọn
                                                                        này bằng
                                                                        cách mở
                                                                        menu ···
                                                                        ở đầu
                                                                        bài
                                                                        viết. Để
                                                                        ẩn số
                                                                        lượt
                                                                        thích
                                                                        trên bài
                                                                        viết của
                                                                        người
                                                                        khác,
                                                                        hãy đi
                                                                        đến phần
                                                                        cài đặt
                                                                        tài
                                                                        khoản.
                                                                        Tìm hiểu
                                                                        thêm
                                                                    </Disclosure.Panel>
                                                                </>
                                                            )}
                                                        </Disclosure>
                                                    </div>
                                                </div>
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
    );
};

export default EditPostModal;
