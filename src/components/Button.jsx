import React from 'react';

export default function Button({ children, className, ...props }) {
    return (
        <button
            {...props}
            className={`my-4 bg-indigo-500 text-white p-2 rounded-md ${className}`}
        >
            {children}
        </button>
    );
};