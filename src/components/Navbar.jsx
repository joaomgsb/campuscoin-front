import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import Logo from '../assets/Logo.png';
import { navMenus } from '../../menus';
import ProfileCardMenu from './ProfileCardMenu';

export default function Navbar() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <nav className="w-full h-16 bg-white shadow-md flex flex-row justify-between items-center px-4 z-40 relative">

            <div className="flex flex-row items-center justify-between space-x-2">
                <img src={Logo} className='h-16 w-16' />
                <p className="font-Satoshi text-xl font-bold text-blue-900">
                    CampusCoin
                </p>
            </div>

            <ul className="flex flex-row space-x-8 text-[#0D3C66]">
                {
                    navMenus.map((menu, index) => (
                        <Link
                            onClick={() => setActiveIndex(index)}
                            to={menu.path}
                            key={index} className={`${index === activeIndex ? 'text-blue-500' : ''} hover:bg-blue-400 hover:text-white px-4 py-2 text-start rounded-md text-gray-600 duration-200`}>
                            {menu.label}
                        </Link>
                    ))
                }
            </ul>

            <ProfileCard />

        </nav>
    );
};