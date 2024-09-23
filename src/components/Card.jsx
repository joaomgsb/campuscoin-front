import React from 'react';

export default function Card({ title, children }) {
    return (
        <div className="min-w-96 min-h-56 bg-white rounded-md p-8 flex flex-col space-y-4">
            {
                title && (
                    <div className='flex flex-col space-y-4'>
                        <p className='text-lg font-semibold text-gray-600'>{title}</p>
                        <hr />
                    </div>
                )
            }

            {children}
        </div>
    );
};