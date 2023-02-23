import React from 'react';
import Footer from '../Footer';

type ContentProps = {
    children?: React.ReactNode;
};
const Content: React.FunctionComponent<ContentProps> = ({ children }) => {
    return (
        <div className='content-wrapper w-3/5 mx-auto'>
            {children}
            <Footer />
        </div>
    );
};

export default Content;
