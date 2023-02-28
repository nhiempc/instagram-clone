import React from 'react';
import style from './PublicModal.module.css';

type ButtonProps = {
    label: string;
    danger: boolean;
    action: string;
    handleCancel: () => void;
};

const Button: React.FunctionComponent<ButtonProps> = ({
    label,
    danger,
    action,
    handleCancel
}) => {
    const handleClick = () => {
        if (action === 'cancel') {
            handleCancel();
        }
    };
    return (
        <button
            type='button'
            onClick={handleClick}
            className={`${danger ? 'text-red-600' : 'text-slate-900'} ${
                style.PublicBtn
            } px-2 py-1`}
        >
            {label}
        </button>
    );
};

export default Button;
