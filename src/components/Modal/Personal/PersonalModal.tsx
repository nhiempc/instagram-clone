import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import style from './PersonalModal.module.css';
import { PersonalModalBtn } from '@/common';
import Button from './Button';

type PersonalModalProps = {
    isOpen: boolean;
    handleCancel: () => void;
    handleDelete: () => void;
};

const PersonalModal: React.FC<PersonalModalProps> = ({
    isOpen,
    handleCancel,
    handleDelete
}) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={handleCancel}
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
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all'>
                                    <div
                                        className={`${style.contentWrapper} flex flex-col w-full`}
                                    >
                                        {' '}
                                        {PersonalModalBtn.map((btn, index) => (
                                            <Button
                                                key={index}
                                                label={btn.label}
                                                danger={btn.danger}
                                                action={btn.action}
                                                handleCancel={handleCancel}
                                                handleDelete={handleDelete}
                                            />
                                        ))}
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

export default PersonalModal;
