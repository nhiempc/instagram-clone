import React from 'react';
import { EmojiIcon, LocationIcon, UploadImageIcon } from '@/assets/icons';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { Fragment } from 'react';
import style from './CreatePostModal.module.css';
import { useSession } from 'next-auth/react';
import { removeVietnameseTones } from '@/common';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Picker, { EmojiStyle } from 'emoji-picker-react';
import { db, storage } from '../../../../firebase';
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

type CreatePostModalProps = {
    isOpen: boolean;
    handleClose: () => void;
};

const CreatePostModal: React.FunctionComponent<CreatePostModalProps> = ({
    isOpen,
    handleClose
}) => {
    const [selectedFile, setSelectedFile] = React.useState<any>(null);
    const [caption, setCaption] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showPicker, setShowPicker] = React.useState(false);

    const { data: session } = useSession();

    const filePikerRef = React.useRef<any>(null);
    const captionRef = React.useRef<any>(null);

    const username = removeVietnameseTones(session?.user?.name as string)
        .split(' ')
        .join('')
        .toLowerCase();

    const addImageToPost = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target?.result);
        };
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
        const docRef = await addDoc(collection(db, 'posts'), {
            username: username,
            caption: captionRef.current.value,
            profileImg: session?.user?.image,
            showComment: true,
            showLike: true,
            timestamp: serverTimestamp()
        });

        const imgRef = ref(storage, `post/${docRef.id}/image`);
        await uploadString(imgRef, selectedFile, 'data_url').then(
            async (snapshot) => {
                const downloadURL = await getDownloadURL(imgRef);
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL
                });
            }
        );
        setLoading(false);
        handleClose();
        setSelectedFile(null);
    };

    React.useEffect(() => {
        if (isOpen === false) {
            setSelectedFile(null);
            setCaption('');
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
                                            H???y b???
                                        </button>
                                        T???o b??i vi???t m???i
                                        <button
                                            type='button'
                                            className={`${style.btnShare}`}
                                            onClick={uploadPost}
                                            disabled={loading}
                                        >
                                            {loading
                                                ? '??ang t???i l??n'
                                                : 'Chia s???'}
                                        </button>
                                    </Dialog.Title>
                                    <div className=''>
                                        <div
                                            className={`${style.contentWrapper} flex md:flex-row xs:flex-col xs:overflow-y-scroll w-full scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100`}
                                        >
                                            <div
                                                className={`${style.uploadImageArea} flex justify-center items-center sm:w-full xs:w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100 lg:w-3/5`}
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
                                                            K??o ???nh v?? video v??o
                                                            ????y
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
                                                            Ch???n t??? m??y t??nh
                                                        </button>
                                                    </div>
                                                )}
                                                {selectedFile && (
                                                    <img
                                                        src={selectedFile.toString()}
                                                        alt=''
                                                    />
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
                                                        placeholder='Vi???t ch?? th??ch...'
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
                                                        placeholder='Th??m v??? tr??'
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
                                                                            Tr???
                                                                            n??ng
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
                                                                        V??n b???n
                                                                        thay th???
                                                                        m?? t???
                                                                        ???nh cho
                                                                        nh???ng
                                                                        ng?????i
                                                                        suy gi???m
                                                                        th??? l???c.
                                                                        V??n b???n
                                                                        thay th???
                                                                        s??? ???????c
                                                                        t???o t???
                                                                        ?????ng cho
                                                                        ???nh c???a
                                                                        b???n ho???c
                                                                        b???n c??
                                                                        th??? t???
                                                                        vi???t.
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
                                                                            C??i
                                                                            ?????t
                                                                            n??ng
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
                                                                        Ch??? b???n
                                                                        m???i nh??n
                                                                        th???y
                                                                        t???ng s???
                                                                        l?????t
                                                                        th??ch v??
                                                                        l?????t xem
                                                                        b??i vi???t
                                                                        n??y. V???
                                                                        sau, b???n
                                                                        c?? th???
                                                                        thay ?????i
                                                                        t??y ch???n
                                                                        n??y b???ng
                                                                        c??ch m???
                                                                        menu ??????
                                                                        ??? ?????u
                                                                        b??i
                                                                        vi???t. ?????
                                                                        ???n s???
                                                                        l?????t
                                                                        th??ch
                                                                        tr??n b??i
                                                                        vi???t c???a
                                                                        ng?????i
                                                                        kh??c,
                                                                        h??y ??i
                                                                        ?????n ph???n
                                                                        c??i ?????t
                                                                        t??i
                                                                        kho???n.
                                                                        T??m hi???u
                                                                        th??m
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

export default CreatePostModal;
