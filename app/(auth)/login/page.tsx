import Link from 'next/link';
import { InputField } from '@/components/InputField';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col p-6 md:p-12">
            {/* Header */}
            <div className="text-center mt-12 mb-10">
                <h1 className="text-3xl font-bold text-restify-text-dark">Sign in</h1>
                <p className="text-restify-text-gray mt-2">Hi Welcome! Continue to login</p>
            </div>

            {/* Form Section */}
            <form className="w-full max-w-md mx-auto flex-grow">
                <InputField
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="nama@example.com"
                />
                <div className="relative">
                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="***********"
                    />
                    {/* Icon mata (Sembunyikan password) nanti bisa ditambah logika state */}
                </div>

                <div className="text-right mb-8">
                    <Link href="/forgot-password" className="text-sm text-yellow-700 hover:underline">
                        Forgot Password
                    </Link>
                </div>

                <Link href="/home" className="w-full block">
                    <ButtonPrimary type="button" className="mb-6">
                        Sign in
                    </ButtonPrimary>
                </Link>

                {/* Divider */}
                <div className="relative flex py-3 items-center mb-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">Or Sign in with</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Social Login */}
                <div className="flex justify-center gap-6 mb-10">
                    <button type="button" className="p-3 border rounded-full hover:bg-gray-50"><FcGoogle className="w-6 h-6" /></button>
                    <button type="button" className="p-3 border rounded-full hover:bg-gray-50 text-[#1877F2]"><FaFacebook className="w-6 h-6" /></button>
                    <button type="button" className="p-3 border rounded-full hover:bg-gray-50 text-black"><FaApple className="w-6 h-6" /></button>
                </div>
            </form>

            {/* Footer link */}
            <div className="text-center text-sm text-restify-text-dark pb-6">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-yellow-700 font-semibold hover:underline">
                    Sign up
                </Link>
            </div>
        </main>
    );
}