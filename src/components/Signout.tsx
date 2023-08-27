'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/authContext';

export default function Signout() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleSignout = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        localStorage.removeItem('userData');
        logout();
        router.push('/');
    }
    return ( <button onClick={handleSignout} className='hover:text-blue-500 transition-colors duration-300'>Signout</button> )
}
