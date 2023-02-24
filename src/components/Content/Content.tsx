import React from 'react';
import style from './Content.module.css';

type ContentProps = {
    children?: React.ReactNode;
};
const Content: React.FunctionComponent<ContentProps> = ({ children }) => {
    return (
        <div className={`${style.content_wrapper} flex w-4/6 mx-auto`}>
            {children}
        </div>
    );
};

export default Content;
