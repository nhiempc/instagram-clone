import HomePage from '@/pages/Home';
import Head from 'next/head';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '../routes';

export default function Home() {
    return (
        <>
            <Head>
                <title>Instagram clone</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <HomePage />
            </main>
        </>
    );
}
