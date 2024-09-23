import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { profileMenus } from '../../menus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileCardMenu from './ProfileCardMenu';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FirstLetterUppercase } from '../utils/helpers';

export default function ProfileCard() {
    const { userData, logout } = useContext(AuthContext);
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
        setTimeout(() => {
            logout();
        }, 500);
    };

    return (
        <div
            onClick={() => setOpen(!isOpen)}
            className="hover:bg-blue-400 hover:text-white text-gray-500 duration-200 rounded-md px-4 py-2 relative cursor-pointer">
            {
                userData ?
                    <div className="flex flex-row space-x-2 items-center">
                        <div id="avatar" className="h-8 w-8 bg-gray-200 rounded-full"></div>
                        <p className="text-sm font-bold">
                            {FirstLetterUppercase(userData.name)}
                        </p>
                    </div>
                    :
                    <p className='text-sm text-gray-400 animate-pulse'>Carregando...</p>
            }
            {
                isOpen && <ul
                    onMouseLeave={() => setOpen(!isOpen)}
                    className="w-full duration-200 bg-white shadow-md rounded-md absolute top-14 right-0 z-50 p-2">
                    {
                        profileMenus.map((menu, index) => <ProfileCardMenu key={index} menu={menu} />)
                    }

                    <button
                        onClick={() => handleLogout()}
                        className='w-full flex flex-row items-center justify-start px-4 py-2 space-x-2 text-gray-600 hover:text-white hover:bg-red-400 duration-200 rounded-sm'>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <p>Sair</p>
                    </button>
                </ul>
            }

        </div>
    );
};