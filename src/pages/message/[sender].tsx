import Content from '@/components/Content';
import Layout from '@/components/Layout';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MessageUser from './MessageUser';
import MessageChat from './MessageChat';
import style from './Message.module.css';

export default function MessagePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const loading = status === 'loading';
    if (loading) return <p>Loading...</p>;
    if (session === null) {
        router.push('/auth/signin');
    }

    return (
        session && (
            <Layout>
                <Content>
                    <div
                        className={`${style.main_content} md:w-full lg:w-full sm:w-full xs:w-full flex mt-8 mb-5`}
                    >
                        <MessageUser />
                        <MessageChat />
                    </div>
                </Content>
            </Layout>
        )
    );
}
