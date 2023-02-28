import React from 'react';
import style from './PersonalModal.module.css';

type ButtonProps = {
    label: string;
    danger: boolean;
    action: string;
    handleCancel: () => void;
    handleDelete: () => void;
};

const Button: React.FunctionComponent<ButtonProps> = ({
    label,
    danger,
    action,
    handleCancel,
    handleDelete
}) => {
    const handleClick = () => {
        if (action === 'cancel') {
            handleCancel();
        } else if (action === 'delete') {
            handleDelete();
        }
    };
    return (
        <button
            type='button'
            onClick={handleClick}
            className={`${danger ? 'text-red-600' : 'text-slate-900'} ${
                style.PersonalBtn
            } px-2 py-1`}
        >
            {label}
        </button>
    );
};

export default Button;
