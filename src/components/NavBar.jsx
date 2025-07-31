import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "./Button";

function NavBar({ onSearch }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="inline-flex
                                    items-center
                                    justify-center
                                    rounded-md
                                    p-2
                                    text-gray-300
                                    hover:bg-gray-700
                                    hover:text-white
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-inset
                                    focus:ring-indigo-500
                                    transition-colors
                                    duration-200"
                            aria-controls="mobile-menu"
                            aria-expanded={menuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!menuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth="2"
                                >
                                    <path
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth="2"
                                >
                                    <path
                                        d="M6 18L18 6M6 6l12 12"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Logo and navigation */}
                    <div className="flex flex-1 items-center justify-between sm:justify-start sm:space-x-8">
                        <div className="flex shrink-0 items-center">
                            <Link to="/" className="flex items-center">
                                <span className="ml-3 text-xl font-bold text-white hidden sm:block">Weather</span>
                            </Link>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:space-x-6">
                            <Link
                                to="/weather"
                                className="text-gray-200 
                                    hover:bg-gray-700 
                                    hover:text-white 
                                    px-4 
                                    py-2 
                                    rounded-lg 
                                    text-sm 
                                    font-medium 
                                    transition-all 
                                    duration-200 
                                    ease-in-out"
                            >
                                Weather
                            </Link>
                            <Link
                                to="/todo"
                                className="text-gray-200
                                    hover:bg-gray-700
                                    hover:text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-200
                                    ease-in-out"
                            >
                                To Do
                            </Link>
                            <div className="flex items-center space-x-4">
                                <SearchBar onSearch={onSearch} />
                                <Button />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`sm:hidden
                    transition-all
                    duration-300
                    ease-in-out
                    ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                id="mobile-menu"
            >
                <div className="space-y-2 px-2 pt-2 pb-3 bg-gray-900">
                    <Link
                        to="/weather"
                        className="block
                                    rounded-lg
                                    bg-gray-800
                                    px-4
                                    py-2
                                    text-base
                                    font-medium
                                    text-white
                                    hover:bg-indigo-600
                                    transition-colors
                                    duration-200"
                        onClick={() => setMenuOpen(false)}
                    >
                        Weather
                    </Link>
                    <Link
                        to="/todo"
                        className="block 
                                    rounded-lg 
                                    px-4 
                                    py-2 
                                    text-base 
                                    font-medium 
                                    text-gray-200 
                                    hover:bg-indigo-600 
                                    hover:text-white 
                                    transition-colors 
                                    duration-200"
                        onClick={() => setMenuOpen(false)}
                    >
                        To Do
                    </Link>
                    <div className="px-4 py-2">
                        <SearchBar onSearch={onSearch} />
                    </div>
                    <div className="px-4 py-2">
                        <Button />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
