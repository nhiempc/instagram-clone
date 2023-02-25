import React from 'react';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import style from './Login.module.css';
import images from '@/assets/images';
import Image from 'next/image';
import { FacebookIcon, GithubIcon, GoogleIcon } from '@/assets/icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Browser
function SignIn() {
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

    if (loading) return <p>Loading...</p>;
    if (session) {
        router.push('/');
    }

    if (!session)
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
                                        placeholder='Số điện thoại, tên người dùng hoặc email'
                                    />
                                    <input
                                        type='password'
                                        placeholder='Mật khẩu'
                                    />
                                    <button type='submit'>Đăng nhập</button>
                                </form>
                            </div>
                            <div className={`${style.or}`}>
                                <div className={`${style.wrapper}`}>
                                    <div className={`${style.text}`}>Hoặc</div>
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
                                        onClick={() =>
                                            signIn(provider.id, {
                                                callbackUrl: '/'
                                            })
                                        }
                                    >
                                        Đăng nhập bằng {provider.name}
                                    </button>
                                </div>
                            ))}
                            <Link href={'/'} className={`${style.forgot_pw}`}>
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <div className={`${style.signup}`}>
                            <p>
                                Bạn chưa có tài khoản ư?{' '}
                                <span>
                                    <Link
                                        className={`${style.signup_link}`}
                                        href={'/'}
                                    >
                                        Đăng ký
                                    </Link>
                                </span>
                            </p>
                        </div>
                        <div className={`${style.download_app}`}>
                            <div className={`${style.download_app_header}`}>
                                <p>Tải ứng dụng.</p>
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
}

export default SignIn;
