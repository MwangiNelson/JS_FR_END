import React from "react";

function Footer() {
    return (
        <footer className="bg-cream px-5 sticky bottom-0 dark:bg-gray-800 w-full flex justify-center items-center">
            <div className="w-full border-t-[2px] border-t-slate-400 px-5 p-4 md:flex md:items-center md:justify-between lg:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023{" "}
                    <a href="/" className="hover:underline">
                        Nutrihub™
                    </a>
                    . Powered by <b className="text-black font-semibold">NELSON</b>.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                            Metrics
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                            Data
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                            Source Code
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">
                            Documentation
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
