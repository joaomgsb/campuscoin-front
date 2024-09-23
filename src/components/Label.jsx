import React from 'react';

export default function Label({ htmlFor, children, ...props }) {
    return (
        <label
            {...props}
            htmlFor={htmlFor}
            className="text-gray-400"
        >
            {children}
        </label>
    );
};