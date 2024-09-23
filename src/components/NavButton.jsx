import React from 'react';

export default function NavButton({ buttonData, active, onClick, className, ...props }) {
    return (
        <button
            {...props}
            onClick={onClick}
            className={`${active ? 'text-blue-500' : 'text-gray-600'} hover:bg-blue-400 text-nowrap text-ellipsis overflow-hidden hover:text-white px-4 py-2 text-start rounded-md transition-colors`}>
            {buttonData.label}
        </button>
    );
};