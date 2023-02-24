import Content from '@/components/Content';
import Layout from '@/components/Layout';
import React from 'react';
import Stories from '@/components/Stories';
import Posts from '@/components/Posts';
import Footer from '@/components/Footer';

const Home: React.FunctionComponent = () => {
    return (
        <Layout>
            <Content>
                <div className='main_content w-3/5 mr-[64px]'>
                    <Stories />
                    <Posts />
                </div>
                <Footer />
            </Content>
        </Layout>
    );
};

export default Home;
