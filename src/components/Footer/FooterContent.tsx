import Link from 'next/link';
import React from 'react';
import style from './Footer.module.css';
import { footerMenu } from '@/common';

const FooterContent: React.FunctionComponent = () => {
    return (
        <div className={`${style.footer_content_wrapper}`}>
            <ul className={`${style.footer_menu} flex flex-wrap mb-4`}>
                {footerMenu.map((item, index) => (
                    <li key={index}>
                        <Link className={`${style.footer_link}`} href={item.to}>
                            {item.content}
                        </Link>
                    </li>
                ))}
            </ul>
            <span className={`${style.copyright}`}>
                © 2023 Instagram clone by nhiempc
            </span>
        </div>
    );
};

export default FooterContent;
