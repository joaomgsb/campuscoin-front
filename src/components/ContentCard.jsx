import React from 'react';
import { Link } from 'react-router-dom';

export default function ContentCard({ menu }) {

    return (
        <div className="w-72 h-96 flex flex-col bg-white rounded-md duration-200 border-[1px] border-gray-200">
            <img src={menu.image} alt="image" className="w-full h-1/2 object-contain bg-white rouned-t-md" />
            <div className="flex-1 flex flex-col justify-between space-y-4 p-4">
                <p className='font-semibold text-gray-700'>
                    {menu.title}
                </p>

                <p className='overflow-hidden'>
                    {menu.description}
                </p>

                <div className="flex flex-row items-start justify-between">
                    <div></div>
                    <Link to={menu.path} className='text-blue-500'>Visualizar →</Link>
                </div>
            </div>
        </div>
    );
};