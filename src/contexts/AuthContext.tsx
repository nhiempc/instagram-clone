import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

type IProps = {
    children: React.ReactNode;
};

export const AuthContext = React.createContext(undefined);

const AuthProvider = ({ children }: IProps) => {
    const { data: session, status } = useSession();
    const [user, setUser] = React.useState<any>();
    const loading = status === 'loading';
    const router = useRouter();

    React.useEffect(() => {
        if (session === undefined) {
            setUser(undefined);
        } else if (session === null) {
            router.push('/auth/signin');
        } else {
            setUser(session.user);
        }
    }, [router, session]);

    return (
        <AuthContext.Provider value={user}>
            {loading ? <h1>Loading...</h1> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
