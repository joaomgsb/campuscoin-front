import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileCardMenu({ menu }) {
    return (
        <Link to={menu.path} className='w-full px-4 py-2 flex flex-row items-center justify-start space-x-2 text-gray-600 hover:text-white hover:bg-blue-400 duration-200 rounded-sm'>
            {menu.icon && <FontAwesomeIcon icon={menu.icon} />}
            <p>{menu.label}</p>
        </Link>
    );
};