import React from 'react';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import style from './Login.module.css';
import images from '@/assets/images';
import Image from 'next/image';
import { FacebookIcon, GithubIcon, GoogleIcon } from '@/assets/icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { removeVietnameseTones } from '@/common';

// Browser
export default function SignIn() {
    const [provider, setProvider] = React.useState<
        Record<string, ClientSafeProvider>
    >({});

    const router = useRouter();
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    React.useEffect(() => {
        async function getProvidersValue() {
            const p = await getProviders();
            setProvider(p as Record<string, ClientSafeProvider>);
        }

        getProvidersValue();
    }, []);

    const addUser = async () => {
        const username = removeVietnameseTones(session?.user?.name as string)
            .split(' ')
            .join('')
            .toLowerCase();

        const userData = {
            username: username,
            name: session?.user?.name,
            email: session?.user?.email || null,
            profileImg: session?.user?.image,
            timestamp: serverTimestamp()
        };
        await setDoc(doc(db, 'users', username), userData);
    };

    if (loading) return <p>Loading...</p>;
    if (session) {
        addUser();
        router.push('/');
    }
    if (session === null) {
        return (
            <>
                <div className={`${style.login_wrapper}`}>
                    <div className={`${style.left_side}`}>
                        <img
                            src={images.loginBackground.default.src}
                            alt='login background'
                        />
                    </div>
                    <div className={`${style.right_side}`}>
                        <div className={`${style.form_login}`}>
                            <div className={`${style.form_header}`}>
                                <Image src={images.logo} alt='logo' priority />
                            </div>
                            <div className={`${style.form_body}`}>
                                <form action='' className={`${style.form}`}>
                                    <input
                                        type='text'
                                        placeholder='S??? ??i???n tho???i, t??n ng?????i d??ng ho???c email'
                                    />
                                    <input
                                        type='password'
                                        placeholder='M???t kh???u'
                                    />
                                    <button type='submit'>????ng nh???p</button>
                                </form>
                            </div>
                            <div className={`${style.or}`}>
                                <div className={`${style.wrapper}`}>
                                    <div className={`${style.text}`}>Ho???c</div>
                                </div>
                            </div>

                            {Object.values(provider).map((provider) => (
                                <div
                                    key={provider.id}
                                    className={`${style.login_method}`}
                                >
                                    {provider.id === 'google' ? (
                                        <GoogleIcon />
                                    ) : provider.id === 'facebook' ? (
                                        <FacebookIcon />
                                    ) : provider.id === 'github' ? (
                                        <GithubIcon />
                                    ) : null}
                                    <button
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                    >
                                        ????ng nh???p b???ng {provider.name}
                                    </button>
                                </div>
                            ))}
                            <Link href={'/'} className={`${style.forgot_pw}`}>
                                Qu??n m???t kh???u?
                            </Link>
                        </div>
                        <div className={`${style.signup}`}>
                            <p>
                                B???n ch??a c?? t??i kho???n ???{' '}
                                <span>
                                    <Link
                                        className={`${style.signup_link}`}
                                        href={'/'}
                                    >
                                        ????ng k??
                                    </Link>
                                </span>
                            </p>
                        </div>
                        <div className={`${style.download_app}`}>
                            <div className={`${style.download_app_header}`}>
                                <p>T???i ???ng d???ng.</p>
                            </div>
                            <div className={`${style.download_links}`}>
                                <Link href={'/'}>
                                    <img
                                        src={images.googlePlay.default.src}
                                        alt='Google Play'
                                    />
                                </Link>
                                <Link href={'/'}>
                                    <img
                                        src={images.microsoft.default.src}
                                        alt='Microsoft'
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
}
