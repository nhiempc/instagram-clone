import Content from '@/components/Content';
import Layout from '@/components/Layout';
import React from 'react';

const Home: React.FunctionComponent = () => {
    return (
        <Layout>
            <Content>
                <h1>This is content</h1>
            </Content>
        </Layout>
    );
};

export default Home;
