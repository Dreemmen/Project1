import { useRouter } from 'next/router';

export const Topbar = () => {
    const router = useRouter();

    return (
        <div className='topbar'>
            <div className='page-title'></div>
            <div className='navbar-top'>
                <div onClick={() => router.push('/')}>home</div>
                <div onClick={() => router.push('/add-product')}>addProduct</div>
            </div>
        </div>
    );
};