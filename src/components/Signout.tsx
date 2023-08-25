'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/authContext';

export default function Signout() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleSignout = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        logout();
        router.push('/');
    }
    return ( <button onClick={handleSignout}>Sign Out</button> )
}
