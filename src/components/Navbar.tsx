'use client';

import React from 'react';
import Link from 'next/link';
import {MenuIcon} from 'lucide-react';
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {usePathname} from "next/navigation";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const isLinkActive = (href: string) => pathname === href;
    const linkTextColor = (href: string) => {
        return isLinkActive(href) ? 'text-blue-500' : 'text-light';
    }

    return (
        <div>
            <nav className="bg-dark bg-opacity-75 fixed-top text-light p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link className="text-light font-bold text-xl" href="/">
                        Blogs
                    </Link>
                    <button className="navbar-toggler text-light md:hidden" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="hidden sm:flex space-x-4">
                        <Link
                            href="/"
                            className={`hover:underline ${linkTextColor('/')}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/create"
                            className={`hover:underline ${linkTextColor('/create')}`}
                        >
                            Create new Blog
                        </Link>
                    </div>
                    {/* mobile menu open btn */}
                    <div className="sm:hidden">
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <MenuIcon size={24}/>
                        </button>
                    </div>
                    {/*  mobile menu  */}
                    <div
                        className={`pl-4 pr-6 py-2 bg-white shadow-lg absolute right-0 top-0 bottom-0
                        ${!isMobileMenuOpen ? 'hidden' : ''} sm:hidden`}
                    >
                        <div className="flex w-full justify-between">
                            <span></span>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <CloseIcon/>
                            </button>
                        </div>
                        <div className="flex flex-col space-y-4 my-6">
                            <Link href="/" className={`hover:underline ${linkTextColor('/')}`}>
                                Home
                            </Link>
                            <Link href="/create" className={`hover:underline ${linkTextColor('/create')}`}>
                                Create new Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;