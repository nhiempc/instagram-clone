import React from 'react';
import { EmojiIcon, LocationIcon, UploadImageIcon } from '@/assets/icons';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { Fragment } from 'react';
import style from './CreatePostModal.module.css';
import { useSession } from 'next-auth/react';
import { removeVietnameseTones } from '@/common';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

type CreatePostModalProps = {
    isOpen: boolean;
    handleClose: () => void;
};

const CreatePostModal: React.FunctionComponent<CreatePostModalProps> = ({
    isOpen,
    handleClose
}) => {
    const [selectedFile, setSelectedFile] = React.useState<
        string | ArrayBuffer | null | undefined
    >(null);

    const { data: session } = useSession();

    const filePikerRef = React.useRef<any>(null);

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

    React.useEffect(() => {
        if (isOpen === false) {
            setSelectedFile(null);
        }
    }, [isOpen]);

    console.log(isOpen);

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
                                            className={`${style.btnCancel}`}
                                            onClick={handleClose}
                                        >
                                            Hủy bỏ
                                        </button>
                                        Tạo bài viết mới
                                        <button
                                            type='button'
                                            className={`${style.btnShare}`}
                                        >
                                            Chia sẻ
                                        </button>
                                    </Dialog.Title>
                                    <div className=''>
                                        <div
                                            className={`${style.contentWrapper} flex w-full`}
                                        >
                                            <div
                                                className={`${style.uploadImageArea} flex justify-center items-center w-3/5`}
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
                                                    <img
                                                        src={selectedFile.toString()}
                                                        alt=''
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className={`${style.captionArea} flex flex-col w-2/5`}
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
                                                        className={`${style.inputCaption} px-4 w-full`}
                                                        placeholder='Viết chú thích...'
                                                    ></textarea>
                                                    <button
                                                        className={`${style.emoji} px-4`}
                                                    >
                                                        <EmojiIcon
                                                            width='20'
                                                            height='20'
                                                        />
                                                    </button>
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
                                                                        className={`${style.btn} flex w-full justify-between rounded-lg py-2 px-4 text-left text-[16px] font-normal`}
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
                                                                        className={`${style.btn} flex w-full justify-between rounded-lg py-2 px-4 text-left text-[16px] font-normal`}
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

export default CreatePostModal;
