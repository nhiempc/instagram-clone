import React from 'react';
import style from './Popper.module.css';

type PopperProps = {
    children: React.ReactNode;
};

const Popper: React.FunctionComponent<PopperProps> = ({ children }) => {
    return <div className={`${style.popperWrapper}`}>{children}</div>;
};

export default Popper;
