import React from 'react';
import Sidebar from '../Sidebar';

type LayoutProps = {
    children?: React.ReactNode;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className='flex'>
                <Sidebar />
                {children}
            </div>
        </>
    );
};

export default Layout;
