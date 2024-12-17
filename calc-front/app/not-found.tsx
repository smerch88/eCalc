import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container py-80 leading-9 flex flex-col justify-center items-center gap-y-4">
            <h1 className="font-bold text-9xl">404</h1>
            <h2 className="text-3xl font-normal">Page Not Found</h2>
            <Link href="/" className="text-xl font-normal text-[#5a71eb]">
                Go back home
            </Link>
        </div>
    );
}
