import React from 'react';
import style from './Content.module.css';

type ContentProps = {
    children?: React.ReactNode;
};
const Content: React.FunctionComponent<ContentProps> = ({ children }) => {
    return (
        <div
            className={`${style.content_wrapper} flex md:w-2/3 lg:2/3 sm:w-full xs:w-full mx-auto`}
        >
            {children}
        </div>
    );
};

export default Content;
