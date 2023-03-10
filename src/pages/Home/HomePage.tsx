import Content from '@/components/Content';
import Layout from '@/components/Layout';
import React from 'react';
import Stories from '@/components/Stories';
import Posts from '@/components/Posts';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function HomePage() {
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
                    <div className='main_content md:w-full lg:w-2/3 sm:w-full xs:w-full lg:mr-[40px]'>
                        <Stories />
                        <Posts />
                    </div>
                    <Footer />
                </Content>
            </Layout>
        )
    );
}
