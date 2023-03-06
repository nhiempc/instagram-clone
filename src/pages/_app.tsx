import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import store from '@/redux/store';

export default function App({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps) {
    return (
        <Provider store={store}>
            <SessionProvider session={session}>
                <RecoilRoot>
                    <Component {...pageProps} />
                </RecoilRoot>
            </SessionProvider>
        </Provider>
    );
}
