import React from 'react';

export default function Heading({ children, className, ...props }) {
    return (
        <p className={`font-semibold text-lg text-gray-400 ${className}`}>
            {children}
        </p>
    );
};