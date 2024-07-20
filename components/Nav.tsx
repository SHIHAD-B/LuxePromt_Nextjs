'use client'

import Link from "next/link";
import Image from 'next/image';
import logo from '../public/assets/images/logo.svg';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { useEffect, useState } from "react";

const Nav = () => {
    const { user } = useUser();
    const [toggledropdown, setToggledropdown] = useState(false);

    return (
        <nav className="flex justify-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 items-center">
                <Image src={logo} alt="Logo" className="w-[30px] h-[30px]" />
                <p className="logo_text">LuxePrompt</p>
            </Link>

            <div className="hidden sm:flex items-center gap-3 md:gap-5">
                {user ? (
                    <>
                        <Link href="/create-prompt" className="p-2 cursor-pointer border border-gray-300 rounded bg-black text-white">Create Post</Link>
                        <div className="w-9 h-9 rounded-full overflow-hidden">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </>
                ) : (
                    <SignInButton>
                        <button className="p-2 border border-gray-300 bg-black text-white rounded">
                            Sign In
                        </button>
                    </SignInButton>
                )}
            </div>

            <div className="sm:hidden flex items-center relative">
                {user ? (
                    <>
                        <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer" onClick={() => setToggledropdown(prev => !prev)}>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                        {toggledropdown && (
                            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4">
                                <Link href="/profile" className="dropdown_link block" onClick={() => setToggledropdown(false)}>My Profile</Link>
                                <Link href="/create-prompt" className="dropdown_link block" onClick={() => setToggledropdown(false)}>Create Prompt</Link>
                            </div>
                        )}
                    </>
                ) : (
                    <SignInButton>
                        <button className="p-2 border border-gray-300 bg-black text-white rounded">
                            Sign In
                        </button>
                    </SignInButton>
                )}
            </div>
        </nav>
    );
};

export default Nav;

