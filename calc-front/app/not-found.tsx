import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-full flex flex-col items-center mt-40">
            <h1>Not found – 404!</h1>
            <div>
                <Link href="/">Go back to Home</Link>
            </div>
        </div>
    );
}
