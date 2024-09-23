import React, { useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import { accountMenus } from '../../../menus';

export default function ProfilePage() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <AuthLayout>
            <div className="h-full grid grid-cols-8">

                <nav className="col-span-2 duration-500 rounded-lg flex flex-col space-y-2 p-2 border-r-[1px] border-blue-100">
                    {
                        accountMenus.map((menu, index) => (
                            <button
                                onClick={() => setActiveIndex(index)}
                                key={index} className={`${index === activeIndex ? 'text-blue-500' : ''} hover:bg-blue-400 hover:text-white px-4 py-2 text-start rounded-md text-gray-600 duration-200`}>
                                {menu.label}
                            </button>
                        ))
                    }
                </nav>

                <div className="col-span-6 p-4 duration-200">
                    {accountMenus[activeIndex].component}
                </div>
            </div>
        </AuthLayout>
    );
};