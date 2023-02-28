import Content from '@/components/Content';
import Layout from '@/components/Layout';
import React from 'react';
import Stories from '@/components/Stories';
import Posts from '@/components/Posts';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const HomePage: React.FunctionComponent = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const loading = status === 'loading';
    if (loading) return <p>Loading...</p>;
    if (!session) {
        router.push('/auth/signin');
    }

    return (
        session && (
            <Layout>
                <Content>
                    <div className='main_content w-3/5 mr-[64px]'>
                        <Stories />
                        <Posts />
                    </div>
                    <Footer />
                </Content>
            </Layout>
        )
    );
};

export default HomePage;
